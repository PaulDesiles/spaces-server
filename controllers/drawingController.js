const Drawings = require('../models/drawing');

exports.retrieveDrawing = async function (publicId) {
	try {
		return await Drawings.findOne({publicId});
	} catch (error) {
		console.log(error);
	}

	return null;
};

exports.createDrawing = async function (publicId, shapes, size) {
	try {
		const now = new Date();
		await Drawings.create({
			publicId,
			shapes,
			size,
			creationDate: now,
			modificationDate: now,
			schemaVersion: 1
		});
		return true;
	} catch (error) {
		console.log(error);
	}

	return false;
};
