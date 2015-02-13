/* jshint loopfunc:true */

'use strict';

var util = require('util');

function flattenResults( results ) {
	var result = [];
	for ( var i = 0; i < results.length; i++ ) {
		var array = results[i];
		if ( array && array.length ) {
			result = result.concat( array );
		}
	}
	return result;
}

var hopDefaultUrl = "https://google.com/",
	hopUrlTemplate = "https://google.com/?q=%q",
	urlTemplate = 'http://www.google.com/search?hl=en&q=%s&start=%s&sa=N&num=%s&ie=UTF-8&oe=UTF-8',
	startAt = 0,
	max = pagehop.getMaxCount(),
	itemsAtPage = max <= 100 ? max : 100,
	iterationsCount = Math.ceil( max / itemsAtPage ),
	query = pagehop.getQuery() ? encodeURIComponent( pagehop.getQuery() ) : "",
	results = new Array( iterationsCount ),
	asyncCount = iterationsCount;

if ( query ) {
	pagehop.getHops().push( {
		text: "GoogleSearch",
		address: hopUrlTemplate.replace( "%q", query )
	} );

	for ( var i = 0; i < iterationsCount; i++ ) {
		var url = util.format(
			urlTemplate,
			encodeURIComponent( query ),
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
			var allResults = flattenResults( results );
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
		text: "GoogleSearch: no query",
		address: hopDefaultUrl
	} );

	pagehop.finish( [] );
}