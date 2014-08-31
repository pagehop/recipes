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

var urlTemplate = 'http://api.jquery.com/?s=%s',
	query = pagehop.getQuery(),
	max = pagehop.getMaxCount();

var scrapeUrl = function(url, callback) {
	$.get( url )
		.done( function( html ) {
			var fragment = $( html );

			var elements = $( "article:not(.not-found)", fragment ),
				results = [];

			for (var i = 0; i < elements.length; i++) {
				var element = elements[i],
					link = $( ".entry-title a", element )[0],
					meta = $( ".entry-meta", element ).text().trim(),
					summary = $( ".entry-summary", element ).text().trim(),
					address = link.href;

				if ( address ) {
					if ( address.indexOf( "//" ) === 0 ) {
						address = "http:" + address;
					}
					results.push( {
						text: link.text.trim() + " (" + meta + ")",
						address: address,
						displayAddress: summary,
						tooltip: summary
					} );
				}

			}
			callback( null, results );
		} )
		.fail( function( jqxhr, textStatus, error ) {
			var err = textStatus + ", " + error;
			console.log( "Request Failed: " + err );
			callback( error );
		} );
};

var results = [];

if ( query ) {

	var url = util.format(
		urlTemplate,
		encodeURIComponent( query )
	);

	scrapeUrl( url, function(error, items) {

		if ( error ) {
			pagehop.finishWithError( error );
			return;
		}
		if ( items && items.length ) {
			results = items;
		}

		results.splice( max );

		pagehop.finish( results );

	} );

} else {
	pagehop.finish( [] );
}