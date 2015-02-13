'use strict';

var should = require("should"),
	pathUtils = require("path");

var test = require("pagehop").test;

var pathToRecipe = pathUtils.resolve( pathUtils.join( __dirname, '../' ) );

describe("npm-search recipe's pageLoop",function(){
	this.timeout( 10000 );
	before( function(done) {
		test.init( done );
	} );
	describe( "number of pages to be scraped", function() {
		it( "scrapes 0 pages, if no query", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = null,
						options = null,
						max = 50,
						scrapeScript = "irrelevant",
						systemMeta = null,
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.$ = {
						getJSON: function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( {
										results:[]
									} );
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
					should.exist( results );
					urls.length.should.equal( 0 );
					results.items.length.should.equal( 0 );
					done();
				}
			);
		});
		it( "scrapes 1 page, if maxCount is 500", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = null,
						max = 500,
						scrapeScript = "irrelevant",
						systemMeta = null,
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.$ = {
						getJSON: function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( {
										results:[]
									} );
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
					should.exist( results );
					urls.length.should.equal( 1 );
					results.items.length.should.equal( 0 );
					done();
				}
			);
		});
	} );
	describe( "hops array changes", function() {
		it( "adds an item with default url, if no query", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = null,
						options = null,
						max = 50,
						scrapeScript = "irrelevant",
						systemMeta = null,
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.$ = {
						getJSON: function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( {
										results:[]
									} );
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
						text: "NPMSearch: no query",
						address: "http://npmsearch.com/"
					} ] );
					done();
				}
			);
		});
		it( "adds an item with url pointing to the same search on a site", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "some",
						options = null,
						max = 500,
						scrapeScript = "irrelevant",
						systemMeta = null,
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.$ = {
						getJSON: function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( {
										results:[]
									} );
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
						text: "NPMSearch",
						address: "http://npmsearch.com/?q=some"
					} ] );
					done();
				}
			);
		});
		it( "adds an item notifying the user of the used option :h", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "some",
						options = [ ":h" ],
						max = 500,
						scrapeScript = "irrelevant",
						systemMeta = null,
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.$ = {
						getJSON: function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( {
										results:[]
									} );
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
						text: "NPMSearch with :h (homepage)",
						address: "http://npmsearch.com/?q=some"
					} ] );
					done();
				}
			);
		});
	} );
	describe( "api urls to be called", function() {
		it( "makes call for data without homepage url", function(done){
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
					window.$ = {
						getJSON: function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( {
										results:[]
									} );
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
						"http://npmsearch.com/query?pretty=true&fl=name,description,version,author,license&rows=51&sort=rating+desc&q=math"
					] );
					done();
				}
			);
		});
		it( "makes call for data with homepage url", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "math",
						options = [ ":h" ],
						max = 51,
						scrapeScript = "irrelevant",
						systemMeta = null,
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.$ = {
						getJSON: function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( {
										results:[]
									} );
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
						"http://npmsearch.com/query?pretty=true&fl=name,description,homepage,version,author,license&rows=51&sort=rating+desc&q=math"
					] );
					done();
				}
			);
		});
	} );
	describe( "result parsing", function() {
		it( "parses items with homepage addresses", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "math",
						options = [ ":h" ],
						max = 51,
						scrapeScript = "irrelevant",
						systemMeta = null,
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.$ = {
						getJSON: function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( {
										results:[
											{
												"author": "bergie",
												"license": [],
												"description": "Flow-Based Programming environment for JavaScript",
												"homepage": "http://noflojs.org/",
												"name": "noflo",
												"version": "0.5.3"
											},
											{
												"author": "stefanpenner",
												"license": [
													"MIT"
												],
												"description": "A lightweight library that provides tools for organizing asynchronous code",
												"homepage": "https://github.com/tildeio/rsvp.js",
												"name": "rsvp",
												"version": "3.0.8"
											}
										]
									} );
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
					urls.should.eql( [
						"http://npmsearch.com/query?pretty=true&fl=name,description,homepage,version,author,license&rows=51&sort=rating+desc&q=math"
					] );
					results.items.should.eql( [
						{
							text: "noflo (Flow-Based Programming environment for JavaScript)",
							displayText: "<b>noflo</b> (Flow-Based Programming environment for JavaScript)",
							address: "http://noflojs.org/",
							displayAddress: "by bergie | 0.5.3 | no-license"
						},
						{
							text: "rsvp (A lightweight library that provides tools for organizing asynchronous code)",
							displayText: "<b>rsvp</b> (A lightweight library that provides tools for organizing asynchronous code)",
							address: "https://github.com/tildeio/rsvp.js",
							displayAddress: "by stefanpenner | 3.0.8 | MIT"
						}
					] );
					done();
				}
			);
		});
		it( "parses items without homepage addresses", function(done){
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
					window.$ = {
						getJSON: function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( {
										results:[
											{
												"author": "bergie",
												"license": [],
												"description": "Flow-Based Programming environment for JavaScript",
												"name": "noflo",
												"version": "0.5.3"
											},
											{
												"author": "stefanpenner",
												"license": [
													"MIT"
												],
												"description": "A lightweight library that provides tools for organizing asynchronous code",
												"name": "rsvp",
												"version": "3.0.8"
											}
										]
									} );
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
					urls.should.eql( [
						"http://npmsearch.com/query?pretty=true&fl=name,description,version,author,license&rows=51&sort=rating+desc&q=math"
					] );
					results.items.should.eql( [
						{
							text: "noflo (Flow-Based Programming environment for JavaScript)",
							displayText: "<b>noflo</b> (Flow-Based Programming environment for JavaScript)",
							address: "https://www.npmjs.org/package/noflo",
							displayAddress: "by bergie | 0.5.3 | no-license"
						},
						{
							text: "rsvp (A lightweight library that provides tools for organizing asynchronous code)",
							displayText: "<b>rsvp</b> (A lightweight library that provides tools for organizing asynchronous code)",
							address: "https://www.npmjs.org/package/rsvp",
							displayAddress: "by stefanpenner | 3.0.8 | MIT"
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