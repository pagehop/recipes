'use strict';

var query = pagehop.getQuery(),
	HAS_PROTOCOL_REGEX = /^[a-zA-Z]+\:\/\//,
	results = [];

if ( query ) {

	if ( !query.match( HAS_PROTOCOL_REGEX ) ) {
		query = "http://" + query;
	}

	results.push( {
		text: query,
		address: query
	} );

}

pagehop.finish( results );