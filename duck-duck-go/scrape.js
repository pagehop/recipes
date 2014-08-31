/* jshint -W107 */

'use strict';

var max = pagehop.getMaxCount();

// ManualDebug:
//    uncomment from next line & paste in the browser
//
// var pagehop = {
//     finish: function(items) {
//         result = items;
//         console.log( "Finish with " + items.length + " items: " + JSON.stringify( items ) );
//     }
// };

// var max = 500;

var getDomain = function(url) {
	var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
	return matches[1];
};

var getCurrentResults = function() {
	var items = Array.prototype.slice.call( document.querySelectorAll(".result__body") ).filter( function(element) {
		return element.querySelector( ".result__snippet" );
	} );

	if ( items && items.length ) {
		return items.map( function(element) {
			var link = element.querySelector( ".result__title>.result__a" ),
				synopsis = element.querySelector( ".result__snippet" ).textContent;

			return {
				text: link.textContent + " (" + getDomain( link.href ) + ")",
				address: link.href,
				displayAddress: synopsis,
				tooltip: synopsis
			};
		} );
	}

	return [];
};

var hasMore = function() {
	return document.querySelectorAll( ".no-results" ).length === 0;
};

var loadMore = function(callback) {
	if ( hasMore() ) {
		window.scrollTo( 0, document.body.scrollHeight );
		window.setTimeout( function() {
			var interval = window.setInterval( function() {
				if ( !document.querySelectorAll( "#loading" ).length ) {
					window.clearInterval( interval );
					callback( hasMore() );
				}
			}, 20 );
		}, 60 );
	} else {
		callback( false );
	}
};

var getMaxResults = function(noMore) {
	var currentResults = getCurrentResults();
	if ( currentResults.length >= max || noMore ) {
		pagehop.finish( currentResults );
		return;
	}

	loadMore( function(hasMore) {
		getMaxResults(!hasMore);
	} );
};

getMaxResults();