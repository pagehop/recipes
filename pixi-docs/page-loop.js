'use strict';

import superagent from "superagent";
import utils from "./src/utils";

// for tests (to be able to mock request)
let request = window.request;
if ( !request ) {
	request = superagent;
}

let urlDataJson = "http://www.goodboydigital.com/pixijs/docs/data.json",
	urlDocs = "http://www.goodboydigital.com/pixijs/docs/",
	networkError = {
		text: "Error: can't retrieve data",
		displayAddress: "press ⏎ to browse the website",
		address: urlDocs
	};

pagehop.getHops().push( {
	text: "pixiDocs",
	address: urlDocs
} );

request
.get( urlDataJson )
.end( function(error, result) {

	if ( error ) {
		pagehop.finish( [ networkError ] );
	} else {

		try {
			pagehop.finish( utils.parseDataJson( result.body ) );
		} catch(error) {
			let item = networkError;
			item.text = error.message;
			pagehop.finish( [ item ] );
		}

	}

} );