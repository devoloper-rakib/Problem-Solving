'use strict ';
console.log('working.......');

// task :  Write a javascript program that prints this pattern below .

/*
1.
*
**
***
****
*****

2.
****
****
****
****

*/

// point : problem x :

console.log('*');
console.log('**');
console.log('***');
console.log('****');
console.log('*****' + '\n');

// point : solution 1 : with out using any built in function

const printPattern = (n) => {
	let str = '';

	for (let i = 1; i <= n; i++) {
		for (let j = 1; j <= i; j++) {
			str += '*';
		}

		str += '\n';
	}
	return str;
};

console.log(printPattern(5));

// point : solution 1 : using built in function (repeat)

const printPattern2 = (n) => {
	for (let i = 1; i <= n; i++) {
		console.log('*'.repeat(i));
	}
};

printPattern2(5);

console.log('\n');

// point  : problem x (2) :

console.log('****');
console.log('****');
console.log('****');
console.log('****' + '\n');

// point  : solution 2 : with out using any built in function ( pattern 2 )

const printPattern3 = (n) => {
	let str = '';

	for (let i = 1; i <= n; i++) {
		for (let j = 1; j <= n; j++) {
			str += '*';
		}
		str += '\n';
	}
	return str;
};

console.log(printPattern3(4));

// point  : solution 2 : using built in function ( pattern 2 )

const printPattern4 = (n) => {
	for (let i = 1; i <= n; i++) {
		console.log('*'.repeat(n));
	}
};

printPattern4(4);
