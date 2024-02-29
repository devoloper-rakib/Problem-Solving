'use strict';
console.log('working........');

// task : Write a JavaScript program to negates a predicate function.
// todo : what is  negates a predicate function ?
// / In JavaScript, negating a predicate function means obtaining the opposite result of the original function.

// Point : solution 1
const negate =
	(prep) =>
	(...args) =>
		!prep(...args);
console.log([1, 2, 3, 4, 5].filter(negate((n) => n % 2 === 0)));

// Point : solution 2
const isOdd = (n) => n % 2 !== 0;
const numbers = [1, 2, 3, 4, 5];
const oddNumbers = numbers.filter(isOdd);
console.log(oddNumbers);

console.log('----------------------------------------------------------------');
// task :Write a JavaScript program to create an array of elements, grouped based on the position in the original array.

// Point : solution 1 : using Array.from and Math properties
const zip = (...array) => {
	const maxLength = Math.max(...array.map((x) => x.length));

	return Array.from({ length: maxLength }).map((_, i) => {
		return Array.from({ length: array.length }, (_, j) => array[j][i]);
	});
};

console.log(zip(['a', 'b'], [1, 2], [true, false]));
console.log(zip(['a'], [1, 2], [true, false]));
console.log('--------------------------------');
// Point : solution 2 : simple way
const zip2 = (...array) => array[0].map((_, i) => array.map((arr) => arr[i]));

console.log(zip2(['a', 'b'], [1, 2], [true, false]));
console.log(zip2(['a'], [1, 2], [true, false]));

console.log('--------------------------------');
// Point : solution 3 : without using built-in functions
const zip3 = function (...array) {
	const result = [];
	const minLength = Math.min(...array.map((arr) => arr.length));

	for (let i = 0; i < minLength; i++) {
		const combinedElement = [];

		for (const arr of array) {
			combinedElement.push(arr[i]);
		}
		result.push(combinedElement);
	}
	return result;
};
console.log(zip3(['a', 'b'], [1, 2], [true, false]));
console.log(zip3(['a'], [1, 2], [true, false]));

console.log('--------------------------------');
// Point : task : Write a JavaScript program to convert a given string into an array of words.

// Point: solution 1 : using regex and split and filter
const words = (str, pattern = /[^a-zA-Z-]+/) =>
	str.split(pattern).filter(Boolean);
console.log(words('I love javaScript!!'));
console.log(words('python, java, php'));
