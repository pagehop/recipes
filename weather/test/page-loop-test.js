/* jshint -W098 */

'use strict';

var should = require("should"),
	pathUtils = require("path");

var test = require("pagehop").test;

var pathToRecipe = pathUtils.resolve( pathUtils.join( __dirname, '../' ) );

describe("weather recipe's pageLoop",function(){
	this.timeout( 10000 );
	before( function(done) {
		test.init( done );
	} );
	describe( "results", function() {
		it( "no results, if no query", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = null,
						options = null,
						max = 100,
						scrapeScript = "irrelevant",
						systemMeta = null,
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
				},
				function(urls, results) {
					should.exist( urls );
					results.items.length.should.equal( 0 );
					done();
				}
			);
		} );
		it( "1 result, if there is a query", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "some",
						options = null,
						max = 100,
						scrapeScript = "irrelevant",
						systemMeta = null,
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
				},
				function(urls, results) {
					should.exist( urls );
					results.items.length.should.eql( 1 );

					var item = results.items[ 0 ];

					item.text.should.equal( "Weather in: some" );
					item.address.should.equal( "http://openweathermap.org/find?q=some" );
					item.displayAddress.should.equal( "http://openweathermap.org/find?q=some" );
					item.preview.should.containEql( "var locationName = \"some\";" );

					done();
				}
			);
		} );
	} );
	describe( "changes to the hops array", function() {
		it( "adds an item with default address if no query", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = null,
						options = null,
						max = 100,
						scrapeScript = "irrelevant",
						systemMeta = null,
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
				},
				function(urls, results) {
					should.exist( urls );
					results.hops.should.eql( [ {
						text: "Weather: no location",
						address: "http://openweathermap.org/"
					} ] );
					done();
				}
			);
		} );
		it( "adds an item with address pointing to the same weather check on the site", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "some",
						options = null,
						max = 100,
						scrapeScript = "irrelevant",
						systemMeta = null,
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
				},
				function(urls, results) {
					should.exist( urls );
					results.hops.should.eql( [ {
						text: "Weather",
						address: "http://openweathermap.org/find?q=some"
					} ] );
					done();
				}
			);
		} );
	} );
	after( function(done) {
		test.finalize( done );
	} );
} );