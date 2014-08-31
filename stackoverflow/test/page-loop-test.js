'use strict';

var should = require("should"),
	pathUtils = require("path");

var test = require("pagehop").test;

var pathToRecipe = pathUtils.resolve( pathUtils.join( __dirname, '../' ) );

describe("stackoverflow recipe's pageLoop",function(){
	this.timeout( 10000 );
	before( function(done) {
		test.init( done );
	} );
	describe( "number of pages to be scraped", function() {
		it( "scrapes 0 pages, if no query", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = null,
						options = null,
						max = 10,
						scrapeScript = "irrelevant";
					window.pagehop.init( query, options, max, scrapeScript );
					window.$ = {
						getJSON: function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( {
										items:[],
										has_more: true
									} );
									return {
										fail: function() {}
									};
								}
							};
						}
					};
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
		it( "scrapes 1 page, if maxCount is 10", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = null,
						max = 10,
						scrapeScript = "irrelevant";
					window.pagehop.init( query, options, max, scrapeScript );
					window.$ = {
						getJSON: function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( {
										items:[],
										has_more: true
									} );
									return {
										fail: function() {}
									};
								}
							};
						}
					};
				},
				function(urls, result) {
					should.exist( urls );
					should.exist( result );
					urls.length.should.equal( 1 );
					result.length.should.equal( 0 );
					done();
				}
			);
		});
		it( "scrapes 1 page, if maxCount is 101 and firstResult.has_more=false", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = null,
						max = 101,
						scrapeScript = "irrelevant";
					window.pagehop.init( query, options, max, scrapeScript );
					window.$ = {
						getJSON: function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( {
										items:[],
										has_more: false
									} );
									return {
										fail: function() {}
									};
								}
							};
						}
					};
				},
				function(urls, result) {
					should.exist( urls );
					should.exist( result );
					urls.length.should.equal( 1 );
					result.length.should.equal( 0 );
					done();
				}
			);
		});
		it( "scrapes 2 pages, if maxCount is 101", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = null,
						max = 101,
						scrapeScript = "irrelevant";
					window.pagehop.init( query, options, max, scrapeScript );
					window.$ = {
						getJSON: function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( {
										items:[],
										has_more: true
									} );
									return {
										fail: function() {}
									};
								}
							};
						}
					};
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
		it( "scrapes 2 pages, if maxCount is 200", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = null,
						max = 200,
						scrapeScript = "irrelevant";
					window.pagehop.init( query, options, max, scrapeScript );
					window.$ = {
						getJSON: function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( {
										items:[],
										has_more: true
									} );
									return {
										fail: function() {}
									};
								}
							};
						}
					};
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
	} );
	describe( "result parsing", function() {
		it( "parses actual results", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "math",
						options = null,
						max = 2,
						scrapeScript = "irrelevant";
					window.pagehop.init( query, options, max, scrapeScript );
					window.$ = {
						getJSON: function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( {
										"items": [
										{
											"tags": ["math", "integer"],
											"owner":
											{
												"reputation": 1281,
												"user_id": 45875,
												"user_type": "registered",
												"accept_rate": 86,
												"profile_image": "https://www.gravatar.com/avatar/7795243ee4ab22351bffd390455657f5?s=128&d=identicon&r=PG",
												"display_name": "Hrvoje Prgeša",
												"link": "http://stackoverflow.com/users/45875/hrvoje-prge%c5%a1a"
											},
											"is_answered": true,
											"view_count": 73261,
											"protected_date": 1370841374,
											"accepted_answer_id": 731912,
											"answer_count": 112,
											"community_owned_date": 1239237333,
											"score": 727,
											"last_activity_date": 1403004283,
											"creation_date": 1239224658,
											"last_edit_date": 1247968500,
											"question_id": 731832,
											"link": "http://stackoverflow.com/questions/731832/interview-question-ffn-n",
											"title": "Interview question: f(f(n)) == -n"
										},
										{
											"tags": ["math", "language-agnostic", "random"],
											"owner":
											{
												"reputation": 10214,
												"user_id": 463065,
												"user_type": "registered",
												"accept_rate": 87,
												"profile_image": "https://www.gravatar.com/avatar/edb56216fd1104b03e56477dfc1a282c?s=128&d=identicon&r=PG",
												"display_name": "Trufa",
												"link": "http://stackoverflow.com/users/463065/trufa"
											},
											"is_answered": true,
											"view_count": 86916,
											"protected_date": 1316452015,
											"accepted_answer_id": 3956538,
											"answer_count": 26,
											"score": 705,
											"last_activity_date": 1382197178,
											"creation_date": 1287373252,
											"last_edit_date": 1306022567,
											"question_id": 3956478,
											"link": "http://stackoverflow.com/questions/3956478/understanding-randomness",
											"title": "Understanding &quot;randomness&quot;"
										}],
										"has_more": true,
										"quota_max": 10000,
										"quota_remaining": 9998
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
					results.should.eql( [
						{
							"text": "Interview question: f(f(n)) == -n",
							"address": "http://stackoverflow.com/questions/731832/interview-question-ffn-n",
							"displayAddress": "<b>answered</b> | owner: Hrvoje Prgeša | Tue Jun 17 2014"
						},
						{
							"text": "Understanding &quot;randomness&quot;",
							"address": "http://stackoverflow.com/questions/3956478/understanding-randomness",
							"displayAddress": "<b>answered</b> | owner: Trufa | Sat Oct 19 2013"
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
						max = 20,
						scrapeScript = "irrelevant";
					window.pagehop.init( query, options, max, scrapeScript );
					window.$ = {
						getJSON: function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( {
										"items": [],
										"has_more": false,
										"quota_max": 10000,
										"quota_remaining": 9998
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
					results.should.eql( [] );
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
						max = 101,
						scrapeScript = "irrelevant";
					window.pagehop.init( query, options, max, scrapeScript );
					window.$ = {
						getJSON: function(url) {
							window.boxApi.emitEvent( "scrape", url );
							return {
								done: function(func) {
									func( {
										items:[],
										has_more: true
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
						"http://api.stackexchange.com/2.2/search/advanced?key=Z10BXZ9DtCJ7470hy*SYsw((&page=1&pagesize=100&order=desc&sort=relevance&q=math&site=stackoverflow",
						"http://api.stackexchange.com/2.2/search/advanced?key=Z10BXZ9DtCJ7470hy*SYsw((&page=2&pagesize=100&order=desc&sort=relevance&q=math&site=stackoverflow"
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
						pagehop = window.pagehop;

					pagehop.init( query, options, max, scrapeScript );
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