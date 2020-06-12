const express = require('express');
const bodyParser = require('body-parser');
const drawingController = require('../controllers/drawingController');
const idController = require('../controllers/idController');

const drawingRouter = express.Router();

drawingRouter.use(bodyParser.json());

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
	.post(async (req, res, next) => {
		try {
			const success = await drawingController.createDrawing(
				req.params.drawingId,
				req.body.shapes,
				req.body.parameters
			);

			if (success) {
				res.statusCode = 201;
				res.end('ok');
				return;
			}
		} catch (error) {
			console.log(error);
		}

		const error = new Error('Failed to create drawing');
		error.status = 500;
		next(error);
	})
	.put(async (req, res, next) => {
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
