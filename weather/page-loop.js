/* jshint -W083 */

'use strict';

var pathUtils = require('path');
var fs = require('fs');
var template = fs.readFileSync( pathUtils.resolve( __dirname, "src", "preview-template.html" ), "utf-8" );

var query = pagehop.getQuery(),
	hopDefaultUrl = "http://openweathermap.org/",
	address = "http://openweathermap.org/find?q=" + encodeURIComponent( query ),
	hopText = "Weather: no location",
	hopUrl = hopDefaultUrl,
	results = [];

if ( query ) {

	results.push( {
		text: "Weather in: " + query,
		address: address,
		displayAddress: address,
		preview: template.replace( "{{location}}", query )
	} );

	hopText = "Weather";
	hopUrl = address;
}

pagehop.getHops().push( {
	text: hopText,
	address: hopUrl
} );

pagehop.finish( results );
