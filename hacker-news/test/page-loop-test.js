/* jshint -W054 */

'use strict';

var should = require("should"),
	pathUtils = require("path"),
	helpers = require("./helpers");

var test = require("pagehop").test,
	generateIds = helpers.generateIds,
	generateRequestResults = helpers.generateRequestResults,
	enumerateResults = helpers.enumerateResults,
	initFunc = helpers.initFunc;

var pathToRecipe = pathUtils.resolve( pathUtils.join( __dirname, '../' ) ),
	expected = require("./data/results");

describe("hacker-news recipe's pageLoop",function() {
	this.timeout( 10000 );
	before( function(done) {
		test.init( done );
	} );
	describe( "number of requests", function() {
		it( "makes a request even if no query (query not required)", function(done) {
			test.pageLoop(
				pathToRecipe,
				new Function( "(" + initFunc + ")(" +
					JSON.stringify( [] ) + ", " +
					JSON.stringify( 10 ) + ", " +
					JSON.stringify( [] ) +
				");" ),
				function(urls, results) {
					should.exist( urls );
					should.exist( results );
					urls.length.should.equal( 1 );
					results.items.length.should.equal( 0 );
					done();
				}
			);
		} );
	} );
	describe( "hops array changes", function() {
		it( "adds an item with a default url if no option is used", function(done) {
			test.pageLoop(
				pathToRecipe,
				new Function( "(" + initFunc + ")(" +
					JSON.stringify( [] ) + ", " +
					JSON.stringify( 10 ) + ", " +
					JSON.stringify( [] ) +
				");" ),
				function(urls, results) {
					should.exist( urls );
					results.hops.should.eql( [ {
						text: "HackerNews",
						address: "https://news.ycombinator.com/"
					} ] );
					done();
				}
			);
		} );
		it( "adds an item with a default url if :d is used", function(done) {
			test.pageLoop(
				pathToRecipe,
				new Function( "(" + initFunc + ")(" +
					JSON.stringify( [] ) + ", " +
					JSON.stringify( 10 ) + ", " +
					JSON.stringify( [ ":d" ] ) +
				");" ),
				function(urls, results) {
					should.exist( urls );
					results.hops.should.eql( [ {
						text: "HackerNews: Discussions",
						address: "https://news.ycombinator.com/"
					} ] );
					done();
				}
			);
		} );
		it( "adds an item with address pointing to ShowHN page", function(done) {
			test.pageLoop(
				pathToRecipe,
				new Function( "(" + initFunc + ")(" +
					JSON.stringify( [] ) + ", " +
					JSON.stringify( 10 ) + ", " +
					JSON.stringify( [ ":s" ] ) +
				");" ),
				function(urls, results) {
					should.exist( urls );
					results.hops.should.eql( [ {
						text: "HackerNews: ShowHN",
						address: "https://news.ycombinator.com/show"
					} ] );
					done();
				}
			);
		} );
		it( "adds an item with address pointing to AskHN page", function(done) {
			test.pageLoop(
				pathToRecipe,
				new Function( "(" + initFunc + ")(" +
					JSON.stringify( [] ) + ", " +
					JSON.stringify( 10 ) + ", " +
					JSON.stringify( [ ":ask" ] ) +
				");" ),
				function(urls, results) {
					should.exist( urls );
					results.hops.should.eql( [ {
						text: "HackerNews: AskHN",
						address: "https://news.ycombinator.com/ask"
					} ] );
					done();
				}
			);
		} );
		it( "adds an item with address pointing to Jobs page", function(done) {
			test.pageLoop(
				pathToRecipe,
				new Function( "(" + initFunc + ")(" +
					JSON.stringify( [] ) + ", " +
					JSON.stringify( 10 ) + ", " +
					JSON.stringify( [ ":j" ] ) +
				");" ),
				function(urls, results) {
					should.exist( urls );
					results.hops.should.eql( [ {
						text: "HackerNews: Jobs",
						address: "https://news.ycombinator.com/jobs"
					} ] );
					done();
				}
			);
		} );
	} );
	describe( "requested urls", function() {
		it( "requests the correct urls", function(done) {
			var intermediateResults = [
				generateIds( 2 )
			].concat(
				generateRequestResults( 1 )
					.concat( generateRequestResults( 1, "askStory" ) )
			);

			test.pageLoop(
				pathToRecipe,
				new Function( "(" + initFunc + ")(" +
					JSON.stringify( intermediateResults ) + ", " +
					JSON.stringify( 2 ) + ", " +
					JSON.stringify( [] ) +
				");" ),
				function(urls, results) {
					should.exist( urls );
					urls.should.eql( [
						"https://hacker-news.firebaseio.com/v0/topstories.json",
						"https://hacker-news.firebaseio.com/v0/item/%s.json".replace( "%s", intermediateResults[0][0] ),
						"https://hacker-news.firebaseio.com/v0/item/%s.json".replace( "%s", intermediateResults[0][1] )
					] );
					should.exist( results );
					results.items.should.eql( enumerateResults( [
						expected.defaultStory,
						expected.askStory
					] ) );
					done();
				}
			);
		} );
	} );
	describe( "number of results", function() {
		it( "returns the max number of results, even if they aren't in the first 'max'", function(done) {
			var intermediateResults = [
				generateIds( 90 )
			].concat(
				generateRequestResults( 3 )
					.concat( generateRequestResults( 27, "askStory" ) )
					.concat( generateRequestResults( 30, "showStory" ) )
					.concat( generateRequestResults( 27, "defaultStory" ) )
					.concat( generateRequestResults( 3, "askStory" ) )
			);

			test.pageLoop(
				pathToRecipe,
				new Function( "(" + initFunc + ")(" +
					JSON.stringify( intermediateResults ) + ", " +
					JSON.stringify( 30 ) + ", " +
					JSON.stringify( [":ask"] ) +
				");" ),
				function(urls, results) {
					should.exist( urls );
					should.exist( results );
					results.items.length.should.equal( 30 );
					done();
				}
			);
		} );
	} );
	describe( "options", function() {
		it( "returns all items on no options", function(done) {
			var intermediateResults = [
				generateIds( 5 )
			].concat(
				generateRequestResults( 3 )
					.concat( generateRequestResults( 2, "askStory" ) )
			);

			test.pageLoop(
				pathToRecipe,
				new Function( "(" + initFunc + ")(" +
					JSON.stringify( intermediateResults ) + ", " +
					JSON.stringify( 5 ) + ", " +
					JSON.stringify( [] ) +
				");" ),
				function(urls, results) {
					should.exist( urls );
					should.exist( results );
					results.items.should.eql( enumerateResults( [
						expected.defaultStory,
						expected.defaultStory,
						expected.defaultStory,
						expected.askStory,
						expected.askStory
					] ) );
					done();
				}
			);
		} );
		it( "returns only Ask items on :ask", function(done) {
			var intermediateResults = [
				generateIds( 10 )
			].concat(
				generateRequestResults( 8 )
					.concat( generateRequestResults( 2, "askStory" ) )
			);

			test.pageLoop(
				pathToRecipe,
				new Function( "(" + initFunc + ")(" +
					JSON.stringify( intermediateResults ) + ", " +
					JSON.stringify( 10 ) + ", " +
					JSON.stringify( [":ask"] ) +
				");" ),
				function(urls, results) {
					should.exist( urls );
					should.exist( results );
					results.items.should.eql( enumerateResults( [
						expected.askStory,
						expected.askStory
					] ) );
					done();
				}
			);
		} );
		it( "returns only Show items on :s", function(done) {
			var intermediateResults = [
				generateIds( 10 )
			].concat(
				generateRequestResults( 8 )
					.concat( generateRequestResults( 2, "showStory" ) )
			);

			test.pageLoop(
				pathToRecipe,
				new Function( "(" + initFunc + ")(" +
					JSON.stringify( intermediateResults ) + ", " +
					JSON.stringify( 10 ) + ", " +
					JSON.stringify( [":s"] ) +
				");" ),
				function(urls, results) {
					should.exist( urls );
					should.exist( results );
					results.items.should.eql( enumerateResults( [
						expected.showStory,
						expected.showStory
					] ) );
					done();
				}
			);
		} );
		it( "returns only Jobs items on :j", function(done) {
			var intermediateResults = [
				generateIds( 10 )
			].concat(
				generateRequestResults( 8 )
					.concat( generateRequestResults( 2, "job" ) )
			);

			test.pageLoop(
				pathToRecipe,
				new Function( "(" + initFunc + ")(" +
					JSON.stringify( intermediateResults ) + ", " +
					JSON.stringify( 10 ) + ", " +
					JSON.stringify( [":j"] ) +
				");" ),
				function(urls, results) {
					should.exist( urls );
					should.exist( results );
					results.items.should.eql( enumerateResults( [
						expected.job,
						expected.job
					] ) );
					done();
				}
			);
		} );
		it( "returns discussion items when :d is present", function(done) {
			var intermediateResults = [
				generateIds( 10 )
			].concat(
				generateRequestResults( 3 )
					.concat( generateRequestResults( 2, "showStory" ) )
					.concat( generateRequestResults( 2, "askStory" ) )
					.concat( generateRequestResults( 3, "job" ) )
			);

			test.pageLoop(
				pathToRecipe,
				new Function( "(" + initFunc + ")(" +
					JSON.stringify( intermediateResults ) + ", " +
					JSON.stringify( 10 ) + ", " +
					JSON.stringify( [":d"] ) +
				");" ),
				function(urls, results) {
					should.exist( urls );
					should.exist( results );
					results.items.should.eql( enumerateResults( [
						expected.defaultStoryDiscussion,
						expected.defaultStoryDiscussion,
						expected.defaultStoryDiscussion,
						expected.showStoryDiscussion,
						expected.showStoryDiscussion,
						expected.askStory,
						expected.askStory,
						expected.job,
						expected.job,
						expected.job
					] ) );
					done();
				}
			);
		} );
		it( "returns discussion items of last type specified by an option", function(done) {
			var intermediateResults = [
				generateIds( 10 )
			].concat(
				generateRequestResults( 3 )
					.concat( generateRequestResults( 2, "showStory" ) )
					.concat( generateRequestResults( 2, "askStory" ) )
					.concat( generateRequestResults( 3, "job" ) )
			);

			test.pageLoop(
				pathToRecipe,
				new Function( "(" + initFunc + ")(" +
					JSON.stringify( intermediateResults ) + ", " +
					JSON.stringify( 10 ) + ", " +
					JSON.stringify( [":s", ":j", ":ask", ":d"] ) +
				");" ),
				function(urls, results) {
					should.exist( urls );
					should.exist( results );
					results.items.should.eql( enumerateResults( [
						expected.askStory,
						expected.askStory
					] ) );
					done();
				}
			);
		} );
		it( "returns discussion items of last type specified by an option, even if :d isn't the last option", function(done) {
			var intermediateResults = [
				generateIds( 10 )
			].concat(
				generateRequestResults( 3 )
					.concat( generateRequestResults( 2, "showStory" ) )
					.concat( generateRequestResults( 2, "askStory" ) )
					.concat( generateRequestResults( 3, "job" ) )
			);

			test.pageLoop(
				pathToRecipe,
				new Function( "(" + initFunc + ")(" +
					JSON.stringify( intermediateResults ) + ", " +
					JSON.stringify( 10 ) + ", " +
					JSON.stringify( [":s", ":d", ":j", ":ask"] ) +
				");" ),
				function(urls, results) {
					should.exist( urls );
					should.exist( results );
					results.items.should.eql( enumerateResults( [
						expected.askStory,
						expected.askStory
					] ) );
					done();
				}
			);
		} );
	} );
	describe( "error handling", function() {
		it( "finishes with error", function(done) {
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = null,
						options = null,
						max = 30,
						scrapeScript = "irrelevant",
						systemMeta = {},
						hops = [];

					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.$ = {
						getJSON: function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function() {
									return {
										fail: function(callback) {
											callback( null, null, "blowup" );
										}
									};
								}
							};
						}
					};
				},
				function(error) {
					should.exist( error );
					error.should.equal( "blowup" );
					done();
				}
			);
		} );
	} );
	after( function(done) {
		test.finalize( done );
	} );
} );