const crypto = require('crypto');

const idLength = 12;
exports.idRegexp = `[\da-z]{${idLength}}`;

const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
const charsLength = chars.length;

// Known issue : some char will be more used than others due to modulo
function generateRandomString(length) {
	const bytes = crypto.randomBytes(length);
	const charArray = new Array(length);

	for (let i = 0; i < length; i++) {
		charArray[i] = chars[bytes[i] % charsLength];
	}

	return charArray.join('');
}

exports.generateId = function () {
	return generateRandomString(idLength);
};
