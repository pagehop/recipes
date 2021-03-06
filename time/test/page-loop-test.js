/* jshint -W098 */

'use strict';

var should = require("should"),
	pathUtils = require("path");

var test = require("pagehop").test;

var pathToRecipe = pathUtils.resolve( pathUtils.join( __dirname, '../' ) );

describe("time recipe's pageLoop",function(){
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

					item.text.should.equal( "Time in: some" );
					should.not.exist( item.address );
					should.not.exist( item.displayAddress );
					item.preview.should.containEql( "<div id=\"placeholder\">some</div>" );

					done();
				}
			);
		} );
	} );
	describe( "changes to the hops array", function() {
		it( "adds an item with default address and text, if there is a query", function(done){
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
						text: "Time",
						address: "https://github.com/pagehop/recipes/blob/master/time/README.md"
					} ] );
					done();
				}
			);
		} );
		it( "adds an item with default address, but text notifies, if there is no query", function(done){
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
						text: "Time: no location",
						address: "https://github.com/pagehop/recipes/blob/master/time/README.md"
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