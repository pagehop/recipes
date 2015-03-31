/* jshint -W098 */
/* jshint -W054 */
/* jshint -W030 */
/* jshint -W004 */

'use strict';

var should = require("should"),
	pathUtils = require("path");

var test = require("pagehop").test;

var pathToRecipe = pathUtils.resolve( pathUtils.join( __dirname, '../' ) );

describe( "pixi-docs recipe's pageLoop",function(){
	this.timeout( 10000 );

	before( function(done) {
		test.init( done );
	} );
	describe( "changes to the hops array", function() {
		it( "adds an item with default address", function(done){
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
					window.request = { get: function(url) {
						window.boxApi.emitEvent( "scrape", url );
						return {
							end: function(callback) {
								callback( null, {
									body: {
										classitems: [],
										classes: {}
									}
								} );
							}
						};
					} };
				},
				function(urls, results) {
					should.exist( urls );
					results.hops.should.eql( [ {
						text: "pixiDocs",
						address: "http://www.goodboydigital.com/pixijs/docs/"
					} ] );
					done();
				}
			);
		});
	} );
	describe( "errors", function() {
		it( "handles network error", function(done){
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
								var error = true;
								callback( error );
							}
						};
					} };
				},
				function(urls, results) {
					should.exist( urls );
					results.items.should.eql( [ {
						text: "Error: can't retrieve data",
						displayAddress: "press ⏎ to browse the website",
						address: "http://www.goodboydigital.com/pixijs/docs/"
					} ] );
					done();
				}
			);
		});
		it( "handles parsing error", function(done){
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
						text: "Error: unexpected data format",
						displayAddress: "press ⏎ to browse the website",
						address: "http://www.goodboydigital.com/pixijs/docs/"
					} ] );
					done();
				}
			);
		});
	} );
	describe( "requested urls", function() {
		it( "requests data.json", function(done){
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
										classitems: [],
										classes: {}
									}
								} );
							}
						};
					} };
				},
				function(urls, results) {
					should.exist( urls );
					should.exist( results );
					urls.should.eql( [ "http://www.goodboydigital.com/pixijs/docs/data.json" ] );
					done();
				}
			);
		});
	} );
	describe( "successful complete", function() {
		it( "successfully requests and parses json", function(done){
			test.pageLoop(
				pathToRecipe,
				new Function( "( " + function(response) {
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
									body: response
								} );
							}
						};
					} };
				} + " )( " + JSON.stringify( require("./data/results").results ) + " );" ),
				function(urls, results) {
					urls.should.eql( [
						"http://www.goodboydigital.com/pixijs/docs/data.json"
					] );
					var foundMatch = false;
					for( var i = 0; i < results.items.length; i++ ) {
						var item = results.items[ i ];
						if( item.text === "Text class" && item.displayAddress === "class" ) {
							item.displayText.should.equal( "<b>Text</b> class" );
							item.address.should.equal( "http://www.goodboydigital.com/pixijs/docs/classes/Text.html" );
							item.preview.should.containEql( [
								"<body>",
								"	<div class=\"header\">",
								"		<b>Text</b> Class",
								"	</div>",
								"	<hr class=\"separator\">",
								"	<p class=\"extends\">",
								"		extends <span class=\"typeName\">Sprite</span>",
								"	</p>",
								"	<div>",
								"		<p>",
								"			Constructor:",
								"			<div id=\"constructorExpression\">",
								"				<span class=\"js-keyword\">new</span> Text( text, [style] )",
								"			</div>",
								"		</p>",
								"		<p>",
								"			Parameters:",
								"		</p>",
								"		<ul>",
								"				<li>",
								"					text <b>String</b> <br/>The copy that you would like the text to display",
								"				</li>",
								"				<li>",
								"					style <b>Object</b> <span class=\"optional\">optional</span><br/>The style parameters",
								"						<ul>",
								"							<li>font <b>String</b> <span class=\"optional\">optional</span><br/>default &#x27;bold 20px Arial&#x27; The style and size of the font</li>",
								"							<li>fill <b>String|Number</b> <span class=\"optional\">optional</span><br/>A canvas fillstyle that will be used on the text e.g &#x27;red&#x27;, &#x27;#00FF00&#x27;</li>",
								"							<li>align <b>String</b> <span class=\"optional\">optional</span><br/>Alignment for multiline text (&#x27;left&#x27;, &#x27;center&#x27; or &#x27;right&#x27;), does not affect single line text</li>",
								"							<li>stroke <b>String|Number</b> <span class=\"optional\">optional</span><br/>A canvas fillstyle that will be used on the text stroke e.g &#x27;blue&#x27;, &#x27;#FCFF00&#x27;</li>",
								"							<li>strokeThickness <b>Number</b> <span class=\"optional\">optional</span><br/>A number that represents the thickness of the stroke. Default is 0 (no stroke)</li>",
								"							<li>wordWrap <b>Boolean</b> <span class=\"optional\">optional</span><br/>Indicates if word wrap should be used</li>",
								"							<li>wordWrapWidth <b>Number</b> <span class=\"optional\">optional</span><br/>The width at which text will wrap, it needs wordWrap to be set to true</li>",
								"							<li>dropShadow <b>Boolean</b> <span class=\"optional\">optional</span><br/>Set a drop shadow for the text</li>",
								"							<li>dropShadowColor <b>String</b> <span class=\"optional\">optional</span><br/>A fill style to be used on the dropshadow e.g &#x27;red&#x27;, &#x27;#00FF00&#x27;</li>",
								"							<li>dropShadowAngle <b>Number</b> <span class=\"optional\">optional</span><br/>Set a angle of the drop shadow</li>",
								"							<li>dropShadowDistance <b>Number</b> <span class=\"optional\">optional</span><br/>Set a distance of the drop shadow</li>",
								"						</ul>",
								"				</li>",
								"		</ul>",
								"	</div>",
								"	<hr class=\"separator\">"
							].join( "\n" ) );
							foundMatch = true;
							break;
						}
					}
					foundMatch.should.be.ok;

					done();
				}
			);
		});
	} );
	after( function(done) {
		test.finalize( done );
	} );
});