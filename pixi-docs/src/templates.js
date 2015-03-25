'use strict';

// <Don't use ES6 here>
var Handlebars = require("handlebars");
var fs = require('fs');
var path = require('path');

if ( typeof( __moduleAddress ) !== "undefined" ) {
	__dirname = path.dirname( __moduleAddress.replace( "file:", "" ) );
}

var classPreview = fs.readFileSync( path.resolve( __dirname, "class-preview.html" ), "utf-8" );
var propertyPreview = fs.readFileSync( path.resolve( __dirname, "prop-preview.html" ), "utf-8" );
var methodPreview = fs.readFileSync( path.resolve( __dirname, "method-preview.html" ), "utf-8" );
// </Don't use ES6 here>

export default {

	classPreview: Handlebars.compile( classPreview ),
	propertyPreview: Handlebars.compile( propertyPreview ),
	methodPreview: Handlebars.compile( methodPreview )

};