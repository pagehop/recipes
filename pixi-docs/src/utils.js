/* jshint -W117 */

'use strict';

import templates from "./templates";

let malformedJson = "Error: unexpected data format";

let classUrlTemplate = "http://www.goodboydigital.com/pixijs/docs/classes/%c.html",
	propertyUrlTemplate = "http://www.goodboydigital.com/pixijs/docs/classes/%c.html#property_%p",
	methodUrlTemplate = "http://www.goodboydigital.com/pixijs/docs/classes/%c.html#method_%m",
	sortLambda = (a, b) => {
		return a.name > b.name ? 1 : -1;
	};

let utils = {

	validateJson: function(dataJson) {
		if (
			!dataJson ||
			!dataJson.classes ||
			typeof( dataJson.classes ) !== "object" ||
			( dataJson.classes instanceof Array ) ||
			!dataJson.classitems ||
			!( dataJson.classitems instanceof Array )
		) {
			throw new Error( malformedJson );
		}
	},

	alterItemDataForRendering: function(itemObject) {
		itemObject.paramList = itemObject.params ? itemObject.params.map( param => {
			let result = param.name;
			if ( param.optional ) {
				result = "[" + result;
				if ( param.optdefault ) {
					result += "=" + param.optdefault;
				}
				result += "]";
			}
			return result;
		} ).join( ", " ) : "";
		return itemObject;
	},

	copyInheritedMembers: function(classes) {
		for ( let className in classes ) {
			let classObject = classes[ className ],
				visitedClassNames = [],
				currentClass = classObject;

			while( true ) {
				if ( currentClass.extends && classes[ currentClass.extends ] ) {
					currentClass = classes[ currentClass.extends ];
				} else {
					break;
				}
				if ( visitedClassNames.indexOf( currentClass.name ) === -1 ) {
					visitedClassNames.push( currentClass.name );
				} else {
					break;
				}
			}

			visitedClassNames.forEach( name => {
				currentClass = classes[ name ];

				if ( currentClass.classitems && currentClass.classitems.length ) {
					currentClass.classitems.forEach( classitem => {
						if ( classObject.classitems.filter( item => {
							return item.name === classitem.name;
						} ).length === 0 ) {
							classObject.classitems.push( classitem );
							if ( classitem.itemtype === "property" ) {
								if ( !classObject.properties ) {
									classObject.properties = [];
								}
								classObject.properties.push( classitem );
							} else {
								if ( !classObject.methods ) {
									classObject.methods = [];
								}
								classObject.methods.push( classitem );
							}
						}
					} );
				}
			} );
			classObject.classitems.sort( sortLambda );
			if ( classObject.properties ) {
				classObject.properties.sort( sortLambda );
			}
			if ( classObject.methods ) {
				classObject.methods.sort( sortLambda );
			}
		}
		return classes;
	},

	parseDataJson: function(dataJson) {
		let self = this;

		self.validateJson( dataJson );

		let classItems = dataJson.classitems,
			classes = dataJson.classes,
			classNames = Object.keys( classes ).sort(),
			results = [];

		classItems.forEach( item => {
			if ( item.class && item.name && item.itemtype && classes[ item.class ] ) {
				let classItem = classes[ item.class ];
				if ( item.itemtype === "property" ) {
					if ( !classItem.properties ) {
						classItem.properties = [];
					}
					classItem.properties.push( item );
				} else if ( item.itemtype === "method" ) {
					if ( !classItem.methods ) {
						classItem.methods = [];
					}
					classItem.methods.push( item );
				}
				// ... + add to the classitems array for easier processing down
				classItem.classitems.push( item );
			}
		} );
		classes = self.copyInheritedMembers( classes );

		classNames.forEach( className => {
			let classObject = classes[ className ];

			results.push( {
				text: classObject.name + " class",
				displayText: "<b>" + classObject.name + "</b> class",
				address: classUrlTemplate.replace( "%c", className ),
				displayAddress: "class",
				preview: templates.classPreview(
					self.alterItemDataForRendering( classObject )
				)
			} );

			classObject.classitems.forEach( classItem => {
				let itemName = classItem.name,
					itemType = classItem.itemtype,
					isProperty = ( itemType === "property" );

				classItem = self.alterItemDataForRendering( classItem );

				results.push( {
					text: className + "." + itemName + " " + ( isProperty ? "property" : "method" ),
					displayText: className + ".<b>" + itemName + "</b> " + ( isProperty ? "property" : "method" ),
					address: isProperty ?
						propertyUrlTemplate.replace( "%c", className ).replace( "%p", itemName )
						:
						methodUrlTemplate.replace( "%c", className ).replace( "%m", itemName ),
					displayAddress: itemType,
					preview: isProperty ? templates.propertyPreview( classItem ) : templates.methodPreview( classItem )
				} );
			} );
		} );

		return results;
	}

};

export default utils;