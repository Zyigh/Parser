function timer(callback, func) {
	console.time('duration');
	console.log(func, callback);
	console.timeEnd('duration');
}

	function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
var max = 10000;
var unsorted_array = [];
for (var i = 0; i <= max; i++) {
	unsorted_array.push(getRandomInt(0, max));
}