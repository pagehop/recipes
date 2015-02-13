'use strict';

var should = require("should"),
	pathUtils = require("path");

var test = require("pagehop").test;

var pathToRecipe = pathUtils.resolve( pathUtils.join( __dirname, '../' ) );

describe("define-word recipe's pageLoop",function(){
	this.timeout( 10000 );
	before( function(done) {
		test.init( done );
	} );
	describe( "number of result pages to be parsed", function() {
		it( "parses 0 pages, if no query", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = null,
						options = null,
						max = 10,
						scrapeScript = "irrelevant",
						systemMeta = {},
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.$ = {
						getJSON: function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( [] );
									return {
										fail: function() {}
									};
								}
							};
						}
					};
				},
				function(urls, result) {
					should.exist( urls );
					should.exist( result );
					urls.length.should.equal( 0 );
					result.items.length.should.equal( 0 );
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
						systemMeta = {},
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.$ = {
						getJSON: function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( [] );
									return {
										fail: function() {}
									};
								}
							};
						}
					};
				},
				function(urls, result) {
					should.exist( urls );
					should.exist( result );
					urls.length.should.equal( 1 );
					result.items.length.should.equal( 0 );
					done();
				}
			);
		});
		it( "parses 1 pages, if maxCount is 500", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = null,
						max = 51,
						scrapeScript = "irrelevant",
						systemMeta = {},
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.$ = {
						getJSON: function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( [] );
									return {
										fail: function() {}
									};
								}
							};
						}
					};
				},
				function(urls, result) {
					should.exist( urls );
					should.exist( result );
					urls.length.should.equal( 1 );
					result.items.length.should.equal( 0 );
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
						max = 50,
						scrapeScript = "irrelevant",
						systemMeta = {},
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.$ = {
						getJSON: function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( [] );
									return {
										fail: function() {}
									};
								}
							};
						}
					};
				},
				function(urls, results) {
					should.exist( urls );

					results.hops.should.eql( [ {
						text: "DefineWord: no word",
						address: "https://wordnik.com"
					} ] );

					done();
				}
			);
		});
		it( "adds an item with address to the same search in wordnik.com", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "math",
						options = null,
						max = 50,
						scrapeScript = "irrelevant",
						systemMeta = {},
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.$ = {
						getJSON: function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( [] );
									return {
										fail: function() {}
									};
								}
							};
						}
					};
				},
				function(urls, results) {
					should.exist( urls );

					results.hops.should.eql( [ {
						text: "DefineWord",
						address: "https://wordnik.com/words/math"
					} ] );

					done();
				}
			);
		});
	} );
	describe( "urls of pages to be parsed", function() {
		it( "requests the correct urls", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "math",
						options = null,
						max = 50,
						scrapeScript = "irrelevant",
						systemMeta = {},
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.$ = {
						getJSON: function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( [] );
									return {
										fail: function() {}
									};
								}
							};
						}
					};
				},
				function(urls) {
					should.exist( urls );
					urls.should.eql( [
						"http://api.wordnik.com:80/v4/word.json/math/definitions?limit=50&includeRelated=true&sourceDictionaries=all&useCanonical=true&includeTags=false&api_key=1f34ec3909d55901340060df56a0fb5cc6e59e4ce1d8a83b1"
					] );
					done();
				}
			);
		});
	} );
	describe( "parsing of results", function() {
		it( "parses an empty set", function(done) {
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "expressions will always result in an empty set",
						options = null,
						max = 50,
						scrapeScript = "irrelevant",
						systemMeta = {},
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.$ = {
						getJSON: function() {
							return {
								done: function(func) {
									func( [] );
									return {
										fail: function() {}
									};
								}
							};
						}
					};
				},
				function(urls, results) {
					should.exist( urls );
					results.items.should.eql( [] );
					done();
				}
			);
		} );
		it( "parses actual results", function(done) {
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "expressions will always result in an empty set",
						options = null,
						max = 50,
						scrapeScript = "irrelevant",
						systemMeta = {},
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.$ = {
						getJSON: function() {
							return {
								done: function(func) {
									func( [
										{
											"textProns": [],
											"sourceDictionary": "ahd-legacy",
											"exampleUses": [],
											"relatedWords": [],
											"labels": [],
											"citations": [],
											"word": "math",
											"text": "Mathematics.",
											"sequence": "0",
											"score": 0.0,
											"partOfSpeech": "noun",
											"attributionText": "from The American Heritage® Dictionary of the English Language, 4th Edition"
										},
										{
											"textProns": [],
											"sourceDictionary": "wiktionary",
											"exampleUses": [],
											"relatedWords": [],
											"labels": [],
											"citations": [],
											"word": "math",
											"text": "A mowing; what is gathered from mowing.",
											"score": 0.0,
											"partOfSpeech": "noun",
											"attributionUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
											"attributionText": "from Wiktionary, Creative Commons Attribution/Share-Alike License"
										}
									] );
									return {
										fail: function() {}
									};
								}
							};
						}
					};
				},
				function(urls, results) {
					should.exist( urls );
					var item1 = results.items[ 0 ],
						item2 = results.items[ 1 ];

					item1.text.should.equal( "math - noun (ahd-legacy)" );
					item1.displayAddress.should.equal( "Mathematics." );
					item1.preview.should.containEql( [
						"<body>",
						"	<div class=\"main-container\">",
						"		<p class=\"def-source\"><i>from The American Heritage® Dictionary of the English Language, 4th Edition</i></p>",
						"		<h3>math - noun</h3>",
						"		<p>Mathematics.</p>",
						"	</div>",
						"</body>",
					].join( "\n" ) );

					item2.text.should.equal( "math - noun (wiktionary)" );
					item2.displayAddress.should.equal( "A mowing; what is gathered from mowing." );
					item2.preview.should.containEql( [
						"<body>",
						"	<div class=\"main-container\">",
						"		<p class=\"def-source\"><i>from Wiktionary, Creative Commons Attribution/Share-Alike License</i></p>",
						"		<h3>math - noun</h3>",
						"		<p>A mowing; what is gathered from mowing.</p>",
						"	</div>",
						"</body>",
					].join( "\n" ) );

					done();
				}
			);
		} );
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
						systemMeta = {},
						hops = [],
						pagehop = window.pagehop;

					pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.$ = {
						getJSON: function(url) {
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
						}
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