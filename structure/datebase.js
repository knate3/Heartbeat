const {
	MongoClient
} = require('mongodb');

class Database {
	constructor(credentials) {
		this.credentials = credentials;
	}
	// Connect to Database
	async connect() {
		try {
			this.mongoclient = await MongoClient.connect(this.credentials.URL, {
				useUnifiedTopology: true
			});
			console.log('[DATABASE]: Connection has been established successfully.');
			this.db = this.mongoclient.db(this.credentials.NAME);
		} catch (error) {
			console.log(`[DATABASE]: Unable to connect to the database: \n${error}`);
			console.log("[DATABASE]: Try reconnecting in 10 seconds...");
			setTimeout(() => this.connect(), 10000);
		}
	}

	// Database methods 

	insert(collection, key, object) {
		return this.db.collection(collection).insertOne({
			_id: key,
			value: object
		}).catch(err =>{
			console.log(err)
		});
	}

	delete(collection, key) {
		return this.db.collection(collection).deleteOne({
			_id: key,
		}).catch(err =>{
			console.log(err)
		});
	}

	update(collection, key, object) {
		return this.db.collection(collection).updateOne({
			_id: key,
		}, {
			$set: {value: object }
		}).catch(err =>{
			console.log(err)
		});
	}

	get(collection, key, full = false) {
		return this.db.collection(collection).findOne({
			_id: key
		}).then((m) => {
			if (m == null) return false;
			if (full) return m;
			return m.value
		}).catch(err =>{
			console.log(err)
		});
	}

	async has(collection, key) {
		return !!(await this.get(collection, {
			_id: key
		}));
	}

	close() {
		this.db.close();
	}
}

module.exports = Database;