'use strict';

var getDomain = function(url) {
	var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
	return ( matches && matches[1] ) ? matches[1] : "";
};

var items = document.querySelectorAll("#b_results>li:not(.b_pag)");

var result = [];
for (var i = 0; i < items.length; i++) {
	var item = items[i],
		link = item.querySelector( "h2 a" );
	if ( link ) {
		var displayAddress = item.querySelector(".b_snippet>p") || item.querySelector(".b_caption>p");
		displayAddress = displayAddress ? displayAddress.textContent : link.href;

		result.push( {
			text: link.text + " (" + getDomain( link.href ) + ")",
			address: link.href,
			displayAddress: displayAddress,
			tooltip: displayAddress
		} );
	}
}

pagehop.finish( result );