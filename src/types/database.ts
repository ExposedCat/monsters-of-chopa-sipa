import type { Collection } from 'mongodb'

export interface Player {
	userId: number
	name: string
	glory: number
	emoji: number
}

export interface Monster {
	emoji: string
	name: string
	hp: number
	damage: number
}

export interface Fight {
	monster: Monster
	fighters: Player[]
}

export interface Chat {
	chatId: number
	title: string
}

export interface Database {
	player: Collection<Player>
	monster: Collection<Monster>
	chat: Collection<Chat>
	fight: Collection<Fight>
}
