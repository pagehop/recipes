'use strict';

var should = require("should"),
	pathUtils = require("path");

var test = require("pagehop").test;

var pathToRecipe = pathUtils.resolve( pathUtils.join( __dirname, '../' ) );

describe("google recipe's pageLoop",function(){
	this.timeout( 10000 );
	before( function(done) {
		test.init( done );
	} );
	describe( "number of pages to be scraped", function() {
		it( "scrape 0 pages, if no query", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = null,
						options = null,
						max = 200,
						scrapeScript = "irrelevant";
					window.pagehop.init( query, options, max, scrapeScript );
				},
				function(urls, result) {
					should.exist( urls );
					should.exist( result );
					urls.length.should.equal( 0 );
					result.length.should.equal( 0 );
					done();
				}
			);
		});
		it( "scrape 2 pages, if maxCount is set to 200", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = null,
						max = 200,
						scrapeScript = "irrelevant";
					window.pagehop.init( query, options, max, scrapeScript );
				},
				function(urls, result) {
					should.exist( urls );
					should.exist( result );
					urls.length.should.equal( 2 );
					result.length.should.equal( 0 );
					done();
				}
			);
		});
		it( "scrape 3 pages, if maxCount is set to 300", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = null,
						max = 300,
						scrapeScript = "irrelevant";
					window.pagehop.init( query, options, max, scrapeScript );
				},
				function(urls, result) {
					should.exist( urls );
					should.exist( result );
					urls.length.should.equal( 3 );
					result.length.should.equal( 0 );
					done();
				}
			);
		});
	} );
	describe( "urls of pages to be scraped", function() {
		it( "scrapes the correct urls when max<100", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = null,
						max = 20,
						scrapeScript = "irrelevant";
					window.pagehop.init( query, options, max, scrapeScript );
				},
				function(urls) {
					should.exist( urls );
					urls.should.eql( [
						"http://www.google.com/search?hl=en&q=irrelevant&start=0&sa=N&num=20&ie=UTF-8&oe=UTF-8"
					] );
					done();
				}
			);
		});
		it( "scrapes the correct urls when max>100", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = null,
						max = 200,
						scrapeScript = "irrelevant";
					window.pagehop.init( query, options, max, scrapeScript );
				},
				function(urls) {
					should.exist( urls );
					urls.should.eql( [
						"http://www.google.com/search?hl=en&q=irrelevant&start=0&sa=N&num=100&ie=UTF-8&oe=UTF-8",
						"http://www.google.com/search?hl=en&q=irrelevant&start=100&sa=N&num=100&ie=UTF-8&oe=UTF-8"
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
						pagehop = window.pagehop;
					pagehop.scrape = function(url, callback) {
						window.boxApi.emitEvent( "scrape", url );
						callback( "blowup" );
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