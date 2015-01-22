/* jshint -W083 */

'use strict';

var request = window.request;

// for tests (to be able to mock request)
if ( !request ) {
	request = require("superagent");
}

var utils = require("./src/utils"),
	options = pagehop.getOptions(),
	query = pagehop.getQuery(),
	maxResultsCount = pagehop.getMaxCount(),
	urlTemplate = "https://searchcode.com/api/search_IV/?q=%q&p=%p",
	helpInfo = {
		text: "Usage: doc [lang/framework/tool] [query]",
		displayAddress: "Example: doc php explode",
		address: utils.RECIPE_DOC_URL
	},
	allSources = utils.generateHelpResults( [
		"all",
		"apache",
		"brainfuck",
		"closure",
		"cobol",
		"emacs",
		"fossil_scm",
		"ftp",
		"git",
		"linux_cmd",
		"hello_world",
		"hresult",
		"http",
		"java",
		"javascript",
		"jquery",
		"linux_kernel_error",
		"ios",
		"macos",
		"mercurial",
		"mysql_error",
		"mysql",
		"nginx",
		"nt_status",
		"perl5",
		"perl5_var",
		"php",
		"python",
		"python_exception",
		"smarty",
		"sql_server_2008",
		"sql_server_2008_error",
		"stuntsnippets",
		"svn",
		"underscorejs",
		"visual_basic_6",
		"win32_error",
		"windows_command",
	] ),
	resultsArray = [];

var search = function() {

	var pageNumber = 0,
		firstPageUrl = urlTemplate
			.replace( "%q", query )
			.replace( "%p", pageNumber );

	request.get( firstPageUrl ).end( function( error, response ) {
		try {
			utils.validateResponse( error, response );
		} catch(err) {
			pagehop.finish( [ err.__data ] );
			return;
		}

		var body = response.body,
			numberOfPages = Math.min( Math.ceil( body.total / 10 ), Math.ceil( maxResultsCount / 10 ) );

		if ( numberOfPages > 0 ) {
			resultsArray[ 0 ] = utils.parseResults( body.results );
			numberOfPages--;
			if ( numberOfPages > 0 ) {
				for ( var i = 0; i < numberOfPages; i++ ) {
					var url = urlTemplate
						.replace( "%q", query )
						.replace( "%p", i + 1 );

					request.get( url ).end( function( error, response ) {
						try {
							utils.validateResponse( error, response );
						} catch(err) {
							pagehop.finish( [ err.__data ] );
							return;
						}
						resultsArray[ response.body.page ] = utils.parseResults( response.body.results );
						if ( --numberOfPages === 0 ) {
							pagehop.finish( utils.combineResults( resultsArray ) );
						}
					} );
				}
			} else {
				pagehop.finish( utils.combineResults( resultsArray ) );
			}
		} else {
			pagehop.finish( [ {
				text: "No results found."
			} ] );
		}
	} );

};

if ( query ) {
	search();
} else if ( options && options.length && ( options.indexOf( ":all" ) !== -1 ) ) {
	pagehop.finish( allSources );
} else {
	pagehop.finish( [ helpInfo ] );
}