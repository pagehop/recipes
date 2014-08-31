'use strict';

var items = document.querySelectorAll(".g");

var getDomain = function(url) {
	var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
	return matches[1];
};

function getQueryParameterValue(url, name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(url);
	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var result = [];
for (var i = 0; i < items.length - 1; i++) {
	var item = items[i],
		link;
	if ( item.id === "newsbox" ) {
		link = item.querySelector( ".nrg-title a" );
		result.splice( 0, 0, {
			text: link.text,
			address: link.href
		} );
	} else {
		link = item.querySelector( ".r a" );
		var synopsisElement = item.querySelector( ".st" );
		if ( !synopsisElement ) {
			continue;
		}
		var synopsis = synopsisElement.textContent,
			address = link.href;

		address = ( address.indexOf( "http://www.google.com/url?q=" ) !== -1 ) ? getQueryParameterValue( address, "q" ) : address;

		result.push( {
			text: link.text + " (" + getDomain( address ) + ")",
			address: address,
			displayAddress: synopsis,
			tooltip: synopsis
		} );
	}
}

pagehop.finish( result );