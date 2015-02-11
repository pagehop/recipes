'use strict';

var networkIssueInfo = {
		text: "There was a problem, requesting results."
	},
	badServerResponseInfo = {
		text: "Bad Server Response",
		displayAddress: "searchcode.com returned an empty response."
	};

var pathUtils = require('path');
var fs = require('fs');
var previewTemplate = fs.readFileSync( pathUtils.resolve( __dirname, "preview-template.html" ), "utf-8" );
var lineTemplate = fs.readFileSync( pathUtils.resolve( __dirname, "line-template.html" ), "utf-8" );

var utils = {

	RECIPE_DOC_URL: "https://github.com/pagehop/recipes/blob/master/code-search/README.md",

	validateResponse: function(error, response) {
		var throwError = function(error, dataObj) {
			error.__data = dataObj;
			throw error;
		};

		if ( error ) {
			throwError(
				new Error(),
				{
					text: networkIssueInfo.text,
					displayAddress: error.text
				}
			);
		} else {
			error = new Error();

			if ( !response || !response.body ) {
				throwError( error, badServerResponseInfo );
			}

			var body = response.body,
				total = body.total,
				page = body.page,
				results = body.results;

			if (
				( !total && total !== 0 ) ||
				( !page && page !== 0 ) ||
				( !results || !( results instanceof Array ) )
			){
				throwError( error, badServerResponseInfo );
			}
		}
	},

	parseResults: function(rawItems, matchTerms) {
		var self = this,
			result = [],
			rawItem,
			text,
			displayAddress,
			lineNumbers,
			lineNumber,
			line,
			lines,
			preview,
			matchParts;

		for ( var i = 0; i < rawItems.length; i++ ) {
			rawItem = rawItems[ i ];
			text = rawItem.filename + " in " + rawItem.name;
			displayAddress = rawItem.linescount + " lines | " + rawItem.repo;
			lineNumbers = Object.keys( rawItem.lines ).sort( function(a, b) {
				a = parseInt( a, 10 );
				b = parseInt( b, 10 );

				return ( a >= b ) ? 1 : -1;
			} );
			lines = [];

			for ( var k = 0; k < lineNumbers.length; k++ ) {
				lineNumber = lineNumbers[ k ];
				line = rawItem.lines[ lineNumber ];

				line = self.highlightLine( line, matchTerms );

				lines.push(
					lineTemplate
						.replace( "{{linenumber}}", lineNumber )
						.replace( "{{line_text}}", line )
				)
			}
			preview = previewTemplate
				.replace( "{{repo-url}}", rawItem.repo )
				.replace( "{{repo-name}}", rawItem.name )
				.replace( "{{dir-path}}", rawItem.location )
				.replace( "{{file-name}}", rawItem.filename )
				.replace( "{{lines}}", lines.join( "\n" ) );

			result.push( {
				text: text,
				address: rawItem.url,
				displayAddress: displayAddress,
				preview: preview
			} );
		}

		return result;
	},

	extractHighlightMatchTerms: function(matchTerm) {
		var result = [];

		if ( matchTerm && typeof( matchTerm ) === "string" ) {
			matchTerm = matchTerm.trim();

			if ( matchTerm ) {
				var parts = matchTerm.match( /[a-zA-Z_]+([0-9]*[a-zA-Z_]*)*/g );

				if ( parts ) {
					result = parts;
				}

				result.push( matchTerm );
			}
		}

		var uniqueItems = {};

		return result.filter( function(item) {
			return uniqueItems.hasOwnProperty( item ) ? false : ( uniqueItems[ item ] = true );
		});
	},

	highlightLine: function(line, matchTerms) {
		var result = "",
			openingTag = "<b>",
			closingTag = "</b>",
			hash = {};

		var mark = function(matchIndex, term) {
			var firstIndex = matchIndex,
				secondIndex = firstIndex + term.length;

			hash[ firstIndex ] =
				hash[ firstIndex ] ? hash[ firstIndex ] + openingTag : openingTag;
			hash[ secondIndex ] =
				hash[ secondIndex ] ? closingTag + hash[ secondIndex ] : closingTag;
		};

		if ( line ) {
			if ( matchTerms && matchTerms.length ) {
				for ( var i = 0; i < matchTerms.length; i++ ) {
					var term = matchTerms[ i ],
						hasMatchs = false,
						match;

					try {
						var regex = RegExp( term, "gi" );

						while ( match = regex.exec( line ) ) {
							hasMatchs = true;
							mark( match.index, term );
						}
					} catch(error) {}

					if ( !hasMatchs ) {
						var matchIndex = line.indexOf( term );
						if ( matchIndex !== -1 ) {
							mark( matchIndex, term );
						}
					}
				}
				for ( var i = 0; i < line.length; i++ ) {
					if ( hash[ i ] ) {
						result += hash[ i ];
					}
					result += line[i];
				}
				if ( hash[ line.length ] ) {
					result += hash[ line.length ];
				}
			}
		}

		return result;
	}

};

module.exports = utils;