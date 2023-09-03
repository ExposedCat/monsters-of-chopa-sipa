import type { Collection } from 'mongodb'

export interface Player {
	userId: number
	name: string
	glory: number
	emoji: number
}

export interface Chat {
	chatId: number
	title: string
}

export interface Database {
	player: Collection<Player>
	chat: Collection<Chat>
}
