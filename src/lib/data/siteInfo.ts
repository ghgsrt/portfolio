import Zoo from '../../assets/Zoo.svelte';
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
	csharp: '#823085',
	godot: '#478cbf',
	golang: '#00ADD8',
} as const;
export type Colors = keyof typeof colors;

export const items: InfoItem[] = [
	{
		name: 'Language Locked Chat',
		url: ['lang.alexbos.co'],
		github: 'lang-htmx',
		color: colors.htmx,
		started: '07-14-2024',
		status: 'In Maintenance',
		dependencies: ['HTMX', 'ElysiaJS'],
		short:
			"A relatively complex chat application where users can only see messages in languages known by their currently selected 'actor'. Initially created to facilitate Dungeons and Dragons games, making in-game language matter a bit more.",
		completed:
			"Creating, reserving, and otherwise basic editing of actors and their properties. Actor tooltips. The core chat interactions, like targeted speaking, replys, and actor groups. Custom select/multiselect, auto-resizing input, and modal for server actions. A 'users' section which functions more like a traditional basic chat app for meta discussion. User and host settings using a custom component which builds out a code-editor-styled form according to a provided schema, enabling rapid but extensive form creation (check out EditableVariable.tsx and Settings.tsx)",
		todo: "Hook up an actual database and file store. Add unread notifications, have the message box more closely mimic the end result of what a message will look like in chat (custom textarea), and maybe allow users to specifically link certain actors in their message using Obsidian's link syntax, as well as some other markdown features. Refactor the controller to be less memory hungry (i.e., less interesting)",
	},
	{
		name: 'Zoo Specifics (WIP)',
		svgFallback: Zoo,
		color: colors.golang,
		started: '10-04-2024',
		status: 'In Progress',
		dependencies: ['Go', 'SolidJS'],
		short:
			'A database/management system purpose-built for zoos and similar businesses. Inspired by the need for small, low-budget zoos to move away from "white-board" tracking of their animals. Designed to operate offline/in spotty connection, with automatic syncing with a remote database',
		completed:
			'The basic framework for the remote server (database(s), auth, logging), and the underlying framework of frontend functionality (indexeddb syncing with remote server, event-based system for syncing the indexeddb with any frontend, preliminary UI)',
		todo: 'Flesh out initial UI design, implement schema system to allow test clients to experiment with what animal profile shapes would be most optimal in the field, some form of offline auth (or at least identification), and make it installable (PWA) and set up a service worker. Conflict resolution for database writes. Redis caching(?). Create a readonly wrapper around the indexeddb to allow for digital displays for guests to learn about an animal. Create a dedicated, online-only management portal. Collect additional user requirements to expand the functionality of the product beyond a glorified user-friendly database',
	},
	{
		name: 'Dotwork Pete',
		url: ['dotwork.netlify.app'],
		github: 'dotwork',
		color: colors.astro,
		started: '09-09-2024',
		status: 'In Progress',
		dependencies: ['Astro', 'Stripe', 'Netlify', 'S3'],
		short:
			'A relatively minimalistic e-commerce site for my friend Pete to sell his pointillism-styled art',
		completed:
			"Landing/basic product pages, Stripe integration, general skeleton of the site and required backend services, and an authenticated, hand-rolled, and embedded 'admin portal' (CMS)",
		todo: 'Collect design requirements from Pete to improve the overall look of the site, improve image optimization/delivery (and sizing in production), conform to A11y standards, and improve no-script compatibility',
	},
	{
		name: 'Registration System',
		url: ['friars.alexbos.co', 'friars.alexbos.co/admin'],
		github: 'friars',
		color: colors.htmx,
		started: '10-14-2024',
		status: 'In Progress',
		dependencies: ['HTMX', 'ElysiaJS', 'Stripe', 'Amazon SES', 'NeonDB'],
		short:
			'A relatively simplistic event registration system to save the Michigan Friars a bit of money',
		completed:
			"NOTE: Admin portal login page currently not loading within iframes for some reason 🤷🏻‍♂️, you'll have to navigate to the actual website to view the demo<br/><br/>A very simple (awaiting design requirements) registration form with paid options that will send a confirmation email on submit. The core of that management system, including queueing emails to specific recipients, very basic email templating, and defining specific emails to be sent on particular actions (e.g., registration). Database, SES, and basic stripe integration<br /><br />To view a demo of the admin portal: go to /admin and input 'test' for username and password<br />In test mode Amazon will only allow emails to be sent to my personal email, so do not expect to be able to register then send yourself an email through the demo",
		todo: 'Improve the look of the registration form, perhaps integrate an external email templater, add in SMS, and integrate with the existing Friars database for outreach',
	},
	{
		name: 'The Wild Sheep Chase',
		url: ['sheep.alexbos.co'],
		github: 'sheep',
		color: colors.solid,
		started: '12-09-2023',
		status: 'Not Abandoned; Low Priority',
		dependencies: ['SolidJS'],
		short:
			'A simple, branching narrative game based on the D&D one-shot of the same name.',
		completed:
			'The basic structure of the game, including character select, dialogue system, basic item/inventory system, and the first few scenes',
		todo: "Maybe overhaul the options system, otherwise just finish the story: add in more items and choices, add in more scenes, add in more characters, add in more endings, add in more everything. If I get really ambitious, I might add in a D&D-style combat system so it's actually a game",
	},
	{
		name: 'MMO Combat Simulator',
		url: ['mmo.alexbos.co'],
		github: 'ffxiv',
		color: colors.solid,
		started: '11-03-2021',
		status: 'Not Abandoned; Low Priority',
		dependencies: ['SolidJS'],
		short:
			'A combat simulator for MMOs, with a focus on FFXIV.\nThe goal is to enable simulating builds and combat rotations to optimize DPS, and to provide a platform for theorycrafting',
		completed:
			'The foundation of the combat system: actions, effects, traits, cooldowns, combos, resources, etc. (as well as ~70% of Endwalker-era Dragoon abilities for demo). Keybinding. Drag/drop from "spellbook"',
		todo: 'Add in items and gear (from existing API). Player stats and apply them to damage calculations. Skill trees. Wide range of automation for better testing builds (generally just a crap load of heuristics). Complete Dragoon and maybe one other demo class to ensure system can handle everything. A LOT of UI/UX improvements',
	},
	{
		name: 'Wordle Clone',
		url: ['wordle.alexbos.co'],
		github: 'wordle',
		color: colors.alpine,
		short: "A clone of the popular word game Wordle (please don't sue)",
		started: '02-08-2022',
		status: 'Functionally Complete',
		dependencies: ['Alpine.js'],
		completed:
			'The basic game loop, including guessing words, checking them, and displaying results (albeit in a lazy manner)',
		todo: "I was considering adding a multiplayer functionality and expanding the available word size, but I think I'll just leave it as is",
	},
	{
		name: 'ZIL Web Interpreter (no Z-Machine)',
		github: 'ziljs',
		color: colors.typescript,
		started: '09-16-2023',
		status: 'Queued',
		dependencies: ['TypeScript'],
		short:
			'A web-based interpreter for the Zork Implementation Language (ZIL), providing an Obsidian-like interface for streamlined playthroughs of Zork and other ZIL-based games. No Z-Machine to make it more interesting/almost certainly much more performant than current variations of this idea',
		completed:
			'Tokenizer and most of the parser for ZIL files, preliminary system for actually playing the games',
		todo: "The rest of the parser (just enough to 'transpile' Zork's text parser, specifically), all of the UI, and a convenient way to drop in multiple game files so a user can play any ZIL game they have the source code for",
	},
	{
		name: 'Kinovea Companion',
		github: 'https://github.com/SundewBry/Kinovea',
		color: colors.csharp,
		started: '11-30-2022',
		status: 'Abandoned',
		dependencies: ['C#', 'Kinovea'],
		short:
			'A fork of the Kinovea motion analysis system for the purposes of conducting research on the risk of ACL injury in female athletes. A senior design project sponsored by Penn State',
		completed:
			'A system for synchronizing the output of the motion data with independently collected force pad data which relied on CSV manipulation, programmatically starting/stopping relevant collection softwares, and post-processing the data to account for any delays in the prior step<br /><br />Files I wrote:<br/><ul><li>Analysis-ter/FakeUser.cs</li><li>Analysis-ter/Template.cs</li><li>Analysis-ter/Synchronizer.cs (not the last two methods)</li><li>Analysis-ter/Math.cs</li><li>Most of Analysis-ter/Csv.cs</li><li>Analysis-ter/FileHandler.cs</li><li>AnalysistemUnitTest/UnitTest.cs</li></ul>',
		todo: 'Ensure accuracy of the post-processing step, feed the data into a series of complex matrix computations that were only partially implemented, and output meaningful heuristics from the data',
	},
	{
		name: 'ACL-injury Educational Game',
		github: 'https://github.com/colinabarry/Interaction-System',
		color: colors.godot,
		started: '02-28-2023',
		status: 'Functionally Complete',
		dependencies: ['GDScript', 'Godot'],
		short: 'A K-12 educational game relating to the risk of ACL injury',
		completed:
			'Basic game loop, a rudimentary open world, a few minigames, an in-depth dialogue system, and a quiz at the end<br /><br />Files I wrote:<br/ ><ul><li>All of src/dialogues</li><li>All of src/scripts/dialog_system</li></ul>',
		todo: 'Make it actually a good game :)',
	},
	{
		name: 'Shoddy Game Engine',
		github: 'data-dungeon',
		color: colors.solid,
		started: '02-01-2023',
		status: 'Thoroughly Abandoned',
		dependencies: ['SolidJS', 'Three.js', 'Docker', 'Tauri'],
		short:
			"The beginnings of a shoddy Three.js-based game engine I hacked together in a week as the (actual) game developers in my senior design group, for whatever reason, didn't want to default to a real game engine for the ACL-injury educational game",
		completed:
			'In-depth input/keybinding system, rudimentary animation mixer, and a basic system for loading models. An attempt at a QWOP-derivative for a minigame/demoing the "engine"<br /><br />Relevant directories:<br /><ul><li>src/hooks</li><li>src/components/QWOP</li></ul>',
		todo: 'Thankfully nothing as my group came to their senses and opted to switch to Godot',
	},
	{
		name: "Conway's Game of Life",
		url: ['conway.alexbos.co'],
		github: 'conway',
		color: colors.vanilla,
		started: '08-09-2023',
		status: 'Complete',
		dependencies: ['JavaScript'],
		short:
			"(click to play)\nA simple implementation of Conway's Game of Life with visual representation of when a cell is born (green) or dies (red)",
		completed: 'The game of life',
		todo: 'Perhaps a HUD for some user controls 🤷🏻‍♂️',
	},
	// {
	// 	name: 'Pokemon Red Clone',
	// 	url: ['poke.alexbos.co'],
	// 	github: 'poke',
	// 	color: colors.angular,
	// 	started: '12-25-2021',
	// 	status: 'Abandoned',
	// 	dependencies: ['Angular'],
	// 	short: "A web clone of the original Pokemon Red game (please don't sue)",
	// 	completed:
	// 		"Rudimentary combat system accounting for types, levels, and stats (right click in a fight to advance text prompts). Rudimentary pokedex (right click when not in a fight to open the menu; all 'monsters' are currently just a copy/paste Bulbasaur)",
	// 	todo: "The entire rest of the game. Originally got sidetracked creating a mapmaker tool for the next steps, but then got sidetracked from that too, then realized I'd rather not use Angular for fun projects anyways",
	// },
	{
		name: 'Dueling Network Clone',
		github: '',
		color: colors.htmx,
		started: 'N/A',
		status: 'In Planning',
		dependencies: ['HTMX', 'JetZig'],
		short:
			"A clone of the now defunct Yu-Gi-Oh! Dueling Network, a browser-based platform for playing the Yu-Gi-Oh! card game (please don't sue)",
		completed: 'Nothing',
		todo: 'Lobbies, deck builder utilizing public api, deck database, game room, controls for fundamental game mechanics, multiplayer, chat, etc.',
	},
];
