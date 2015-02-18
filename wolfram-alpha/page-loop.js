/* jshint -W083 */

'use strict';

var query = pagehop.getQuery(),
	encodedQuery = query ? encodeURIComponent( query ) : "",
	urlTemplate = "http://www.wolframalpha.com/input/?i=%q",
	hopText = "WolframAlpha: no query",
	hopUrl = "http://www.wolframalpha.com/",
	results = [];

if ( encodedQuery ) {
	hopUrl = urlTemplate.replace( "%q", encodedQuery );
	hopText = "WolframAlpha";

	results.push( {
		text: "WolframAlpha: " + query,
		address: hopUrl,
		displayAddress: hopUrl
	} );
}

pagehop.getHops().push( {
	text: hopText,
	address: hopUrl
} );

pagehop.finish( results );
