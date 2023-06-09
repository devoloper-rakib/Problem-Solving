'use strict';
console.log('problem 2');

/*

todo : Write a JavaScript program to convert a comma-separated value (CSV) string to a 2D array.

Note: Use String.split('\n') to create a string for each row, then String.split(delimiter) to separate the values in each row. Omit the second argument, delimiter, to use a default delimiter of ,. Omit the third argument, omitFirstRow, to include the first row (title row) of the CSV string.

Use Array.prototype.slice() and Array.prototype.indexOf('\n') to remove the first row (title row) if omitFirstRow is true.
Use String.prototype.split('\n') to create a string for each row, then String.prototype.split(delimiter) to separate the values in each row.
Omit the second argument, delimiter, to use a default delimiter of .
Omit the third argument, omitFirstRow, to include the first row (title row) of the CSV string.

 

*/
// point  : solution 1 ( using split and map )

const csToArray = (data, delimiter = ',', omitFirstRow = false) => {
	const res = data.split('\n').map((el) => el.split(delimiter));
	return omitFirstRow ? res.slice(1) : res;
};

console.log(csToArray('a,b\nc,d')); // [['a','b'],['c','d']];
console.log(csToArray('a;b\nc;d', ';')); // [['a','b'],['c','d']];
console.log(csToArray('head1,head2\na,b\nc,d', ',', true)); // [['a','b'],['c','d']];

// point  : solution 2 ( using split and reduce )

const csToArray2 = (data, delimiter = ',', omitFirstRow = false) => {
	const res = data.split('\n').reduce((acc, el) => {
		acc.push(el.split(delimiter));
		return acc;
	}, []);
	return omitFirstRow ? res.slice(1) : res;
};

console.log(csToArray2('a,b\nc,d')); // [['a','b'],['c','d']];
console.log(csToArray2('a;b\nc;d', ';')); // [['a','b'],['c','d']];
console.log(csToArray2('head1,head2\na,b\nc,d', ',', true)); // [['a','b'],['c','d']];

console.log('------------------ another problem ------------------');

/*

todo : Write a JavaScript program to convert a comma-separated value (CSV) string to a 2D array of objects. The first row of the string is used as the title row.

$ Use Array.prototype.slice() and Array.prototype.indexOf('\n') and String.prototype.split(delimiter) to separate the first row (title row) into values.

$ Use String.prototype.split('\n') to create a string for each row, then Array.prototype.map() and String.prototype.split(delimiter) to separate the values in each row.

$ Use Array.prototype.reduce() to create an object for each row's values, with the keys parsed from the title row.
Omit the second argument, delimiter, to use a default delimiter of.


*/

// point : solution 1 ( using split and map and reduce )

const csToArrayOfObject = (data, delimiter = ',') => {
	const titles = data.slice(0, data.indexOf('\n')).split(delimiter);

	return data
		.slice(data.indexOf('\n') + 1)
		.split('\n')
		.map((el) => {
			const values = el.split(delimiter);
			return titles.reduce(
				(obj, title, index) => ((obj[title] = values[index]), obj),
				{},
			);
		});
};

console.log(csToArrayOfObject('col1,col2\na,b\nc,d')); // [{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}];
console.log(csToArrayOfObject('col1;col2\na;b\nc;d', ';')); // [{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}];

// point  solution 2 ( using for loop split and for of loop )

const csToArrayOfObject2 = (data, delimiter = ',') => {
	const titles = data.slice(0, data.indexOf('\n')).split(delimiter);

	const res = [];

	for (const el of data.slice(data.indexOf('\n')).split('\n')) {
		const values = el.split(delimiter);
		const obj = {};
		for (let i = 0; i < titles.length; i++) {
			obj[titles[i]] = values[i];
		}
		res.push(obj);
	}
	return res.splice(1);
};

console.log(csToArrayOfObject2('col1,col2\na,b\nc,d')); // /[{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}];

console.log(csToArrayOfObject2('col1;col2\na;b\nc;d', ';')); /// [{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}];

console.log('------------------ another problem ------------------');

/*

todo : Write a JavaScript program to convert an array of objects to a comma-separated value (CSV) string that contains only the columns specified.

$ Use Array.prototype.join(delimiter) to combine all the names in columns to create the first row.

$ Use Array.prototype.map() and Array.prototype.reduce() to create a row for each object, substituting non-existent values with empty strings and only mapping values in columns.

$ Use Array.prototype.join('\n') to combine all rows into a string.

$ Omit the third argument, delimiter, to use a default delimiter of,.



*/

// point : solution 1 ( using map and reduce and join )

const objectToCsv = (data, columns, delimiter = ',') => {
	return [
		columns.join(delimiter),
		...data.map((el) =>
			columns.reduce(
				(acc, key) =>
					`${acc}${!acc.length ? '' : delimiter}"${!el[key] ? '' : el[key]}"`,
				'',
			),
		),
	].join('\n');
};

console.log(
	objectToCsv(
		[{ x: 100, y: 200 }, { x: 300, y: 400, z: 500 }, { x: 6 }, { y: 7 }],
		['x', 'y'],
	),
);
console.log(
	objectToCsv(
		[{ x: 100, y: 200 }, { x: 300, y: 400, z: 500 }, { x: 6 }, { y: 7 }],
		['x', 'y'],
		';',
	),
);

// point : solution 2 ( using for of loop and join )

const objectToCsv2 = (data, columns, delimiter = ',') => {
	const titles = columns.join(delimiter);
	const res = [];
	for (const el of data) {
		const values = columns.reduce(
			(acc, key) =>
				`${acc}${!acc.length ? '' : delimiter}"${!el[key] ? '' : el[key]}"`,
			'',
		);
		res.push(values);
	}
	return [titles, ...res].join('\n');
};

console.log(
	objectToCsv2(
		[{ x: 100, y: 200 }, { x: 300, y: 400, z: 500 }, { x: 6 }, { y: 7 }],
		['x', 'y'],
	),
);
console.log(
	objectToCsv2(
		[{ x: 100, y: 200 }, { x: 300, y: 400, z: 500 }, { x: 6 }, { y: 7 }],
		['x', 'y'],
		';',
	),
);
