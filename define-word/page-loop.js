/* jshint loopfunc:true */

'use strict';

var util = require('util'),
	$ = window.$;

// for tests (to be able to mock jQuery)
if ( !$ ) {
	var $ = require('jquery-browserify');
}

var urlTemplate = 'http://api.wordnik.com:80/v4/word.json/%s/definitions?limit=%s&includeRelated=true&sourceDictionaries=all&useCanonical=true&includeTags=false&api_key=1f34ec3909d55901340060df56a0fb5cc6e59e4ce1d8a83b1',
	max = pagehop.getMaxCount(),
	query = pagehop.getQuery(),
	results = [];

if ( !query ) {
	pagehop.finish( [] );
} else {
	var url = util.format(
		urlTemplate,
		encodeURIComponent( query ),
		max
	);

	$.getJSON( url )
		.done(function( json ) {
			var items = json;
			if ( items && items.length ) {
				results = items.map( function(item) {
					var text = [item.word, "-", item.partOfSpeech, "(" + item.sourceDictionary + ")"].join(" ");
					return {
						text: text,
						displayAddress: item.text,
						tooltip: item.text
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
}