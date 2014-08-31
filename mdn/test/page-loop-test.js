/* jshint -W054 */

'use strict';

var should = require("should"),
	pathUtils = require("path"),
	fs = require("fs");

var test = require("pagehop").test;

var pathToRecipe = pathUtils.resolve( pathUtils.join( __dirname, '../' ) ),
	expected = require("./data/results"),
	defaultPage = fs.readFileSync( pathUtils.resolve( __dirname, "data", "default.html" ), "utf-8" ),
	defaultNoMorePage = fs.readFileSync( pathUtils.resolve( __dirname, "data", "default_no_more.html" ), "utf-8" ),
	emptyPage = fs.readFileSync( pathUtils.resolve( __dirname, "data", "empty.html" ), "utf-8" );

var removeFSPath = function(items) {
	var stripFS = function(path) {
		var result = path;
		if ( path && ( path.indexOf( "file://" ) === 0 ) ) {
			result = path.substring( path.lastIndexOf( "/" ) );
		}
		return result;
	};

	for ( var i = 0; i < items.length; i++ ) {
		var item  = items[i];
		if ( item.address ) {
			item.address = stripFS( item.address );
		}
	}
	return items;
};

describe("mdn recipe's pageLoop",function(){
	this.timeout( 10000 );
	before( function(done) {
		test.init( done );
	} );
	describe( "number of pages to be scraped", function() {
		it( "scrapes 0 pages, if no query", function(done){
			test.pageLoop(
				pathToRecipe,
				new Function( "(" + function(page) {
					var query = null,
						options = null,
						max = 20,
						scrapeScript = "irrelevant";
					window.pagehop.init( query, options, max, scrapeScript );
					window.$ = function( jQuery ) {
						jQuery.get = function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( page );
									return {
										fail: function() {}
									};
								}
							};
						};
						return jQuery;
					};
				} + ")(" + JSON.stringify( defaultPage ) + ");" ),
				function(urls, result) {
					should.exist( urls );
					should.exist( result );
					urls.length.should.equal( 0 );
					result.length.should.equal( 0 );
					done();
				}
			);
		});
		it( "scrapes 1 page, if maxCount is set to 10", function(done){
			test.pageLoop(
				pathToRecipe,
				new Function( "(" + function(page) {
					var query = "irrelevant",
						options = null,
						max = 10,
						scrapeScript = "irrelevant";
					window.pagehop.init( query, options, max, scrapeScript );
					window.$ = function( jQuery ) {
						jQuery.get = function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( page );
									return {
										fail: function() {}
									};
								}
							};
						};
						return jQuery;
					};
				} + ")(" + JSON.stringify( defaultPage ) + ");" ),
				function(urls, result) {
					should.exist( urls );
					should.exist( result );
					urls.length.should.equal( 1 );
					result.length.should.equal( 10 );
					done();
				}
			);
		});
		it( "scrapes 2 pages, if maxCount is set to 20", function(done){
			test.pageLoop(
				pathToRecipe,
				new Function( "(" + function(page) {
					var query = "irrelevant",
						options = null,
						max = 20,
						scrapeScript = "irrelevant";
					window.pagehop.init( query, options, max, scrapeScript );
					window.$ = function( jQuery ) {
						jQuery.get = function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( page );
									return {
										fail: function() {}
									};
								}
							};
						};
						return jQuery;
					};
				} + ")(" + JSON.stringify( defaultPage ) + ");" ),
				function(urls, result) {
					should.exist( urls );
					should.exist( result );
					urls.length.should.equal( 2 );
					result.length.should.equal( 20 );
					done();
				}
			);
		});
		it( "scrapes 3 pages, if maxCount is set to 30", function(done){
			test.pageLoop(
				pathToRecipe,
				new Function( "(" + function(page) {
					var query = "irrelevant",
						options = null,
						max = 30,
						scrapeScript = "irrelevant";
					window.pagehop.init( query, options, max, scrapeScript );
					window.$ = function( jQuery ) {
						jQuery.get = function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( page );
									return {
										fail: function() {}
									};
								}
							};
						};
						return jQuery;
					};
				} + ")(" + JSON.stringify( defaultPage ) + ");" ),
				function(urls, result) {
					should.exist( urls );
					should.exist( result );
					urls.length.should.equal( 3 );
					result.length.should.equal( 30 );
					done();
				}
			);
		});
	} );
	describe( "urls of pages to be scraped", function() {
		it( "scrapes the correct urls", function(done){
			test.pageLoop(
				pathToRecipe,
				new Function( "(" + function(page) {
					var query = "math",
						options = null,
						max = 20,
						scrapeScript = "irrelevant";
					window.pagehop.init( query, options, max, scrapeScript );
					window.$ = function( jQuery ) {
						jQuery.get = function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( page );
									return {
										fail: function() {}
									};
								}
							};
						};
						return jQuery;
					};
				} + ")(" + JSON.stringify( defaultPage ) + ");" ),
				function(urls) {
					should.exist( urls );
					urls.should.eql( [
						"https://developer.mozilla.org/en-US/search?q=math&page=1",
						"https://developer.mozilla.org/en-US/search?q=math&page=2"
					] );
					done();
				}
			);
		});
	} );
	describe( "parsing results", function() {
		it( "parses page with more results", function(done){
			test.pageLoop(
				pathToRecipe,
				new Function( "(" + function(page) {
					var query = "irrelevant",
						options = null,
						max = 10,
						scrapeScript = "irrelevant";
					window.pagehop.init( query, options, max, scrapeScript );
					window.$ = function( jQuery ) {
						jQuery.get = function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( page );
									return {
										fail: function() {}
									};
								}
							};
						};
						return jQuery;
					};
				} + ")(" + JSON.stringify( defaultPage ) + ");" ),
				function(urls, results) {
					should.exist( urls );
					removeFSPath( results ).should.eql( removeFSPath( expected.default ) );
					done();
				}
			);
		});
		it( "parses page with last results", function(done){
			test.pageLoop(
				pathToRecipe,
				new Function( "(" + function(page) {
					var query = "irrelevant",
						options = null,
						max = 10,
						scrapeScript = "irrelevant";
					window.pagehop.init( query, options, max, scrapeScript );
					window.$ = function( jQuery ) {
						jQuery.get = function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( page );
									return {
										fail: function() {}
									};
								}
							};
						};
						return jQuery;
					};
				} + ")(" + JSON.stringify( defaultNoMorePage ) + ");" ),
				function(urls, results) {
					should.exist( urls );
					removeFSPath( results ).should.eql( removeFSPath( expected.default_no_more ) );
					done();
				}
			);
		});
		it( "parses empty page", function(done){
			test.pageLoop(
				pathToRecipe,
				new Function( "(" + function(page) {
					var query = "irrelevant",
						options = null,
						max = 10,
						scrapeScript = "irrelevant";
					window.pagehop.init( query, options, max, scrapeScript );
					window.$ = function( jQuery ) {
						jQuery.get = function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( page );
									return {
										fail: function() {}
									};
								}
							};
						};
						return jQuery;
					};
				} + ")(" + JSON.stringify( emptyPage ) + ");" ),
				function(urls, results) {
					should.exist( urls );
					removeFSPath( results ).should.eql( removeFSPath( expected.empty ) );
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
						pagehop = window.pagehop;
					window.$ = function( jQuery ) {
						jQuery.get = function(url) {
							return {
								done: function() {
									return {
										fail: function(callback) {
											window.boxApi.emitEvent( "scrape", url );
											callback( null, null, "blowup" );
										}
									};
								}
							};
						};
						return jQuery;
					};
					pagehop.init( query, options, max, scrapeScript );
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