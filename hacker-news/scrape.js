'use strict';

var result = {};

var mainTable = document.querySelectorAll("body table tr table")[1],
	rawRows = Array.prototype.slice.call(mainTable.querySelector("tbody").querySelectorAll("tr")),
	lastRowLink = rawRows[rawRows.length-1].querySelector("a"),
	isThereMore = lastRowLink !== null && lastRowLink.text === "More",
	selection = document.querySelector(".topsel"),
	isJobs = selection !== null && selection.textContent === "jobs",
	urlPath = window.location.pathname,
	isFirstJobsPage = urlPath === "/jobs",
	isShow = selection !== null && selection.textContent === "show",
	isFirstShowPage = urlPath === "/show",
	isComments = selection !== null && selection.textContent === "comments";

// for tests
if ( window._pagehopTest ) {
	if ( window._pagehopTest.isFirstJobsPage ) {
		isFirstJobsPage = true;
	}
	if ( window._pagehopTest.isFirstShowPage ) {
		isFirstShowPage = true;
	}
}

if ( isJobs && isFirstJobsPage ) {
	rawRows = rawRows.splice( 2 );
} else if ( isShow && isFirstShowPage ) {
	rawRows = rawRows.splice( 3 );
}

var extractText = function(rawRows, index) {
	var result;
	if ( isComments ) {
		var commentText = rawRows[index].querySelector(".comment").textContent;
		result = commentText.substring( 0, 80 ) + ( commentText.length > 80 ? "..." : "" );
	} else {
		result = rawRows[index].textContent;
	}
	return result;
};
var extractAddress = function(rawRows, index) {
	var result;
	if ( isComments ) {
		var headerParts = Array.prototype.slice.call(rawRows[index].querySelectorAll("td")[1].querySelector(".comhead").childNodes);
		result = headerParts[2].href;
	} else {
		result = rawRows[index].querySelectorAll("td")[2].querySelector("a").href;
	}
	return result;
};
var extractDiscussionAddress = function(rawRows, index) {
	var result;
	if ( isComments ) {
		var headerParts = Array.prototype.slice.call(rawRows[index].querySelectorAll("td")[1].querySelector(".comhead").childNodes);
		result = headerParts[headerParts.length - 1].href;
	} else {
		var secondLineLinks = rawRows[index+1].querySelectorAll("a");
		if ( secondLineLinks && secondLineLinks.length > 1 ) {
			result = secondLineLinks[1].href;
		}
	}
	return result;
};
var extractDisplayAddress = function(rawRows, index) {
	var result;
	if ( isComments ) {
		var headerParts = Array.prototype.slice.call(rawRows[index].querySelectorAll("td")[1].querySelector(".comhead").childNodes);
		result = [
			headerParts[0].text,
			headerParts[1].textContent.replace("|", "").trim(),
			"on: " + headerParts[headerParts.length - 1].text
		].join(" ");
	} else {
		result = rawRows[index+1].textContent;
	}
	return result;
};

var items = [],
	index = 0,
	rowCount = isThereMore ? rawRows.length - 2 : rawRows.length - 1,
	step = isComments ? 2 : 3;

for (var i = 0; i < rowCount; i += step) {
	items[index++] = {
		text: extractText( rawRows, i ),
		address: extractAddress( rawRows, i ),
		displayAddress: extractDisplayAddress( rawRows, i )
	};
	var discussionAddress = extractDiscussionAddress( rawRows, i );
	if ( discussionAddress ) {
		items[index-1].discussionAddress = discussionAddress;
	}
}

result.items = items;

if ( isThereMore ) {
	result.nextUrl = lastRowLink.href;
}

pagehop.finish( result );