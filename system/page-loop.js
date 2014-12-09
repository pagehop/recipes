'use strict';

var request = window.request;

// for tests (to be able to mock request)
if ( !request ) {
	request = require("superagent");
}

var semver = require("semver"),
	systemMeta = pagehop.getSystemMeta(),
	options = pagehop.getOptions() ? pagehop.getOptions() : [],
	shouldGetRecipes = options.indexOf( ":r" ) !== -1,
	shouldGetTools = options.indexOf( ":t" ) !== -1,
	shouldCheckForUpdate = options.indexOf( ":u" ) !== -1,
	helpInfo = [
		{
			text: "To list all recipes:",
			displayAddress: "sys :r",
			address: "https://github.com/pagehop/recipes/blob/master/system/README.md"
		},
		{
			text: "To list all tools:",
			displayAddress: "sys :t",
			address: "https://github.com/pagehop/recipes/blob/master/system/README.md"
		},
		{
			text: "To check for an update:",
			displayAddress: "sys :u",
			address: "https://github.com/pagehop/recipes/blob/master/system/README.md"
		}
	],
	updateCheckUrl = "https://pagehopapp.com/app/version",
	noUpdatesAvailableResult = {
		text: "Pagehop is up to date!",
		displayAddress: "ver. " + systemMeta.version + " is the latest one available."
	},
	updateAvailableResult = {
		text: "Update is available!",
		displayAddress: "Get ver. %s.",
		address: "https://pagehopapp.com/download"
	};

var getRecipes = function(systemMeta) {
	if ( systemMeta.recipes && systemMeta.recipes.length ) {
		return systemMeta.recipes.map( function(meta) {
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
	}
	return [];
};
var getTools = function(systemMeta) {
	if ( systemMeta.tools && systemMeta.tools.length ) {
		return systemMeta.tools.map( function(meta) {
			return {
				text: [ meta.id, "(" + meta.keyword + ")" ].join(" "),
				displayAddress: [ "v" + meta.version, meta.description ].join( " | " ),
				address: meta.homepage,
				tooltip: meta.homepage
			};
		} );
	}
	return [];
};
var checkForUpdate = function(systemMeta) {
	request.get( updateCheckUrl ).end( function( error, response ) {
		var serverVer = response && response.body ? response.body.version : null;
		if ( error || !serverVer || !semver.valid( serverVer ) || !semver.gt( serverVer, systemMeta.version ) ) {
			pagehop.finish( [ noUpdatesAvailableResult ] );
		} else {
			updateAvailableResult.displayAddress = updateAvailableResult.displayAddress.replace( "%s", serverVer );
			pagehop.finish( [ updateAvailableResult ] );
		}
	} );
};

if ( systemMeta ) {
	if ( shouldGetRecipes ) {
		pagehop.finish( getRecipes( systemMeta ) );
	} else if ( shouldGetTools ) {
		pagehop.finish( getTools( systemMeta ) );
	} else if ( shouldCheckForUpdate ) {
		checkForUpdate(systemMeta);
	} else {
		pagehop.finish( helpInfo );
	}
}