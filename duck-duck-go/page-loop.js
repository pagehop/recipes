/* jshint loopfunc:true */

'use strict';

var hopDefaultUrl = "https://duckduckgo.com/",
	hopUrlTemplate = "https://duckduckgo.com/?q=%q",
	urlTemplate = "https://duckduckgo.com/?q=%s",
	max = pagehop.getMaxCount(),
	query = pagehop.getQuery() ? encodeURIComponent( pagehop.getQuery() ) : "",
	url = urlTemplate.replace( "%s", query );

if ( query ) {
	pagehop.getHops().push( {
		text: "DuckDuckGo",
		address: hopUrlTemplate.replace( "%q", query )
	} );

	pagehop.scrape( url, function(error, result) {
		if ( error ) {
			pagehop.finishWithError( error );
			return;
		}

		result.splice( max );

		pagehop.finish( result );
	} );
} else {
	pagehop.getHops().push( {
		text: "DuckDuckGo: no query",
		address: hopDefaultUrl
	} );

	pagehop.finish( [] );
}