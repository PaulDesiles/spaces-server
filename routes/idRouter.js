const express = require('express');
var crypto = require('crypto');

const idRouter = express.Router();

idRouter.get('/', (req, res, next) => {
	const id = crypto.randomBytes(10).toString('hex');
	res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({id});
});

module.exports = idRouter;