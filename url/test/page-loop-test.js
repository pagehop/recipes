'use strict';

var should = require("should"),
	pathUtils = require("path");

var test = require("pagehop").test;

var pathToRecipe = pathUtils.resolve( pathUtils.join( __dirname, '../' ) );

describe("url recipe's pageLoop",function(){
	this.timeout( 10000 );
	before( function(done) {
		test.init( done );
	} );
	describe( "parsing meta data", function() {
		it( "returns 0 items when no query", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = null,
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
		it( "returns 1 item when there is a query", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "http://example.com",
						options = null,
						max = 200,
						scrapeScript = "irrelevant",
						systemMeta = { recipes: [] };
					window.pagehop.init( query, options, max, scrapeScript, systemMeta );
				},
				function(urls, results) {
					should.exist( urls );
					results.should.eql( [
						{
							text: "http://example.com",
							address: "http://example.com"
						}
					] );
					done();
				}
			);
		});
		it( "adds http protocol if none is specified", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "example.com",
						options = null,
						max = 200,
						scrapeScript = "irrelevant",
						systemMeta = { recipes: [] };
					window.pagehop.init( query, options, max, scrapeScript, systemMeta );
				},
				function(urls, results) {
					should.exist( urls );
					results.should.eql( [
						{
							text: "http://example.com",
							address: "http://example.com"
						}
					] );
					done();
				}
			);
		});
		it( "preserves original protocol if specified", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "https://example.com",
						options = null,
						max = 200,
						scrapeScript = "irrelevant",
						systemMeta = { recipes: [] };
					window.pagehop.init( query, options, max, scrapeScript, systemMeta );
				},
				function(urls, results) {
					should.exist( urls );
					results.should.eql( [
						{
							text: "https://example.com",
							address: "https://example.com"
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