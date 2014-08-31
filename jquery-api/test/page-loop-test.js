/* jshint -W054 */

'use strict';

var should = require("should"),
	pathUtils = require("path"),
	fs = require("fs");

var test = require("pagehop").test;

var pathToRecipe = pathUtils.resolve( pathUtils.join( __dirname, '../' ) ),
	expected = require("./data/results"),
	defaultDoubleSlashPage = fs.readFileSync( pathUtils.resolve( __dirname, "data", "default_double_slash.html" ), "utf-8" ),
	defaultHttpPage = fs.readFileSync( pathUtils.resolve( __dirname, "data", "default_http.html" ), "utf-8" ),
	emptyPage = fs.readFileSync( pathUtils.resolve( __dirname, "data", "empty.html" ), "utf-8" );

var removeFSPath = function(items) {
	var stripFS = function(path) {
		var result = path,
			protocol = "file://";

		if ( path && ( path.indexOf( protocol ) === 0 ) ) {
			result = path.replace( protocol, "" );
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

describe("jquery-api recipe's pageLoop",function(){
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
				} + ")(" + JSON.stringify( defaultHttpPage ) + ");" ),
				function(urls, result) {
					should.exist( urls );
					should.exist( result );
					urls.length.should.equal( 0 );
					result.length.should.equal( 0 );
					done();
				}
			);
		});
		it( "scrapes 1 page, if there is a query", function(done){
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
				} + ")(" + JSON.stringify( defaultHttpPage ) + ");" ),
				function(urls, result) {
					should.exist( urls );
					should.exist( result );
					urls.length.should.equal( 1 );
					result.length.should.equal( 20 );
					done();
				}
			);
		});
	} );
	describe( "urls of pages to be scraped", function() {
		it( "scrapes the correct url", function(done){
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
				} + ")(" + JSON.stringify( defaultHttpPage ) + ");" ),
				function(urls) {
					should.exist( urls );
					urls.should.eql( [
						"http://api.jquery.com/?s=math"
					] );
					done();
				}
			);
		});
	} );
	describe( "parsing results", function() {
		it( "parses page with results (with leading protocol, e.g. 'http://')", function(done){
			test.pageLoop(
				pathToRecipe,
				new Function( "(" + function(page) {
					var query = "irrelevant",
						options = null,
						max = 200,
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
				} + ")(" + JSON.stringify( defaultHttpPage ) + ");" ),
				function(urls, results) {
					should.exist( urls );
					removeFSPath( results );
					removeFSPath( expected.default_http );
					results.forEach( function(element, index) {
						element.should.eql( expected.default_http[ index ] );
					} );
					done();
				}
			);
		});
		it( "parses page with results (with partial protocol like this //)", function(done){
			test.pageLoop(
				pathToRecipe,
				new Function( "(" + function(page) {
					var query = "irrelevant",
						options = null,
						max = 200,
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
				} + ")(" + JSON.stringify( defaultDoubleSlashPage ) + ");" ),
				function(urls, results) {
					should.exist( urls );
					results.forEach( function(element, index) {
						element.should.eql( expected.default_double_slash[ index ] );
					} );
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
						max = 200,
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
					results.should.eql( expected.empty );
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