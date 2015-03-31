'use strict';

var should = require("should"),
	pathUtils = require("path");

var test = require("pagehop").test;

var pathToRecipe = pathUtils.resolve( __dirname, '../' ),
	expectedResult = require("./data/results").scrape1;

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

describe("google recipe's scrape",function(){
	this.timeout( 10000 );

	before( function(done) {
		test.init( done );
	} );
	it( "should successfully scrape a local page", function(done){
		var pathToPage = "file://" + pathUtils.resolve( __dirname, "data", "page.html" );
		test.scrape(
			pathToRecipe,
			pathToPage,
			function(results) {
				should.exist( results );
				removeFSPath( results ).should.eql( removeFSPath( expectedResult ) );
				done();
			}
		);
	});
	after( function(done) {
		test.finalize( done );
	} );
});