'use strict';

var systemMeta = pagehop.getSystemMeta(),
	results = [];

if ( systemMeta && systemMeta.recipes && systemMeta.recipes.length ) {
	results = systemMeta.recipes.map( function(meta) {
		var item = {
			text: meta.id,
			displayAddress: [ "v" + meta.version, meta.description ].join( " | " ),
			address: meta.homepage
		};
		var tooltip = meta.homepage;
		if ( meta.options && meta.options.length ) {
			tooltip = [ "Options:" ].concat( meta.options.map( function(option) {
				return "	" + option.keyword + " - " + option.description;
			} ) ).join( "\n" );
		}
		item.tooltip = tooltip;
		return item;
	} );
	pagehop.finish( results );
}
pagehop.finish( results );
