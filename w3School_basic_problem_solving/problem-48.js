'use strict';
console.log('working...');

//  task : Check whether there is at least one element which occurs in two given sorted arrays of integers.

// point: solution 1 : ( for loop )

function checkElement(arr1, arr2) {
	for (let i = 0; i < arr1.length; i++) {
		if (arr2.indexOf(arr1[i]) != -1) {
			return true;
		}
	}

	return false;
}

console.log(checkElement([1, 2, 3], [3, 4, 5]));
console.log(checkElement([1, 2, 3], [4, 5, 6]));

// point: solution 2 : ( for loop )

function checkElement2(arr1, arr2) {
	for (let i = 0; i < arr1.length; i++) {
		if (arr2.indexOf(arr1[i]) !== -1) return true;
	}

	return false;
}

console.log(checkElement2([1, 2, 3], [3, 4, 5]));
console.log(checkElement2([1, 2, 3], [4, 5, 6]));

console.log('-------------- another problem -----------------');

// task : Check whether a given string contains only Latin letters and no two uppercase and no two lowercase letters are in adjacent positions.

// error  : what is adjacent positions ?

/// nearest in space or position immediately adjoining without intervening space

// point: solution 1 : ( for loop )

function checkString(str) {
	let isLowercase = str[0] === str[0].toLowerCase();

	for (let i = 1; i < str.length; i++) {
		if (
			(isLowercase && str[i] !== str[i].toUpperCase()) ||
			(!isLowercase && str[i] !== str[i].toLowerCase())
		) {
			return false;
		}
		isLowercase = !isLowercase;
	}

	return true;
}

console.log(checkString('xYr'));
console.log(checkString('XXyx'));
console.log(checkString('xYrX'));

// point: solution 2 : ( w3school way )

function checkString2(str) {
	let isFirstCharacterLowerCase = str[0] === str[0].toLowerCase();
	let isFirstCharacterUpperCase = str[0] === str[0].toUpperCase();

	if (!(isFirstCharacterLowerCase && isFirstCharacterUpperCase)) return false;

	for (let i = 1; i < str.length; i++) {
		if (i % 2 === 1) {
			if (
				(str[i] === str[i].toLowerCase() && isFirstCharacterLowerCase) ||
				(str[i] === str[i].toUpperCase() && isFirstCharacterUpperCase)
			) {
				return false;
			}
		} else {
			if (
				(str[i] === str[i].toLowerCase() && !isFirstCharacterLowerCase) ||
				(str[i] === str[i].toUpperCase() && !isFirstCharacterUpperCase)
			) {
				return false;
			}
		}
	}

	return true;
}

console.log('w3School way solution : ');

console.log(checkString2('xYr'));
console.log(checkString2('XXyx'));
console.log(checkString2('xYrX'));
