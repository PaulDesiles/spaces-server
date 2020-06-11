const mongoose = require('mongoose');
const Drawings = require('../models/drawing');

exports.retrieveDrawing = async function (publicId) {
	try {
		return await Drawings.findOne({publicId}).exec();
	} catch (error) {
		console.log(error);
	}

	return null;
};

exports.createDrawing = async function (publicId, shapes, parameters) {
	try {
		const now = new Date();
		await Drawings.create({
			publicId,
			shapes,
			parameters,
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

exports.updateDrawing = async function (publicId, removeShapeIds, addShapes) {
	try {
		const drawing = await Drawings.findOne({publicId}).exec();

		if (drawing) {
			if (removeShapeIds && removeShapeIds.length > 0) {
				const excludeIds = removeShapeIds.map(id => new mongoose.mongo.ObjectId(id));
				drawing.shapes = drawing.shapes.filter(s =>
					!excludeIds.some(id => s._id.equals(id))
				);
			}

			if (addShapes && addShapes.length > 0) {
				drawing.shapes.push(...addShapes);
			}

			drawing.modificationDate = new Date();

			await drawing.save();

			return true;
		} else {
			console.log(`failed to find drawing : ${publicId}`);
		}
	} catch (error) {
		console.log(error);
	}

	return false;
};
