const express = require('express');
const bodyParser = require('body-parser');
const drawingController = require('../controllers/drawingController');
const idController = require('../controllers/idController');

const drawingRouter = express.Router();

drawingRouter.use(bodyParser.json());

// Create a new drawing
drawingRouter
	.route('/')
	.post(async (req, res, next) => {
		try {
			const publicId = idController.generateId();

			const success = await drawingController.createDrawing(
				publicId,
				req.body.shapes,
				req.body.parameters
			);

			if (success) {
				res.statusCode = 201;
				res.json({publicId});
				return;
			}
		} catch (error) {
			console.log(error);
		}

		const error = new Error('Failed to create drawing');
		error.status = 500;
		next(error);
	});

// Retrieve / Update a drawing
drawingRouter
	.route(`/:drawingId(${idController.idRegexp})`)
	.get(async (req, res, next) => {
		try {
			const id = req.params.drawingId;
			const drawing = await drawingController.retrieveDrawing(id);
			if (drawing) {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(drawing);
				return;
			}
		} catch (error) {
			console.log(error);
		}

		const error = new Error('Drawing not found');
		error.status = 404;
		next(error);
	})
	.patch(async (req, res, next) => {
		try {
			const shapeIds = await drawingController.updateDrawing(
				req.params.drawingId,
				req.body.removeShapeIds,
				req.body.addShapes
			);

			if (shapeIds) {
				res.statusCode = 200;
				res.json({shapeIds});
				return;
			}
		} catch (error) {
			console.log(error);
		}

		const error = new Error('Failed to update drawing');
		error.status = 500;
		next(error);
	});

module.exports = drawingRouter;
