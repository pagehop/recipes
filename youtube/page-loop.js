'use strict';

var util = require('util'),
	$ = window.$;

// for tests (to be able to mock jQuery)
if ( !$ ) {
	var $ = require('jquery-browserify');
}

// Params:
//
// query (q)
var initialUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=%s&fields=items(id%2Csnippet)%2CnextPageToken&key=AIzaSyA76ApLecQ78zo38QKNet_0fT5aewyKV3c';

// Params:
//
// query (q)
// pageToken
var pageUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=%s&fields=items(id%2Csnippet)%2CnextPageToken&key=AIzaSyA76ApLecQ78zo38QKNet_0fT5aewyKV3c&pageToken=%s',
	max = pagehop.getMaxCount(),
	query = pagehop.getQuery(),
	itemsAtPage = 50,
	iterationsCount = Math.ceil( max / itemsAtPage ),
	results = [];

var pagesCount = 0;

var parseItem = function(rawItem) {
	var result = {
			text: rawItem.snippet.title
		},
		link,
		synopsis;

	switch ( rawItem.id.kind.replace( "youtube#", "" ) ) {
		case "playlist":
			link = "http://www.youtube.com/playlist?list=" + rawItem.id.playlistId;
			synopsis = [ "Playlist", "by " + rawItem.snippet.channelTitle, ( new Date( rawItem.snippet.publishedAt ) ).toDateString() ].join(" | ");
			break;
		case "channel":
			link = "http://www.youtube.com/channel/" + rawItem.id.channelId;
			synopsis = [ "Channel", ( new Date( rawItem.snippet.publishedAt ) ).toDateString() ].join(" | ");
			break;
		default:
			link = "http://www.youtube.com/watch?v=" + rawItem.id.videoId;
			synopsis = [ "by " + rawItem.snippet.channelTitle, ( new Date( rawItem.snippet.publishedAt ) ).toDateString() ].join(" | ");
			break;
	}
	result.address = link;
	result.displayAddress = synopsis;
	return result;
};

var getPage = function(pageToken) {
	pagesCount++;

	var url;
	if ( !pageToken ) {
		url = util.format(
			initialUrl,
			encodeURIComponent( query )
		);
	} else {
		url = util.format(
			pageUrl,
			encodeURIComponent( query ),
			pageToken
		);
	}

	$.getJSON( url )
		.done(function( json ) {
			var items = json.items;
			if ( items && items.length ) {
				results = results.concat(items.map( parseItem ) );
			}
			if ( pagesCount === iterationsCount || !json.nextPageToken ) {
				if ( results.length > max ) {
					results = results.splice( 0, max );
				}
				pagehop.finish( results );
			} else {
				pagehop.updateResults( results );
				getPage( json.nextPageToken );
			}
		})
		.fail(function( jqxhr, textStatus, error ) {
			var err = textStatus + ", " + error;
			console.log( "Request Failed: " + err );
			pagehop.finishWithError( error );
		});

};

if ( !query ) {
	pagehop.finish( [] );
} else {
	getPage();
}