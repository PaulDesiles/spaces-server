const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const idRouter = require('./routes/idRouter');
const drawingRouter = require('./routes/drawingRouter');

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

// DB
mongoose.connect(process.env.DATABASE_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
}).then(
	() => console.log('Connected to database'),
	error => console.log(error)
);
//

const app = express();

// Helmet
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
	directives: {
		defaultSrc: ["'self'"]
	}
}));

// Cors
let allowedOrigins = [];
if (process.env.CORSALLOWED) {
	allowedOrigins = process.env.CORSALLOWED.split(',');
}

app.use(cors({
	origin(origin, callback) {
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error(`${origin} not allowed by CORS`));
		}
	}
}));

// Routes
app.use('/generateId', idRouter);
app.use('/drawing', drawingRouter);

module.exports = app;
