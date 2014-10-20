/* jshint -W083 */

'use strict';

var $ = window.$;

// for tests (to be able to mock jQuery)
if ( !$ ) {
	var $ = require('jquery-browserify');
}

var utils = require("./src/utils");

var topStoriesUrl = "https://hacker-news.firebaseio.com/v0/topstories.json",
	OPTION_TYPE = utils.OPTION_TYPE,
	processRawResults = utils.processRawResults,
	max = pagehop.getMaxCount(),
	options = pagehop.getOptions() || [],
	hasDiscussionOption = options.indexOf( OPTION_TYPE.DISCUSSIONS ) !== -1;

if ( hasDiscussionOption ) {
	options = options.filter( function(opt) {
		return opt !== OPTION_TYPE.DISCUSSIONS;
	} );
}

var request = function(url, callback) {
	$.getJSON( url )
		.done(function( result ) {
			callback( result );
		})
		.fail(function( jqxhr, textStatus, error ) {
			var err = textStatus + ", " + error;
			console.log( "Request Failed: " + err );
			pagehop.finishWithError( error );
		});
};

// get the last non-discussion option
var option = options && options.length ? options[ options.length - 1 ] : null;

var getItems = function(ids, startIndex, count, rawResults) {
	var asyncTasksCount = count,
		PAGE_MAX_SIZE = 30,
		itemUrlTemplate = "https://hacker-news.firebaseio.com/v0/item/%s.json";

	for ( var i = startIndex; i < ( startIndex + count ); i++ ) {
		( function() {
			var index = i,
				itemUrl = itemUrlTemplate.replace( "%s", ids[ i ] );

			request( itemUrl, function(item) {
				rawResults[ index ] = item;

				if ( --asyncTasksCount === 0 ) {
					// TODO: cache results
					var results = processRawResults( rawResults, option, hasDiscussionOption ),
						highestIndex = startIndex + count - 1;
					if ( ( results.length < max ) && ( highestIndex < ids.length - 1 ) ) {
						startIndex = highestIndex + 1;
						count = Math.min( PAGE_MAX_SIZE, ids.length - highestIndex - 1 );

						getItems( ids, startIndex, count, rawResults );
					} else {
						pagehop.finish( results );
						return;
					}
				}
			} );
		} )();
	}
};

request( topStoriesUrl, function(ids) {
	if ( !ids || !ids.length ) {
		pagehop.finish( [] );
		return;
	}

	var startIndex = 0,
		count = Math.min( max, ids.length ),
		rawResults = new Array( max );

	getItems( ids, startIndex, count, rawResults );
} );