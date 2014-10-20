'use strict';

var raw = require("./data/raw");

exports.generateIds = function(number) {
	var ids = [];

	for ( var i = 0; i < number; i++ ) {
		ids.push( i );
	}

	return ids;
};

exports.generateRequestResults = function(number, type) {
	var results = [];

	type = type || "defaultStory";

	for ( var i = 0; i < number; i++ ) {
		results.push( raw[ type ] );
	}

	return results;
};

exports.initFunc = function(intermediateResults, max, options) {
	var query = null,
		max = max || 30,
		scrapeScript = "irrelevant";
	window.pagehop.init( query, options, max, scrapeScript );
	window.$ = {
		getJSON: function(url) {
			window.boxApi.emitEvent( "scrape", url );
			return {
				done: function(func) {
					func( intermediateResults.splice( 0, 1 )[0] );
					return {
						fail: function() {}
					};
				}
			};
		}
	};

	//mock the current time
	var OriginalDate = Date;
	Date = function() {
		if ( !arguments.length ) {
			return new OriginalDate( 2014, 9, 16, 17 );
		}
		return eval( "new OriginalDate( " +
			Array.prototype.slice.call( arguments )
				.map( function( element ) { return JSON.stringify( element ) } ).join( ", " ) +
		" )");
	};
};

exports.enumerateResults = function(items) {
	for ( var i = 0; i < items.length; i++ ) {
		var item = JSON.parse( JSON.stringify( items[i] ) );
		item.text = item.text.replace( /^1/, i + 1 );
		item.text = item.text.replace( /^Discussion: 1/, "Discussion: " + ( i + 1 ) );
		items[i] = item;
	}

	return items;
};