/* jshint loopfunc:true */

'use strict';

var util = require('util'),
	deepEqual = require('deep-equal');

var flattenResults = function( results ) {
	var result = [];
	for ( var i = 0; i < results.length; i++ ) {
		var array = results[i];
		if ( array && array.length ) {
			result = result.concat( array );
		}
	}
	return result;
};
var cleanDuplicates = function(items) {
	var result = [],
		hasIt;
	for ( var i = 0; i < items.length; i++ ) {
		var item = items[i];
		hasIt = false;
		for ( var k = 0; k < result.length; k++ ) {
			var uniqueItem = result[k];
			if ( deepEqual( uniqueItem, item ) ) {
				hasIt = true;
				break;
			}
		}
		if ( !hasIt ) {
			result.push( item );
		}
	}
	return result;
};

// Query, query, pageNumber (1 => 11 => 21 => 31...)
var urlTemplate = 'http://www.bing.com/search?q=%s&pq=%s&first=%s&count=%s',
	hopDefaultUrl = 'http://www.bing.com/',
	hopUrlTemplate = 'http://www.bing.com/search?q=%s',
	startAt = 1,
	itemsAtPage = 100,
	max = pagehop.getMaxCount(),
	iterationsCount = Math.ceil( max / itemsAtPage ),
	query = pagehop.getQuery(),
	results = new Array( iterationsCount ),
	asyncCount = iterationsCount;

if ( query ) {
	var encodedQuery = encodeURIComponent( query ),
		lowerEncodedQuery = encodeURIComponent( query.toLowerCase() );

	pagehop.getHops().push( {
		text: "BingSearch",
		address: hopUrlTemplate.replace( "%s", encodedQuery )
	} );

	for ( var i = 0; i < iterationsCount; i++ ) {
		var url = util.format(
			urlTemplate,
			encodedQuery,
			lowerEncodedQuery,
			startAt,
			itemsAtPage
		);
		// clojure to preserve i for every result
		(function() {
		var index = i;
		pagehop.scrape( url, function(error, result) {
			if ( error ) {
				pagehop.finishWithError( error );
				return;
			}
			if ( result ) {
				results[ index ] = result;
			}
			var allResults = cleanDuplicates( flattenResults( results ) );
			if ( --asyncCount === 0 ) {
				pagehop.finish( allResults );
			} else {
				pagehop.updateResults( allResults );
			}
		} );
		})();
		startAt += itemsAtPage;
	}
} else {
	pagehop.getHops().push( {
		text: "BingSearch: no query",
		address: hopDefaultUrl
	} );

	pagehop.finish( [] );
}
