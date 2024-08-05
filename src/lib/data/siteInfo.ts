import type { InfoItem } from '../Info.svelte';

export const colors = {
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
	zig: '#f6a416',
} as const;
export type Colors = keyof typeof colors;

export const items: InfoItem[] = [
	{
		name: 'Language Locked Chat',
		url: 'lang.alexbos.co',
		github: 'lang-htmx',
		color: colors.htmx,
		started: '07-14-2024',
		status: 'In Progress',
		stack: ['HTMX', 'ElysiaJS'],
		short:
			"A relatively complex chat application where users can only see messages in languages known by their currently selected 'actor'. Created to facilitate Dungeons and Dragons games, making in-game language matter a bit more. Also, for fun, created using as little client-side JavaScript as possible",
		completed:
			'Creating, reserving, and otherwise basic editing of actors and their properties. Actor tooltips. Basic chat functionality, prepared for more complex interactions. Custom multiselect',
		todo: "Hook up an actual database and file store. Improve UI/UX for sending chats. Handle more complex chat interactions like targeted speaking, replys, actor groups, and unread notifications. Provide *extensive* host controls. Create a 'users' section which will function more like a traditional basic chat app for meta discussion",
	},
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
			'The foundation of the combat system: actions, effects, traits, cooldowns, combos, resources, etc. (as well as ~70% of Endwalker-era Dragoon abilities for demo). Keybinding. Drag/drop from "spellbook"',
		todo: 'Add in items and gear (from existing API). Player stats and apply them to damage calculations. Skill trees. Wide range of automation for better testing builds (generally just a crap load of heuristics). Complete Dragoon and maybe one other demo class to ensure system can handle everything. A LOT of UI/UX improvements',
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
		name: "Conway's Game of Life",
		url: 'conway.alexbos.co',
		github: 'conway',
		color: colors.vanilla,
		started: '08-09-2023',
		status: 'Complete',
		stack: ['JavaScript'],
		short:
			"(click to play)\nA simple implementation of Conway's Game of Life with visual representation of when a cell is born (green) or dies (red)",
		completed: 'The game of life',
		todo: 'Perhaps a HUD for some user controls 🤷🏻‍♂️',
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
			"Rudimentary combat system accounting for types, levels, and stats (right click in a fight to advance text prompts). Rudimentary pokedex (right click when not in a fight to open the menu; all 'monsters' are currently just a copy/paste Bulbasaur)",
		todo: "The entire rest of the game. Originally got sidetracked creating a mapmaker tool for the next steps, but then got sidetracked from that too, then realized I'd rather not use Angular for fun projects anyways",
	},
	{
		name: 'ZIL Web Interpreter (no Z-Machine)',
		url: 'zil.alexbos.co',
		github: 'ziljs',
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
		name: 'Dueling Network Clone',
		url: 'duel.alexbos.co',
		github: 'duel',
		color: colors.htmx,
		started: 'N/A',
		status: 'In Planning',
		stack: ['HTMX', 'JetZig'],
		short:
			"A clone of the now defunct Yu-Gi-Oh! Dueling Network, a browser-based platform for playing the Yu-Gi-Oh! card game (please don't sue)",
		completed: 'Nothing',
		todo: 'Lobbies, deck builder utilizing public api, deck database, game room, controls for fundamental game mechanics, multiplayer, chat, etc.',
	},
	{
		name: 'Tower Defense',
		url: 'placeholder',
		github: 'placeholder',
		color: colors.zig,
		started: 'N/A',
		status: 'Queued',
		stack: ['Zig'],
		short:
			"A tower defense derivative made entirely in Zig because 1. It's an excuse to learn Zig (after getting some exposure with the Dueling Network clone) and 2. I enjoy TD games but am generally left unsatisfied with the free options",
		completed: '',
		todo: '',
	},
];
