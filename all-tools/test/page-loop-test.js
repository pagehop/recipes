'use strict';

var should = require("should"),
	pathUtils = require("path");

var test = require("pagehop").test;

var pathToRecipe = pathUtils.resolve( pathUtils.join( __dirname, '../' ) );

describe("all-tools recipe's pageLoop",function(){
	this.timeout( 10000 );
	before( function(done) {
		test.init( done );
	} );
	describe( "parsing meta data", function() {
		it( "successfully parses meta when no recipes", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = null,
						max = 200,
						scrapeScript = "irrelevant",
						systemMeta = { recipes: [] };
					window.pagehop.init( query, options, max, scrapeScript, systemMeta );
				},
				function(urls, results) {
					should.exist( urls );
					results.should.eql( [] );
					done();
				}
			);
		});
		it( "successfully parses meta when recipes are present", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = null,
						max = 200,
						scrapeScript = "irrelevant",
						systemMeta = { tools: [
							{
								"id": "FuzzySearch",
								"description": "Tool for the pagehop productivity tool which allows fuzzy search in results.",
								"version": "0.1.0",
								"homepage": "https://github.com/nicroto/pagehop-fuzzy-tool",
								"keyword": ":f"
							},
							{
								"id": "ToAddressList",
								"description": "Tool for the pagehop productivity tool which converts search results to list of addresses (urls).",
								"version": "0.2.0",
								"homepage": "https://github.com/nicroto/pagehop-to-address-list-tool",
								"keyword": ":a"
							}
						] };
					window.pagehop.init( query, options, max, scrapeScript, systemMeta );
				},
				function(urls, results) {
					should.exist( urls );
					results.should.eql( [
							{
								text: "FuzzySearch (:f)",
								displayAddress: "v0.1.0 | Tool for the pagehop productivity tool which allows fuzzy search in results.",
								tooltip: "https://github.com/nicroto/pagehop-fuzzy-tool",
								address: "https://github.com/nicroto/pagehop-fuzzy-tool"
							},
							{
								text: "ToAddressList (:a)",
								displayAddress: "v0.2.0 | Tool for the pagehop productivity tool which converts search results to list of addresses (urls).",
								tooltip: "https://github.com/nicroto/pagehop-to-address-list-tool",
								address: "https://github.com/nicroto/pagehop-to-address-list-tool"
							}
					] );
					done();
				}
			);
		});
	} );
	after( function(done) {
		test.finalize( done );
	} );
});