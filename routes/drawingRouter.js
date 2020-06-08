const express = require('express');
const bodyParser = require('body-parser');
const drawingController = require('../controllers/drawingController');
const idController = require('../controllers/idController');

const drawingRouter = express.Router();

drawingRouter.use(bodyParser.json());

drawingRouter
	.route(`/:drawingId(${idController.idRegexp})`)
	.get(async (req, res, next) => {
		const id = req.params.drawingId;
		const drawing = await drawingController.retrieveDrawing(id);
		if (drawing) {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(drawing);
		} else {
			const error = new Error('Drawing not found');
			error.status = 404;
			next(error);
		}
	})
	.post(async (req, res, next) => {
		const id = req.params.drawingId;
		const body = req.body;
		const success = await drawingController.saveDrawing(id, body);
		if (success) {
			res.statusCode = 200;
			res.end('ok');
		} else {
			const error = new Error('Failed to save drawing');
			error.status = 500;
			next(error);
		}
	});

module.exports = drawingRouter;
