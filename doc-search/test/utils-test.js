'use strict';

var should = require("should"),
	utils = require("../src/utils");

describe("doc-search recipe's utils",function(){

	describe( "consts", function() {
		utils.RECIPE_DOC_URL.should.equal( "https://github.com/pagehop/recipes/blob/master/doc-search/README.md" );
	} );

	describe( "generateHelpResults(list)", function() {
		it( "outputs result items", function() {
			utils.generateHelpResults( [
				"all",
				"apache"
			] ).should.eql( [
				{
					text: "All",
					displayAddress: "Usage: doc all [query]",
					address: "https://github.com/pagehop/recipes/blob/master/doc-search/README.md"
				},
				{
					text: "Apache",
					displayAddress: "Usage: doc apache [query]",
					address: "https://github.com/pagehop/recipes/blob/master/doc-search/README.md"
				}
			] );
		} );
	} );

	describe( "validateResponse(error, response)", function() {
		it( "throws an error if error is defined", function(done) {
			var errorObject = {
				text: "Network error."
			};

			try {
				utils.validateResponse( errorObject );
			} catch(err) {
				should.exist( err );
				err.__data.should.eql( {
					text: "There was a problem, requesting results.",
					displayAddress: errorObject.text
				} );
				done();
			}
		} );
		it( "throws an error if no response", function() {
			should( function() {
				utils.validateResponse();
			} ).throw();
			should( function() {
				utils.validateResponse( null, {} );
			} ).throw();
			should( function() {
				utils.validateResponse( null, { body: {} } );
			} ).throw();
		} );
		it( "throws an error if no total prop", function() {
			should( function() {
				utils.validateResponse( null, { body: {
					page: 0,
					results: []
				} } );
			} ).throw();
		} );
		it( "throws an error if no page prop", function() {
			should( function() {
				utils.validateResponse( null, { body: {
					total: 0,
					results: []
				} } );
			} ).throw();
		} );
		it( "throws an error if no results prop", function() {
			should( function() {
				utils.validateResponse( null, { body: {
					total: 0,
					page: 0
				} } );
			} ).throw();
		} );
		it( "throws an error if results prop is not an array", function() {
			should( function() {
				utils.validateResponse( null, { body: {
					total: 0,
					page: 0,
					results: 0
				} } );
			} ).throw();
		} );
		it( "doesn't throw an error if no search results", function() {
			should( function() {
				utils.validateResponse( null, { body: {
					total: 0,
					page: 0,
					results: []
				} } );
			} ).not.throw();
		} );
	} );

	describe( "parseResults(rawItems)", function() {
		it( "if present, it uses the type prop in the text", function() {
			var rawItem = {
				"synopsis": " array explode ( string $delimiter , string $string [, int $limit ] ) ",
				"displayname": "PHP",
				"name": "explode",
				"url": "http://www.php.net/manual/en/function.explode.php",
				"type": "php",
				"icon": "php.ico",
				"namespace": "",
				"description": "(PHP 4, PHP 5) explode — Split a string by string"
			};
			utils.parseResults( [ rawItem ] ).should.eql( [ {
				text: rawItem.name + " (" + rawItem.type + ")",
				address: rawItem.url,
				displayAddress: rawItem.description
			} ] );
		} );
		it( "if not present, it doesn't use the type prop in the text", function() {
			var rawItem = {
				"synopsis": " array explode ( string $delimiter , string $string [, int $limit ] ) ",
				"displayname": "PHP",
				"name": "explode",
				"url": "http://www.php.net/manual/en/function.explode.php",
				"type": null,
				"icon": "php.ico",
				"namespace": "",
				"description": "(PHP 4, PHP 5) explode — Split a string by string"
			};
			utils.parseResults( [ rawItem ] ).should.eql( [ {
				text: rawItem.name,
				address: rawItem.url,
				displayAddress: rawItem.description
			} ] );
		} );
	} );

	describe( "combineResults(resultsArray)", function() {
		it( "successfully combines when items are missing from the array", function() {
			var resultsArray = [];

			resultsArray[0] = [ 1, 2, 3, 4 ];
			resultsArray[4] = [ 5, 6, 7, 8 ];

			utils.combineResults( resultsArray ).should.eql( [ 1, 2, 3, 4, 5, 6, 7, 8 ] );
		} );
		it( "successfully combines array with all items present", function() {
			var resultsArray = [];

			resultsArray[0] = [ 1, 2, 3, 4 ];
			resultsArray[1] = [ 5, 6, 7, 8 ];

			utils.combineResults( resultsArray ).should.eql( [ 1, 2, 3, 4, 5, 6, 7, 8 ] );
		} );
	} );

});