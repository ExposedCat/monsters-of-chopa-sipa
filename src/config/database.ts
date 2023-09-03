import { Database } from '../types/index.js'

import pg from 'pg'
import { Kysely, PostgresDialect } from 'kysely'

async function connectToDb() {
	const pool = new pg.Pool({
		connectionString: process.env.DB_CONNECTION_STRING
	})
	const dialect = new PostgresDialect({ pool })
	const config = { dialect }
	const database = new Kysely<Database>(config)
	await database.connection().execute(async () => {})
	return database
}

export { connectToDb }
