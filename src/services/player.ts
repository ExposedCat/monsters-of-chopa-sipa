import { randomInteger } from '../helpers/functions.js'
import type { Database, Player } from '../types/database.js'

export function buildName(firstName: string, lastName?: string) {
	return lastName ? `${firstName} ${lastName}` : firstName
}

async function createPlayer(args: {
	db: Database
	userId: number
	name: string
}): Promise<Player> {
	const playerObject = {
		userId: args.userId,
		name: args.name,
		emoji: randomInteger(1, 12),

		glory: 0
	} as Player

	await args.db.player.insertOne(playerObject)

	return playerObject
}

export async function getOrCreatePlayer(args: {
	db: Database
	userId: number
	name: string
}): Promise<Player> {
	const player = await args.db.player.findOneAndUpdate(
		{ userId: args.userId },
		{ $set: { name: args.name } },
		{ returnDocument: 'after' }
	)

	if (player.ok && player.value) {
		return player.value
	}

	return createPlayer(args)
}
