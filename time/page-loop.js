/* jshint -W083 */

'use strict';

var pathUtils = require('path');
var fs = require('fs');
var template = fs.readFileSync( pathUtils.resolve( __dirname, "src", "preview-template.html" ), "utf-8" );

var query = pagehop.getQuery(),
	docUrl = "https://github.com/pagehop/recipes/blob/master/time/README.md",
	hopText = "Time: no location",
	results = [];

if ( query ) {
	results.push( {
		text: "Time in: " + query,
		preview: template.replace( "{{location}}", query )
	} );

	hopText = "Time";
}

pagehop.getHops().push( {
	text: hopText,
	address: docUrl
} );

pagehop.finish( results );
