/* jshint -W098 */

'use strict';

var should = require("should"),
	pathUtils = require("path");

var test = require("pagehop").test;

var pathToRecipe = pathUtils.resolve( pathUtils.join( __dirname, '../' ) );

describe("code-search recipe's pageLoop",function(){
	this.timeout( 10000 );
	before( function(done) {
		test.init( done );
	} );
	describe( "help", function() {
		it( "shows help pointing to recipe documentation when no query", function(done){
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
					results.items.should.eql( [
						{
							text: "Usage: code [query]",
							displayAddress: "Example: code System.Linq source:Bitbucket lang:C# repo:bvcms",
							address: "https://github.com/pagehop/recipes/blob/master/code-search/README.md"
						}
					] );
					done();
				}
			);
		});
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
						text: "CodeSearch: no query",
						address: "https://searchcode.com/"
					} ] );
					done();
				}
			);
		});
		it( "adds an item with address pointing to the same search on the site", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "query",
						options = null,
						max = 100,
						scrapeScript = "irrelevant",
						systemMeta = null,
						hops = [];
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.request = { get: function(url) {
						window.boxApi.emitEvent( "scrape", url );
						return {
							end: function(callback) {
								callback( null, {
									body: {
										"matchterm": "irrelevant",
										"previouspage": null,
										"searchterm": "irrelevant",
										"query": "irrelevant",
										"total": 0,
										"page": 0,
										"nextpage": 1,
										"results": []
									}
								} );
							}
						};
					} };
				},
				function(urls, results) {
					should.exist( urls );
					results.hops.should.eql( [ {
						text: "CodeSearch",
						address: "https://searchcode.com/?q=query"
					} ] );
					done();
				}
			);
		});
	} );
	describe( "errors", function() {
		it( "notifies the user about a network issue", function(done){
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
					window.request = { get: function(url) {
						return {
							end: function(callback) {
								var error = {
									text: "custom error"
								};
								callback( error );
							}
						};
					} };
				},
				function(urls, results) {
					should.exist( urls );
					results.items.should.eql( [ {
						text: "There was a problem, requesting results.",
						displayAddress: "custom error"
					} ] );
					done();
				}
			);
		});
		it( "notifies the user of an empty response on no-error-no-response situation", function(done){
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
					window.request = { get: function(url) {
						return {
							end: function(callback) {
								callback();
							}
						};
					} };
				},
				function(urls, results) {
					should.exist( urls );
					results.items.should.eql( [ {
						text: "Bad Server Response",
						displayAddress: "searchcode.com returned an empty response."
					} ] );
					done();
				}
			);
		});
		it( "notifies the user of an empty response, if response without body property", function(done){
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
					window.request = { get: function(url) {
						return {
							end: function(callback) {
								callback( null, {} );
							}
						};
					} };
				},
				function(urls, results) {
					should.exist( urls );
					results.items.should.eql( [ {
						text: "Bad Server Response",
						displayAddress: "searchcode.com returned an empty response."
					} ] );
					done();
				}
			);
		});
	} );
	describe( "requested urls", function() {
		it( "requests only first page, even if maxCount is 100", function(done){
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
					window.request = { get: function(url) {
						window.boxApi.emitEvent( "scrape", url );
						return {
							end: function(callback) {
								callback( null, {
									body: {
										"matchterm": "irrelevant",
										"previouspage": null,
										"searchterm": "irrelevant",
										"query": "irrelevant",
										"total": 0,
										"page": 0,
										"nextpage": 1,
										"results": []
									}
								} );
							}
						};
					} };
				},
				function(urls, results) {
					urls.should.eql( [ "https://searchcode.com/api/codesearch_I/?q=irrelevant&p=0&per_page=100" ] );
					results.items.should.eql( [ {
						text: "No results found."
					} ] );
					done();
				}
			);
		});
	} );
	describe( "successfull complete", function() {
		it( "1 page 2 results", function(done){
			test.pageLoop(
				pathToRecipe,
				function() {
					var query = "irrelevant",
						options = null,
						max = 100,
						scrapeScript = "irrelevant",
						systemMeta = null,
						hops = [],
						responses = [
							{
								body: {
									"matchterm": "using System.Linq",
									"previouspage": null,
									"searchterm": "using System.Linq lang:C#",
									"query": "using System.Linq lang:C#",
									"language_filters": [],
									"total": 371504,
									"results": [
										{
											"repo": "https://github.com/ekonbenefits/impromptu-interface.git",
											"linescount": 273,
											"location": "/Tests/UnitTestImpromptuInterface",
											"name": "impromptu-interface",
											"url": "https://searchcode.com/codesearch/view/82799715/",
											"md5hash": "3a3b02026e2b8ab5eb08bed97941bfc0",
											"lines": {
												"1": "using System;",
												"2": "using System.Collections;",
												"103": "",
												"88": "import System",
												"89": "result = linq.Where.Overloads[System.Func[int, bool]](lambda x: x < 5).OrderBy(lambda x: 10-x).First()"
											},
											"id": 82799715,
											"filename": "Linq.cs"
										},
										{
											"repo": "https://bitbucket.org/Maslow/breusable-codeplex.git",
											"linescount": 106,
											"location": "/Trunk/BReusable",
											"name": "breusable-codeplex",
											"url": "https://searchcode.com/codesearch/view/42724484/",
											"md5hash": "388c5ed4d5125216d5c22ed775b67b56",
											"lines": {
												"1": "using System;",
												"2": "using System.Collections.Generic;"
											},
											"id": 42724484,
											"filename": "Linq.cs"
										}
									],
									"page": 0,
									"nextpage": 1,
									"source_filters": [
										{
											"count": 184727,
											"source": "CodePlex",
											"id": 5
										},
										{
											"count": 112702,
											"source": "Github",
											"id": 2
										},
										{
											"count": 48924,
											"source": "Bitbucket",
											"id": 3
										},
										{
											"count": 23245,
											"source": "Google Code",
											"id": 1
										},
										{
											"count": 1929,
											"source": "Fedora Project",
											"id": 7
										},
										{
											"count": 9,
											"source": "Unknown",
											"id": 0
										},
										{
											"count": 2,
											"source": "Tizen",
											"id": 9
										},
										{
											"count": 2,
											"source": "Sourceforge",
											"id": 4
										}
									]
								}
							}
						],
						responsesCount = 0;
					window.pagehop.init( query, options, max, scrapeScript, systemMeta, hops );
					window.request = { get: function(url) {
						window.boxApi.emitEvent( "scrape", url );
						return {
							end: function(callback) {
								callback( null, responses[ responsesCount++ ] );
							}
						};
					} };
				},
				function(urls, results) {
					urls.should.eql( [
						"https://searchcode.com/api/codesearch_I/?q=irrelevant&p=0&per_page=100"
					] );

					results.items.length.should.equal( 2 );

					results.items[0].text.should.equal( "Linq.cs in impromptu-interface" );
					results.items[0].address.should.equal( "https://searchcode.com/codesearch/view/82799715/" );
					results.items[0].displayAddress.should.equal( "273 lines | https://github.com/ekonbenefits/impromptu-interface.git");
					results.items[0].preview.should.containEql( [
						"<body>",
						"	<div class=\"code-location\">",
						"		<a href=\"https://github.com/ekonbenefits/impromptu-interface.git\">impromptu-interface</a>/Tests/UnitTestImpromptuInterface/Linq.cs",
						"	</div>",
						"	<div class=\"code-result\">",
						"		<ol>",
						"			<li value=\"1\">",
						"				<pre><b>using</b> <b>System</b>;</pre>",
						"			</li>",
						"			<li value=\"2\">",
						"				<pre><b>using</b> <b>System</b>.Collections;</pre>",
						"			</li>",
						"			<li value=\"88\">",
						"				<pre>import <b>System</b></pre>",
						"			</li>",
						"			<li value=\"89\">",
						"				<pre>result = <b>linq</b>.Where.Overloads[<b>System</b>.Func[int, bool]](lambda x: x < 5).OrderBy(lambda x: 10-x).First()</pre>",
						"			</li>",
						"			<li value=\"103\">",
						"				<pre></pre>",
						"			</li>",
						"		</ol>",
						"	</div>",
						"</body>",
					].join( "\n" ) );

					results.items[1].text.should.equal( "Linq.cs in breusable-codeplex" );
					results.items[1].address.should.equal( "https://searchcode.com/codesearch/view/42724484/" );
					results.items[1].displayAddress.should.equal( "106 lines | https://bitbucket.org/Maslow/breusable-codeplex.git");
					results.items[1].preview.should.containEql( [
						"<body>",
						"	<div class=\"code-location\">",
						"		<a href=\"https://bitbucket.org/Maslow/breusable-codeplex.git\">breusable-codeplex</a>/Trunk/BReusable/Linq.cs",
						"	</div>",
						"	<div class=\"code-result\">",
						"		<ol>",
						"			<li value=\"1\">",
						"				<pre><b>using</b> <b>System</b>;</pre>",
						"			</li>",
						"			<li value=\"2\">",
						"				<pre><b>using</b> <b>System</b>.Collections.Generic;</pre>",
						"			</li>",
						"		</ol>",
						"	</div>",
						"</body>",
					].join( "\n" ) );

					done();
				}
			);
		});
	} );
	after( function(done) {
		test.finalize( done );
	} );
});