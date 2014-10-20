/* jshint -W030 */
/* jshint -W020 */
/* jshint -W061 */

'use strict';

var should = require("should"),
	helpers = require("./helpers");

var utils = require("../src/utils"),
	raw = require("./data/raw"),
	expected = require("./data/results"),
	generateRequestResults = helpers.generateRequestResults,
	enumerateResults = helpers.enumerateResults;

var OriginalDate = Date;

var mockDateFunc = function() {
	//mock specific Date so displayAddress doesn't outdate
	Date = function() {
		if ( !arguments.length ) {
			return new OriginalDate( 2014, 9, 16, 17 );
		}
		return eval( "new OriginalDate( " +
			Array.prototype.slice.call( arguments )
				.map( function( element ) {
					return JSON.stringify( element );
				} ).join( ", " ) +
		" )");
	};
};

var cleanDateMockFunc =  function() {
	// clean mocks
	Date = OriginalDate;
};

describe("hacker-news recipe's utility methods",function() {
	describe( "getDomain(url)", function() {
		it( "returns correct domain on http", function() {
			utils.getDomain( "http://example.com/some/inner/link" ).should.equal( "example.com" );
		});
		it( "returns correct domain on https", function() {
			utils.getDomain( "https://example.com/some/inner/link" ).should.equal( "example.com" );
		});
	} );
	describe( "isAskStory(rawItem)", function() {
		it( "returns true if askStory is passed", function() {
			utils.isAskStory( raw.askStory ).should.be.ok;
		});
		it( "returns true if poll is passed", function() {
			utils.isAskStory( raw.poll ).should.be.ok;
		});
		it( "returns false if defaultStory is passed", function() {
			utils.isAskStory( raw.defaultStory ).should.not.be.ok;
		});
		it( "returns false if job is passed", function() {
			utils.isAskStory( raw.job ).should.not.be.ok;
		});
		it( "returns false if showStory is passed", function() {
			utils.isAskStory( raw.showStory ).should.not.be.ok;
		});
	} );
	describe( "isJob(rawItem)", function() {
		it( "returns true if job is passed", function() {
			utils.isJob( raw.job ).should.be.ok;
		});
		it( "returns false if poll is passed", function() {
			utils.isJob( raw.poll ).should.not.be.ok;
		});
		it( "returns false if defaultStory is passed", function() {
			utils.isJob( raw.defaultStory ).should.not.be.ok;
		});
		it( "returns false if showStory is passed", function() {
			utils.isJob( raw.showStory ).should.not.be.ok;
		});
		it( "returns false if askStory is passed", function() {
			utils.isJob( raw.askStory ).should.not.be.ok;
		});
	} );
	describe( "shouldKeepItem(rawItem, option)", function() {
		it( "returns true if only defaultStory is passed", function() {
			utils.shouldKeepItem( raw.defaultStory ).should.be.ok;
		});
		it( "returns true if only showStory is passed", function() {
			utils.shouldKeepItem( raw.showStory ).should.be.ok;
		});
		it( "returns true if only askStory is passed", function() {
			utils.shouldKeepItem( raw.askStory ).should.be.ok;
		});
		it( "returns true if only poll is passed", function() {
			utils.shouldKeepItem( raw.poll ).should.be.ok;
		});
		it( "returns true if only job is passed", function() {
			utils.shouldKeepItem( raw.job ).should.be.ok;
		});
		it( "returns true if showStory and :s is passed", function() {
			utils.shouldKeepItem( raw.showStory, ":s" ).should.be.ok;
		});
		it( "returns true if askStory and :ask are passed", function() {
			utils.shouldKeepItem( raw.askStory, ":ask" ).should.be.ok;
		});
		it( "returns true if poll and :ask are passed", function() {
			utils.shouldKeepItem( raw.poll, ":ask" ).should.be.ok;
		});
		it( "returns true if job and :j are passed", function() {
			utils.shouldKeepItem( raw.job, ":j" ).should.be.ok;
		});
		it( "returns false if defaultStory and :ask are passed", function() {
			utils.shouldKeepItem( raw.job, ":ask" ).should.not.be.ok;
		});
		it( "returns false if showStory and :ask are passed", function() {
			utils.shouldKeepItem( raw.job, ":ask" ).should.not.be.ok;
		});
		it( "returns false if askStory and :s are passed", function() {
			utils.shouldKeepItem( raw.job, ":s" ).should.not.be.ok;
		});
		it( "returns false if job and :s are passed", function() {
			utils.shouldKeepItem( raw.job, ":s" ).should.not.be.ok;
		});
		it( "returns false if poll and :s are passed", function() {
			utils.shouldKeepItem( raw.job, ":s" ).should.not.be.ok;
		});
	} );
	describe( "getElapsedTime(unixTime)", function() {
		var year = ( 1000 * 60 * 60 * 24 * 365 ),
			day = ( 1000 * 60 * 60 * 24 ),
			hour = ( 1000 * 60 * 60 ),
			minute = ( 1000 * 60 ),
			safeMargin = 10000; // to be sure that Math.floor will allways return what we need

		var getUxinPastTime = function(span) {
			return ( ( new Date() ).getTime() - span - safeMargin ) / 1000;
		};

		it( "returns singular of 'year'", function() {
			utils.getElapsedTime( getUxinPastTime( year ) ).should.equal( "1 year ago" );
		});
		it( "returns plural of 'year'", function() {
			utils.getElapsedTime( getUxinPastTime( 2*year ) ).should.equal( "2 years ago" );
		});
		it( "returns singular of 'day'", function() {
			utils.getElapsedTime( getUxinPastTime( day ) ).should.equal( "1 day ago" );
		});
		it( "returns plural of 'day'", function() {
			utils.getElapsedTime( getUxinPastTime( 2*day ) ).should.equal( "2 days ago" );
		});
		it( "returns singular of 'hour'", function() {
			utils.getElapsedTime( getUxinPastTime( hour ) ).should.equal( "1 hour ago" );
		});
		it( "returns plural of 'hour'", function() {
			utils.getElapsedTime( getUxinPastTime( 2*hour ) ).should.equal( "2 hours ago" );
		});
		it( "returns singular of 'minute'", function() {
			utils.getElapsedTime( getUxinPastTime( minute ) ).should.equal( "1 minute ago" );
		});
		it( "returns plural of 'minute'", function() {
			utils.getElapsedTime( getUxinPastTime( 2*minute ) ).should.equal( "2 minutes ago" );
		});
		it( "returns 'just now' on 0 minutes", function() {
			utils.getElapsedTime( getUxinPastTime( 0 ) ).should.equal( "just now" );
		});
	} );
	describe( "getCommentsStats(rawItemKids)", function() {
		it( "returns 'no comments' if no rawItemKids", function() {
			utils.getCommentsStats().should.equal( "no comments" );
			utils.getCommentsStats( null ).should.equal( "no comments" );
			utils.getCommentsStats( [] ).should.equal( "no comments" );
		});
		it( "returns string ending with the singular of 'comment' when only one rawItemKid", function() {
			utils.getCommentsStats( [ 0 ] ).should.equal( "1 (root) comment" );
		});
		it( "returns string ending with the plural of 'comment' when multiple rawItemKids", function() {
			utils.getCommentsStats( [ 0, 1 ] ).should.equal( "2 (root) comments" );
		});
	} );
	describe( "parseItem(rawItem, hasDiscussionOption, index)", function() {
		before( mockDateFunc );

		it( "returns null if no rawItem.type", function() {
			var result = utils.parseItem( {}, false, 1 );
			should( result ).not.be.ok;
		});
		it( "returns successfully parsed defaultStory", function() {
			var result = utils.parseItem( raw.defaultStory, false, 1 );
			result.should.eql( expected.defaultStory );
		});
		it( "returns successfully parsed defaultStoryDiscussion", function() {
			var result = utils.parseItem( raw.defaultStory, true, 1 );
			result.should.eql( expected.defaultStoryDiscussion );
		});
		it( "returns successfully parsed showStory", function() {
			var result = utils.parseItem( raw.showStory, false, 1 );
			result.should.eql( expected.showStory );
		});
		it( "returns successfully parsed showStoryDiscussion", function() {
			var result = utils.parseItem( raw.showStory, true, 1 );
			result.should.eql( expected.showStoryDiscussion );
		});
		it( "returns successfully parsed askStory", function() {
			var result = utils.parseItem( raw.askStory, false, 1 );
			result.should.eql( expected.askStory );
		});
		it( "returns successfully parsed askStory (hasDiscussionOption=true)", function() {
			var result = utils.parseItem( raw.askStory, true, 1 );
			result.should.eql( expected.askStory );
		});
		it( "returns successfully parsed poll", function() {
			var result = utils.parseItem( raw.poll, false, 1 );
			result.should.eql( expected.poll );
		});
		it( "returns successfully parsed poll (hasDiscussionOption=true)", function() {
			var result = utils.parseItem( raw.poll, true, 1 );
			result.should.eql( expected.poll );
		});
		it( "returns successfully parsed job", function() {
			var result = utils.parseItem( raw.job, false, 1 );
			result.should.eql( expected.job );
		});
		it( "returns successfully parsed job (hasDiscussionOption=true)", function() {
			var result = utils.parseItem( raw.job, true, 1 );
			result.should.eql( expected.job );
		});

		after( cleanDateMockFunc );
	} );
	describe( "processRawResults(rawResults, option, hasDiscussionOption)", function() {
		before( mockDateFunc );

		it( "returns all items on no options", function() {
			var rawResults = generateRequestResults( 3 )
					.concat( generateRequestResults( 2, "askStory" ) ),
				option = null,
				hasDiscussionOption = false;

			var results = utils.processRawResults( rawResults, option, hasDiscussionOption );

			results.should.eql( enumerateResults( [
				expected.defaultStory,
				expected.defaultStory,
				expected.defaultStory,
				expected.askStory,
				expected.askStory
			] ) );
		});
		it( "removes invalid items", function() {
			var rawResults = generateRequestResults( 2, "askStory" )
					.concat( new Array( 2 ) ),
				option = null,
				hasDiscussionOption = false;

			var results = utils.processRawResults( rawResults, option, hasDiscussionOption );

			results.should.eql( enumerateResults( [
				expected.askStory,
				expected.askStory
			] ) );
		});
		it( "returns only Ask items on :ask", function() {
			var rawResults = generateRequestResults( 8 )
					.concat( generateRequestResults( 2, "askStory" ) ),
				option = ":ask",
				hasDiscussionOption = false;

			var results = utils.processRawResults( rawResults, option, hasDiscussionOption );

			results.should.eql( enumerateResults( [
				expected.askStory,
				expected.askStory
			] ) );
		});
		it( "returns only Show items on :s", function() {
			var rawResults = generateRequestResults( 8 )
					.concat( generateRequestResults( 2, "showStory" ) ),
				option = ":s",
				hasDiscussionOption = false;

			var results = utils.processRawResults( rawResults, option, hasDiscussionOption );

			results.should.eql( enumerateResults( [
				expected.showStory,
				expected.showStory
			] ) );
		});
		it( "returns only Jobs items on :j", function() {
			var rawResults = generateRequestResults( 8 )
					.concat( generateRequestResults( 2, "job" ) ),
				option = ":j",
				hasDiscussionOption = false;

			var results = utils.processRawResults( rawResults, option, hasDiscussionOption );

			results.should.eql( enumerateResults( [
				expected.job,
				expected.job
			] ) );
		});
		it( "returns discussion items when :d is present", function() {
			var rawResults = generateRequestResults( 3 )
					.concat( generateRequestResults( 2, "showStory" ) )
					.concat( generateRequestResults( 2, "askStory" ) )
					.concat( generateRequestResults( 3, "job" ) )
					.concat( generateRequestResults( 1, "poll" ) ),
				option = null,
				hasDiscussionOption = true;

			var results = utils.processRawResults( rawResults, option, hasDiscussionOption );

			results.should.eql( enumerateResults( [
				expected.defaultStoryDiscussion,
				expected.defaultStoryDiscussion,
				expected.defaultStoryDiscussion,
				expected.showStoryDiscussion,
				expected.showStoryDiscussion,
				expected.askStory,
				expected.askStory,
				expected.job,
				expected.job,
				expected.job,
				expected.poll
			] ) );
		});
		it( "returns discussion items of last type specified by an option", function() {
			var rawResults = generateRequestResults( 3 )
					.concat( generateRequestResults( 2, "showStory" ) )
					.concat( generateRequestResults( 2, "askStory" ) )
					.concat( generateRequestResults( 3, "job" ) ),
				option = ":ask",
				hasDiscussionOption = true;

			var results = utils.processRawResults( rawResults, option, hasDiscussionOption );

			results.should.eql( enumerateResults( [
				expected.askStory,
				expected.askStory
			] ) );
		});

		after( cleanDateMockFunc );
	} );
});