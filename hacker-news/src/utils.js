'use strict';

var OPTION_TYPE = {
	SHOW:			":s",
	ASK:			":ask",
	JOBS:			":j",
	DISCUSSIONS:	":d"
};

exports.OPTION_TYPE = OPTION_TYPE;

var getDomain = exports.getDomain = function(url) {
	var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
	return matches[1];
};

var isAskStory = exports.isAskStory = function(rawItem) {
	return ( rawItem.type === "story" && !rawItem.url ) || 
		rawItem.type === "poll";
};

var isJob = exports.isJob = function(rawItem) {
	return rawItem.type === "job";
};

var shouldKeepItem = exports.shouldKeepItem = function(rawItem, option) {
	if ( !rawItem ) {
		return false;
	}

	if ( option ) {
		switch ( option ) {
			case OPTION_TYPE.ASK:
				return isAskStory( rawItem );
			case OPTION_TYPE.JOBS:
				return isJob( rawItem );
			default:
				//Show HN
				return rawItem.type === "story" && rawItem.title && ( rawItem.title.toLowerCase().indexOf( "show hn" ) !== -1 );
		}
	}

	return true;
};

var getElapsedTime = exports.getElapsedTime = function(unixTime) {
	var template = "%s %s ago",
		elapsedSeconds = ( new Date() - new Date( unixTime * 1000 ) ) / 1000,
		elapsedYears = Math.floor( elapsedSeconds / 3600 / 24 / 365 ),
		elapsedDays = Math.floor( elapsedSeconds / 3600 / 24 ),
		elapsedHours = Math.floor( elapsedSeconds / 3600 ),
		elapsedMinutes = Math.floor( elapsedSeconds / 60 );

	if ( elapsedYears > 0 ) {
		return template
			.replace( "%s", elapsedYears )
			.replace( "%s", elapsedYears === 1 ? "year" : "years" );
	}
	if ( elapsedDays > 0 ) {
		return template
			.replace( "%s", elapsedDays )
			.replace( "%s", elapsedDays === 1 ? "day" : "days" );
	}
	if ( elapsedHours > 0 ) {
		return template
			.replace( "%s", elapsedHours )
			.replace( "%s", elapsedHours === 1 ? "hour" : "hours" );
	}
	if ( elapsedMinutes > 0 ) {
		return template
			.replace( "%s", elapsedMinutes )
			.replace( "%s", elapsedMinutes === 1 ? "minute" : "minutes" );
	}
	return "just now";
};

var getCommentsStats = exports.getCommentsStats = function(rawItemKids) {
	var template = "%s (root) %s";
	if ( rawItemKids && rawItemKids.length ) {
		if ( rawItemKids.length === 1 ) {
			return template
				.replace( "%s", 1 )
				.replace( "%s", "comment" );
		} else if ( rawItemKids.length > 1 ) {
			return template
				.replace( "%s", rawItemKids.length )
				.replace( "%s", "comments" );
		}
	}
	return "no comments";
};

var parseItem = exports.parseItem = function(rawItem, hasDiscussionOption, index) {
	var discussionUrlTemplate = "https://news.ycombinator.com/item?id=%s",
		displayAddressTemplate = "%s by %s %s | %s",
		jobDisplayAddressTemplate = "job %s",
		result;

	if ( rawItem.type ) {
		if ( isAskStory( rawItem ) ) {
			result = {
				text: index + "." + rawItem.title,
				address: discussionUrlTemplate.replace( "%s", rawItem.id )
			};
		} else if ( isJob( rawItem ) || !hasDiscussionOption ) {
			result = {
				text: index + "." + rawItem.title + " (" + getDomain( rawItem.url ) + ")",
				address: rawItem.url
			}
		} else { // !askStory && !job && hasDiscussionOption
			result = {
				text: "Discussion: " + index + "." + rawItem.title,
				address: discussionUrlTemplate.replace( "%s", rawItem.id )
			};
		}
	} else {
		return null;
	}

	if ( rawItem.type === "job" ) {
		result.displayAddress = jobDisplayAddressTemplate
			.replace( "%s", getElapsedTime( rawItem.time ) );
	} else {
		result.displayAddress = displayAddressTemplate
			.replace( "%s", rawItem.score )
			.replace( "%s", rawItem.by )
			.replace( "%s", getElapsedTime( rawItem.time ) )
			.replace( "%s", getCommentsStats( rawItem.kids ) )
	}

	return result;
};

exports.processRawResults = function(rawResults, option, hasDiscussionOption) {
	var results = [];

	var index = 1;
	for ( var i = 0; i < rawResults.length; i++ ) {
		var rawItem = rawResults[ i ];
		if ( shouldKeepItem( rawItem, option ) ) {
			var item = parseItem( rawItem, hasDiscussionOption, index++ );
			if ( item ) {
				results.push( item );
			}
		}
	}

	return results;
};