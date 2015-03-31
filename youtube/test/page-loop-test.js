'use strict';

var should = require("should"),
	pathUtils = require("path");

var test = require("pagehop").test;

var pathToRecipe = pathUtils.resolve( pathUtils.join( __dirname, '../' ) );

describe("youtube recipe's pageLoop",function(){
	this.timeout( 10000 );

	before( function(done) {
		test.init( done );
	} );
	describe( "number of pages to be parsed", function() {
		it( "parses 0 pages, if no query", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = null,
						options = null,
						max = 50,
						scrapeScript = "irrelevant",
						systemMeta = null,
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.$ = {
						getJSON: function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( {
										items:[],
										nextPageToken: "ASKJHH1"
									} );
									return {
										fail: function() {}
									};
								}
							};
						}
					};
				},
				function(urls, results) {
					should.exist( urls );
					should.exist( results );
					urls.length.should.equal( 0 );
					results.items.length.should.equal( 0 );
					done();
				}
			);
		});
		it( "parses 1 page, if maxCount is 50", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = null,
						max = 50,
						scrapeScript = "irrelevant",
						systemMeta = null,
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.$ = {
						getJSON: function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( {
										items:[],
										nextPageToken: "ASKJHH1"
									} );
									return {
										fail: function() {}
									};
								}
							};
						}
					};
				},
				function(urls, results) {
					should.exist( urls );
					should.exist( results );
					urls.length.should.equal( 1 );
					results.items.length.should.equal( 0 );
					done();
				}
			);
		});
		it( "parses 1 page, if maxCount is 51 and firstResult.nextPageToken is missing", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = null,
						max = 51,
						scrapeScript = "irrelevant",
						systemMeta = null,
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.$ = {
						getJSON: function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( {
										items:[]
									} );
									return {
										fail: function() {}
									};
								}
							};
						}
					};
				},
				function(urls, results) {
					should.exist( urls );
					should.exist( results );
					urls.length.should.equal( 1 );
					results.items.length.should.equal( 0 );
					done();
				}
			);
		});
		it( "parses 2 pages, if maxCount is 51", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = null,
						max = 51,
						scrapeScript = "irrelevant",
						systemMeta = null,
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.$ = {
						getJSON: function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( {
										items:[],
										nextPageToken: "ASKJHH1"
									} );
									return {
										fail: function() {}
									};
								}
							};
						}
					};
				},
				function(urls, results) {
					should.exist( urls );
					should.exist( results );
					urls.length.should.equal( 2 );
					results.items.length.should.equal( 0 );
					done();
				}
			);
		});
		it( "parses 2 pages, if maxCount is 100", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = null,
						max = 100,
						scrapeScript = "irrelevant",
						systemMeta = null,
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.$ = {
						getJSON: function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( {
										items:[],
										nextPageToken: "ASKJHH1"
									} );
									return {
										fail: function() {}
									};
								}
							};
						}
					};
				},
				function(urls, results) {
					should.exist( urls );
					should.exist( results );
					urls.length.should.equal( 2 );
					results.items.length.should.equal( 0 );
					done();
				}
			);
		});
	} );
	describe( "hops array changes", function() {
		it( "adds an item with a default url if no query", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = null,
						options = null,
						max = 50,
						scrapeScript = "irrelevant",
						systemMeta = null,
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.$ = {
						getJSON: function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( {
										items:[],
										nextPageToken: "ASKJHH1"
									} );
									return {
										fail: function() {}
									};
								}
							};
						}
					};
				},
				function(urls, results) {
					should.exist( urls );
					results.hops.should.eql( [ {
						text: "YouTube: no query",
						address: "https://www.youtube.com/"
					} ] );
					done();
				}
			);
		});
		it( "adds an item with address pointing to the same search on the site", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "some",
						options = null,
						max = 50,
						scrapeScript = "irrelevant",
						systemMeta = null,
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.$ = {
						getJSON: function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( {
										items:[],
										nextPageToken: "ASKJHH1"
									} );
									return {
										fail: function() {}
									};
								}
							};
						}
					};
				},
				function(urls, results) {
					should.exist( urls );
					results.hops.should.eql( [ {
						text: "YouTube",
						address: "https://www.youtube.com/results?search_query=some"
					} ] );
					done();
				}
			);
		});
	} );
	describe( "result parsing", function() {
		it( "parses actual results", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "math",
						options = null,
						max = 2,
						scrapeScript = "irrelevant",
						systemMeta = null,
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.$ = {
						getJSON: function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( {
										"nextPageToken": "CAIQAA",
										"items": [
											{
												"id":
												{
													"kind": "youtube#channel",
													"channelId": "UCn2SbZWi4yTkmPUj5wnbfoA"
												},
												"snippet":
												{
													"publishedAt": "2011-11-20T03:21:51.000Z",
													"channelId": "UCn2SbZWi4yTkmPUj5wnbfoA",
													"title": "Learn Math Tutorials",
													"description": "This channel provides a growing resource of helpful math tutorials.",
													"thumbnails":
													{
														"default":
														{
															"url": "https://lh4.googleusercontent.com/-Mv-87KY9NMw/AAAAAAAAAAI/AAAAAAAAAAA/ixdKqoTmup4/photo.jpg"
														},
														"medium":
														{
															"url": "https://lh4.googleusercontent.com/-Mv-87KY9NMw/AAAAAAAAAAI/AAAAAAAAAAA/ixdKqoTmup4/photo.jpg"
														},
														"high":
														{
															"url": "https://lh4.googleusercontent.com/-Mv-87KY9NMw/AAAAAAAAAAI/AAAAAAAAAAA/ixdKqoTmup4/photo.jpg"
														}
													},
													"channelTitle": "learnmathtutorials",
													"liveBroadcastContent": "none"
												}
											},
											{
												"id":
												{
													"kind": "youtube#video",
													"videoId": "68S3vSGvSXU"
												},
												"snippet":
												{
													"publishedAt": "2014-01-16T19:00:06.000Z",
													"channelId": "UCTAgbu2l6_rBKdbTvEodEDw",
													"title": "Math Heads: DO MATH IN YOUR HEAD! - Math Bites with Danica McKellar",
													"description": "Throw away that calculator on your phone and start doing math in your head! Join host Danica McKellar as she explains how easy and worthwhile it can be.",
													"thumbnails":
													{
														"default":
														{
															"url": "https://i.ytimg.com/vi/68S3vSGvSXU/default.jpg"
														},
														"medium":
														{
															"url": "https://i.ytimg.com/vi/68S3vSGvSXU/mqdefault.jpg"
														},
														"high":
														{
															"url": "https://i.ytimg.com/vi/68S3vSGvSXU/hqdefault.jpg"
														}
													},
													"channelTitle": "Nerdist",
													"liveBroadcastContent": "none"
												}
											}
										]
									} );
									return {
										fail: function() {}
									};
								}
							};
						}
					};
				},
				function(urls, results) {
					should.exist( urls );
					results.items.should.eql( [
						{
							"text": "Learn Math Tutorials",
							"address": "http://www.youtube.com/channel/UCn2SbZWi4yTkmPUj5wnbfoA",
							"displayAddress": "Channel | Sun Nov 20 2011"
						},
						{
							"text": "Math Heads: DO MATH IN YOUR HEAD! - Math Bites with Danica McKellar",
							"address": "http://www.youtube.com/watch?v=68S3vSGvSXU",
							"displayAddress": "by Nerdist | Thu Jan 16 2014"
						}
					] );
					done();
				}
			);
		});
		it( "parses an empty set", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "math",
						options = null,
						max = 2,
						scrapeScript = "irrelevant",
						systemMeta = null,
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.$ = {
						getJSON: function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( {
										"items": []
									} );
									return {
										fail: function() {}
									};
								}
							};
						}
					};
				},
				function(urls, results) {
					should.exist( urls );
					results.items.should.eql( [] );
					done();
				}
			);
		});
	} );
	describe( "urls of pages to be scraped", function() {
		it( "scrapes the correct urls", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "math",
						options = null,
						max = 51,
						scrapeScript = "irrelevant",
						systemMeta = null,
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.$ = {
						getJSON: function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( {
										items:[],
										nextPageToken: "ASKJHH1"
									} );
									return {
										fail: function() {}
									};
								}
							};
						}
					};
				},
				function(urls) {
					should.exist( urls );
					urls.should.eql( [
						"https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=math&fields=items(id%2Csnippet)%2CnextPageToken&key=AIzaSyA76ApLecQ78zo38QKNet_0fT5aewyKV3c",
						"https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=math&fields=items(id%2Csnippet)%2CnextPageToken&key=AIzaSyA76ApLecQ78zo38QKNet_0fT5aewyKV3c&pageToken=ASKJHH1"
					] );
					done();
				}
			);
		});
	} );
	// TODO: tests for parsing the results
	describe( "error handling", function() {
		it( "finishes with error", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = null,
						max = 200,
						scrapeScript = "irrelevant",
						systemMeta = null,
						hops = [],
						pagehop = window.pagehop;

					pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
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
		});
	} );
	after( function(done) {
		test.finalize( done );
	} );
});