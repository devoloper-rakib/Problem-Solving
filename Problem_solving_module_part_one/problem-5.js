'use strict';

// task : Write a JavaScript program which iterates the integers from 1 to 100. But for multiples of three print "Fizz" instead of the number and for the multiples of five print "Buzz". For numbers which are multiples of both three and five print "FizzBuzz"

// / Solution 1 :

// for (let i = 0; i <= 100; i++) {
// 	if (i % 3 === 0 && i % 5 === 0) {
// 		console.log('FizzBuzz');
// 	} else if (i % 3 === 0) {
// 		console.log('Fizz');
// 	} else if (i % 5 === 0) {
// 		console.log('Buzz');
// 	} else {
// 		console.log(i);
// 	}
// }

// / solution 2 :

for (let i = 0; i < 101; i++) {
	let output = '';
	if (i % 3 === 0 && i % 5 === 0) {
		output += 'FizzBuzz';
	} else if (i % 5 === 0) {
		output += 'Buzz';
	} else if (i % 3 === 0) {
		output += 'Fizz';
	}
	console.log(output || i);
}
