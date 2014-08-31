'use strict';

var should = require("should"),
	pathUtils = require("path");

var test = require("pagehop").test;

var pathToRecipe = pathUtils.resolve( __dirname, '../' ),
	expected = require("./data/results");

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
		if ( item.displayAddress ) {
			item.displayAddress = stripFS( item.displayAddress );
		}
	}
	return items;
};

var testScraping = function( pageName, expectedResults, done ) {
	test.scrape(
		pathToRecipe,
		"file://" + pathUtils.resolve( __dirname, "data", pageName ),
		function(results) {
			should.exist( results );
			removeFSPath( results ).should.eql( removeFSPath( expectedResults ) );
			done();
		}
	);
};

describe("bing recipe's scrape",function(){
	before( function(done) {
		test.init( done );
	} );
	it( "should successfully scrape a local page", function(done){
		testScraping(
			"page.html",
			expected.default,
			done
		);
	});
	after( function(done) {
		test.finalize( done );
	} );
});