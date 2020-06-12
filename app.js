const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const idRouter = require('./routes/idRouter');
const drawingRouter = require('./routes/drawingRouter');

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const app = express();

// Helmet
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
	directives: {
		defaultSrc: ["'self'"]
	}
}));

// Cors
if (process.env.CORS_ALLOWED_ORIGIN) {
	app.use(cors({
		origin: process.env.CORS_ALLOWED_ORIGIN
	}));
}

// Routes
app.use('/generateId', idRouter);
app.use('/drawing', drawingRouter);

module.exports = app;
