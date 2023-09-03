import { ObjectId, Collection } from 'mongodb'

interface Word {
	_id: ObjectId
	string: string
	userId: number
}

interface Database {
	words: Collection
}

export { Word, Database }
