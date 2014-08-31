'use strict';

var should = require("should"),
	pathUtils = require("path");

var test = require("pagehop").test;

var pathToRecipe = pathUtils.resolve( __dirname, '../' ),
	expected = require("./data/results");

var removeFSPath = function(result) {
	var stripFS = function(path) {
		var result = path;
		if ( path && ( path.indexOf( "file://" ) === 0 ) ) {
			result = path.substring( path.lastIndexOf( "/" ) );
		}
		return result;
	};

	var items = result.items;
	for ( var i = 0; i < items.length; i++ ) {
		var item  = items[i];
		if ( item.address ) {
			item.address = stripFS( item.address );
		}
		if ( item.discussionAddress ) {
			item.discussionAddress = stripFS( item.discussionAddress );
		}
	}
	if ( result.nextUrl ) {
		result.nextUrl = stripFS( result.nextUrl );
	}
	return result;
};

var testScraping = function( pageName, expectedResults, done ) {
	test.scrape(
		pathToRecipe,
		"file://" + pathUtils.resolve( __dirname, "data", pageName ),
		function() {
			window._pagehopTest = {
				isFirstJobsPage: true,
				isFirstShowPage: true
			};
		},
		function(results) {
			should.exist( results );
			removeFSPath( results ).should.eql( removeFSPath( expectedResults ) );
			done();
		}
	);
};

describe("hacker-news recipe's scrape",function(){
	before( function(done) {
		test.init( done );
	} );
	it( "scrapes default page with 'More' results", function(done){
		testScraping(
			"default.html",
			expected.default,
			done
		);
	});
	it( "scrapes default page with no 'More' results", function(done){
		testScraping(
			"default_no_more.html",
			expected.default_no_more,
			done
		);
	});
	it( "scrapes new page with 'More' results", function(done){
		testScraping(
			"new.html",
			expected.new,
			done
		);
	});
	it( "scrapes new page with no 'More' results", function(done){
		testScraping(
			"new_no_more.html",
			expected.new_no_more,
			done
		);
	});
	it( "scrapes comments page with 'More' results", function(done){
		testScraping(
			"comments.html",
			expected.comments,
			done
		);
	});
	it( "scrapes comments page with no 'More' results", function(done){
		testScraping(
			"comments_no_more.html",
			expected.comments_no_more,
			done
		);
	});
	it( "scrapes ask page with 'More' results", function(done){
		testScraping(
			"ask.html",
			expected.ask,
			done
		);
	});
	it( "scrapes ask page with no 'More' results", function(done){
		testScraping(
			"ask_no_more.html",
			expected.ask_no_more,
			done
		);
	});
	it( "scrapes jobs page with 'More' results", function(done){
		testScraping(
			"jobs.html",
			expected.jobs,
			done
		);
	});
	it( "scrapes jobs page with no 'More' results", function(done){
		testScraping(
			"jobs_no_more.html",
			expected.jobs_no_more,
			done
		);
	});
	it( "scrapes show page with 'More' results", function(done){
		testScraping(
			"show.html",
			expected.show,
			done
		);
	});
	it( "scrapes show page with no 'More' results", function(done){
		testScraping(
			"show_no_more.html",
			expected.show_no_more,
			done
		);
	});
	it( "scrapes 2nd show page with 'More' results", function(done){
		test.scrape(
			pathToRecipe,
			"file://" + pathUtils.resolve( __dirname, "data", "show_2nd_page.html" ),
			function() {
				window._pagehopTest = {
					isFirstShowPage: false
				};
			},
			function(results) {
				should.exist( results );
				removeFSPath( results ).should.eql( removeFSPath( expected.show_2nd_page ) );
				done();
			}
		);
	});
	it( "scrapes 2nd show page with no 'More' results", function(done){
		test.scrape(
			pathToRecipe,
			"file://" + pathUtils.resolve( __dirname, "data", "show_2nd_page_no_more.html" ),
			function() {
				window._pagehopTest = {
					isFirstShowPage: false
				};
			},
			function(results) {
				should.exist( results );
				removeFSPath( results ).should.eql( removeFSPath( expected.show_2nd_page_no_more ) );
				done();
			}
		);
	});
	after( function(done) {
		test.finalize( done );
	} );
});