/* jshint -W098 */

'use strict';

var should = require("should"),
	pathUtils = require("path");

var test = require("pagehop").test;

var pathToRecipe = pathUtils.resolve( pathUtils.join( __dirname, '../' ) );

describe("system recipe's pageLoop",function(){
	this.timeout( 10000 );
	before( function(done) {
		test.init( done );
	} );
	describe( "parsing meta data", function() {
		it( "shows help results pointing to docs when no options are used", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = null,
						max = 200,
						scrapeScript = "irrelevant",
						systemMeta = { recipes: [], tools: [] };
					window.pagehop.init( query, options, max, scrapeScript, systemMeta );
				},
				function(urls, results) {
					should.exist( urls );
					results.should.eql( [
						{
							text: "To list all recipes:",
							displayAddress: "sys :r",
							address: "https://github.com/pagehop/recipes/blob/master/system/README.md"
						},
						{
							text: "To list all tools:",
							displayAddress: "sys :r",
							address: "https://github.com/pagehop/recipes/blob/master/system/README.md"
						},
						{
							text: "To check for an update:",
							displayAddress: "sys :u",
							address: "https://github.com/pagehop/recipes/blob/master/system/README.md"
						}
					] );
					done();
				}
			);
		});
		it( "shows all available recipes", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = [ ":r" ],
						max = 200,
						scrapeScript = "irrelevant",
						systemMeta = {
							recipes: [
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
							],
							tools: []
						};
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
		it( "shows all available tools", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = [ ":t" ],
						max = 200,
						scrapeScript = "irrelevant",
						systemMeta = {
							recipes: [],
							tools: [
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
							]
						};
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
		it( "says 'no updates available' on network issues", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = [ ":u" ],
						max = 200,
						scrapeScript = "irrelevant",
						systemMeta = {
							version: "1.0.0",
							recipes: [],
							tools: []
						};
					window.pagehop.init( query, options, max, scrapeScript, systemMeta );
					window.request = { get: function(url) {
						return {
							end: function(callback) {
								var error = true;
								callback( error );
							}
						};
					} };
				},
				function(urls, results) {
					should.exist( urls );
					results.should.eql( [ {
						text: "Pagehop is up to date!",
						displayAddress: "ver. 1.0.0 is the latest one available."
					} ] );
					done();
				}
			);
		});
		it( "says 'no updates available' on no-error-no-response situation", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = [ ":u" ],
						max = 200,
						scrapeScript = "irrelevant",
						systemMeta = {
							version: "1.0.0",
							recipes: [],
							tools: []
						};
					window.pagehop.init( query, options, max, scrapeScript, systemMeta );
					window.request = { get: function(url) {
						return {
							end: function(callback) {
								callback();
							}
						};
					} };
				},
				function(urls, results) {
					should.exist( urls );
					results.should.eql( [ {
						text: "Pagehop is up to date!",
						displayAddress: "ver. 1.0.0 is the latest one available."
					} ] );
					done();
				}
			);
		});
		it( "says 'no updates available' if response doesn't have a body property", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = [ ":u" ],
						max = 200,
						scrapeScript = "irrelevant",
						systemMeta = {
							version: "1.0.0",
							recipes: [],
							tools: []
						};
					window.pagehop.init( query, options, max, scrapeScript, systemMeta );
					window.request = { get: function(url) {
						return {
							end: function(callback) {
								callback( null, {} );
							}
						};
					} };
				},
				function(urls, results) {
					should.exist( urls );
					results.should.eql( [ {
						text: "Pagehop is up to date!",
						displayAddress: "ver. 1.0.0 is the latest one available."
					} ] );
					done();
				}
			);
		});
		it( "says 'no updates available' if response.body doesn't have a version property", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = [ ":u" ],
						max = 200,
						scrapeScript = "irrelevant",
						systemMeta = {
							version: "1.0.0",
							recipes: [],
							tools: []
						};
					window.pagehop.init( query, options, max, scrapeScript, systemMeta );
					window.request = { get: function(url) {
						return {
							end: function(callback) {
								callback( null, { body: {} } );
							}
						};
					} };
				},
				function(urls, results) {
					should.exist( urls );
					results.should.eql( [ {
						text: "Pagehop is up to date!",
						displayAddress: "ver. 1.0.0 is the latest one available."
					} ] );
					done();
				}
			);
		});
		it( "says 'no updates available' if result's version property isn't a valid version", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = [ ":u" ],
						max = 200,
						scrapeScript = "irrelevant",
						systemMeta = {
							version: "1.0.0",
							recipes: [],
							tools: []
						};
					window.pagehop.init( query, options, max, scrapeScript, systemMeta );
					window.request = { get: function(url) {
						return {
							end: function(callback) {
								callback( null, { body: { version: "invalid" } } );
							}
						};
					} };
				},
				function(urls, results) {
					should.exist( urls );
					results.should.eql( [ {
						text: "Pagehop is up to date!",
						displayAddress: "ver. 1.0.0 is the latest one available."
					} ] );
					done();
				}
			);
		});
		it( "says 'no updates available' when online-available version is same as installed", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = [ ":u" ],
						max = 200,
						scrapeScript = "irrelevant",
						systemMeta = {
							version: "1.0.0",
							recipes: [],
							tools: []
						};
					window.pagehop.init( query, options, max, scrapeScript, systemMeta );
					window.request = { get: function(url) {
						return {
							end: function(callback) {
								callback( null, { body: { version: "1.0.0" } } );
							}
						};
					} };
				},
				function(urls, results) {
					should.exist( urls );
					results.should.eql( [ {
						text: "Pagehop is up to date!",
						displayAddress: "ver. 1.0.0 is the latest one available."
					} ] );
					done();
				}
			);
		});
		it( "says 'update is available' when online-available version is newer than installed", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = [ ":u" ],
						max = 200,
						scrapeScript = "irrelevant",
						systemMeta = {
							version: "1.0.0",
							recipes: [],
							tools: []
						};
					window.pagehop.init( query, options, max, scrapeScript, systemMeta );
					window.request = { get: function(url) {
						return {
							end: function(callback) {
								callback( null, { body: { version: "1.0.1" } } );
							}
						};
					} };
				},
				function(urls, results) {
					should.exist( urls );
					results.should.eql( [ {
						text: "Update is available!",
						displayAddress: "Get ver. 1.0.1.",
						address: "https://pagehopapp.com/download"
					} ] );
					done();
				}
			);
		});
	} );
	after( function(done) {
		test.finalize( done );
	} );
});