'use strict';

var util = require('util'),
	$ = window.$;

// for tests (to be able to mock jQuery)
if ( !$ ) {
	$ = require('jquery-browserify');
}

// Params:
//
//	rows
//	q (query)
var hopDefaultUrl = "http://npmsearch.com/",
	hopUrlTemplate = "http://npmsearch.com/?q=%q",
	searchUrlTemplate = 'http://npmsearch.com/query?pretty=true&fl=name,description,version,author,license&rows=%s&sort=rating+desc&q=%s',
	searchUrlTemplateWithHomePage = 'http://npmsearch.com/query?pretty=true&fl=name,description,homepage,version,author,license&rows=%s&sort=rating+desc&q=%s';

var addressUrlTemplate = 'https://www.npmjs.org/package/%s',
	max = pagehop.getMaxCount(),
	query = pagehop.getQuery() ? encodeURIComponent( pagehop.getQuery() ) : "",
	options = pagehop.getOptions(),
	isHomePage = ( options !== null ) && ( options.indexOf( ":h" ) !== -1 ),
	results = [];

var parseItem = function(rawItem) {
	var address;
	if ( isHomePage ) {
		address = rawItem.homepage;
	} else {
		address = util.format(
			addressUrlTemplate,
			rawItem.name
		);
	}
	var displayAddress = [
		"by " + rawItem.author,
		rawItem.version,
		rawItem.license.length ? rawItem.license.join(", ") : "no-license"
	].join( " | " );

	var result = {
		text: rawItem.name + " (" + rawItem.description + ")",
		displayText: "<b>" + rawItem.name + "</b>" + " (" + rawItem.description + ")",
		address: address,
		displayAddress: displayAddress
	};

	return result;
};

if ( query ) {
	pagehop.getHops().push( {
		text: "NPMSearch" + ( isHomePage ? " with :h (homepage)" : "" ),
		address: hopUrlTemplate.replace( "%q", query )
	} );

	var url = util.format(
		isHomePage ? searchUrlTemplateWithHomePage : searchUrlTemplate,
		max,
		query
	);

	$.getJSON( url )
		.done(function( json ) {
			var items = json.results;
			if ( items && items.length ) {
				results = items.map( parseItem );
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
		text: "NPMSearch: no query",
		address: hopDefaultUrl
	} );

	pagehop.finish( [] );
}