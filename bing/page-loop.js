/* jshint loopfunc:true */

'use strict';

var util = require('util'),
	deepEqual = require('deep-equal');

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

var urlTemplate = 'http://www.bing.com/search?q=%s&pq=%s&first=1&count=%s',
	hopDefaultUrl = 'http://www.bing.com/',
	hopUrlTemplate = 'http://www.bing.com/search?q=%s',
	resultsMaxCount = pagehop.getMaxCount(),
	query = pagehop.getQuery();

if ( query ) {
	var encodedQuery = encodeURIComponent( query ),
		lowerEncodedQuery = encodeURIComponent( query.toLowerCase() );

	pagehop.getHops().push( {
		text: "BingSearch",
		address: hopUrlTemplate.replace( "%s", encodedQuery )
	} );

	var url = util.format(
		urlTemplate,
		encodedQuery,
		lowerEncodedQuery,
		resultsMaxCount
	);

	pagehop.scrape( url, function(error, result) {
		if ( error ) {
			pagehop.finishWithError( error );
			return;
		}
		var allResults = cleanDuplicates( result );

		pagehop.finish( allResults );
	} );
} else {
	pagehop.getHops().push( {
		text: "BingSearch: no query",
		address: hopDefaultUrl
	} );

	pagehop.finish( [] );
}
