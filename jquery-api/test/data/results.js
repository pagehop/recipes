'use strict';

exports.default_http = [
	{
		"text": "All Selector (“*”) (Selectors > Basic)",
		"address": "http://api.jquery.com/all-selector/",
		"displayAddress": "Selects all elements.",
		"tooltip": "Selects all elements."
	},
	{
		"text": ":animated Selector (Selectors > Basic Filter | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/animated-selector/",
		"displayAddress": "Select all elements that are in the progress of an animation at the time the selector is run.",
		"tooltip": "Select all elements that are in the progress of an animation at the time the selector is run."
	},
	{
		"text": "Attribute Contains Prefix Selector [name|=\"value\"] (Selectors > Attribute)",
		"address": "http://api.jquery.com/attribute-contains-prefix-selector/",
		"displayAddress": "Selects elements that have the specified attribute with a value either equal to a given string or starting with that string followed by a hyphen (-).",
		"tooltip": "Selects elements that have the specified attribute with a value either equal to a given string or starting with that string followed by a hyphen (-)."
	},
	{
		"text": "Attribute Contains Selector [name*=\"value\"] (Selectors > Attribute)",
		"address": "http://api.jquery.com/attribute-contains-selector/",
		"displayAddress": "Selects elements that have the specified attribute with a value containing the a given substring.",
		"tooltip": "Selects elements that have the specified attribute with a value containing the a given substring."
	},
	{
		"text": "Attribute Contains Word Selector [name~=\"value\"] (Selectors > Attribute)",
		"address": "http://api.jquery.com/attribute-contains-word-selector/",
		"displayAddress": "Selects elements that have the specified attribute with a value containing a given word, delimited by spaces.",
		"tooltip": "Selects elements that have the specified attribute with a value containing a given word, delimited by spaces."
	},
	{
		"text": "Attribute Ends With Selector [name$=\"value\"] (Selectors > Attribute)",
		"address": "http://api.jquery.com/attribute-ends-with-selector/",
		"displayAddress": "Selects elements that have the specified attribute with a value ending exactly with a given string. The comparison is case sensitive.",
		"tooltip": "Selects elements that have the specified attribute with a value ending exactly with a given string. The comparison is case sensitive."
	},
	{
		"text": "Attribute Equals Selector [name=\"value\"] (Selectors > Attribute)",
		"address": "http://api.jquery.com/attribute-equals-selector/",
		"displayAddress": "Selects elements that have the specified attribute with a value exactly equal to a certain value.",
		"tooltip": "Selects elements that have the specified attribute with a value exactly equal to a certain value."
	},
	{
		"text": "Attribute Not Equal Selector [name!=\"value\"] (Selectors > Attribute | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/attribute-not-equal-selector/",
		"displayAddress": "Select elements that either don’t have the specified attribute, or do have the specified attribute but not with a certain value.",
		"tooltip": "Select elements that either don’t have the specified attribute, or do have the specified attribute but not with a certain value."
	},
	{
		"text": "Attribute Starts With Selector [name^=\"value\"] (Selectors > Attribute)",
		"address": "http://api.jquery.com/attribute-starts-with-selector/",
		"displayAddress": "Selects elements that have the specified attribute with a value beginning exactly with a given string.",
		"tooltip": "Selects elements that have the specified attribute with a value beginning exactly with a given string."
	},
	{
		"text": ":button Selector (Selectors > Form | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/button-selector/",
		"displayAddress": "Selects all button elements and elements of type button.",
		"tooltip": "Selects all button elements and elements of type button."
	},
	{
		"text": ":checkbox Selector (Selectors > Form | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/checkbox-selector/",
		"displayAddress": "Selects all elements of type checkbox.",
		"tooltip": "Selects all elements of type checkbox."
	},
	{
		"text": ":checked Selector (Selectors > Form)",
		"address": "http://api.jquery.com/checked-selector/",
		"displayAddress": "Matches all elements that are checked or selected.",
		"tooltip": "Matches all elements that are checked or selected."
	},
	{
		"text": "Child Selector (“parent > child”) (Selectors > Hierarchy)",
		"address": "http://api.jquery.com/child-selector/",
		"displayAddress": "Selects all direct child elements specified by “child” of elements specified by “parent”.",
		"tooltip": "Selects all direct child elements specified by “child” of elements specified by “parent”."
	},
	{
		"text": "Class Selector (“.class”) (Selectors > Basic)",
		"address": "http://api.jquery.com/class-selector/",
		"displayAddress": "Selects all elements with the given class.",
		"tooltip": "Selects all elements with the given class."
	},
	{
		"text": ":contains() Selector (Selectors > Content Filter)",
		"address": "http://api.jquery.com/contains-selector/",
		"displayAddress": "Select all elements that contain the specified text.",
		"tooltip": "Select all elements that contain the specified text."
	},
	{
		"text": "Descendant Selector (“ancestor descendant”) (Selectors > Hierarchy)",
		"address": "http://api.jquery.com/descendant-selector/",
		"displayAddress": "Selects all elements that are descendants of a given ancestor.",
		"tooltip": "Selects all elements that are descendants of a given ancestor."
	},
	{
		"text": ":disabled Selector (Selectors > Form)",
		"address": "http://api.jquery.com/disabled-selector/",
		"displayAddress": "Selects all elements that are disabled.",
		"tooltip": "Selects all elements that are disabled."
	},
	{
		"text": "Element Selector (“element”) (Selectors > Basic)",
		"address": "http://api.jquery.com/element-selector/",
		"displayAddress": "Selects all elements with the given tag name.",
		"tooltip": "Selects all elements with the given tag name."
	},
	{
		"text": ":empty Selector (Selectors > Content Filter)",
		"address": "http://api.jquery.com/empty-selector/",
		"displayAddress": "Select all elements that have no children (including text nodes).",
		"tooltip": "Select all elements that have no children (including text nodes)."
	},
	{
		"text": ":enabled Selector (Selectors > Form)",
		"address": "http://api.jquery.com/enabled-selector/",
		"displayAddress": "Selects all elements that are enabled.",
		"tooltip": "Selects all elements that are enabled."
	},
	{
		"text": ":eq() Selector (Selectors > Basic Filter | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/eq-selector/",
		"displayAddress": "Select the element at index n within the matched set.",
		"tooltip": "Select the element at index n within the matched set."
	},
	{
		"text": ":even Selector (Selectors > Basic Filter | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/even-selector/",
		"displayAddress": "Selects even elements, zero-indexed.  See also odd.",
		"tooltip": "Selects even elements, zero-indexed.  See also odd."
	},
	{
		"text": ":file Selector (Selectors > Form | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/file-selector/",
		"displayAddress": "Selects all elements of type file.",
		"tooltip": "Selects all elements of type file."
	},
	{
		"text": ":first-child Selector (Selectors > Child Filter)",
		"address": "http://api.jquery.com/first-child-selector/",
		"displayAddress": "Selects all elements that are the first child of their parent.",
		"tooltip": "Selects all elements that are the first child of their parent."
	},
	{
		"text": ":first-of-type Selector (Selectors > Child Filter)",
		"address": "http://api.jquery.com/first-of-type-selector/",
		"displayAddress": "Selects all elements that are the first among siblings of the same element name.",
		"tooltip": "Selects all elements that are the first among siblings of the same element name."
	},
	{
		"text": ":first Selector (Selectors > Basic Filter | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/first-selector/",
		"displayAddress": "Selects the first matched element.",
		"tooltip": "Selects the first matched element."
	},
	{
		"text": ":focus Selector (Selectors > Basic Filter | Selectors > Form)",
		"address": "http://api.jquery.com/focus-selector/",
		"displayAddress": "Selects element if it is currently focused.",
		"tooltip": "Selects element if it is currently focused."
	},
	{
		"text": ":gt() Selector (Selectors > Basic Filter | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/gt-selector/",
		"displayAddress": "Select all elements at an index greater than index within the matched set.",
		"tooltip": "Select all elements at an index greater than index within the matched set."
	},
	{
		"text": "Has Attribute Selector [name] (Selectors > Attribute)",
		"address": "http://api.jquery.com/has-attribute-selector/",
		"displayAddress": "Selects elements that have the specified attribute, with any value.",
		"tooltip": "Selects elements that have the specified attribute, with any value."
	},
	{
		"text": ":has() Selector (Selectors > Content Filter | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/has-selector/",
		"displayAddress": "Selects elements which contain at least one element that matches the specified selector.",
		"tooltip": "Selects elements which contain at least one element that matches the specified selector."
	},
	{
		"text": ":header Selector (Selectors > Basic Filter | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/header-selector/",
		"displayAddress": "Selects all elements that are headers, like h1, h2, h3 and so on.",
		"tooltip": "Selects all elements that are headers, like h1, h2, h3 and so on."
	},
	{
		"text": ":hidden Selector (Selectors > jQuery Extensions | Selectors > Visibility Filter)",
		"address": "http://api.jquery.com/hidden-selector/",
		"displayAddress": "Selects all elements that are hidden.",
		"tooltip": "Selects all elements that are hidden."
	},
	{
		"text": "ID Selector (“#id”) (Selectors > Basic)",
		"address": "http://api.jquery.com/id-selector/",
		"displayAddress": "Selects a single element with the given id attribute.",
		"tooltip": "Selects a single element with the given id attribute."
	},
	{
		"text": ":image Selector (Selectors > Form | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/image-selector/",
		"displayAddress": "Selects all elements of type image.",
		"tooltip": "Selects all elements of type image."
	},
	{
		"text": ":input Selector (Selectors > Form | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/input-selector/",
		"displayAddress": "Selects all input, textarea, select and button elements.",
		"tooltip": "Selects all input, textarea, select and button elements."
	},
	{
		"text": ":lang() Selector (Selectors > Basic Filter)",
		"address": "http://api.jquery.com/lang-selector/",
		"displayAddress": "Selects all elements of the specified language.",
		"tooltip": "Selects all elements of the specified language."
	},
	{
		"text": ":last-child Selector (Selectors > Child Filter)",
		"address": "http://api.jquery.com/last-child-selector/",
		"displayAddress": "Selects all elements that are the last child of their parent.",
		"tooltip": "Selects all elements that are the last child of their parent."
	},
	{
		"text": ":last-of-type Selector (Selectors > Child Filter)",
		"address": "http://api.jquery.com/last-of-type-selector/",
		"displayAddress": "Selects all elements that are the last among siblings of the same element name.",
		"tooltip": "Selects all elements that are the last among siblings of the same element name."
	},
	{
		"text": ":last Selector (Selectors > Basic Filter | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/last-selector/",
		"displayAddress": "Selects the last matched element.",
		"tooltip": "Selects the last matched element."
	},
	{
		"text": ":lt() Selector (Selectors > Basic Filter | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/lt-selector/",
		"displayAddress": "Select all elements at an index less than index within the matched set.",
		"tooltip": "Select all elements at an index less than index within the matched set."
	},
	{
		"text": "Multiple Attribute Selector [name=\"value\"][name2=\"value2\"] (Selectors > Attribute)",
		"address": "http://api.jquery.com/multiple-attribute-selector/",
		"displayAddress": "Matches elements that match all of the specified attribute filters.",
		"tooltip": "Matches elements that match all of the specified attribute filters."
	},
	{
		"text": "Multiple Selector (“selector1, selector2, selectorN”) (Selectors > Basic)",
		"address": "http://api.jquery.com/multiple-selector/",
		"displayAddress": "Selects the combined results of all the specified selectors.",
		"tooltip": "Selects the combined results of all the specified selectors."
	},
	{
		"text": "Next Adjacent Selector (“prev + next”) (Selectors > Hierarchy)",
		"address": "http://api.jquery.com/next-adjacent-Selector/",
		"displayAddress": "Selects all next elements matching “next” that are immediately preceded by a sibling “prev”.",
		"tooltip": "Selects all next elements matching “next” that are immediately preceded by a sibling “prev”."
	},
	{
		"text": "Next Siblings Selector (“prev ~ siblings”) (Selectors > Hierarchy)",
		"address": "http://api.jquery.com/next-siblings-selector/",
		"displayAddress": "Selects all sibling elements that follow after the “prev” element, have the same parent, and match the filtering “siblings” selector.",
		"tooltip": "Selects all sibling elements that follow after the “prev” element, have the same parent, and match the filtering “siblings” selector."
	},
	{
		"text": ":not() Selector (Selectors > Basic Filter)",
		"address": "http://api.jquery.com/not-selector/",
		"displayAddress": "Selects all elements that do not match the given selector.",
		"tooltip": "Selects all elements that do not match the given selector."
	},
	{
		"text": ":nth-child() Selector (Selectors > Child Filter)",
		"address": "http://api.jquery.com/nth-child-selector/",
		"displayAddress": "Selects all elements that are the nth-child of their parent.",
		"tooltip": "Selects all elements that are the nth-child of their parent."
	},
	{
		"text": ":nth-last-child() Selector (Selectors > Child Filter)",
		"address": "http://api.jquery.com/nth-last-child-selector/",
		"displayAddress": "Selects all elements that are the nth-child of their parent, counting from the last element to the first.",
		"tooltip": "Selects all elements that are the nth-child of their parent, counting from the last element to the first."
	},
	{
		"text": ":nth-last-of-type() Selector (Selectors > Child Filter)",
		"address": "http://api.jquery.com/nth-last-of-type-selector/",
		"displayAddress": "Selects all elements that are the nth-child of their parent, counting from the last element to the first.",
		"tooltip": "Selects all elements that are the nth-child of their parent, counting from the last element to the first."
	},
	{
		"text": ":nth-of-type() Selector (Selectors > Child Filter)",
		"address": "http://api.jquery.com/nth-of-type-selector/",
		"displayAddress": "Selects all elements that are the nth child of their parent in relation to siblings with the same element name.",
		"tooltip": "Selects all elements that are the nth child of their parent in relation to siblings with the same element name."
	},
	{
		"text": ":odd Selector (Selectors > Basic Filter | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/odd-selector/",
		"displayAddress": "Selects odd elements, zero-indexed.  See also even.",
		"tooltip": "Selects odd elements, zero-indexed.  See also even."
	},
	{
		"text": ":only-child Selector (Selectors > Child Filter)",
		"address": "http://api.jquery.com/only-child-selector/",
		"displayAddress": "Selects all elements that are the only child of their parent.",
		"tooltip": "Selects all elements that are the only child of their parent."
	},
	{
		"text": ":only-of-type Selector (Selectors > Child Filter)",
		"address": "http://api.jquery.com/only-of-type-selector/",
		"displayAddress": "Selects all elements that have no siblings with the same element name.",
		"tooltip": "Selects all elements that have no siblings with the same element name."
	},
	{
		"text": ":parent Selector (Selectors > Content Filter | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/parent-selector/",
		"displayAddress": "Select all elements that have at least one child node (either an element or text).",
		"tooltip": "Select all elements that have at least one child node (either an element or text)."
	},
	{
		"text": ":password Selector (Selectors > Form | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/password-selector/",
		"displayAddress": "Selects all elements of type password.",
		"tooltip": "Selects all elements of type password."
	},
	{
		"text": ":radio Selector (Selectors > Form | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/radio-selector/",
		"displayAddress": "Selects all  elements of type radio.",
		"tooltip": "Selects all  elements of type radio."
	},
	{
		"text": ":reset Selector (Selectors > Form | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/reset-selector/",
		"displayAddress": "Selects all elements of type reset.",
		"tooltip": "Selects all elements of type reset."
	},
	{
		"text": ":root Selector (Selectors > Basic Filter)",
		"address": "http://api.jquery.com/root-selector/",
		"displayAddress": "Selects the element that is the root of the document.",
		"tooltip": "Selects the element that is the root of the document."
	},
	{
		"text": ":selected Selector (Selectors > Form | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/selected-selector/",
		"displayAddress": "Selects all elements that are selected.",
		"tooltip": "Selects all elements that are selected."
	},
	{
		"text": ".selector (Deprecated > Deprecated 1.7 | Internals | Properties > Properties of the Global jQuery Object)",
		"address": "http://api.jquery.com/selector/",
		"displayAddress": "A selector representing selector passed to jQuery(), if any, when creating the original set.",
		"tooltip": "A selector representing selector passed to jQuery(), if any, when creating the original set."
	},
	{
		"text": ":submit Selector (Selectors > Form | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/submit-selector/",
		"displayAddress": "Selects all elements of type submit.",
		"tooltip": "Selects all elements of type submit."
	},
	{
		"text": ":target Selector (Selectors > Basic Filter)",
		"address": "http://api.jquery.com/target-selector/",
		"displayAddress": "Selects the target element indicated by the fragment identifier of the document’s URI.",
		"tooltip": "Selects the target element indicated by the fragment identifier of the document’s URI."
	},
	{
		"text": ":text Selector (Selectors > Form | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/text-selector/",
		"displayAddress": "Selects all elements of type text.",
		"tooltip": "Selects all elements of type text."
	},
	{
		"text": ":visible Selector (Selectors > jQuery Extensions | Selectors > Visibility Filter)",
		"address": "http://api.jquery.com/visible-selector/",
		"displayAddress": "Selects all elements that are visible.",
		"tooltip": "Selects all elements that are visible."
	},
	{
		"text": ".addBack() (Traversing > Miscellaneous Traversing)",
		"address": "http://api.jquery.com/addBack/",
		"displayAddress": "Add the previous set of elements on the stack to the current set, optionally filtered by a selector.",
		"tooltip": "Add the previous set of elements on the stack to the current set, optionally filtered by a selector."
	},
	{
		"text": ".children() (Traversing > Tree Traversal)",
		"address": "http://api.jquery.com/children/",
		"displayAddress": "Get the children of each element in the set of matched elements, optionally filtered by a selector.",
		"tooltip": "Get the children of each element in the set of matched elements, optionally filtered by a selector."
	},
	{
		"text": ".closest() (Traversing > Tree Traversal)",
		"address": "http://api.jquery.com/closest/",
		"displayAddress": "For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.",
		"tooltip": "For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree."
	},
	{
		"text": ".delegate() (Events > Event Handler Attachment)",
		"address": "http://api.jquery.com/delegate/",
		"displayAddress": "Attach a handler to one or more events for all elements that match the selector, now or in the future, based on a specific set of root elements.",
		"tooltip": "Attach a handler to one or more events for all elements that match the selector, now or in the future, based on a specific set of root elements."
	},
	{
		"text": ".filter() (Traversing > Filtering)",
		"address": "http://api.jquery.com/filter/",
		"displayAddress": "Reduce the set of matched elements to those that match the selector or pass the function’s test.",
		"tooltip": "Reduce the set of matched elements to those that match the selector or pass the function’s test."
	},
	{
		"text": ".find() (Traversing > Tree Traversal)",
		"address": "http://api.jquery.com/find/",
		"displayAddress": "Get the descendants of each element in the current set of matched elements, filtered by a selector, jQuery object, or element.",
		"tooltip": "Get the descendants of each element in the current set of matched elements, filtered by a selector, jQuery object, or element."
	},
	{
		"text": ".has() (Traversing > Filtering)",
		"address": "http://api.jquery.com/has/",
		"displayAddress": "Reduce the set of matched elements to those that have a descendant that matches the selector or DOM element.",
		"tooltip": "Reduce the set of matched elements to those that have a descendant that matches the selector or DOM element."
	},
	{
		"text": ".is() (Traversing > Filtering)",
		"address": "http://api.jquery.com/is/",
		"displayAddress": "Check the current matched set of elements against a selector, element, or jQuery object and return true if at least one of these elements matches the given arguments.",
		"tooltip": "Check the current matched set of elements against a selector, element, or jQuery object and return true if at least one of these elements matches the given arguments."
	},
	{
		"text": ".live() (Deprecated > Deprecated 1.7 | Events > Event Handler Attachment | Removed)",
		"address": "http://api.jquery.com/live/",
		"displayAddress": "Attach an event handler for all elements which match the current selector, now and in the future.",
		"tooltip": "Attach an event handler for all elements which match the current selector, now and in the future."
	},
	{
		"text": ".next() (Traversing > Tree Traversal)",
		"address": "http://api.jquery.com/next/",
		"displayAddress": "Get the immediately following sibling of each element in the set of matched elements. If a selector is provided, it retrieves the next sibling only if it matches that selector.",
		"tooltip": "Get the immediately following sibling of each element in the set of matched elements. If a selector is provided, it retrieves the next sibling only if it matches that selector."
	},
	{
		"text": ".nextAll() (Traversing > Tree Traversal)",
		"address": "http://api.jquery.com/nextAll/",
		"displayAddress": "Get all following siblings of each element in the set of matched elements, optionally filtered by a selector.",
		"tooltip": "Get all following siblings of each element in the set of matched elements, optionally filtered by a selector."
	},
	{
		"text": ".nextUntil() (Traversing > Tree Traversal)",
		"address": "http://api.jquery.com/nextUntil/",
		"displayAddress": "Get all following siblings of each element up to but not including the element matched by the selector, DOM node, or jQuery object passed.",
		"tooltip": "Get all following siblings of each element up to but not including the element matched by the selector, DOM node, or jQuery object passed."
	},
	{
		"text": ".parent() (Traversing > Tree Traversal)",
		"address": "http://api.jquery.com/parent/",
		"displayAddress": "Get the parent of each element in the current set of matched elements, optionally filtered by a selector.",
		"tooltip": "Get the parent of each element in the current set of matched elements, optionally filtered by a selector."
	},
	{
		"text": ".parents() (Traversing > Tree Traversal)",
		"address": "http://api.jquery.com/parents/",
		"displayAddress": "Get the ancestors of each element in the current set of matched elements, optionally filtered by a selector.",
		"tooltip": "Get the ancestors of each element in the current set of matched elements, optionally filtered by a selector."
	},
	{
		"text": ".parentsUntil() (Traversing > Tree Traversal)",
		"address": "http://api.jquery.com/parentsUntil/",
		"displayAddress": "Get the ancestors of each element in the current set of matched elements, up to but not including the element matched by the selector, DOM node, or jQuery object.",
		"tooltip": "Get the ancestors of each element in the current set of matched elements, up to but not including the element matched by the selector, DOM node, or jQuery object."
	},
	{
		"text": ".prev() (Traversing > Tree Traversal)",
		"address": "http://api.jquery.com/prev/",
		"displayAddress": "Get the immediately preceding sibling of each element in the set of matched elements, optionally filtered by a selector.",
		"tooltip": "Get the immediately preceding sibling of each element in the set of matched elements, optionally filtered by a selector."
	},
	{
		"text": ".prevAll() (Traversing > Tree Traversal)",
		"address": "http://api.jquery.com/prevAll/",
		"displayAddress": "Get all preceding siblings of each element in the set of matched elements, optionally filtered by a selector.",
		"tooltip": "Get all preceding siblings of each element in the set of matched elements, optionally filtered by a selector."
	},
	{
		"text": ".prevUntil() (Traversing > Tree Traversal)",
		"address": "http://api.jquery.com/prevUntil/",
		"displayAddress": "Get all preceding siblings of each element up to but not including the element matched by the selector, DOM node, or jQuery object.",
		"tooltip": "Get all preceding siblings of each element up to but not including the element matched by the selector, DOM node, or jQuery object."
	},
	{
		"text": ".siblings() (Traversing > Tree Traversal)",
		"address": "http://api.jquery.com/siblings/",
		"displayAddress": "Get the siblings of each element in the set of matched elements, optionally filtered by a selector.",
		"tooltip": "Get the siblings of each element in the set of matched elements, optionally filtered by a selector."
	},
	{
		"text": ".undelegate() (Events > Event Handler Attachment)",
		"address": "http://api.jquery.com/undelegate/",
		"displayAddress": "Remove a handler from the event for all elements which match the current selector, based upon a specific set of root elements.",
		"tooltip": "Remove a handler from the event for all elements which match the current selector, based upon a specific set of root elements."
	},
	{
		"text": ".add() (Traversing > Miscellaneous Traversing)",
		"address": "http://api.jquery.com/add/",
		"displayAddress": "Add elements to the set of matched elements.",
		"tooltip": "Add elements to the set of matched elements."
	},
	{
		"text": ".after() (Manipulation > DOM Insertion, Outside)",
		"address": "http://api.jquery.com/after/",
		"displayAddress": "Insert content, specified by the parameter, after each element in the set of matched elements.",
		"tooltip": "Insert content, specified by the parameter, after each element in the set of matched elements."
	},
	{
		"text": ".andSelf() (Deprecated > Deprecated 1.8 | Traversing > Miscellaneous Traversing)",
		"address": "http://api.jquery.com/andSelf/",
		"displayAddress": "Add the previous set of elements on the stack to the current set.",
		"tooltip": "Add the previous set of elements on the stack to the current set."
	},
	{
		"text": ".append() (Manipulation > DOM Insertion, Inside)",
		"address": "http://api.jquery.com/append/",
		"displayAddress": "Insert content, specified by the parameter, to the end of each element in the set of matched elements.",
		"tooltip": "Insert content, specified by the parameter, to the end of each element in the set of matched elements."
	},
	{
		"text": ".appendTo() (Manipulation > DOM Insertion, Inside)",
		"address": "http://api.jquery.com/appendTo/",
		"displayAddress": "Insert every element in the set of matched elements to the end of the target.",
		"tooltip": "Insert every element in the set of matched elements to the end of the target."
	},
	{
		"text": ".before() (Manipulation > DOM Insertion, Outside)",
		"address": "http://api.jquery.com/before/",
		"displayAddress": "Insert content, specified by the parameter, before each element in the set of matched elements.",
		"tooltip": "Insert content, specified by the parameter, before each element in the set of matched elements."
	},
	{
		"text": ".detach() (Manipulation > DOM Removal)",
		"address": "http://api.jquery.com/detach/",
		"displayAddress": "Remove the set of matched elements from the DOM.",
		"tooltip": "Remove the set of matched elements from the DOM."
	},
	{
		"text": ".die() (Deprecated > Deprecated 1.7 | Events > Event Handler Attachment | Removed)",
		"address": "http://api.jquery.com/die/",
		"displayAddress": "Remove event handlers previously attached using .live() from the elements.",
		"tooltip": "Remove event handlers previously attached using .live() from the elements."
	},
	{
		"text": ".fadeOut() (Effects > Fading)",
		"address": "http://api.jquery.com/fadeOut/",
		"displayAddress": "Hide the matched elements by fading them to transparent.",
		"tooltip": "Hide the matched elements by fading them to transparent."
	},
	{
		"text": ".hover() (Events > Mouse Events)",
		"address": "http://api.jquery.com/hover/",
		"displayAddress": "Bind one or two handlers to the matched elements, to be executed when the mouse pointer enters and leaves the elements.",
		"tooltip": "Bind one or two handlers to the matched elements, to be executed when the mouse pointer enters and leaves the elements."
	},
	{
		"text": ".html() (Attributes | Manipulation > DOM Insertion, Inside)",
		"address": "http://api.jquery.com/html/",
		"displayAddress": "Get the HTML contents of the first element in the set of matched elements or set the HTML contents of every matched element.",
		"tooltip": "Get the HTML contents of the first element in the set of matched elements or set the HTML contents of every matched element."
	},
	{
		"text": ".index() (Miscellaneous > DOM Element Methods)",
		"address": "http://api.jquery.com/index/",
		"displayAddress": "Search for a given element from among the matched elements.",
		"tooltip": "Search for a given element from among the matched elements."
	},
	{
		"text": ".insertAfter() (Manipulation > DOM Insertion, Outside)",
		"address": "http://api.jquery.com/insertAfter/",
		"displayAddress": "Insert every element in the set of matched elements after the target.",
		"tooltip": "Insert every element in the set of matched elements after the target."
	},
	{
		"text": ".insertBefore() (Manipulation > DOM Insertion, Outside)",
		"address": "http://api.jquery.com/insertBefore/",
		"displayAddress": "Insert every element in the set of matched elements before the target.",
		"tooltip": "Insert every element in the set of matched elements before the target."
	},
	{
		"text": "jQuery() (Core)",
		"address": "http://api.jquery.com/jQuery/",
		"displayAddress": "Return a collection of matched elements either found in the DOM based on passed argument(s) or created by passing an HTML string.",
		"tooltip": "Return a collection of matched elements either found in the DOM based on passed argument(s) or created by passing an HTML string."
	},
	{
		"text": "jQuery.each() (Utilities)",
		"address": "http://api.jquery.com/jQuery.each/",
		"displayAddress": "A generic iterator function, which can be used to seamlessly iterate over both objects and arrays. Arrays and array-like objects with a length property (such as a function’s arguments object) are iterated by numeric index, from 0 to length-1. Other objects are iterated via their named properties.",
		"tooltip": "A generic iterator function, which can be used to seamlessly iterate over both objects and arrays. Arrays and array-like objects with a length property (such as a function’s arguments object) are iterated by numeric index, from 0 to length-1. Other objects are iterated via their named properties."
	},
	{
		"text": ".load() (Ajax > Shorthand Methods)",
		"address": "http://api.jquery.com/load/",
		"displayAddress": "Load data from the server and place the returned HTML into the matched element.",
		"tooltip": "Load data from the server and place the returned HTML into the matched element."
	},
	{
		"text": ".not() (Traversing > Filtering | Traversing > Miscellaneous Traversing)",
		"address": "http://api.jquery.com/not/",
		"displayAddress": "Remove elements from the set of matched elements.",
		"tooltip": "Remove elements from the set of matched elements."
	},
	{
		"text": ".off() (Events > Event Handler Attachment)",
		"address": "http://api.jquery.com/off/",
		"displayAddress": "Remove an event handler.",
		"tooltip": "Remove an event handler."
	},
	{
		"text": ".on() (Events > Event Handler Attachment)",
		"address": "http://api.jquery.com/on/",
		"displayAddress": "Attach an event handler function for one or more events to the selected elements.",
		"tooltip": "Attach an event handler function for one or more events to the selected elements."
	},
	{
		"text": ".one() (Events > Event Handler Attachment)",
		"address": "http://api.jquery.com/one/",
		"displayAddress": "Attach a handler to an event for the elements. The handler is executed at most once per element per event type.",
		"tooltip": "Attach a handler to an event for the elements. The handler is executed at most once per element per event type."
	},
	{
		"text": ".prepend() (Manipulation > DOM Insertion, Inside)",
		"address": "http://api.jquery.com/prepend/",
		"displayAddress": "Insert content, specified by the parameter, to the beginning of each element in the set of matched elements.",
		"tooltip": "Insert content, specified by the parameter, to the beginning of each element in the set of matched elements."
	},
	{
		"text": ".prependTo() (Manipulation > DOM Insertion, Inside)",
		"address": "http://api.jquery.com/prependTo/",
		"displayAddress": "Insert every element in the set of matched elements to the beginning of the target.",
		"tooltip": "Insert every element in the set of matched elements to the beginning of the target."
	},
	{
		"text": ".ready() (Events > Document Loading)",
		"address": "http://api.jquery.com/ready/",
		"displayAddress": "Specify a function to execute when the DOM is fully loaded.",
		"tooltip": "Specify a function to execute when the DOM is fully loaded."
	},
	{
		"text": ".remove() (Manipulation > DOM Removal)",
		"address": "http://api.jquery.com/remove/",
		"displayAddress": "Remove the set of matched elements from the DOM.",
		"tooltip": "Remove the set of matched elements from the DOM."
	},
	{
		"text": ".replaceAll() (Manipulation > DOM Replacement)",
		"address": "http://api.jquery.com/replaceAll/",
		"displayAddress": "Replace each target element with the set of matched elements.",
		"tooltip": "Replace each target element with the set of matched elements."
	},
	{
		"text": "Types ()",
		"address": "http://api.jquery.com/Types/",
		"displayAddress": "JavaScript provides several built-in datatypes. In addition to those, this page documents virtual types like Selectors, enhanced pseudo-types like Events and all and everything you wanted to know about Functions. You should be able to try out most of the examples below by just copying them to your browser’s JavaScript Console (Chrome, Safari with Develop … Continue reading →",
		"tooltip": "JavaScript provides several built-in datatypes. In addition to those, this page documents virtual types like Selectors, enhanced pseudo-types like Events and all and everything you wanted to know about Functions. You should be able to try out most of the examples below by just copying them to your browser’s JavaScript Console (Chrome, Safari with Develop … Continue reading →"
	},
	{
		"text": ".val() (Attributes | Forms | Manipulation > General Attributes)",
		"address": "http://api.jquery.com/val/",
		"displayAddress": "Get the current value of the first element in the set of matched elements or set the value of every matched element.",
		"tooltip": "Get the current value of the first element in the set of matched elements or set the value of every matched element."
	},
	{
		"text": ".wrap() (Manipulation > DOM Insertion, Around)",
		"address": "http://api.jquery.com/wrap/",
		"displayAddress": "Wrap an HTML structure around each element in the set of matched elements.",
		"tooltip": "Wrap an HTML structure around each element in the set of matched elements."
	},
	{
		"text": ".wrapAll() (Manipulation > DOM Insertion, Around)",
		"address": "http://api.jquery.com/wrapAll/",
		"displayAddress": "Wrap an HTML structure around all elements in the set of matched elements.",
		"tooltip": "Wrap an HTML structure around all elements in the set of matched elements."
	},
	{
		"text": ".wrapInner() (Manipulation > DOM Insertion, Around)",
		"address": "http://api.jquery.com/wrapInner/",
		"displayAddress": "Wrap an HTML structure around the content of each element in the set of matched elements.",
		"tooltip": "Wrap an HTML structure around the content of each element in the set of matched elements."
	}
];

