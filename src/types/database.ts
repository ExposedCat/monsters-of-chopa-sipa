import { Collection } from 'mongodb'

export interface Player {
	userId: number
	name: string
	glory: number
}

export interface Chat {
	chatId: number
	title: string
	lastMonsterSpawn: Date
}

export interface Database {
	player: Collection<Player>
	chat: Collection<Chat>
}
