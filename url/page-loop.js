'use strict';

var query = pagehop.getQuery() ? pagehop.getQuery().trim() : "",
	HAS_PROTOCOL_REGEX = /^[a-zA-Z]+\:\/\//,
	results = [],
	hopText = "URL: no value",
	hopUrl = "https://github.com/pagehop/recipes/blob/master/url/README.md";

if ( query ) {

	query = query.replace( /^([^\s\t]*)(\s|\t).*$/, "$1" );

	if ( !query.match( HAS_PROTOCOL_REGEX ) ) {
		query = "http://" + query;
	}

	results.push( {
		text: query,
		address: query
	} );

	hopText = "URL: " + query;
	hopUrl = query;
}

pagehop.getHops().push( {
	text: hopText,
	address: hopUrl
} );

pagehop.finish( results );