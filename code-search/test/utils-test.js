/* jshint -W099 */

'use strict';

var should = require("should"),
	utils = require("../src/utils");

describe("code-search recipe's utils",function(){

	describe( "consts", function() {
		utils.RECIPE_DOC_URL.should.equal( "https://github.com/pagehop/recipes/blob/master/code-search/README.md" );
	} );

	describe( "validateResponse( error, response )", function() {
		it( "throws an error if error is defined", function(done) {
			var errorObject = {
				text: "Network error."
			};

			try {
				utils.validateResponse( errorObject );
			} catch(err) {
				should.exist( err );
				err.__data.should.eql( {
					text: "There was a problem, requesting results.",
					displayAddress: errorObject.text
				} );
				done();
			}
		} );
		it( "throws an error if no response", function() {
			should( function() {
				utils.validateResponse();
			} ).throw();
			should( function() {
				utils.validateResponse( null, {} );
			} ).throw();
			should( function() {
				utils.validateResponse( null, { body: {} } );
			} ).throw();
		} );
		it( "throws an error if no total prop", function() {
			should( function() {
				utils.validateResponse( null, { body: {
					page: 0,
					results: []
				} } );
			} ).throw();
		} );
		it( "throws an error if no page prop", function() {
			should( function() {
				utils.validateResponse( null, { body: {
					total: 0,
					results: []
				} } );
			} ).throw();
		} );
		it( "throws an error if no results prop", function() {
			should( function() {
				utils.validateResponse( null, { body: {
					total: 0,
					page: 0
				} } );
			} ).throw();
		} );
		it( "throws an error if results prop is not an array", function() {
			should( function() {
				utils.validateResponse( null, { body: {
					total: 0,
					page: 0,
					results: 0
				} } );
			} ).throw();
		} );
		it( "doesn't throw an error if no search results", function() {
			should( function() {
				utils.validateResponse( null, { body: {
					total: 0,
					page: 0,
					results: []
				} } );
			} ).not.throw();
		} );
	} );

	describe( "parseResults( rawItems, matchTerms )", function() {
		it( "successfully parses ordered-line results", function() {
			var rawItem = {
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
			};
			var resultItem = utils.parseResults( [ rawItem ], [
				"using",
				"System",
				"Linq",
				"using System.Linq;"
			] )[ 0 ];

			resultItem.text.should.equal( "Linq.cs in breusable-codeplex" );
			resultItem.address.should.equal( "https://searchcode.com/codesearch/view/42724484/" );
			resultItem.displayAddress.should.equal( "106 lines | https://bitbucket.org/Maslow/breusable-codeplex.git" );
			resultItem.preview.should.containEql( [
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
		} );
		it( "successfully parses unordered-line results", function() {
			var rawItem = {
				"repo": "https://bitbucket.org/Maslow/breusable-codeplex.git",
				"linescount": 106,
				"location": "/Trunk/BReusable",
				"name": "breusable-codeplex",
				"url": "https://searchcode.com/codesearch/view/42724484/",
				"md5hash": "388c5ed4d5125216d5c22ed775b67b56",
				"lines": {
					"2": "using System.Collections.Generic;",
					"1": "using System;"
				},
				"id": 42724484,
				"filename": "Linq.cs"
			};
			var resultItem = utils.parseResults( [ rawItem ], [
				"using",
				"System",
				"Linq",
				"using System.Linq;"
			] )[ 0 ];

			resultItem.text.should.equal( "Linq.cs in breusable-codeplex" );
			resultItem.address.should.equal( "https://searchcode.com/codesearch/view/42724484/" );
			resultItem.displayAddress.should.equal( "106 lines | https://bitbucket.org/Maslow/breusable-codeplex.git" );
			resultItem.preview.should.containEql( [
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
		} );
	} );

	describe( "extractHighlightMatchTerms( matchTerm )", function() {
		it( "returns an empty array if nothing to extract", function() {
			utils.extractHighlightMatchTerms( "" ).should.eql( [] );
			utils.extractHighlightMatchTerms( " 	" ).should.eql( [] );
			utils.extractHighlightMatchTerms( null ).should.eql( [] );
		} );
		it( "trims whitespaces", function() {
			utils.extractHighlightMatchTerms( " test" ).should.eql( [ "test" ] );
			utils.extractHighlightMatchTerms( "test 	" ).should.eql( [ "test" ] );
			utils.extractHighlightMatchTerms( " 	test	 " ).should.eql( [ "test" ] );
		} );
		it( "don't produce duplicates", function() {
			utils.extractHighlightMatchTerms( "test test" ).should.eql( [
				"test",
				"test test"
			] );
		} );
		it( "returns terms", function() {
			utils.extractHighlightMatchTerms( "using System.Collections(Generic);" ).should.eql( [
				"using",
				"System",
				"Collections",
				"Generic",
				"using System.Collections(Generic);"
			] );
		} );
	} );
	describe( "highlightLine( line, matchTerms )", function() {
		it( "doesn't break on empty lines", function() {
			utils.highlightLine( "", [] ).should.equal( "" );
			utils.highlightLine( null, [] ).should.equal( "" );
		} );
		it( "doesn't break on invalid regular expressions", function() {
			utils.highlightLine( "should.eql(", [
				"should",
				"eql",
				"should.eql("
			] ).should.equal( "<b><b>should</b>.<b>eql</b>(</b>" );
		} );
		it( "marks partial matches", function() {
			utils.highlightLine(
				"using System.Collections(Generic);",
				[
					"using",
					"Collections",
					"Generic",
					"using Collections(Generic);"
				]
			).should.equal( "<b>using</b> System.<b>Collections</b>(<b>Generic</b>);" );
		} );
		it( "marks full matches", function() {
			utils.highlightLine(
				"using System.Collections(Generic);",
				[
					"using",
					"System",
					"Collections",
					"Generic",
					"using System.Collections(Generic);"
				]
			).should.equal( "<b><b>using</b> <b>System</b>.<b>Collections</b>(<b>Generic</b>);</b>" );
		} );
	} );

});