import { MongoClient } from 'mongodb'
import type { Chat, Database, Player } from '../types/database.js'

export async function connectToDb() {
	const client = new MongoClient(process.env.DB_CONNECTION_STRING)
	await client.connect()
	const mongoDb = client.db()
	const player = mongoDb.collection<Player>('player')
	const chat = mongoDb.collection<Chat>('chat')
	const database: Database = { player, chat }
	return database
}
