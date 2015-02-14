/* jshint loopfunc:true */

'use strict';

var util = require('util'),
	$ = window.$;

// for tests (to be able to mock jQuery)
if ( !$ ) {
	var $ = require('jquery-browserify');
}

// page {1,...,n}
// pagesize <= 100
// !NB! key is only for Pagehop use
var hopDefaultUrl = "https://stackoverflow.com/",
	hopUrlTemplate = "https://stackoverflow.com/search?q=%q",
	urlTemplate = "http://api.stackexchange.com/2.2/search/advanced?key=Z10BXZ9DtCJ7470hy*SYsw((&page=%s&pagesize=%s&order=desc&sort=relevance&q=%s&site=stackoverflow",
	max = pagehop.getMaxCount(),
	query = pagehop.getQuery() ? encodeURIComponent( pagehop.getQuery() ) : "",
	itemsAtPage = 100,
	firstPageNumber = 1,
	iterationsCount = Math.ceil( max / itemsAtPage ),
	results = [];

var getPage = function(pageNumber) {
	var url = util.format(
		urlTemplate,
		pageNumber,
		itemsAtPage,
		query
	);

	$.getJSON( url )
		.done(function( json ) {
			var items = json.items;
			if ( items && items.length ) {
				results = results.concat(items.map( function(item) {
					var date = new Date( 0 );
					date.setUTCSeconds( item.last_activity_date );
					var synopsis = [
						item.is_answered ? "<b>answered</b>" : "",
						"owner: " + item.owner.display_name,
						date.toDateString()
					].filter( function(item) { return item !== ""; } ).join(" | ");
					return {
						text: item.title,
						address: item.link,
						displayAddress: synopsis
					};
				} ) );
			}
			if ( pageNumber === iterationsCount || !json.has_more ) {
				if ( results.length > max ) {
					results = results.splice( 0, max );
				}
				pagehop.finish( results );
			} else {
				pagehop.updateResults( results );
				getPage( ++pageNumber );
			}
		})
		.fail(function( jqxhr, textStatus, error ) {
			var err = textStatus + ", " + error;
			console.log( "Request Failed: " + err );
			pagehop.finishWithError( error );
		});

};

if ( query ) {
	pagehop.getHops().push( {
		text: "StackOverflow",
		address: hopUrlTemplate.replace( "%q", query )
	} );

	getPage( firstPageNumber );
} else {
	pagehop.getHops().push( {
		text: "StackOverflow: no query",
		address: hopDefaultUrl
	} );

	pagehop.finish( [] );
}