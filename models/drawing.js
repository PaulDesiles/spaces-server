const mongoose = require('mongoose');

const drawingSchema = new mongoose.Schema({
	publicId: {
		type: String,
		required: true,
		unique: true
	},
	shapes: [{
		points: [{
			_id: false,
			x: Number,
			y: Number
		}]
	}],
	size: {
		type: {
			_id: false,
			width: Number,
			height: Number
		},
		required: true
	},
	creationDate: Date,
	modificationDate: Date,
	schemaVersion: Number
});

const Drawings = mongoose.model('Drawing', drawingSchema);

module.exports = Drawings;
