<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	export let parent: HTMLElement;
	export let arc = 0;
	export let arcTop = 0;
	export let arcBottom = 0;
	export let top = 0;
	export let left = 0;

	let viewBox: string;
	let height: string;
	let width: string;
	let d: string;
	let scrollPos = 0;
	let pathLength: number;
	let dashOffset: number;
	let dashArray: string;

	const update = () => {
		viewBox = `0 0 ${parent?.offsetWidth || 0} ${parent?.offsetHeight ?? 0}`;
		height = `${parent?.offsetHeight ?? 0}px`;
		width = `${parent?.offsetWidth ?? 0}px`;
		d = `M ${(parent?.offsetWidth ?? 0) - (arc || arcTop)},0 A${arc || arcTop},${arc || arcTop} 0 0 1 ${parent?.offsetWidth ?? 0},${arc || arcTop} L${parent?.offsetWidth ?? 0},${(parent?.offsetHeight ?? 0) - (arc || arcBottom)} A${arc || arcBottom},${arc || arcBottom} 0 0 1 ${(parent?.offsetWidth ?? 0) - (arc || arcBottom)},${parent?.offsetHeight ?? 0}`;

		pathLength = parent?.scrollHeight;
		const scrollLen = Math.floor(
			(parent?.offsetHeight / parent?.scrollHeight) * pathLength
		);
		dashArray = `${scrollLen} ${parent?.scrollHeight - scrollLen + 100}`;
		dashOffset = -(parent?.scrollTop ?? 0);
		scrollPos = parent?.scrollTop ?? 0;
	};

	$: parent && update(),
		parent?.addEventListener('scroll', () => {
			dashOffset += scrollPos - parent.scrollTop;
			scrollPos = parent.scrollTop;
		});

	onMount(update);
</script>

<svelte:window on:resize={() => setTimeout(update, 50)} />

{#if parent?.scrollHeight > parent?.offsetHeight}
	<div class="svg-wrapper">
		<svg {viewBox} {height} {width} style:top style:left>
			<path
				{d}
				stroke-dasharray={dashArray}
				stroke-dashoffset={dashOffset}
				{pathLength}
				stroke="var(--color-accent)"
				stroke-width="8"
			/>
		</svg>
	</div>
{/if}

<style>
	svg {
		position: absolute;
		left: 0;
		min-height: 100%;
		width: 100%;
		/* bottom: 0;
		right: 0; */
		z-index: 1000;
		pointer-events: none;
		/* padding-right: 10px; */
	}

	.svg-wrapper {
		position: sticky;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1000;
		pointer-events: none;
	}
</style>
