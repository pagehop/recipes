/* jshint -W083 */

'use strict';

var request = window.request;

// for tests (to be able to mock request)
if ( !request ) {
	request = require("superagent");
}

var utils = require("./src/utils"),
	query = pagehop.getQuery(),
	maxResultsCount = pagehop.getMaxCount(),
	urlTemplate = "https://searchcode.com/api/codesearch_I/?q=%q&p=%p&per_page=%c",
	hopDefaultUrl = "https://searchcode.com/",
	hopUrlTemplate = "https://searchcode.com/?q=%q",
	helpInfo = {
		text: "Usage: code [query]",
		displayAddress: "Example: code System.Linq source:Bitbucket lang:C# repo:bvcms",
		address: utils.RECIPE_DOC_URL
	};

var search = function(query) {

	var url = urlTemplate
		.replace( "%q", query )
		.replace( "%p", 0 )
		.replace( "%c", maxResultsCount );

	request.get( url ).end( function( error, response ) {

		try {
			utils.validateResponse( error, response );
		} catch(err) {
			pagehop.finish( [ err.__data ] );
			return;
		}

		var body = response.body,
			results = utils.parseResults( body.results, utils.extractHighlightMatchTerms( body.matchterm ) );

		if ( results.length ) {
			pagehop.finish( results );
		} else {
			pagehop.finish( [ {
				text: "No results found."
			} ] );
		}

	} );

};

if ( query ) {
	var encodedQuery = encodeURIComponent( query );

	pagehop.getHops().push( {
		text: "CodeSearch",
		address: hopUrlTemplate.replace( "%q", encodedQuery )
	} );

	search( encodedQuery );
} else {
	pagehop.getHops().push( {
		text: "CodeSearch: no query",
		address: hopDefaultUrl
	} );

	pagehop.finish( [ helpInfo ] );
}