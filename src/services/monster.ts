import type { ObjectId } from 'mongodb'
import type { Database, Monster } from '../types/database.js'

export async function getRandomMonster(args: {
  db: Database
}): Promise<Monster> {
  const query = args.db.monster.aggregate<Monster>([{ $sample: { size: 1 } }])
  const monster = await query.next()

  if (monster === null) {
    throw new Error('No monsters found in the database')
  }

  return monster
}

export async function getMonster(args: { db: Database; id: ObjectId }) {
  return args.db.monster.findOne({ _id: args.id })
}
