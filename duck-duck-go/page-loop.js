/* jshint loopfunc:true */

'use strict';

var urlTemplate = 'https://duckduckgo.com/?q=%s',
	max = pagehop.getMaxCount(),
	query = pagehop.getQuery(),
	url = urlTemplate.replace( "%s", encodeURIComponent( query ) );

if ( !query ) {
	pagehop.finish( [] );
} else {
	pagehop.scrape( url, function(error, result) {
		if ( error ) {
			pagehop.finishWithError( error );
			return;
		}

		result.splice( max );

		pagehop.finish( result );
	} );
}
