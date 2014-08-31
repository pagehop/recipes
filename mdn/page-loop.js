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

var urlTemplate = 'https://developer.mozilla.org/en-US/search?q=%s&page=%s',
	startAt = 1,
	itemsAtPage = 10,
	max = pagehop.getMaxCount(),
	iterationsCount = Math.ceil( max / itemsAtPage ),
	query = pagehop.getQuery(),
	results = [];

var scrapeUrl = function(url, callback) {
	$.get( url )
		.done( function( html ) {
			var fragment = $( html );

			var resultListElement = $( ".result-list", fragment )[0],
				elements = resultListElement ? resultListElement.children : [],
				result = {
					items: [],
					hasMore: $( "#search-result-next", fragment )[0] !== undefined
				};

			for (var i = 0; i < elements.length; i++) {
				var element = elements[i],
					link = element.querySelector("a");

				result.items.push( {
					text: link.innerHTML,
					address: link.href,
					displayAddress: $( ".result-list-item p", element )[0].textContent.replace( "\n", " " ).replace( /\s+/g, " " ).trim()
				} );
			}
			callback( null, result );
		} )
		.fail( function( jqxhr, textStatus, error ) {
			var err = textStatus + ", " + error;
			console.log( "Request Failed: " + err );
			callback( error );
		} );
};

var getPage = function(pageNumber) {
	var url = util.format(
		urlTemplate,
		encodeURIComponent( query ),
		pageNumber
	);

	scrapeUrl( url, function(error, result) {

		if ( error ) {
			pagehop.finishWithError( error );
			return;
		}
		var items = result.items;
		if ( items && items.length ) {
			results = results.concat( items );
		}

		if ( pageNumber === iterationsCount || !result.hasMore ) {
			pagehop.finish( results );
		} else {
			pagehop.updateResults( results );
			getPage( ++pageNumber );
		}
	} );
};

if ( query ) {
	getPage( startAt );
} else {
	pagehop.finish( [] );
}