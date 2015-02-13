/* jshint loopfunc:true */

'use strict';

var util = require('util'),
	$ = window.$;

// for tests (to be able to mock jQuery)
if ( !$ ) {
	var $ = require('jquery-browserify');
}

var pathUtils = require('path');
var fs = require('fs');
var previewTemplate = fs.readFileSync( pathUtils.resolve( __dirname, "src", "preview-template.html" ), "utf-8" );

var urlTemplate = 'http://api.wordnik.com:80/v4/word.json/%s/definitions?limit=%s&includeRelated=true&sourceDictionaries=all&useCanonical=true&includeTags=false&api_key=1f34ec3909d55901340060df56a0fb5cc6e59e4ce1d8a83b1',
	hopDefaultUrl = "https://wordnik.com",
	hopUrlTemplate = "https://wordnik.com/words/%q",
	max = pagehop.getMaxCount(),
	query = pagehop.getQuery(),
	results = [];

if ( query ) {
	var encodedQuery = encodeURIComponent( query ),
		url = util.format(
			urlTemplate,
			encodedQuery,
			max
		);

	pagehop.getHops().push( {
		text: "DefineWord",
		address: hopUrlTemplate.replace( "%q", encodedQuery )
	} );

	$.getJSON( url )
		.done(function( json ) {
			var items = json;
			if ( items && items.length ) {
				results = items.map( function(item) {
					var text = [item.word, "-", item.partOfSpeech, "(" + item.sourceDictionary + ")"].join(" "),
						preview = previewTemplate
							.replace( "{{attribution-text}}", item.attributionText )
							.replace( "{{head-text}}", item.word + " - " + item.partOfSpeech )
							.replace( "{{text}}", item.text );

					return {
						text: text,
						displayAddress: item.text,
						preview: preview
					};
				} );
			}

			pagehop.finish( results );
		})
		.fail(function( jqxhr, textStatus, error ) {
			var err = textStatus + ", " + error;
			console.log( "Request Failed: " + err );
			pagehop.finishWithError( error );
		});
} else {
	pagehop.getHops().push( {
		text: "DefineWord: no word",
		address: hopDefaultUrl
	} );

	pagehop.finish( [] );
}