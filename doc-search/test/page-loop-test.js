/* jshint -W098 */

'use strict';

var should = require("should"),
	pathUtils = require("path");

var test = require("pagehop").test;

var pathToRecipe = pathUtils.resolve( pathUtils.join( __dirname, '../' ) );

describe("doc-search recipe's pageLoop",function(){
	this.timeout( 10000 );
	before( function(done) {
		test.init( done );
	} );
	describe( "help", function() {
		it( "shows help pointing to recipe documentation when no query", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = null,
						options = null,
						max = 100,
						scrapeScript = "irrelevant",
						systemMeta = null;
					window.pagehop.init( query, options, max, scrapeScript, systemMeta );
				},
				function(urls, results) {
					should.exist( urls );
					results.should.eql( [
						{
							text: "Usage: doc [lang/framework/tool] [query]",
							displayAddress: "Example: doc php explode",
							address: "https://github.com/pagehop/recipes/blob/master/doc-search/README.md"
						}
					] );
					done();
				}
			);
		});
		it( "option :all will show all available sources", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = null,
						options = [ ":all" ],
						max = 100,
						scrapeScript = "irrelevant",
						systemMeta = null;
					window.pagehop.init( query, options, max, scrapeScript, systemMeta );
				},
				function(urls, results) {
					should.exist( urls );
					results.length.should.equal( 38 );
					done();
				}
			);
		});
	} );
	describe( "errors", function() {
		it( "notifies the user about a network issue", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = null,
						max = 100,
						scrapeScript = "irrelevant",
						systemMeta = null;
					window.pagehop.init( query, options, max, scrapeScript, systemMeta );
					window.request = { get: function(url) {
						return {
							end: function(callback) {
								var error = {
									text: "custom error"
								};
								callback( error );
							}
						};
					} };
				},
				function(urls, results) {
					should.exist( urls );
					results.should.eql( [ {
						text: "There was a problem, requesting results.",
						displayAddress: "custom error"
					} ] );
					done();
				}
			);
		});
		it( "notifies the user of an empty response on no-error-no-response situation", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = null,
						max = 100,
						scrapeScript = "irrelevant",
						systemMeta = null;
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
						text: "Bad Server Response",
						displayAddress: "searchcode.com returned an empty response."
					} ] );
					done();
				}
			);
		});
		it( "notifies the user of an empty response, if response without body property", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = null,
						max = 100,
						scrapeScript = "irrelevant",
						systemMeta = null;
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
						text: "Bad Server Response",
						displayAddress: "searchcode.com returned an empty response."
					} ] );
					done();
				}
			);
		});
	} );
	describe( "requested urls", function() {
		it( "requests only first page if no results", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = null,
						max = 100,
						scrapeScript = "irrelevant",
						systemMeta = null;
					window.pagehop.init( query, options, max, scrapeScript, systemMeta );
					window.request = { get: function(url) {
						window.boxApi.emitEvent( "scrape", url );
						return {
							end: function(callback) {
								callback( null, {
									body: {
										"matchterm": "irrelevant",
										"previouspage": null,
										"searchterm": "irrelevant",
										"query": "irrelevant",
										"total": 0,
										"page": 0,
										"nextpage": 1,
										"results": []
									}
								} );
							}
						};
					} };
				},
				function(urls, results) {
					urls.should.eql( [ "https://searchcode.com/api/search_IV/?q=irrelevant&p=0" ] );
					results.should.eql( [ {
						text: "No results found."
					} ] );
					done();
				}
			);
		});
		it( "requests 2 pages, if maxCount=100, total=16", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = null,
						max = 100,
						scrapeScript = "irrelevant",
						systemMeta = null,
						responses = [
							{
								body: {
									"matchterm": "irrelevant",
									"previouspage": null,
									"searchterm": "irrelevant",
									"query": "irrelevant",
									"total": 16,
									"page": 0,
									"nextpage": 1,
									"results": []
								}
							},
							{
								body: {
									"matchterm": "irrelevant",
									"previouspage": 0,
									"searchterm": "irrelevant",
									"query": "irrelevant",
									"total": 16,
									"page": 1,
									"nextpage": 2,
									"results": []
								}
							}
						],
						responsesCount = 0;
					window.pagehop.init( query, options, max, scrapeScript, systemMeta );
					window.request = { get: function(url) {
						window.boxApi.emitEvent( "scrape", url );
						return {
							end: function(callback) {
								callback( null, responses[ responsesCount++ ] );
							}
						};
					} };
				},
				function(urls, results) {
					urls.should.eql( [
						"https://searchcode.com/api/search_IV/?q=irrelevant&p=0",
						"https://searchcode.com/api/search_IV/?q=irrelevant&p=1"
					] );
					results.should.eql( [] );
					done();
				}
			);
		});
		it( "requests 2 pages, if maxCount=16, total=100", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = null,
						max = 16,
						scrapeScript = "irrelevant",
						systemMeta = null,
						responses = [
							{
								body: {
									"matchterm": "irrelevant",
									"previouspage": null,
									"searchterm": "irrelevant",
									"query": "irrelevant",
									"total": 100,
									"page": 0,
									"nextpage": 1,
									"results": []
								}
							},
							{
								body: {
									"matchterm": "irrelevant",
									"previouspage": 0,
									"searchterm": "irrelevant",
									"query": "irrelevant",
									"total": 100,
									"page": 1,
									"nextpage": 2,
									"results": []
								}
							}
						],
						responsesCount = 0;
					window.pagehop.init( query, options, max, scrapeScript, systemMeta );
					window.request = { get: function(url) {
						window.boxApi.emitEvent( "scrape", url );
						return {
							end: function(callback) {
								callback( null, responses[ responsesCount++ ] );
							}
						};
					} };
				},
				function(urls, results) {
					urls.should.eql( [
						"https://searchcode.com/api/search_IV/?q=irrelevant&p=0",
						"https://searchcode.com/api/search_IV/?q=irrelevant&p=1"
					] );
					results.should.eql( [] );
					done();
				}
			);
		});
	} );
	describe( "successfull complete", function() {
		it( "1 page 2 results", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = null,
						max = 16,
						scrapeScript = "irrelevant",
						systemMeta = null,
						responses = [
							{
								body: {
									"matchterm": "irrelevant",
									"previouspage": null,
									"searchterm": "irrelevant",
									"query": "irrelevant",
									"total": 2,
									"page": 0,
									"nextpage": 1,
									"results": [
										{
											"synopsis": " array explode ( string $delimiter , string $string [, int $limit ] ) ",
											"displayname": "PHP",
											"name": "explode",
											"url": "http://www.php.net/manual/en/function.explode.php",
											"type": "php",
											"icon": "php.ico",
											"namespace": "",
											"description": "(PHP 4, PHP 5) explode — Split a string by string"
										},
										{
											"synopsis": " array explode ( string $delimiter , string $string [, int $limit ] ) ",
											"displayname": "PHP",
											"name": "explode",
											"url": "http://www.php.net/manual/en/function.explode.php",
											"type": null,
											"icon": "php.ico",
											"namespace": "",
											"description": "(PHP 4, PHP 5) explode — Split a string by string"
										}
									]
								}
							}
						],
						responsesCount = 0;
					window.pagehop.init( query, options, max, scrapeScript, systemMeta );
					window.request = { get: function(url) {
						window.boxApi.emitEvent( "scrape", url );
						return {
							end: function(callback) {
								callback( null, responses[ responsesCount++ ] );
							}
						};
					} };
				},
				function(urls, results) {
					urls.should.eql( [
						"https://searchcode.com/api/search_IV/?q=irrelevant&p=0"
					] );
					results.should.eql( [
						{
							text: "explode (php)",
							address: "http://www.php.net/manual/en/function.explode.php",
							displayAddress: "(PHP 4, PHP 5) explode — Split a string by string"
						},
						{
							text: "explode",
							address: "http://www.php.net/manual/en/function.explode.php",
							displayAddress: "(PHP 4, PHP 5) explode — Split a string by string"
						}
					] );
					done();
				}
			);
		});
		it( "2 pages 2 results", function(done){
			// IMPORTANT:
			//    We don't make sure that every page has 10 items (if there is a next page)
			//    This is why we can simulate 2 pages with total of 2 items.
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = null,
						max = 16,
						scrapeScript = "irrelevant",
						systemMeta = null,
						responses = [
							{
								body: {
									"matchterm": "irrelevant",
									"previouspage": null,
									"searchterm": "irrelevant",
									"query": "irrelevant",
									"total": 20,
									"page": 0,
									"nextpage": 1,
									"results": [
										{
											"synopsis": " array explode ( string $delimiter , string $string [, int $limit ] ) ",
											"displayname": "PHP",
											"name": "explode",
											"url": "http://www.php.net/manual/en/function.explode.php",
											"type": "php",
											"icon": "php.ico",
											"namespace": "",
											"description": "(PHP 4, PHP 5) explode — Split a string by string"
										}
									]
								}
							},
							{
								body: {
									"matchterm": "irrelevant",
									"previouspage": 0,
									"searchterm": "irrelevant",
									"query": "irrelevant",
									"total": 20,
									"page": 1,
									"nextpage": 2,
									"results": [
										{
											"synopsis": " array explode ( string $delimiter , string $string [, int $limit ] ) ",
											"displayname": "PHP",
											"name": "explode",
											"url": "http://www.php.net/manual/en/function.explode.php",
											"type": null,
											"icon": "php.ico",
											"namespace": "",
											"description": "(PHP 4, PHP 5) explode — Split a string by string"
										}
									]
								}
							}
						],
						responsesCount = 0;
					window.pagehop.init( query, options, max, scrapeScript, systemMeta );
					window.request = { get: function(url) {
						window.boxApi.emitEvent( "scrape", url );
						return {
							end: function(callback) {
								callback( null, responses[ responsesCount++ ] );
							}
						};
					} };
				},
				function(urls, results) {
					urls.should.eql( [
						"https://searchcode.com/api/search_IV/?q=irrelevant&p=0",
						"https://searchcode.com/api/search_IV/?q=irrelevant&p=1"
					] );
					results.should.eql( [
						{
							text: "explode (php)",
							address: "http://www.php.net/manual/en/function.explode.php",
							displayAddress: "(PHP 4, PHP 5) explode — Split a string by string"
						},
						{
							text: "explode",
							address: "http://www.php.net/manual/en/function.explode.php",
							displayAddress: "(PHP 4, PHP 5) explode — Split a string by string"
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