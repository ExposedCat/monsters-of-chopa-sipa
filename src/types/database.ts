import { Generated, Kysely } from 'kysely'

interface WordTable {
	id: Generated<number>
	string: string
	userId: number
}

interface IDatabase {
	words: WordTable
}

type Database = Kysely<IDatabase>

export { Database }
