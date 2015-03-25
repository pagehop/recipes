'use strict';

var should = require("should"),
	System = require('es6-module-loader').System,
	utils;

var beforeFunc = function(done) {
	this.timeout( 100000 );

	System.transpiler = "babel";
	System.import( "../src/utils" ).then( function(u) {
		utils = u.default;
		done();
	} ).catch(function(err){
		console.log( 'err', err );
	});
};

describe( "pixi-docs recipe's utils", function() {
	before( beforeFunc );
	describe( "validateJson(dataJson)", function() {
		it( "throws an error if no data is passed", function() {
			should( function() {
				utils.validateJson();
			} ).throw();
		} );
		it( "throws an error if no classes property", function() {
			should( function() {
				utils.validateJson( {
					classitems: []
				} );
			} ).throw();
		} );
		it( "throws an error if classes property is array", function() {
			should( function() {
				utils.validateJson( {
					classes: [],
					classitems: []
				} );
			} ).throw();
		} );
		it( "throws an error if classes property is not an object", function() {
			should( function() {
				utils.validateJson( {
					classes: 1,
					classitems: []
				} );
			} ).throw();
		} );
		it( "throws an error if no classitems property", function() {
			should( function() {
				utils.validateJson( {
					classes: {}
				} );
			} ).throw();
		} );
		it( "throws an error if classitems property is not an array", function() {
			should( function() {
				utils.validateJson( {
					classes: {},
					classitems: {}
				} );
			} ).throw();
		} );
		it( "doesn't throw if format is correct although object is empty", function() {
			should( function() {
				utils.validateJson( {
					classes: {},
					classitems: []
				} );
			} ).not.throw();
		} );
	} );
	describe( "alterItemDataForRendering(item)", function() {
		it( "doesn't throw an error if no params", function() {
			should( function() {
				utils.alterItemDataForRendering( {
					"name": "DisplayObject",
					"shortname": "DisplayObject",
					"classitems": [],
					"plugins": [],
					"extensions": [],
					"plugin_for": [],
					"extension_for": [],
					"module": "PIXI",
					"file": "src/pixi/display/DisplayObject.js",
					"line": 5,
					"description": "The base class for all objects that are rendered on the screen.\nThis is an abstract class and should not be used on its own rather it should be extended.",
					"is_constructor": 1
				} );
			} ).not.throw();
		} );
		it( "adds paramList property if params", function() {
			utils.alterItemDataForRendering( {
				"name": "CanvasRenderer",
				"shortname": "CanvasRenderer",
				"classitems": [],
				"plugins": [],
				"extensions": [],
				"plugin_for": [],
				"extension_for": [],
				"module": "PIXI",
				"file": "src/pixi/renderers/canvas/CanvasRenderer.js",
				"line": 5,
				"description": "The CanvasRenderer draws the Stage and all its content onto a 2d canvas. This renderer should be used for browsers that do not support webGL.\nDon't forget to add the CanvasRenderer.view to your DOM or you will not see anything :)",
				"is_constructor": 1,
				"params": [
					{
						"name": "width=800",
						"description": "the width of the renderers view",
						"type": "Number"
					},
					{
						"name": "source",
						"description": "the source object (image or canvas)",
						"type": "String"
					},
					{
						"name": "height",
						"description": "the height of the canvas view",
						"type": "Number",
						"optional": true,
						"optdefault": "600"
					},
					{
						"name": "options",
						"description": "The optional renderer parameters",
						"type": "Object",
						"optional": true
					}
				]
			} ).paramList.should.equal( "width=800, source, [height=600], [options]" );
		} );
	} );
	describe( "copyInheritedMembers(classes)", function() {
		it( "doesn't throw an error if no classes", function() {
			should( function() {
				utils.copyInheritedMembers( {} );
			} ).not.throw();
		} );
		it( "preserves the correct version of a member", function() {
			utils.copyInheritedMembers( {
				"ClassA" : {
					"name": "ClassA",
					"classitems": [
						{
							"itemtype": "method",
							"name": "method1"
						},
						{
							"itemtype": "method",
							"description": "ver0",
							"name": "method2"
						}
					],
					methods: [
						{
							"itemtype": "method",
							"name": "method1"
						},
						{
							"itemtype": "method",
							"description": "ver0",
							"name": "method2"
						}
					]
				},
				"ClassB" : {
					"name": "ClassB",
					"extends": "ClassA",
					"classitems": [
						{
							"itemtype": "method",
							"description": "ver1",
							"name": "method2"
						}
					],
					methods: [
						{
							"itemtype": "method",
							"description": "ver1",
							"name": "method2"
						}
					]
				}
			} )[ "ClassB" ].should.eql( {
				"name": "ClassB",
				"extends": "ClassA",
				"classitems": [
					{
						"itemtype": "method",
						"name": "method1"
					},
					{
						"itemtype": "method",
						"description": "ver1",
						"name": "method2"
					}
				],
				methods: [
					{
						"itemtype": "method",
						"name": "method1"
					},
					{
						"itemtype": "method",
						"description": "ver1",
						"name": "method2"
					}
				]
			} );
		} );
		it( "sorts classitems, properties and methods arrays", function() {
			utils.copyInheritedMembers( {
				"ClassA" : {
					"name": "ClassA",
					"classitems": [
						{
							"itemtype": "method",
							"name": "method1"
						}
					],
					methods: [
						{
							"itemtype": "method",
							"name": "method1"
						}
					]
				},
				"ClassB" : {
					"name": "ClassB",
					"extends": "ClassA",
					"classitems": [
						{
							"itemtype": "method",
							"name": "method2"
						}
					],
					methods: [
						{
							"itemtype": "method",
							"name": "method2"
						}
					]
				}
			} )[ "ClassB" ].should.eql( {
				"name": "ClassB",
				"extends": "ClassA",
				"classitems": [
					{
						"itemtype": "method",
						"name": "method1"
					},
					{
						"itemtype": "method",
						"name": "method2"
					},
				],
				methods: [
					{
						"itemtype": "method",
						"name": "method1"
					},
					{
						"itemtype": "method",
						"name": "method2"
					}
				]
			} );
		} );
		it( "doesn't break if circular reference", function() {
			should( function() {
				utils.copyInheritedMembers( {
					"ClassA" : {
						"name": "ClassA",
						"extends": "ClassC",
						"classitems": [
							{
								"itemtype": "property",
								"name": "prop1"
							}
						],
						properties: [
							{
								"itemtype": "property",
								"name": "prop1"
							}
						]
					},
					"ClassB" : {
						"name": "ClassB",
						"extends": "ClassA",
						"classitems": [
							{
								"itemtype": "property",
								"name": "prop2"
							}
						],
						properties: [
							{
								"itemtype": "property",
								"name": "prop2"
							}
						]
					},
					"ClassC" : {
						"name": "ClassC",
						"extends": "ClassB",
						"classitems": [
							{
								"itemtype": "property",
								"name": "prop3"
							}
						],
						properties: [
							{
								"itemtype": "property",
								"name": "prop3"
							}
						]
					}
				} );
			} ).not.throw();
		} );
	} );
	describe( "parseDataJson(dataJson)", function() {
		it( "parses classes without constructor", function() {
			var parsed = utils.parseDataJson( {
				classitems: [],
				classes: {
					"WebGLGraphicsData": {
						"name": "WebGLGraphicsData",
						"shortname": "WebGLGraphicsData",
						"classitems": [],
						"plugins": [],
						"extensions": [],
						"plugin_for": [],
						"extension_for": [],
						"module": "PIXI",
						"file": "src/pixi/renderers/webgl/utils/WebGLGraphics.js",
						"line": 828,
						"access": "private",
						"tagname": "",
						"static": 1
					}
				}
			} );

			parsed.length.should.equal( 1 );
			parsed[ 0 ].text.should.equal( "WebGLGraphicsData class" );
			parsed[ 0 ].displayText.should.equal( "<b>WebGLGraphicsData</b> class" );
			parsed[ 0 ].displayAddress.should.equal( "class" );
			parsed[ 0 ].address.should.equal( "http://www.goodboydigital.com/pixijs/docs/classes/WebGLGraphicsData.html" );
			parsed[ 0 ].preview.should.containEql( [
				"<body>",
				"	<div class=\"header\">",
				"		<b>WebGLGraphicsData</b> Class",
				"	</div>",
				"	<hr class=\"separator\">",
				"	<h3>No constructor</h3>",
				"	<hr class=\"separator\">",
				"</body>"
			].join( "\n" ) );
		} );
		it( "sorts items", function() {
			var parsed = utils.parseDataJson( {
				classitems: [],
				classes: {
					"WebGLGraphicsData": {
						"name": "WebGLGraphicsData",
						"shortname": "WebGLGraphicsData",
						"classitems": [],
						"plugins": [],
						"extensions": [],
						"plugin_for": [],
						"extension_for": [],
						"module": "PIXI",
						"file": "src/pixi/renderers/webgl/utils/WebGLGraphics.js",
						"line": 828,
						"access": "private",
						"tagname": "",
						"static": 1
					},
					"A": {
						"name": "A",
						"shortname": "WebGLGraphicsData",
						"classitems": [],
						"plugins": [],
						"extensions": [],
						"plugin_for": [],
						"extension_for": [],
						"module": "PIXI",
						"file": "src/pixi/renderers/webgl/utils/WebGLGraphics.js",
						"line": 828,
						"access": "private",
						"tagname": "",
						"static": 1
					}
				}
			} );

			parsed.length.should.equal( 2 );
			parsed[ 0 ].text.should.equal( "A class" );
		} );
		it( "doesn't break when properties miss their class", function() {
			should( function() {
				utils.parseDataJson( {
					classitems: [
						{
							"file": "src/pixi/filters/FilterBlock.js",
							"line": 13,
							"description": "The visible state of this FilterBlock.",
							"itemtype": "property",
							"name": "visible",
							"type": "Boolean",
							"class": "FilterBlock"
						},
						{
							"file": "src/pixi/filters/FilterBlock.js",
							"line": 21,
							"description": "The renderable state of this FilterBlock.",
							"itemtype": "property",
							"name": "renderable",
							"type": "Boolean",
							"class": "FilterBlock"
						}
					],
					classes: {}
				} );
			} ).not.throw();
		} );
		it( "parses properties", function() {
			var parsed = utils.parseDataJson( {
				classitems: [
					{
						"file": "src/pixi/filters/FilterBlock.js",
						"line": 13,
						"description": "The visible state of this FilterBlock.",
						"itemtype": "property",
						"name": "visible",
						"type": "Boolean",
						"class": "FilterBlock"
					},
					{
						"file": "src/pixi/filters/FilterBlock.js",
						"line": 21,
						"description": "The renderable state of this FilterBlock.",
						"itemtype": "property",
						"name": "renderable",
						"type": "Boolean",
						"class": "FilterBlock"
					}
				],
				classes: {
					"FilterBlock": {
						"name": "FilterBlock",
						"shortname": "FilterBlock",
						"classitems": [],
						"plugins": [],
						"extensions": [],
						"plugin_for": [],
						"extension_for": [],
						"module": "PIXI",
						"file": "src/pixi/filters/FilterBlock.js",
						"line": 5,
						"description": "A target and pass info object for filters.",
						"is_constructor": 1
					}
				}
			} );

			parsed[ 0 ].text.should.equal( "FilterBlock class" );

			parsed[ 1 ].text.should.equal( "FilterBlock.renderable property" );
			parsed[ 1 ].displayText.should.equal( "FilterBlock.<b>renderable</b> property" );
			parsed[ 1 ].address.should.equal( "http://www.goodboydigital.com/pixijs/docs/classes/FilterBlock.html#property_renderable" );
			parsed[ 1 ].displayAddress.should.equal( "property" );
			parsed[ 1 ].preview.should.containEql( [
				"<body>",
				"	<div class=\"header\">",
				"		FilterBlock.<b>renderable</b> property",
				"	</div>",
				"",
				"	<hr class=\"separator\">",
				"",
				"	<p class=\"type\">",
				"		of type <span class=\"typeName\">Boolean</span>",
				"	</p>",
				"	<p class=\"definitionSource\">",
				"		defined in <span class=\"typeName\">FilterBlock</span>",
				"	</p>",
				"	<p class=\"description\">",
				"		The renderable state of this FilterBlock.",
				"	</p>",
				"</body>"
			].join( "\n" ) );
		} );
		it( "doesn't break when methods miss their class", function() {
			should( function() {
				utils.parseDataJson( {
					classitems: [
						{
							"file": "src/pixi/display/DisplayObject.js",
							"line": 220,
							"description": "A callback that is used when the users mouse rolls over the displayObject",
							"itemtype": "method",
							"name": "mouseover",
							"params": [
								{
									"name": "interactionData",
									"description": "",
									"type": "InteractionData"
								}
							],
							"class": "DisplayObject"
						},
						{
							"file": "src/pixi/display/DisplayObject.js",
							"line": 226,
							"description": "A callback that is used when the users mouse leaves the displayObject",
							"itemtype": "method",
							"name": "mouseout",
							"params": [
								{
									"name": "interactionData",
									"description": "",
									"type": "InteractionData"
								}
							],
							"class": "DisplayObject"
						}
					],
					classes: {}
				} );
			} ).not.throw();
		} );
		it( "parses methods", function() {
			var parsed = utils.parseDataJson( {
				classitems: [
					{
						"file": "src/pixi/display/DisplayObject.js",
						"line": 220,
						"description": "A callback that is used when the users mouse rolls over the displayObject",
						"itemtype": "method",
						"name": "mouseover",
						"params": [
							{
								"name": "interactionData",
								"description": "",
								"type": "InteractionData"
							}
						],
						"class": "DisplayObject"
					},
					{
						"file": "src/pixi/display/DisplayObject.js",
						"line": 226,
						"description": "A callback that is used when the users mouse leaves the displayObject",
						"itemtype": "method",
						"name": "mouseout",
						"params": [
							{
								"name": "interactionData",
								"description": "",
								"type": "InteractionData"
							}
						],
						"class": "DisplayObject"
					}
				],
				classes: {
					"DisplayObject": {
						"name": "DisplayObject",
						"shortname": "DisplayObject",
						"classitems": [],
						"plugins": [],
						"extensions": [],
						"plugin_for": [],
						"extension_for": [],
						"module": "PIXI",
						"file": "src/pixi/display/DisplayObject.js",
						"line": 5,
						"description": "The base class for all objects that are rendered on the screen.\nThis is an abstract class and should not be used on its own rather it should be extended.",
						"is_constructor": 1
					}
				}
			} );

			parsed[ 0 ].text.should.equal( "DisplayObject class" );

			parsed[ 1 ].text.should.equal( "DisplayObject.mouseout method" );
			parsed[ 1 ].displayText.should.equal( "DisplayObject.<b>mouseout</b> method" );
			parsed[ 1 ].address.should.equal( "http://www.goodboydigital.com/pixijs/docs/classes/DisplayObject.html#method_mouseout" );
			parsed[ 1 ].displayAddress.should.equal( "method" );
			parsed[ 1 ].preview.should.containEql( [
				"<body>",
				"	<div class=\"header\">",
				"		<b>mouseout</b>( interactionData )",
				"	</div>",
				"",
				"	<hr class=\"separator\">",
				"	<p class=\"definitionSource\">",
				"		defined in <span class=\"typeName\">DisplayObject</span>",
				"	</p>",
				"",
				"	<p>",
				"		Parameters:",
				"	</p>",
				"	<ul>",
				"			<li>",
				"				interactionData <b>InteractionData</b> <br/>",
				"			</li>",
				"	</ul>",
				"	<hr class=\"separator\">",
				"",
				"	<p class=\"description\">",
				"		A callback that is used when the users mouse leaves the displayObject",
				"	</p>",
				"</body>"
			].join( "\n" ) );
		} );
		it( "parses classes with constructor", function() {
			var parsed = utils.parseDataJson( {
				classitems: [],
				classes: {
					"Text": {
						"name": "Text",
						"shortname": "Text",
						"classitems": [],
						"plugins": [],
						"extensions": [],
						"plugin_for": [],
						"extension_for": [],
						"module": "PIXI",
						"file": "src/pixi/text/Text.js",
						"line": 6,
						"description": "A Text Object will create a line or multiple lines of text. To split a line you can use '\\n' in your text string,\nor add a wordWrap property set to true and and wordWrapWidth property with a value in the style object.",
						"extends": "Sprite",
						"is_constructor": 1,
						"params": [
							{
								"name": "text",
								"description": "The copy that you would like the text to display",
								"type": "String"
							},
							{
								"name": "style",
								"description": "The style parameters",
								"type": "Object",
								"optional": true,
								"props": [
									{
										"name": "font",
										"description": "default 'bold 20px Arial' The style and size of the font",
										"type": "String",
										"optional": true
									},
									{
										"name": "fill",
										"description": "A canvas fillstyle that will be used on the text e.g 'red', '#00FF00'",
										"type": "String|Number",
										"optional": true,
										"optdefault": "'black'"
									},
									{
										"name": "align",
										"description": "Alignment for multiline text ('left', 'center' or 'right'), does not affect single line text",
										"type": "String",
										"optional": true,
										"optdefault": "'left'"
									},
									{
										"name": "stroke",
										"description": "A canvas fillstyle that will be used on the text stroke e.g 'blue', '#FCFF00'",
										"type": "String|Number",
										"optional": true
									},
									{
										"name": "strokeThickness",
										"description": "A number that represents the thickness of the stroke. Default is 0 (no stroke)",
										"type": "Number",
										"optional": true,
										"optdefault": "0"
									},
									{
										"name": "wordWrap",
										"description": "Indicates if word wrap should be used",
										"type": "Boolean",
										"optional": true,
										"optdefault": "false"
									},
									{
										"name": "wordWrapWidth",
										"description": "The width at which text will wrap, it needs wordWrap to be set to true",
										"type": "Number",
										"optional": true,
										"optdefault": "100"
									},
									{
										"name": "dropShadow",
										"description": "Set a drop shadow for the text",
										"type": "Boolean",
										"optional": true,
										"optdefault": "false"
									},
									{
										"name": "dropShadowColor",
										"description": "A fill style to be used on the dropshadow e.g 'red', '#00FF00'",
										"type": "String",
										"optional": true,
										"optdefault": "'#000000'"
									},
									{
										"name": "dropShadowAngle",
										"description": "Set a angle of the drop shadow",
										"type": "Number",
										"optional": true,
										"optdefault": "Math.PI/4"
									},
									{
										"name": "dropShadowDistance",
										"description": "Set a distance of the drop shadow",
										"type": "Number",
										"optional": true,
										"optdefault": "5"
									}
								]
							}
						]
					}
				}
			} );

			parsed.length.should.equal( 1 );
			parsed[ 0 ].text.should.equal( "Text class" );
			parsed[ 0 ].displayText.should.equal( "<b>Text</b> class" );
			parsed[ 0 ].displayAddress.should.equal( "class" );
			parsed[ 0 ].address.should.equal( "http://www.goodboydigital.com/pixijs/docs/classes/Text.html" );
			parsed[ 0 ].preview.should.containEql( [
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
		} );
		it( "parses classes with properties", function() {
			var parsed = utils.parseDataJson( {
				classitems: [
					{
						"file": "src/pixi/display/Sprite.js",
						"line": 22,
						"description": "The anchor sets the origin point of the texture.\nThe default is 0,0 this means the textures origin is the top left\nSetting than anchor to 0.5,0.5 means the textures origin is centered\nSetting the anchor to 1,1 would mean the textures origin points will be the bottom right corner",
						"itemtype": "property",
						"name": "anchor",
						"type": "Point",
						"class": "Sprite"
					}
				],
				classes: {
					"Text": {
						"name": "Text",
						"shortname": "Text",
						"classitems": [],
						"plugins": [],
						"extensions": [],
						"plugin_for": [],
						"extension_for": [],
						"module": "PIXI",
						"file": "src/pixi/text/Text.js",
						"line": 6,
						"description": "A Text Object will create a line or multiple lines of text. To split a line you can use '\\n' in your text string,\nor add a wordWrap property set to true and and wordWrapWidth property with a value in the style object.",
						"extends": "Sprite",
						"is_constructor": 1
					},
					"Sprite": {
						"name": "Sprite",
						"shortname": "Sprite",
						"classitems": [],
						"plugins": [],
						"extensions": [],
						"plugin_for": [],
						"extension_for": [],
						"module": "PIXI",
						"file": "src/pixi/display/Sprite.js",
						"line": 5,
						"description": "The Sprite object is the base for all textured objects that are rendered to the screen",
						"is_constructor": 1,
						"params": [
							{
								"name": "texture",
								"description": "The texture for this sprite\n\nA sprite can be created directly from an image like this : \nvar sprite = new PIXI.Sprite.fromImage('assets/image.png');\nyourStage.addChild(sprite);\nthen obviously don't forget to add it to the stage you have already created",
								"type": "Texture"
							}
						]
					}
				}
			} );

			parsed.length.should.equal( 4 );
			parsed[ 2 ].text.should.equal( "Text class" );
			parsed[ 2 ].displayText.should.equal( "<b>Text</b> class" );
			parsed[ 2 ].displayAddress.should.equal( "class" );
			parsed[ 2 ].address.should.equal( "http://www.goodboydigital.com/pixijs/docs/classes/Text.html" );
			parsed[ 2 ].preview.should.containEql( [
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
				"				<span class=\"js-keyword\">new</span> Text(  )",
				"			</div>",
				"		</p>",
				"	</div>",
				"	<hr class=\"separator\">",
				"	<h3>Properties</h3>",
				"	<ul class=\"propertyList\">",
				"		<li>",
				"			anchor",
				"		</li>"
			].join( "\n" ) );
		} );
	} );
} );