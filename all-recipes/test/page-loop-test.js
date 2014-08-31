'use strict';

var should = require("should"),
	pathUtils = require("path");

var test = require("pagehop").test;

var pathToRecipe = pathUtils.resolve( pathUtils.join( __dirname, '../' ) );

describe("all-recipes recipe's pageLoop",function(){
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
						systemMeta = { recipes: [
							{
								"id": "GithubSearch",
								"description": "Best Github recipe ever",
								"version": "0.1.0",
								"homepage": "https://github.com/nicroto/pagehop-github-recipe",
								"options": [
									{
										"description": "Search for repos.",
										"keyword": ":r"
									},
									{
										"description": "Search for users.",
										"keyword": ":u"
									}
								]
							},
							{
								"id": "GoogleSearch",
								"description": "Best Google recipe ever",
								"version": "0.2.0",
								"homepage": "https://github.com/nicroto/pagehop-google-recipe",
								"options": []
							}
						] };
					window.pagehop.init( query, options, max, scrapeScript, systemMeta );
				},
				function(urls, results) {
					should.exist( urls );
					results.should.eql( [
							{
								text: "GithubSearch",
								displayAddress: "v0.1.0 | Best Github recipe ever",
								tooltip: [
									"Options:",
									"	:r - Search for repos.",
									"	:u - Search for users."
								].join( "\n" ),
								address: "https://github.com/nicroto/pagehop-github-recipe"
							},
							{
								text: "GoogleSearch",
								displayAddress: "v0.2.0 | Best Google recipe ever",
								tooltip: "https://github.com/nicroto/pagehop-google-recipe",
								address: "https://github.com/nicroto/pagehop-google-recipe"
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