exports.default_double_slash = [
	{
		"text": "All Selector (“*”) (Selectors > Basic)",
		"address": "http://api.jquery.com/all-selector/",
		"displayAddress": "Selects all elements.",
		"tooltip": "Selects all elements."
	},
	{
		"text": ":animated Selector (Selectors > Basic Filter | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/animated-selector/",
		"displayAddress": "Select all elements that are in the progress of an animation at the time the selector is run.",
		"tooltip": "Select all elements that are in the progress of an animation at the time the selector is run."
	},
	{
		"text": "Attribute Contains Prefix Selector [name|=\"value\"] (Selectors > Attribute)",
		"address": "http://api.jquery.com/attribute-contains-prefix-selector/",
		"displayAddress": "Selects elements that have the specified attribute with a value either equal to a given string or starting with that string followed by a hyphen (-).",
		"tooltip": "Selects elements that have the specified attribute with a value either equal to a given string or starting with that string followed by a hyphen (-)."
	},
	{
		"text": "Attribute Contains Selector [name*=\"value\"] (Selectors > Attribute)",
		"address": "http://api.jquery.com/attribute-contains-selector/",
		"displayAddress": "Selects elements that have the specified attribute with a value containing a given substring.",
		"tooltip": "Selects elements that have the specified attribute with a value containing a given substring."
	},
	{
		"text": "Attribute Contains Word Selector [name~=\"value\"] (Selectors > Attribute)",
		"address": "http://api.jquery.com/attribute-contains-word-selector/",
		"displayAddress": "Selects elements that have the specified attribute with a value containing a given word, delimited by spaces.",
		"tooltip": "Selects elements that have the specified attribute with a value containing a given word, delimited by spaces."
	},
	{
		"text": "Attribute Ends With Selector [name$=\"value\"] (Selectors > Attribute)",
		"address": "http://api.jquery.com/attribute-ends-with-selector/",
		"displayAddress": "Selects elements that have the specified attribute with a value ending exactly with a given string. The comparison is case sensitive.",
		"tooltip": "Selects elements that have the specified attribute with a value ending exactly with a given string. The comparison is case sensitive."
	},
	{
		"text": "Attribute Equals Selector [name=\"value\"] (Selectors > Attribute)",
		"address": "http://api.jquery.com/attribute-equals-selector/",
		"displayAddress": "Selects elements that have the specified attribute with a value exactly equal to a certain value.",
		"tooltip": "Selects elements that have the specified attribute with a value exactly equal to a certain value."
	},
	{
		"text": "Attribute Not Equal Selector [name!=\"value\"] (Selectors > Attribute | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/attribute-not-equal-selector/",
		"displayAddress": "Select elements that either don’t have the specified attribute, or do have the specified attribute but not with a certain value.",
		"tooltip": "Select elements that either don’t have the specified attribute, or do have the specified attribute but not with a certain value."
	},
	{
		"text": "Attribute Starts With Selector [name^=\"value\"] (Selectors > Attribute)",
		"address": "http://api.jquery.com/attribute-starts-with-selector/",
		"displayAddress": "Selects elements that have the specified attribute with a value beginning exactly with a given string.",
		"tooltip": "Selects elements that have the specified attribute with a value beginning exactly with a given string."
	},
	{
		"text": ":button Selector (Selectors > Form | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/button-selector/",
		"displayAddress": "Selects all button elements and elements of type button.",
		"tooltip": "Selects all button elements and elements of type button."
	},
	{
		"text": ":checkbox Selector (Selectors > Form | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/checkbox-selector/",
		"displayAddress": "Selects all elements of type checkbox.",
		"tooltip": "Selects all elements of type checkbox."
	},
	{
		"text": ":checked Selector (Selectors > Form)",
		"address": "http://api.jquery.com/checked-selector/",
		"displayAddress": "Matches all elements that are checked or selected.",
		"tooltip": "Matches all elements that are checked or selected."
	},
	{
		"text": "Child Selector (“parent > child”) (Selectors > Hierarchy)",
		"address": "http://api.jquery.com/child-selector/",
		"displayAddress": "Selects all direct child elements specified by “child” of elements specified by “parent”.",
		"tooltip": "Selects all direct child elements specified by “child” of elements specified by “parent”."
	},
	{
		"text": "Class Selector (“.class”) (Selectors > Basic)",
		"address": "http://api.jquery.com/class-selector/",
		"displayAddress": "Selects all elements with the given class.",
		"tooltip": "Selects all elements with the given class."
	},
	{
		"text": ":contains() Selector (Selectors > Content Filter)",
		"address": "http://api.jquery.com/contains-selector/",
		"displayAddress": "Select all elements that contain the specified text.",
		"tooltip": "Select all elements that contain the specified text."
	},
	{
		"text": "Descendant Selector (“ancestor descendant”) (Selectors > Hierarchy)",
		"address": "http://api.jquery.com/descendant-selector/",
		"displayAddress": "Selects all elements that are descendants of a given ancestor.",
		"tooltip": "Selects all elements that are descendants of a given ancestor."
	},
	{
		"text": ":disabled Selector (Selectors > Form)",
		"address": "http://api.jquery.com/disabled-selector/",
		"displayAddress": "Selects all elements that are disabled.",
		"tooltip": "Selects all elements that are disabled."
	},
	{
		"text": "Element Selector (“element”) (Selectors > Basic)",
		"address": "http://api.jquery.com/element-selector/",
		"displayAddress": "Selects all elements with the given tag name.",
		"tooltip": "Selects all elements with the given tag name."
	},
	{
		"text": ":empty Selector (Selectors > Content Filter)",
		"address": "http://api.jquery.com/empty-selector/",
		"displayAddress": "Select all elements that have no children (including text nodes).",
		"tooltip": "Select all elements that have no children (including text nodes)."
	},
	{
		"text": ":enabled Selector (Selectors > Form)",
		"address": "http://api.jquery.com/enabled-selector/",
		"displayAddress": "Selects all elements that are enabled.",
		"tooltip": "Selects all elements that are enabled."
	},
	{
		"text": ":eq() Selector (Selectors > Basic Filter | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/eq-selector/",
		"displayAddress": "Select the element at index n within the matched set.",
		"tooltip": "Select the element at index n within the matched set."
	},
	{
		"text": ":even Selector (Selectors > Basic Filter | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/even-selector/",
		"displayAddress": "Selects even elements, zero-indexed.  See also odd.",
		"tooltip": "Selects even elements, zero-indexed.  See also odd."
	},
	{
		"text": ":file Selector (Selectors > Form | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/file-selector/",
		"displayAddress": "Selects all elements of type file.",
		"tooltip": "Selects all elements of type file."
	},
	{
		"text": ":first-child Selector (Selectors > Child Filter)",
		"address": "http://api.jquery.com/first-child-selector/",
		"displayAddress": "Selects all elements that are the first child of their parent.",
		"tooltip": "Selects all elements that are the first child of their parent."
	},
	{
		"text": ":first-of-type Selector (Selectors > Child Filter)",
		"address": "http://api.jquery.com/first-of-type-selector/",
		"displayAddress": "Selects all elements that are the first among siblings of the same element name.",
		"tooltip": "Selects all elements that are the first among siblings of the same element name."
	},
	{
		"text": ":first Selector (Selectors > Basic Filter | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/first-selector/",
		"displayAddress": "Selects the first matched element.",
		"tooltip": "Selects the first matched element."
	},
	{
		"text": ":focus Selector (Selectors > Basic Filter | Selectors > Form)",
		"address": "http://api.jquery.com/focus-selector/",
		"displayAddress": "Selects element if it is currently focused.",
		"tooltip": "Selects element if it is currently focused."
	},
	{
		"text": ":gt() Selector (Selectors > Basic Filter | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/gt-selector/",
		"displayAddress": "Select all elements at an index greater than index within the matched set.",
		"tooltip": "Select all elements at an index greater than index within the matched set."
	},
	{
		"text": "Has Attribute Selector [name] (Selectors > Attribute)",
		"address": "http://api.jquery.com/has-attribute-selector/",
		"displayAddress": "Selects elements that have the specified attribute, with any value.",
		"tooltip": "Selects elements that have the specified attribute, with any value."
	},
	{
		"text": ":has() Selector (Selectors > Content Filter | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/has-selector/",
		"displayAddress": "Selects elements which contain at least one element that matches the specified selector.",
		"tooltip": "Selects elements which contain at least one element that matches the specified selector."
	},
	{
		"text": ":header Selector (Selectors > Basic Filter | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/header-selector/",
		"displayAddress": "Selects all elements that are headers, like h1, h2, h3 and so on.",
		"tooltip": "Selects all elements that are headers, like h1, h2, h3 and so on."
	},
	{
		"text": ":hidden Selector (Selectors > jQuery Extensions | Selectors > Visibility Filter)",
		"address": "http://api.jquery.com/hidden-selector/",
		"displayAddress": "Selects all elements that are hidden.",
		"tooltip": "Selects all elements that are hidden."
	},
	{
		"text": "ID Selector (“#id”) (Selectors > Basic)",
		"address": "http://api.jquery.com/id-selector/",
		"displayAddress": "Selects a single element with the given id attribute.",
		"tooltip": "Selects a single element with the given id attribute."
	},
	{
		"text": ":image Selector (Selectors > Form | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/image-selector/",
		"displayAddress": "Selects all elements of type image.",
		"tooltip": "Selects all elements of type image."
	},
	{
		"text": ":input Selector (Selectors > Form | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/input-selector/",
		"displayAddress": "Selects all input, textarea, select and button elements.",
		"tooltip": "Selects all input, textarea, select and button elements."
	},
	{
		"text": ":lang() Selector (Selectors > Basic Filter)",
		"address": "http://api.jquery.com/lang-selector/",
		"displayAddress": "Selects all elements of the specified language.",
		"tooltip": "Selects all elements of the specified language."
	},
	{
		"text": ":last-child Selector (Selectors > Child Filter)",
		"address": "http://api.jquery.com/last-child-selector/",
		"displayAddress": "Selects all elements that are the last child of their parent.",
		"tooltip": "Selects all elements that are the last child of their parent."
	},
	{
		"text": ":last-of-type Selector (Selectors > Child Filter)",
		"address": "http://api.jquery.com/last-of-type-selector/",
		"displayAddress": "Selects all elements that are the last among siblings of the same element name.",
		"tooltip": "Selects all elements that are the last among siblings of the same element name."
	},
	{
		"text": ":last Selector (Selectors > Basic Filter | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/last-selector/",
		"displayAddress": "Selects the last matched element.",
		"tooltip": "Selects the last matched element."
	},
	{
		"text": ":lt() Selector (Selectors > Basic Filter | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/lt-selector/",
		"displayAddress": "Select all elements at an index less than index within the matched set.",
		"tooltip": "Select all elements at an index less than index within the matched set."
	},
	{
		"text": "Multiple Attribute Selector [name=\"value\"][name2=\"value2\"] (Selectors > Attribute)",
		"address": "http://api.jquery.com/multiple-attribute-selector/",
		"displayAddress": "Matches elements that match all of the specified attribute filters.",
		"tooltip": "Matches elements that match all of the specified attribute filters."
	},
	{
		"text": "Multiple Selector (“selector1, selector2, selectorN”) (Selectors > Basic)",
		"address": "http://api.jquery.com/multiple-selector/",
		"displayAddress": "Selects the combined results of all the specified selectors.",
		"tooltip": "Selects the combined results of all the specified selectors."
	},
	{
		"text": "Next Adjacent Selector (“prev + next”) (Selectors > Hierarchy)",
		"address": "http://api.jquery.com/next-adjacent-Selector/",
		"displayAddress": "Selects all next elements matching “next” that are immediately preceded by a sibling “prev”.",
		"tooltip": "Selects all next elements matching “next” that are immediately preceded by a sibling “prev”."
	},
	{
		"text": "Next Siblings Selector (“prev ~ siblings”) (Selectors > Hierarchy)",
		"address": "http://api.jquery.com/next-siblings-selector/",
		"displayAddress": "Selects all sibling elements that follow after the “prev” element, have the same parent, and match the filtering “siblings” selector.",
		"tooltip": "Selects all sibling elements that follow after the “prev” element, have the same parent, and match the filtering “siblings” selector."
	},
	{
		"text": ":not() Selector (Selectors > Basic Filter)",
		"address": "http://api.jquery.com/not-selector/",
		"displayAddress": "Selects all elements that do not match the given selector.",
		"tooltip": "Selects all elements that do not match the given selector."
	},
	{
		"text": ":nth-child() Selector (Selectors > Child Filter)",
		"address": "http://api.jquery.com/nth-child-selector/",
		"displayAddress": "Selects all elements that are the nth-child of their parent.",
		"tooltip": "Selects all elements that are the nth-child of their parent."
	},
	{
		"text": ":nth-last-child() Selector (Selectors > Child Filter)",
		"address": "http://api.jquery.com/nth-last-child-selector/",
		"displayAddress": "Selects all elements that are the nth-child of their parent, counting from the last element to the first.",
		"tooltip": "Selects all elements that are the nth-child of their parent, counting from the last element to the first."
	},
	{
		"text": ":nth-last-of-type() Selector (Selectors > Child Filter)",
		"address": "http://api.jquery.com/nth-last-of-type-selector/",
		"displayAddress": "Selects all elements that are the nth-child of their parent, counting from the last element to the first.",
		"tooltip": "Selects all elements that are the nth-child of their parent, counting from the last element to the first."
	},
	{
		"text": ":nth-of-type() Selector (Selectors > Child Filter)",
		"address": "http://api.jquery.com/nth-of-type-selector/",
		"displayAddress": "Selects all elements that are the nth child of their parent in relation to siblings with the same element name.",
		"tooltip": "Selects all elements that are the nth child of their parent in relation to siblings with the same element name."
	},
	{
		"text": ":odd Selector (Selectors > Basic Filter | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/odd-selector/",
		"displayAddress": "Selects odd elements, zero-indexed.  See also even.",
		"tooltip": "Selects odd elements, zero-indexed.  See also even."
	},
	{
		"text": ":only-child Selector (Selectors > Child Filter)",
		"address": "http://api.jquery.com/only-child-selector/",
		"displayAddress": "Selects all elements that are the only child of their parent.",
		"tooltip": "Selects all elements that are the only child of their parent."
	},
	{
		"text": ":only-of-type Selector (Selectors > Child Filter)",
		"address": "http://api.jquery.com/only-of-type-selector/",
		"displayAddress": "Selects all elements that have no siblings with the same element name.",
		"tooltip": "Selects all elements that have no siblings with the same element name."
	},
	{
		"text": ":parent Selector (Selectors > Content Filter | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/parent-selector/",
		"displayAddress": "Select all elements that have at least one child node (either an element or text).",
		"tooltip": "Select all elements that have at least one child node (either an element or text)."
	},
	{
		"text": ":password Selector (Selectors > Form | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/password-selector/",
		"displayAddress": "Selects all elements of type password.",
		"tooltip": "Selects all elements of type password."
	},
	{
		"text": ":radio Selector (Selectors > Form | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/radio-selector/",
		"displayAddress": "Selects all  elements of type radio.",
		"tooltip": "Selects all  elements of type radio."
	},
	{
		"text": ":reset Selector (Selectors > Form | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/reset-selector/",
		"displayAddress": "Selects all elements of type reset.",
		"tooltip": "Selects all elements of type reset."
	},
	{
		"text": ":root Selector (Selectors > Basic Filter)",
		"address": "http://api.jquery.com/root-selector/",
		"displayAddress": "Selects the element that is the root of the document.",
		"tooltip": "Selects the element that is the root of the document."
	},
	{
		"text": ":selected Selector (Selectors > Form | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/selected-selector/",
		"displayAddress": "Selects all elements that are selected.",
		"tooltip": "Selects all elements that are selected."
	},
	{
		"text": ".selector (Deprecated > Deprecated 1.7 | Internals | Properties > Properties of the Global jQuery Object)",
		"address": "http://api.jquery.com/selector/",
		"displayAddress": "A selector representing selector passed to jQuery(), if any, when creating the original set.",
		"tooltip": "A selector representing selector passed to jQuery(), if any, when creating the original set."
	},
	{
		"text": ":submit Selector (Selectors > Form | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/submit-selector/",
		"displayAddress": "Selects all elements of type submit.",
		"tooltip": "Selects all elements of type submit."
	},
	{
		"text": ":target Selector (Selectors > Basic Filter)",
		"address": "http://api.jquery.com/target-selector/",
		"displayAddress": "Selects the target element indicated by the fragment identifier of the document’s URI.",
		"tooltip": "Selects the target element indicated by the fragment identifier of the document’s URI."
	},
	{
		"text": ":text Selector (Selectors > Form | Selectors > jQuery Extensions)",
		"address": "http://api.jquery.com/text-selector/",
		"displayAddress": "Selects all elements of type text.",
		"tooltip": "Selects all elements of type text."
	},
	{
		"text": ":visible Selector (Selectors > jQuery Extensions | Selectors > Visibility Filter)",
		"address": "http://api.jquery.com/visible-selector/",
		"displayAddress": "Selects all elements that are visible.",
		"tooltip": "Selects all elements that are visible."
	},
	{
		"text": ".addBack() (Traversing > Miscellaneous Traversing)",
		"address": "http://api.jquery.com/addBack/",
		"displayAddress": "Add the previous set of elements on the stack to the current set, optionally filtered by a selector.",
		"tooltip": "Add the previous set of elements on the stack to the current set, optionally filtered by a selector."
	},
	{
		"text": ".children() (Traversing > Tree Traversal)",
		"address": "http://api.jquery.com/children/",
		"displayAddress": "Get the children of each element in the set of matched elements, optionally filtered by a selector.",
		"tooltip": "Get the children of each element in the set of matched elements, optionally filtered by a selector."
	},
	{
		"text": ".closest() (Traversing > Tree Traversal)",
		"address": "http://api.jquery.com/closest/",
		"displayAddress": "For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.",
		"tooltip": "For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree."
	},
	{
		"text": ".delegate() (Events > Event Handler Attachment)",
		"address": "http://api.jquery.com/delegate/",
		"displayAddress": "Attach a handler to one or more events for all elements that match the selector, now or in the future, based on a specific set of root elements.",
		"tooltip": "Attach a handler to one or more events for all elements that match the selector, now or in the future, based on a specific set of root elements."
	},
	{
		"text": ".filter() (Traversing > Filtering)",
		"address": "http://api.jquery.com/filter/",
		"displayAddress": "Reduce the set of matched elements to those that match the selector or pass the function’s test.",
		"tooltip": "Reduce the set of matched elements to those that match the selector or pass the function’s test."
	},
	{
		"text": ".find() (Traversing > Tree Traversal)",
		"address": "http://api.jquery.com/find/",
		"displayAddress": "Get the descendants of each element in the current set of matched elements, filtered by a selector, jQuery object, or element.",
		"tooltip": "Get the descendants of each element in the current set of matched elements, filtered by a selector, jQuery object, or element."
	},
	{
		"text": ".has() (Traversing > Filtering)",
		"address": "http://api.jquery.com/has/",
		"displayAddress": "Reduce the set of matched elements to those that have a descendant that matches the selector or DOM element.",
		"tooltip": "Reduce the set of matched elements to those that have a descendant that matches the selector or DOM element."
	},
	{
		"text": ".is() (Traversing > Filtering)",
		"address": "http://api.jquery.com/is/",
		"displayAddress": "Check the current matched set of elements against a selector, element, or jQuery object and return true if at least one of these elements matches the given arguments.",
		"tooltip": "Check the current matched set of elements against a selector, element, or jQuery object and return true if at least one of these elements matches the given arguments."
	},
	{
		"text": ".live() (Deprecated > Deprecated 1.7 | Events > Event Handler Attachment | Removed)",
		"address": "http://api.jquery.com/live/",
		"displayAddress": "Attach an event handler for all elements which match the current selector, now and in the future.",
		"tooltip": "Attach an event handler for all elements which match the current selector, now and in the future."
	},
	{
		"text": ".next() (Traversing > Tree Traversal)",
		"address": "http://api.jquery.com/next/",
		"displayAddress": "Get the immediately following sibling of each element in the set of matched elements. If a selector is provided, it retrieves the next sibling only if it matches that selector.",
		"tooltip": "Get the immediately following sibling of each element in the set of matched elements. If a selector is provided, it retrieves the next sibling only if it matches that selector."
	},
	{
		"text": ".nextAll() (Traversing > Tree Traversal)",
		"address": "http://api.jquery.com/nextAll/",
		"displayAddress": "Get all following siblings of each element in the set of matched elements, optionally filtered by a selector.",
		"tooltip": "Get all following siblings of each element in the set of matched elements, optionally filtered by a selector."
	},
	{
		"text": ".nextUntil() (Traversing > Tree Traversal)",
		"address": "http://api.jquery.com/nextUntil/",
		"displayAddress": "Get all following siblings of each element up to but not including the element matched by the selector, DOM node, or jQuery object passed.",
		"tooltip": "Get all following siblings of each element up to but not including the element matched by the selector, DOM node, or jQuery object passed."
	},
	{
		"text": ".parent() (Traversing > Tree Traversal)",
		"address": "http://api.jquery.com/parent/",
		"displayAddress": "Get the parent of each element in the current set of matched elements, optionally filtered by a selector.",
		"tooltip": "Get the parent of each element in the current set of matched elements, optionally filtered by a selector."
	},
	{
		"text": ".parents() (Traversing > Tree Traversal)",
		"address": "http://api.jquery.com/parents/",
		"displayAddress": "Get the ancestors of each element in the current set of matched elements, optionally filtered by a selector.",
		"tooltip": "Get the ancestors of each element in the current set of matched elements, optionally filtered by a selector."
	},
	{
		"text": ".parentsUntil() (Traversing > Tree Traversal)",
		"address": "http://api.jquery.com/parentsUntil/",
		"displayAddress": "Get the ancestors of each element in the current set of matched elements, up to but not including the element matched by the selector, DOM node, or jQuery object.",
		"tooltip": "Get the ancestors of each element in the current set of matched elements, up to but not including the element matched by the selector, DOM node, or jQuery object."
	},
	{
		"text": ".prev() (Traversing > Tree Traversal)",
		"address": "http://api.jquery.com/prev/",
		"displayAddress": "Get the immediately preceding sibling of each element in the set of matched elements, optionally filtered by a selector.",
		"tooltip": "Get the immediately preceding sibling of each element in the set of matched elements, optionally filtered by a selector."
	},
	{
		"text": ".prevAll() (Traversing > Tree Traversal)",
		"address": "http://api.jquery.com/prevAll/",
		"displayAddress": "Get all preceding siblings of each element in the set of matched elements, optionally filtered by a selector.",
		"tooltip": "Get all preceding siblings of each element in the set of matched elements, optionally filtered by a selector."
	},
	{
		"text": ".prevUntil() (Traversing > Tree Traversal)",
		"address": "http://api.jquery.com/prevUntil/",
		"displayAddress": "Get all preceding siblings of each element up to but not including the element matched by the selector, DOM node, or jQuery object.",
		"tooltip": "Get all preceding siblings of each element up to but not including the element matched by the selector, DOM node, or jQuery object."
	},
	{
		"text": ".siblings() (Traversing > Tree Traversal)",
		"address": "http://api.jquery.com/siblings/",
		"displayAddress": "Get the siblings of each element in the set of matched elements, optionally filtered by a selector.",
		"tooltip": "Get the siblings of each element in the set of matched elements, optionally filtered by a selector."
	},
	{
		"text": ".undelegate() (Events > Event Handler Attachment)",
		"address": "http://api.jquery.com/undelegate/",
		"displayAddress": "Remove a handler from the event for all elements which match the current selector, based upon a specific set of root elements.",
		"tooltip": "Remove a handler from the event for all elements which match the current selector, based upon a specific set of root elements."
	},
	{
		"text": ".add() (Traversing > Miscellaneous Traversing)",
		"address": "http://api.jquery.com/add/",
		"displayAddress": "Add elements to the set of matched elements.",
		"tooltip": "Add elements to the set of matched elements."
	},
	{
		"text": ".after() (Manipulation > DOM Insertion, Outside)",
		"address": "http://api.jquery.com/after/",
		"displayAddress": "Insert content, specified by the parameter, after each element in the set of matched elements.",
		"tooltip": "Insert content, specified by the parameter, after each element in the set of matched elements."
	},
	{
		"text": ".andSelf() (Deprecated > Deprecated 1.8 | Traversing > Miscellaneous Traversing)",
		"address": "http://api.jquery.com/andSelf/",
		"displayAddress": "Add the previous set of elements on the stack to the current set.",
		"tooltip": "Add the previous set of elements on the stack to the current set."
	},
	{
		"text": ".append() (Manipulation > DOM Insertion, Inside)",
		"address": "http://api.jquery.com/append/",
		"displayAddress": "Insert content, specified by the parameter, to the end of each element in the set of matched elements.",
		"tooltip": "Insert content, specified by the parameter, to the end of each element in the set of matched elements."
	},
	{
		"text": ".appendTo() (Manipulation > DOM Insertion, Inside)",
		"address": "http://api.jquery.com/appendTo/",
		"displayAddress": "Insert every element in the set of matched elements to the end of the target.",
		"tooltip": "Insert every element in the set of matched elements to the end of the target."
	},
	{
		"text": ".before() (Manipulation > DOM Insertion, Outside)",
		"address": "http://api.jquery.com/before/",
		"displayAddress": "Insert content, specified by the parameter, before each element in the set of matched elements.",
		"tooltip": "Insert content, specified by the parameter, before each element in the set of matched elements."
	},
	{
		"text": ".detach() (Manipulation > DOM Removal)",
		"address": "http://api.jquery.com/detach/",
		"displayAddress": "Remove the set of matched elements from the DOM.",
		"tooltip": "Remove the set of matched elements from the DOM."
	},
	{
		"text": ".die() (Deprecated > Deprecated 1.7 | Events > Event Handler Attachment | Removed)",
		"address": "http://api.jquery.com/die/",
		"displayAddress": "Remove event handlers previously attached using .live() from the elements.",
		"tooltip": "Remove event handlers previously attached using .live() from the elements."
	},
	{
		"text": ".fadeOut() (Effects > Fading)",
		"address": "http://api.jquery.com/fadeOut/",
		"displayAddress": "Hide the matched elements by fading them to transparent.",
		"tooltip": "Hide the matched elements by fading them to transparent."
	},
	{
		"text": ".hover() (Events > Mouse Events)",
		"address": "http://api.jquery.com/hover/",
		"displayAddress": "Bind one or two handlers to the matched elements, to be executed when the mouse pointer enters and leaves the elements.",
		"tooltip": "Bind one or two handlers to the matched elements, to be executed when the mouse pointer enters and leaves the elements."
	},
	{
		"text": ".html() (Attributes | Manipulation > DOM Insertion, Inside)",
		"address": "http://api.jquery.com/html/",
		"displayAddress": "Get the HTML contents of the first element in the set of matched elements or set the HTML contents of every matched element.",
		"tooltip": "Get the HTML contents of the first element in the set of matched elements or set the HTML contents of every matched element."
	},
	{
		"text": ".index() (Miscellaneous > DOM Element Methods)",
		"address": "http://api.jquery.com/index/",
		"displayAddress": "Search for a given element from among the matched elements.",
		"tooltip": "Search for a given element from among the matched elements."
	},
	{
		"text": ".insertAfter() (Manipulation > DOM Insertion, Outside)",
		"address": "http://api.jquery.com/insertAfter/",
		"displayAddress": "Insert every element in the set of matched elements after the target.",
		"tooltip": "Insert every element in the set of matched elements after the target."
	},
	{
		"text": ".insertBefore() (Manipulation > DOM Insertion, Outside)",
		"address": "http://api.jquery.com/insertBefore/",
		"displayAddress": "Insert every element in the set of matched elements before the target.",
		"tooltip": "Insert every element in the set of matched elements before the target."
	},
	{
		"text": "jQuery() (Core)",
		"address": "http://api.jquery.com/jQuery/",
		"displayAddress": "Return a collection of matched elements either found in the DOM based on passed argument(s) or created by passing an HTML string.",
		"tooltip": "Return a collection of matched elements either found in the DOM based on passed argument(s) or created by passing an HTML string."
	},
	{
		"text": "jQuery.each() (Utilities)",
		"address": "http://api.jquery.com/jQuery.each/",
		"displayAddress": "A generic iterator function, which can be used to seamlessly iterate over both objects and arrays. Arrays and array-like objects with a length property (such as a function’s arguments object) are iterated by numeric index, from 0 to length-1. Other objects are iterated via their named properties.",
		"tooltip": "A generic iterator function, which can be used to seamlessly iterate over both objects and arrays. Arrays and array-like objects with a length property (such as a function’s arguments object) are iterated by numeric index, from 0 to length-1. Other objects are iterated via their named properties."
	},
	{
		"text": ".load() (Ajax > Shorthand Methods)",
		"address": "http://api.jquery.com/load/",
		"displayAddress": "Load data from the server and place the returned HTML into the matched element.",
		"tooltip": "Load data from the server and place the returned HTML into the matched element."
	},
	{
		"text": ".not() (Traversing > Filtering | Traversing > Miscellaneous Traversing)",
		"address": "http://api.jquery.com/not/",
		"displayAddress": "Remove elements from the set of matched elements.",
		"tooltip": "Remove elements from the set of matched elements."
	},
	{
		"text": ".off() (Events > Event Handler Attachment)",
		"address": "http://api.jquery.com/off/",
		"displayAddress": "Remove an event handler.",
		"tooltip": "Remove an event handler."
	},
	{
		"text": ".on() (Events > Event Handler Attachment)",
		"address": "http://api.jquery.com/on/",
		"displayAddress": "Attach an event handler function for one or more events to the selected elements.",
		"tooltip": "Attach an event handler function for one or more events to the selected elements."
	},
	{
		"text": ".one() (Events > Event Handler Attachment)",
		"address": "http://api.jquery.com/one/",
		"displayAddress": "Attach a handler to an event for the elements. The handler is executed at most once per element per event type.",
		"tooltip": "Attach a handler to an event for the elements. The handler is executed at most once per element per event type."
	},
	{
		"text": ".prepend() (Manipulation > DOM Insertion, Inside)",
		"address": "http://api.jquery.com/prepend/",
		"displayAddress": "Insert content, specified by the parameter, to the beginning of each element in the set of matched elements.",
		"tooltip": "Insert content, specified by the parameter, to the beginning of each element in the set of matched elements."
	},
	{
		"text": ".prependTo() (Manipulation > DOM Insertion, Inside)",
		"address": "http://api.jquery.com/prependTo/",
		"displayAddress": "Insert every element in the set of matched elements to the beginning of the target.",
		"tooltip": "Insert every element in the set of matched elements to the beginning of the target."
	},
	{
		"text": ".ready() (Events > Document Loading)",
		"address": "http://api.jquery.com/ready/",
		"displayAddress": "Specify a function to execute when the DOM is fully loaded.",
		"tooltip": "Specify a function to execute when the DOM is fully loaded."
	},
	{
		"text": ".remove() (Manipulation > DOM Removal)",
		"address": "http://api.jquery.com/remove/",
		"displayAddress": "Remove the set of matched elements from the DOM.",
		"tooltip": "Remove the set of matched elements from the DOM."
	},
	{
		"text": ".replaceAll() (Manipulation > DOM Replacement)",
		"address": "http://api.jquery.com/replaceAll/",
		"displayAddress": "Replace each target element with the set of matched elements.",
		"tooltip": "Replace each target element with the set of matched elements."
	},
	{
		"text": "Types ()",
		"address": "http://api.jquery.com/Types/",
		"displayAddress": "JavaScript provides several built-in datatypes. In addition to those, this page documents virtual types like Selectors, enhanced pseudo-types like Events and all and everything you wanted to know about Functions. You should be able to try out most of the examples below by just copying them to your browser’s JavaScript Console (Chrome, Safari with Develop … Continue reading →",
		"tooltip": "JavaScript provides several built-in datatypes. In addition to those, this page documents virtual types like Selectors, enhanced pseudo-types like Events and all and everything you wanted to know about Functions. You should be able to try out most of the examples below by just copying them to your browser’s JavaScript Console (Chrome, Safari with Develop … Continue reading →"
	},
	{
		"text": ".val() (Attributes | Forms | Manipulation > General Attributes)",
		"address": "http://api.jquery.com/val/",
		"displayAddress": "Get the current value of the first element in the set of matched elements or set the value of every matched element.",
		"tooltip": "Get the current value of the first element in the set of matched elements or set the value of every matched element."
	},
	{
		"text": ".wrap() (Manipulation > DOM Insertion, Around)",
		"address": "http://api.jquery.com/wrap/",
		"displayAddress": "Wrap an HTML structure around each element in the set of matched elements.",
		"tooltip": "Wrap an HTML structure around each element in the set of matched elements."
	},
	{
		"text": ".wrapAll() (Manipulation > DOM Insertion, Around)",
		"address": "http://api.jquery.com/wrapAll/",
		"displayAddress": "Wrap an HTML structure around all elements in the set of matched elements.",
		"tooltip": "Wrap an HTML structure around all elements in the set of matched elements."
	},
	{
		"text": ".wrapInner() (Manipulation > DOM Insertion, Around)",
		"address": "http://api.jquery.com/wrapInner/",
		"displayAddress": "Wrap an HTML structure around the content of each element in the set of matched elements.",
		"tooltip": "Wrap an HTML structure around the content of each element in the set of matched elements."
	}
];

exports.empty = [];