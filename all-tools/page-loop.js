'use strict';

var systemMeta = pagehop.getSystemMeta(),
	results = [];

if ( systemMeta && systemMeta.tools && systemMeta.tools.length ) {
	results = systemMeta.tools.map( function(meta) {
		return {
			text: [ meta.id, "(" + meta.keyword + ")" ].join(" "),
			displayAddress: [ "v" + meta.version, meta.description ].join( " | " ),
			address: meta.homepage,
			tooltip: meta.homepage
		};
	} );
	pagehop.finish( results );
}
pagehop.finish( results );
