'use strict';

var should = require("should"),
	pathUtils = require("path");

var test = require("pagehop").test;

var pathToRecipe = pathUtils.resolve( pathUtils.join( __dirname, '../' ) );

var generateResults = function(size) {
	return Array.apply( null, new Array( size ) ).map( function() {
		return {
			text: "text",
			address: "address",
			displayAddress: "displayAddress",
			discussionAddress: "discussionAddress"
		};
	} );
};

describe("hacker-news recipe's pageLoop",function(){
	this.timeout( 10000 );
	before( function(done) {
		test.init( done );
	} );
	describe( "number of pages to be scraped", function() {
		it( "scrape 2 pages: maxCount=50, resultsOnPage=30, endReached=false", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = null,
						max = 50,
						scrapeScript = "irrelevant";
					window.pagehop.init( query, options, max, scrapeScript );
				},
				[
					{
						result: {
							nextUrl: "https://news.ycombinator.com/x?fnid=xwRo27NTrZmxqQK6yDFHnv",
							items: generateResults( 30 )
						}
					},
					{
						result: {
							nextUrl: "https://news.ycombinator.com/x?fnid=kljsd8NTrZmxqQK6skdjhf",
							items: generateResults( 30 )
						}
					}
				],
				function(urls, result) {
					should.exist( urls );
					should.exist( result );
					urls.length.should.equal( 2 );
					result.length.should.equal( 50 );
					done();
				}
			);
		});
		it( "scrape 2 pages: maxCount=90, resultsOnPage=30, endReached=true", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = null,
						max = 90,
						scrapeScript = "irrelevant";
					window.pagehop.init( query, options, max, scrapeScript );
				},
				[
					{
						result: {
							nextUrl: "https://news.ycombinator.com/x?fnid=xwRo27NTrZmxqQK6yDFHnv",
							items: generateResults( 30 )
						}
					},
					{
						result: {
							items: generateResults( 20 )
						}
					}
				],
				function(urls, result) {
					should.exist( urls );
					should.exist( result );
					urls.length.should.equal( 2 );
					result.length.should.equal( 50 );
					done();
				}
			);
		});
		it( "scrapes 4 pages: maxCount=40, resultsOnPage=10, endReached=false", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = null,
						max = 40,
						scrapeScript = "irrelevant";
					window.pagehop.init( query, options, max, scrapeScript );
				},
				[
					{
						result: {
							nextUrl: "https://news.ycombinator.com/x?fnid=xwRo27NTrZmxqQK6yDFHnv",
							items: generateResults( 10 )
						}
					},
					{
						result: {
							nextUrl: "https://news.ycombinator.com/x?fnid=xwRo27NTrZmxqQK6yDFHn2",
							items: generateResults( 10 )
						}
					},
					{
						result: {
							nextUrl: "https://news.ycombinator.com/x?fnid=xwRo27NTrZmxqQK6yDFHn3",
							items: generateResults( 10 )
						}
					},
					{
						result: {
							nextUrl: "https://news.ycombinator.com/x?fnid=xwRo27NTrZmxqQK6yDFHn4",
							items: generateResults( 10 )
						}
					}
				],
				function(urls, result) {
					should.exist( urls );
					should.exist( result );
					urls.length.should.equal( 4 );
					result.length.should.equal( 40 );
					done();
				}
			);
		});
	} );
	describe( "urls of pages to be scraped", function() {
		it( "scrapes the correct urls", function(done){
			var intermediateResults = [
				{
					result: {
						nextUrl: "https://news.ycombinator.com/x?fnid=xwRo27NTrZmxqQK6yDFHnv",
						items: generateResults( 10 )
					}
				},
				{
					result: {
						nextUrl: "https://news.ycombinator.com/x?fnid=xwRo27NTrZmxqQK6yDFHn2",
						items: generateResults( 10 )
					}
				},
				{
					result: {
						nextUrl: "https://news.ycombinator.com/x?fnid=xwRo27NTrZmxqQK6yDFHn3",
						items: generateResults( 10 )
					}
				},
				{
					result: {
						nextUrl: "https://news.ycombinator.com/x?fnid=xwRo27NTrZmxqQK6yDFHn4",
						items: generateResults( 10 )
					}
				}
			];

			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = null,
						max = 40,
						scrapeScript = "irrelevant";
					window.pagehop.init( query, options, max, scrapeScript );
				},
				intermediateResults,
				function(urls, result) {
					should.exist( urls );
					should.exist( result );
					urls.should.eql( [ "http://news.ycombinator.com/" ].concat( intermediateResults.map( function(item) {
						return item.result.nextUrl;
					} ).slice( 0, intermediateResults.length - 1 ) ) );
					result.length.should.equal( 40 );
					done();
				}
			);
		});
	} );
	describe( "options", function() {
		it( "starts scraping from the news page, if only :n option is present", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = [":n"],
						max = 10,
						scrapeScript = "irrelevant";
					window.pagehop.init( query, options, max, scrapeScript );
				},
				[{
					result: {
						nextUrl: "https://news.ycombinator.com/x?fnid=xwRo27NTrZmxqQK6yDFHnv",
						items: generateResults( 10 )
					}
				}],
				function(urls, result) {
					should.exist( urls );
					should.exist( result );
					urls.should.eql( [ "http://news.ycombinator.com/newest" ] );
					result.length.should.equal( 10 );
					done();
				}
			);
		});
		it( "starts scraping from the comments page, if only :c option is present", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = [":c"],
						max = 10,
						scrapeScript = "irrelevant";
					window.pagehop.init( query, options, max, scrapeScript );
				},
				[{
					result: {
						nextUrl: "https://news.ycombinator.com/x?fnid=xwRo27NTrZmxqQK6yDFHnv",
						items: generateResults( 10 )
					}
				}],
				function(urls, result) {
					should.exist( urls );
					should.exist( result );
					urls.should.eql( [ "http://news.ycombinator.com/newcomments" ] );
					result.length.should.equal( 10 );
					done();
				}
			);
		});
		it( "starts scraping from the questions page, if only :ask option is present", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = [":ask"],
						max = 10,
						scrapeScript = "irrelevant";
					window.pagehop.init( query, options, max, scrapeScript );
				},
				[{
					result: {
						nextUrl: "https://news.ycombinator.com/x?fnid=xwRo27NTrZmxqQK6yDFHnv",
						items: generateResults( 10 )
					}
				}],
				function(urls, result) {
					should.exist( urls );
					should.exist( result );
					urls.should.eql( [ "http://news.ycombinator.com/ask" ] );
					result.length.should.equal( 10 );
					done();
				}
			);
		});
		it( "starts scraping from the jobs page, if only :j option is present", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = [":j"],
						max = 10,
						scrapeScript = "irrelevant";
					window.pagehop.init( query, options, max, scrapeScript );
				},
				[{
					result: {
						nextUrl: "https://news.ycombinator.com/x?fnid=xwRo27NTrZmxqQK6yDFHnv",
						items: generateResults( 10 )
					}
				}],
				function(urls, result) {
					should.exist( urls );
					should.exist( result );
					urls.should.eql( [ "http://news.ycombinator.com/jobs" ] );
					result.length.should.equal( 10 );
					done();
				}
			);
		});
		it( "starts scraping from the show page, if only :s option is present", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = [":s"],
						max = 10,
						scrapeScript = "irrelevant";
					window.pagehop.init( query, options, max, scrapeScript );
				},
				[{
					result: {
						nextUrl: "https://news.ycombinator.com/x?fnid=xwRo27NTrZmxqQK6yDFHnv",
						items: generateResults( 10 )
					}
				}],
				function(urls, result) {
					should.exist( urls );
					should.exist( result );
					urls.should.eql( [ "http://news.ycombinator.com/show" ] );
					result.length.should.equal( 10 );
					done();
				}
			);
		});
		it( "starts from the page appointed by the last, if multiple options are present", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = [":c", ":ask", ":n", ":j"],
						max = 10,
						scrapeScript = "irrelevant";
					window.pagehop.init( query, options, max, scrapeScript );
				},
				[{
					result: {
						nextUrl: "https://news.ycombinator.com/x?fnid=xwRo27NTrZmxqQK6yDFHnv",
						items: generateResults( 10 )
					}
				}],
				function(urls, result) {
					should.exist( urls );
					should.exist( result );
					urls.should.eql( [ "http://news.ycombinator.com/jobs" ] );
					result.length.should.equal( 10 );
					done();
				}
			);
		});
		it( "finishes with items with address pointing to the discussion, if :d is present and starting page has discussion links", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = [":d"],
						max = 10,
						scrapeScript = "irrelevant";
					window.pagehop.init( query, options, max, scrapeScript );
				},
				[{
					result: {
						nextUrl: "https://news.ycombinator.com/x?fnid=xwRo27NTrZmxqQK6yDFHnv",
						items: generateResults( 10 )
					}
				}],
				function(urls, result) {
					should.exist( urls );
					should.exist( result );

					result[0].address.should.equal( "discussionAddress" );
					result[0].text.should.equal( "Discussion: text" );

					done();
				}
			);
		});
		it( "finishes with items with address pointing to address, if :d is present and starting page has no discussion links", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = [":j", ":d"],
						max = 10,
						scrapeScript = "irrelevant";
					window.pagehop.init( query, options, max, scrapeScript );
				},
				[{
					result: {
						nextUrl: "https://news.ycombinator.com/x?fnid=xwRo27NTrZmxqQK6yDFHnv",
						items: generateResults( 10 )
					}
				}],
				function(urls, result) {
					should.exist( urls );
					should.exist( result );

					result[0].address.should.equal( "address" );
					result[0].text.should.equal( "text" );

					done();
				}
			);
		});
		it( "finishes with some items with address pointing to address and some to text if :d is present and not all have discussions", function(done){
			var intermediateResults = [{
				result: {
					nextUrl: "https://news.ycombinator.com/x?fnid=xwRo27NTrZmxqQK6yDFHnv",
					items: generateResults( 10 )
				}
			}];
			delete intermediateResults[0].result.items[5].discussionAddress;
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = [":d"],
						max = 10,
						scrapeScript = "irrelevant";
					window.pagehop.init( query, options, max, scrapeScript );
				},
				intermediateResults,
				function(urls, result) {
					should.exist( urls );
					should.exist( result );

					result[0].address.should.equal( "discussionAddress" );
					result[0].text.should.equal( "Discussion: text" );

					// the one without a discussion link
					result[5].address.should.equal( "address" );
					result[5].text.should.equal( "text" );

					done();
				}
			);
		});
		it( "selects the correct starting page, even if :d is present mutliple times", function(done){
			var asyncCount = 2;
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = [":d", ":j", ":d", ":d"],
						max = 10,
						scrapeScript = "irrelevant";
					window.pagehop.init( query, options, max, scrapeScript );
				},
				[{
					result: {
						nextUrl: "https://news.ycombinator.com/x?fnid=xwRo27NTrZmxqQK6yDFHnv",
						items: generateResults( 10 )
					}
				}],
				function(urls, result) {
					should.exist( urls );
					should.exist( result );

					result[0].address.should.equal( "address" );

					if ( --asyncCount === 0 ) {
						done();
					}
				}
			);
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = [":d", ":c", ":d", ":d"],
						max = 10,
						scrapeScript = "irrelevant";
					window.pagehop.init( query, options, max, scrapeScript );
				},
				[{
					result: {
						nextUrl: "https://news.ycombinator.com/x?fnid=xwRo27NTrZmxqQK6yDFHnv",
						items: generateResults( 10 )
					}
				}],
				function(urls, result) {
					should.exist( urls );
					should.exist( result );

					urls.should.eql( [ "http://news.ycombinator.com/newcomments" ] );
					result[0].address.should.equal( "discussionAddress" );

					if ( --asyncCount === 0 ) {
						done();
					}
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