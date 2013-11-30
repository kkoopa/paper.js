/*
 * Paper.js - The Swiss Army Knife of Vector Graphics Scripting.
 * http://paperjs.org/
 *
 * Copyright (c) 2011 - 2013, Juerg Lehni & Jonathan Puckey
 * http://lehni.org/ & http://jonathanpuckey.com/
 *
 * Distributed under the MIT license. See LICENSE file for details.
 *
 * All rights reserved.
 */

// First add Base and a couple of other objects that are not automatically
// exported to exports (Numerical, Key, etc), then inject all exports into
// PaperScope, and create the initial paper object, all in one statement:
/*#*/ if (__options.environment == 'browser') {

paper = new (PaperScope.inject(new Base(Base.exports, {
	// Mark fields as enumeralbe so PaperScope.inject can pick them up
	enumerable: true,
	Base: Base,
	Numerical: Numerical,
	DomElement: DomElement,
	DomEvent: DomEvent,
	Http: Http,
	Key: Key
})))();

// Support AMD (e.g. require.js)
// Use named module AMD syntax since there are other unnamed calls to define()
// inside the built library (from inlined Acorn / Esprima) that apparently
// confuse the require.js optimizer.
if (typeof define === 'function' && define.amd)
	define('paper', paper);

/*#*/ } else if (__options.environment == 'node') {

paper = new (PaperScope.inject(new Base(Base.exports, {
	// Mark fields as enumeralbe so PaperScope.inject can pick them up
	enumerable: true,
	Base: Base,
	Numerical: Numerical,
	DomElement: DomElement,
	// Export dom/node.js stuff too
	XMLSerializer: XMLSerializer,
	DOMParser: DOMParser,
	Canvas: Canvas
})))();

// Export the paper scope.
module.exports = paper;

/*#*/ } // __options.environment == 'node'
