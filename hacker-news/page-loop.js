'use strict';

var initialUrl = 'http://news.ycombinator.com/',
	alternativeUrls = {
		":n": 'http://news.ycombinator.com/newest',
		":c": 'http://news.ycombinator.com/newcomments',
		":ask": 'http://news.ycombinator.com/ask',
		":j": 'http://news.ycombinator.com/jobs',
		":s": 'http://news.ycombinator.com/show'
	},
	max = pagehop.getMaxCount(),
	options = pagehop.getOptions() || [],
	hasDiscussionOption = options.indexOf( ":d" ) !== -1,
	results = [];

if ( hasDiscussionOption ) {
	options = options.filter( function(opt) {
		return opt !== ":d";
	} );
}

var option = options && options.length ? options[ options.length - 1 ] : null;

if ( option && alternativeUrls[ option ] ) {
	initialUrl = alternativeUrls[ option ];
}

var nextPage = function( url ) {
	pagehop.scrape( url, function(error, result) {
		if ( error ) {
			pagehop.finishWithError( error );
			return;
		}
		var isFinished = false;
		if ( result ) {
			isFinished = result.nextUrl ? false : true;
			results = results.concat( result.items.map( function(item) {
				var newItem = {
					text: item.text,
					displayAddress: item.displayAddress
				};
				if ( hasDiscussionOption && ( option !== ":j" ) && item.discussionAddress ) {
					newItem.address = item.discussionAddress;
					newItem.text = "Discussion: " + item.text;
				} else {
					newItem.address = item.address;
				}
				return newItem;
			} ) );
		}

		if ( results.length >= max ) {
			results = results.splice( 0, max );
			isFinished = true;
		}

		if ( isFinished ) {
			pagehop.finish( results );
		} else {
			pagehop.updateResults( results );
			nextPage( result.nextUrl );
		}
	} );
};

nextPage( initialUrl );