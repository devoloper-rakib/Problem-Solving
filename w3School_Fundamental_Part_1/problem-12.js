'use strict';
console.log('working....');

/*
task : Write a JavaScript program to curry (curries) a function

/According to wiki.haskell.org "Currying is the process of transforming a function that takes multiple arguments into a function that takes just a single argument and returns another function if any arguments are still needed. f x y = g (x,y), however the curried form is usually more convenient because it allows partial application.

Note: Use recursion. If the number of provided arguments (args) is sufficient, call the passed function fn. Otherwise, return a curried function fn that expects the rest of the arguments. If you want to curry a function that accepts a variable number of arguments (a variadic function, e.g. Math.min()), you can optionally pass the number of arguments to the second parameter arity.

*/

// point  solution 1 - using recursion

const curry = (fn, arity = fn.length, ...args) => {
	return arity <= args.length
		? fn(...args)
		: curry.bind(null, fn, arity, ...args);
};

const sum = (a, b, c) => a + b + c;

const curriedSum = curry(sum);

console.log(curriedSum(1, 2, 3)); // 6

console.log(curriedSum(1)(2, 3)); // 6

// point  solution 2 - using double function

const curry2 = (fn, arity = fn.length, ...args) => {
	return arity <= args.length
		? fn(...args)
		: function (...args2) {
				return curry2(fn, arity, ...args, ...args2);
		  };
};

console.log(curry2(Math.pow)(2)(8)); // 6
console.log(curry2(Math.min, 3)(10)(50)(2)); // 2

console.log('------------------ another problem ------------------');

// task : Perform a deep comparison between two values to determine if they are equivalent.

// / Note: Check if the two values are identical, if they are both Date objects with the same time, using Date.getTime() or if they are both non-object values with an equivalent value (strict comparison). Check if only one value is null or undefined or if their prototypes differ. If none of the above conditions are met, use Object.keys() to check if both values have the same number of keys, then use Array.every() to check if every key in the first value exists in the second one and if they are equivalent by calling this method recursively.

// point  solution 1 - using recursion

const deepEqual = (a, b) => {
	if (a === b) return true;

	if (a instanceof Date && b instanceof Date)
		return a.getTime() === b.getTime();

	if (!a || !b || (typeof a !== 'object' && typeof b !== 'object'))
		return a === b;

	if (a.prototype !== b.prototype) return false;

	if (a === null || b === null || a === undefined || b === undefined)
		return false;

	let keys = Object.keys(a);
	if (keys.length !== Object.keys(b).length) return false;

	return keys.every((key) => deepEqual(a[key], b[key]));
};

console.log(
	deepEqual(
		{ a: [2, { e: 3 }], b: [4], c: 'foo' },
		{ a: [2, { e: 3 }], b: [4], c: 'foo' },
	),
); // true

// point  solution 2 - using JSON.stringify()

const deepEqual2 = (a, b) => {
	if (a === b) return true;

	if (a instanceof Date && b instanceof Date)
		return a.getTime() === b.getTime();

	if (!a || !b || (typeof a !== 'object' && typeof b !== 'object'))
		return a === b;

	if (a.prototype !== b.prototype) return false;

	if (a === null || b === null || a === undefined || b === undefined)
		return false;

	return JSON.stringify(a) === JSON.stringify(b);
};

console.log(deepEqual2({ a: [2, 3], b: [4] }, { a: [2, 3], b: [4] })); // true

// point  solution 3 - using lodash

const _ = require('lodash');

const deepEqual3 = (a, b) => _.isEqual(a, b);

console.log(deepEqual3({ a: [2, 3], b: [4] }, { a: [2, 3], b: [4] })); // true

console.log('------------------ another problem ------------------');

// task : Get an array of function property names from own enumerable properties of an object.

// point  solution 1 - using Object.keys() and Array.filter()

const functionProperties = (obj) => {
	return Object.keys(obj).filter((key) => typeof obj[key] === 'function');
};

const obj = {
	a: () => {},
	b: function () {},
	c: 'foo',
};

console.log(functionProperties(obj)); // ['a', 'b']

// point  solution 2 - using Object.keys() and Array.reduce()

const functionProperties2 = (obj) => {
	return Object.keys(obj).reduce((acc, key) => {
		if (typeof obj[key] === 'function') {
			acc.push(key);
		}
		return acc;
	}, []);
};
console.log(functionProperties2(obj)); // ['a', 'b']

// point  solution 3 - using Object.keys() and Array.forEach()

const functionProperties3 = (obj) => {
	const result = [];

	Object.keys(obj).forEach((key) => {
		if (typeof obj[key] === 'function') {
			result.push(key);
		}
	});
	return result;
};

console.log(functionProperties3(obj)); // ['a', 'b']

// point  solution 4 - using Object.keys() and getPrototypeOf() and Array.filter().

const functionProperties4 = (obj, inherited = false) => {
	return (
		inherited
			? [...Object.keys(obj), ...Object.keys(Object.getPrototypeOf(obj))]
			: Object.keys(obj)
	).filter((key) => typeof obj[key] === 'function');
};

console.log(functionProperties4(obj, true)); // ['a', 'b']

console.log('------------------ another problem ------------------');

// task : Retrieve a set of properties indicated by the given selectors from an object.

// point  solution 1 - using Array.reduce()

const get = (from, ...selectors) => {
	return [...selectors].map((s) =>
		s
			.replace(/\[([^\[\]]*)\]/g, '.$1.')
			.split('.')
			.filter((t) => t !== '')
			.reduce((prev, cur) => prev && prev[cur], from),
	);
};

const obj2 = {
	selector: { to: { val: 'val to select' } },
	target: [1, 2, { a: 'test' }],
};

console.log(get(obj2, 'selector.to.val', 'target[0]', 'target[2].a')); // ['val to select', 1, 'test']

// point  solution 2 - using for of loop

const get2 = (from, ...selectors) => {
	const result = [];

	for (const selector of selectors) {
		const parts = selector.split('.');
		let value = from;

		for (const part of parts) {
			const matchArray = part.match(/(\w+)\[(\d+)\]/);

			if (matchArray) {
				const arrayProp = matchArray[1];
				const arrayIndex = parseInt(matchArray[2]);
				value = value[arrayProp][arrayIndex];
			} else {
				value = value[part];
			}

			if (value === undefined) break;
		}
		result.push(value);
	}
	return result;
};

console.log(get2(obj2, 'selector.to.val', 'target[0]', 'target[2].a')); // ['val to select', 1, 'test']
