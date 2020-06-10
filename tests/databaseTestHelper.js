const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
// mongoose.promise = global.Promise;

async function removeAllCollections() {
	const collections = Object.keys(mongoose.connection.collections);
	for (const collectionName of collections) {
		const collection = mongoose.connection.collections[collectionName];
		await collection.deleteMany();
	}
}

async function dropAllCollections() {
	const collections = Object.keys(mongoose.connection.collections);
	for (const collectionName of collections) {
		const collection = mongoose.connection.collections[collectionName];
		try {
			await collection.drop();
		} catch (error) {
			console.log(error.message);
		}
	}

	// mongoose.connection.db.dropDatabase();
}

module.exports = {
	setupDatabase(databaseName) {
		beforeAll(async () => {
			const url = `mongodb://127.0.0.1/${databaseName}`;
			await mongoose.connect(url, {useNewUrlParser: true});
		});

		afterEach(async () => {
			await removeAllCollections();
		});

		afterAll(async () => {
			await dropAllCollections();
			await mongoose.connection.close();
		});
	}
};
