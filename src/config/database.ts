import { Database } from '../types/index.js'

import { MongoClient } from 'mongodb'

async function connectToDb() {
	const client = new MongoClient(process.env.DB_CONNECTION_STRING)
	await client.connect()
	const mongoDb = client.db()
	const words = mongoDb.collection(process.env.DB_NAME)
	const database: Database = { words }
	return database
}

export { connectToDb }
