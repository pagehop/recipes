'use strict';

var networkIssueInfo = {
		text: "There was a problem, requesting results."
	},
	badServerResponseInfo = {
		text: "Bad Server Response",
		displayAddress: "searchcode.com returned an empty response."
	};

var utils = {

	RECIPE_DOC_URL: "https://github.com/pagehop/recipes/blob/master/doc-search/README.md",

	generateHelpResults: function(list) {
		var self = this,
			result = [];

		for ( var i = 0; i < list.length; i++ ) {
			var text = list[ i ],
				parts = text.match( /^(.)(.*)$/ ).slice( 1 );
			result.push( {
				text: parts[ 0 ].toUpperCase() + parts[ 1 ],
				displayAddress: "Usage: doc " + text + " [query]",
				address: self.RECIPE_DOC_URL
			} );
		}

		return result;
	},

	validateResponse: function(error, response) {
		var throwError = function(error, dataObj) {
			error.__data = dataObj;
			throw error;
		};

		if ( error ) {
			throwError(
				new Error(),
				{
					text: networkIssueInfo.text,
					displayAddress: error.text
				}
			);
		} else {
			error = new Error();

			if ( !response || !response.body ) {
				throwError( error, badServerResponseInfo );
			}

			var body = response.body,
				total = body.total,
				page = body.page,
				results = body.results;

			if (
				( !total && total !== 0 ) ||
				( !page && page !== 0 ) ||
				( !results || !( results instanceof Array ) )
			){
				throwError( error, badServerResponseInfo );
			}
		}
	},

	parseResults: function(rawItems) {
		var result = [];

		for ( var i = 0; i < rawItems.length; i++ ) {
			var rawItem = rawItems[ i ],
				text = rawItem.name,
				type = rawItem.type;

			result.push( {
				text: type ? text + " (" + type + ")" : text,
				address: rawItem.url,
				displayAddress: rawItem.description
			} );
		}
		return result;
	},

	combineResults: function(resultsArray) {
		var result = [];

		for ( var i = 0; i < resultsArray.length; i++ ) {
			var page = resultsArray[ i ];

			if ( page ) {
				result = result.concat( page );
			}
		}

		return result;
	}

};

module.exports = utils;