const express = require('express');
const idController = require('../controllers/idController');

const idRouter = express.Router();

idRouter.get('/', (req, res, next) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.json({
		id: idController.generateId()
	});
});

module.exports = idRouter;
