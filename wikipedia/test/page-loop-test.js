'use strict';

var should = require("should"),
	pathUtils = require("path");

var test = require("pagehop").test;

var pathToRecipe = pathUtils.resolve( pathUtils.join( __dirname, '../' ) );

describe("wikipedia recipe's pageLoop",function(){
	this.timeout( 10000 );
	before( function(done) {
		test.init( done );
	} );
	describe( "number of pages to be parsed", function() {
		it( "parses 0 pages, if no query", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = null,
						options = null,
						max = 10,
						scrapeScript = "irrelevant",
						systemMeta = null,
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.$ = function(jQuery) {
						jQuery.getJSON = function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( { query: { search: [] } } );
									return {
										fail: function() {}
									};
								}
							};
						};
						return jQuery;
					};
				},
				function(urls, results) {
					should.exist( urls );
					should.exist( results );
					urls.length.should.equal( 0 );
					results.items.length.should.equal( 0 );
					done();
				}
			);
		});
		it( "parses 1 page, if maxCount is 10", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = null,
						max = 10,
						scrapeScript = "irrelevant",
						systemMeta = null,
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.$ = function(jQuery) {
						jQuery.getJSON = function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( { query: { search: [] } } );
									return {
										fail: function() {}
									};
								}
							};
						};
						return jQuery;
					};
				},
				function(urls, results) {
					should.exist( urls );
					should.exist( results );
					urls.length.should.equal( 1 );
					results.items.length.should.equal( 0 );
					done();
				}
			);
		});
		it( "parses 2 pages, if maxCount is 51", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = null,
						max = 51,
						scrapeScript = "irrelevant",
						systemMeta = null,
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.$ = function(jQuery) {
						jQuery.getJSON = function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( { query: { search: [] } } );
									return {
										fail: function() {}
									};
								}
							};
						};
						return jQuery;
					};
				},
				function(urls, results) {
					should.exist( urls );
					should.exist( results );
					urls.length.should.equal( 2 );
					results.items.length.should.equal( 0 );
					done();
				}
			);
		});
		it( "parses 2 pages, if maxCount is 100", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = null,
						max = 100,
						scrapeScript = "irrelevant",
						systemMeta = null,
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.$ = function(jQuery) {
						jQuery.getJSON = function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( { query: { search: [] } } );
									return {
										fail: function() {}
									};
								}
							};
						};
						return jQuery;
					};
				},
				function(urls, results) {
					should.exist( urls );
					should.exist( results );
					urls.length.should.equal( 2 );
					results.items.length.should.equal( 0 );
					done();
				}
			);
		});
	} );
	describe( "hops array changes", function() {
		it( "adds an item with default url if no query", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = null,
						options = null,
						max = 10,
						scrapeScript = "irrelevant",
						systemMeta = null,
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.$ = function(jQuery) {
						jQuery.getJSON = function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( { query: { search: [] } } );
									return {
										fail: function() {}
									};
								}
							};
						};
						return jQuery;
					};
				},
				function(urls, results) {
					should.exist( urls );
					results.hops.should.eql( [ {
						text: "Wikipedia: no query",
						address: "http://en.wikipedia.org/"
					} ] );
					done();
				}
			);
		});
		it( "adds an item with address pointing to the same search on the site", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "some",
						options = null,
						max = 10,
						scrapeScript = "irrelevant",
						systemMeta = null,
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.$ = function(jQuery) {
						jQuery.getJSON = function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( { query: { search: [] } } );
									return {
										fail: function() {}
									};
								}
							};
						};
						return jQuery;
					};
				},
				function(urls, results) {
					should.exist( urls );
					results.hops.should.eql( [ {
						text: "Wikipedia",
						address: "http://en.wikipedia.org/wiki/some"
					} ] );
					done();
				}
			);
		});
	} );
	describe( "urls of pages to be scraped", function() {
		it( "scrapes the correct urls", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "math",
						options = null,
						max = 51,
						scrapeScript = "irrelevant",
						systemMeta = null,
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.$ = function(jQuery) {
						jQuery.getJSON = function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( { query: { search: [] } } );
									return {
										fail: function() {}
									};
								}
							};
						};
						return jQuery;
					};
				},
				function(urls) {
					should.exist( urls );
					urls.should.eql( [
						"https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=math&srlimit=50&sroffset=0&srprop=snippet&format=json",
						"https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=math&srlimit=1&sroffset=50&srprop=snippet&format=json"
					] );
					done();
				}
			);
		});
	} );
	describe( "result parsing", function() {
		it( "parses empty set", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "math",
						options = null,
						max = 2,
						scrapeScript = "irrelevant",
						systemMeta = null,
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.$ = function(jQuery) {
						jQuery.getJSON = function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( {
										"query":
										{
											"searchinfo":
											{
												"totalhits": 0
											},
											"search": []
										}
									} );
									return {
										fail: function() {}
									};
								}
							};
						};
						return jQuery;
					};
				},
				function(urls, results) {
					should.exist( urls );
					results.items.should.eql( [] );
					done();
				}
			);
		});
		it( "parses actual results", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "math",
						options = null,
						max = 2,
						scrapeScript = "irrelevant",
						systemMeta = null,
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.$ = function(jQuery) {
						jQuery.getJSON = function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( {
										"query-continue":
										{
											"search":
											{
												"sroffset": 2
											}
										},
										"query":
										{
											"searchinfo":
											{
												"totalhits": 31403
											},
											"search": [
												{
													"ns": 0,
													"title": "Mathematics",
													"snippet": "It is often shortened to <span class='searchmatch'>maths</span> or, in English-speaking North America, <span class='searchmatch'>math</span>. Definitions of mathematics: Definitions of mathematics <b>...</b> "
												},
												{
													"ns": 0,
													"title": "Factorial",
													"snippet": "References : de/<span class='searchmatch'>math/</span>factorial/hadamard/HadamardFactorial. pdf | year 1894 | language French first Srinivasa | last Ramanujan | title The lost  <b>...</b> "
												}
											]
										}
									} );
									return {
										fail: function() {}
									};
								}
							};
						};
						return jQuery;
					};
				},
				function(urls, results) {
					should.exist( urls );
					results.items.should.eql( [
						{
							"text": "Mathematics",
							"address": "http://en.wikipedia.org/wiki/Mathematics",
							"displayAddress": "It is often shortened to maths or, in English-speaking North America, math. Defi..."
						},
						{
							"text": "Factorial",
							"address": "http://en.wikipedia.org/wiki/Factorial",
							"displayAddress": "References : de/math/factorial/hadamard/HadamardFactorial. pdf | year 1894 | lan..."
						}
					] );
					done();
				}
			);
		});
	} );
	describe( "error handling", function() {
		it( "finishes with error", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = null,
						max = 200,
						scrapeScript = "irrelevant",
						systemMeta = null,
						hops = [],
						pagehop = window.pagehop;

					pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.$ = function(jQuery) {
						jQuery.getJSON = function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function() {
									return {
										fail: function(callback) {
											callback( null, null, "blowup" );
										}
									};
								}
							};
						};
						return jQuery;
					};
				},
				function(error) {
					should.exist( error );
					error.should.equal( "blowup" );
					done();
				}
			);
		});
	} );
	after( function(done) {
		test.finalize( done );
	} );
});