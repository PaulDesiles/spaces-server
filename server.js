const mongoose = require('mongoose');
const app = require('./app');

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`listening on port ${port}`));

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
