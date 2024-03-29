'use strict';
console.log('working...');

// task : Write a JavaScript program that returns true if the given value is a number, false otherwise.

// Point : solution 1 : using isNaN, isFinite and typeof properties
const validateNumber = (value) =>
	!isNaN(parseFloat(value)) && isFinite(value) && typeof value !== 'boolean';

console.log(validateNumber('200'));
console.log(validateNumber('10'));
console.log(validateNumber('abc'));
console.log(validateNumber('-.23432'));

// point : solution 2 : using regular expression
const validateNumber1 = (value) => {
	const numberRegex = /^[-+]?(?:\d*\.\d+|\d+)$/;
	return numberRegex.test(value) && typeof +value === 'number';
};
console.log(validateNumber1('200'));
console.log(validateNumber1('10'));
console.log(validateNumber1('abc'));
console.log(validateNumber1('-.23432'));

console.log('--------------------------------');
// task : Write a JavaScript program to create an array of elements, ungrouping the elements in an array produced by zip and applying the provided function.

const unzip = (arr, fn) =>
	arr
		.reduce(
			(acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc),
			Array.from({
				length: Math.max(...arr.map((x) => x.length)),
			}).map((x) => []),
		)
		.map((val) => fn(...val));

console.log(
	unzip(
		[
			[1, 10, 100],
			[2, 20, 200],
		],
		(...args) => args.reduce((acc, v) => acc + v, 0),
	),
);

console.log(
	unzip(
		[
			[1, 10, 100],
			[81, 200, 500],
		],
		(...args) => args.reduce((acc, v) => acc + v, 0),
	),
);

// Point : solution : 2 using different way to solve the problem (for loop)
const unzip1 = (arr, fn) => {
	const maxLength = Math.max(...arr.map((x) => x.length));

	const result = [];

	for (let i = 0; i < maxLength; i++) {
		const values = arr.map((x) => x[i]);
		result.push(fn(...values));
	}
	return result;
};
console.log(
	unzip1(
		[
			[1, 10, 100],
			[2, 20, 200],
		],
		(...args) => args.reduce((acc, v) => acc + v, 0),
	),
);

console.log(
	unzip1(
		[
			[1, 10, 100],
			[81, 200, 500],
		],
		(...args) => args.reduce((acc, v) => acc + v, 0),
	),
);

console.log('----------------------------------------------------------------');

// task : Write a JavaScript program to get all distinct values (from the right side of the array) of an array, based on a provided comparator function..

// Point : solution 1 : using reduceRight and prototype.some
const uniqueElementsByRight = (arr, fn) =>
	arr.reduceRight((acc, cur) => {
		if (!acc.some((x) => fn(cur, x))) acc.push(cur);
		return acc;
	}, []);

console.log(
	uniqueElementsByRight(
		[
			{ id: 0, value: 'a' },
			{ id: 1, value: 'b' },
			{ id: 2, value: 'c' },
			{ id: 1, value: 'd' },
			{ id: 0, value: 'e' },
		],
		(a, b) => a.id == b.id,
	),
);

// Point : solution 1 : using
const uniqueElementsByRight1 = (arr, fn) => {
	const result = [];

	for (let i = arr.length - 1; i >= 0; i--) {
		const current = arr[i];
		const key = fn(current);

		if (!result.some((x) => fn(x) === key)) {
			result.unshift(current);
		}
	}
	return result.reverse();
};

console.log(
	uniqueElementsByRight1(
		[
			{ id: 0, value: 'a' },
			{ id: 1, value: 'b' },
			{ id: 2, value: 'c' },
			{ id: 1, value: 'd' },
			{ id: 0, value: 'e' },
			{ id: 0, value: 'a' },
		],
		(item) => item.value,
	),
);
