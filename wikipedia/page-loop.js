/* jshint loopfunc:true */

'use strict';

var util = require('util'),
	$ = window.$,
	jQuery = require('jquery-browserify');

// for tests (to be able to mock jQuery)
if ( $ ) {
	$ = $( jQuery );
} else {
	$ = jQuery;
}

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

var hopDefaultUrl = "http://en.wikipedia.org/",
	hopUrlTemplate = "http://en.wikipedia.org/wiki/%q",
	urlTemplate = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=%s&srlimit=%s&sroffset=%s&srprop=snippet&format=json',
	max = pagehop.getMaxCount(),
	query = pagehop.getQuery() ? encodeURIComponent( pagehop.getQuery() ) : "",
	itemsAtPage = 50,
	iterationsCount = Math.ceil( max / itemsAtPage ),
	results = new Array( iterationsCount ),
	asyncCount = iterationsCount;

if ( query ) {
	pagehop.getHops().push( {
		text: "Wikipedia",
		address: hopUrlTemplate.replace( "%q", query )
	} );

	for ( var i = 0; i < iterationsCount; i++ ) {
		var limit = ( ( i + 1 ) === iterationsCount ) ?
			max - ( iterationsCount - 1 ) * itemsAtPage
				:
			itemsAtPage;
		var offset = i * itemsAtPage;
		var url = util.format(
			urlTemplate,
			query,
			limit,
			offset
		);

		// clojure to preserve i for every result
		(function() {
		var index = i;
		$.getJSON( url )
			.done(function( json ) {
				var items = json.query.search;
				if ( items && items.length ) {
					results[ index ] = items.map( function(item) {
						var synopsis = $( "<div>" + item.snippet + "</div>" ).text();
						return {
							text: item.title,
							address: "http://en.wikipedia.org/wiki/" + encodeURIComponent( item.title ),
							displayAddress: synopsis.substring( 0, 80 ) + ( synopsis.length > 80 ? "..." : "" )
						};
					} );
				}
				var allResults = flattenResults( results );
				if ( --asyncCount === 0 ) {
					pagehop.finish( allResults );
				} else {
					pagehop.updateResults( allResults );
				}
			})
			.fail(function( jqxhr, textStatus, error ) {
				var err = textStatus + ", " + error;
				console.log( "Request Failed: " + err );
				pagehop.finishWithError( error );
			});
		})();
	}
} else {
	pagehop.getHops().push( {
		text: "Wikipedia: no query",
		address: hopDefaultUrl
	} );

	pagehop.finish( [] );
}