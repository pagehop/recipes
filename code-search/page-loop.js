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
	helpInfo = {
		text: "Usage: code [query]",
		displayAddress: "Example: code System.Linq source:Bitbucket lang:C# repo:bvcms",
		address: utils.RECIPE_DOC_URL
	};

var search = function() {

	var url = urlTemplate
			.replace( "%q", encodeURIComponent( query ) )
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
	search();
} else {
	pagehop.finish( [ helpInfo ] );
}