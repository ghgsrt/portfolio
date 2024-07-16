import type { InfoItem } from '../Info.svelte';

export const colors: Record<string, string> = {
	vanilla: '#f7df1e',
	typescript: '#3178c6',
	solid: ' #2c4f7c',
	svelte: '#f73c00',
	react: '#149eca',
	angular: '#c3002f',
	vue: '#42b883',
	htmx: '#5b96d5',
	alpine: '#75bfd0',
	astro: '#e63bad',
};
export type Colors = keyof typeof colors;

export const items: InfoItem[] = [
	{
		name: 'MMO Combat Simulator',
		url: 'mmo.alexbos.co',
		github: 'ffxiv',
		color: colors.solid,
		started: '11-03-2021',
		status: 'Not Abandoned; Low Priority',
		stack: ['SolidJS'],
		short:
			'A combat simulator for MMOs, with a focus on FFXIV.\nThe goal is to enable simulating builds and combat rotations to optimize DPS, and to provide a platform for theorycrafting',
		completed:
			'The foundation of the combat system: actions, effects, traits, cooldowns, combos, resources, etc. (as well as ~70% of Endwalker-era Dragoon abilities for demo); keybinding; drag/drop from "spellbook"',
		todo: 'Add in items and gear (from existing API), player stats and apply them to damage calculations, skill trees, wide range of automation for better testing builds (generally just a crap load of heuristics), complete Dragoon and maybe one other demo class to ensure system can handle everything, and a LOT of UI/UX improvements',
	},
	{
		name: 'The Wild Sheep Chase',
		url: 'sheep.alexbos.co',
		github: 'sheep',
		color: colors.solid,
		started: '12-09-2023',
		status: 'Not Abandoned; Low Priority',
		stack: ['SolidJS'],
		short:
			'A simple, branching narrative game based on the D&D one-shot of the same name.',
		completed:
			'The basic structure of the game, including character select, dialogue system, basic item/inventory system, and the first few scenes',
		todo: "Maybe overhaul the options system, otherwise just finish the story: add in more items and choices, add in more scenes, add in more characters, add in more endings, add in more everything. If I get really ambitious, I might add in a D&D-style combat system so it's actually a game",
	},
	{
		name: 'Wordle Clone',
		url: 'wordle.alexbos.co',
		github: 'wordle',
		color: colors.alpine,
		short: "A clone of the popular word game Wordle (please don't sue)",
		started: '02-08-2022',
		status: 'Functionally Complete',
		stack: ['Alpine.js'],
		completed:
			'The basic game loop, including guessing words, checking them, and displaying results (albeit in a lazy manner)',
		todo: "I was considering adding a multiplayer functionality and expanding the available word size, but I think I'll just leave it as is",
	},
	{
		name: 'Pokemon Red Clone',
		url: 'poke.alexbos.co',
		github: 'poke',
		color: colors.angular,
		started: '12-25-2021',
		status: 'Abandoned',
		stack: ['Angular'],
		short: "A web clone of the original Pokemon Red game (please don't sue)",
		completed:
			'Rudimentary combat system accounting for types, levels, and stats; rudimentary pokedex',
		todo: "The entire rest of the game. Originally got sidetracked creating a mapmaker tool for the next steps, but then got sidetracked from that too, then realized I'd rather not use Angular for fun projects anyways",
	},
	{
		name: "Conway's Game of Life",
		url: 'conway.alexbos.co',
		github: 'conway',
		color: colors.vanilla,
		started: '08-09-2023',
		status: 'Complete',
		stack: ['JavaScript'],
		short:
			"A simple implementation of Conway's Game of Life with visual representation of when a cell is born (green) or dies (red)",
		completed: 'The game of life',
		todo: "Nothing, it's done (click on it)",
	},
	{
		name: 'Language Locked Chat',
		url: 'lang.alexbos.co',
		github: 'lang',
		color: colors.vue,
		started: '03-01-2022',
		status: 'Complete',
		stack: ['Vue'],
		short:
			"A chat application where users can only see messages in the language they've selected. Created to facilitate Dungeons and Dragons games, making in-game language matter a bit more",
		completed:
			'The basic chat functionality, including sending and receiving messages, and the language selection system. Hosts can set a range of languages to choose from, with master controls over the chatters languages',
		todo: "Nothing, it's done",
	},
	{
		name: 'Dueling Network Clone',
		url: 'duel.alexbos.co',
		github: 'duel',
		color: colors.htmx,
		started: '08-26-2023',
		status: 'In Progress',
		stack: ['HTMX'],
		short:
			"A clone of the now defunct Yu-Gi-Oh! Dueling Network, a browser-based platform for playing the Yu-Gi-Oh! card game (please don't sue)",
		completed: 'Nothing',
		todo: 'Lobbies, deck builder utilizing public api, deck database, game room, controls for fundamental game mechanics, multiplayer, chat, etc.',
	},
	{
		name: 'ZIL Web Interpreter (no Z-Machine)',
		url: 'zil.alexbos.co',
		github: 'zil-interpreter',
		color: colors.svelte,
		started: '09-16-2023',
		status: 'Not Abandoned; Low Priority',
		stack: ['Svelte'],
		short:
			'A web-based interpreter for the Zork Implementation Language (ZIL), providing an Obsidian-like interface for streamlined playthroughs of Zork and other ZIL-based games. No Z-Machine to make it more interesting/almost certainly much more performant than current variations of this idea',
		completed:
			'Tokenizer and most of the parser for ZIL files, preliminary system for actually playing the games',
		todo: "The rest of the parser (just enough to 'transpile' Zork's text parser, specifically), all of the UI, and a convenient way to drop in multiple game files so a user can play any ZIL game they have the source code for",
	},
	{
		name: 'placeholder',
		url: 'placeholder',
		github: 'placeholder',
		color: colors.vanilla,
		started: '01-01-0001',
		status: 'placeholder',
		stack: ['placeholder'],
		short: 'placeholder',
		completed: 'placeholder',
		todo: 'make this not a placeholder',
	},
];
