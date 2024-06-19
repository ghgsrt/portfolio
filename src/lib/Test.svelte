<script context="module" lang="ts">
	export type InfoItem = {
		name: string;
		url: string;
		color: string;
		description: string;
	};
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import usePollRate, { type PollRateOptions } from '../hooks/usePollRate';
	import { mod } from './utils';
	import Info from './Info.svelte';
	import Path, {
		type CreatePath,
		type MySVGPathElement,
	} from './svg/Path.svelte';
	import { items } from './data/siteInfo';

	let infoHeights: number[] = []; // "let" to be reactive
	let infoContainerWidth: number;
	let infoContainerHeight: number;
	$: infoTopOffset = infoContainerHeight / 15;

	const visibleItems = 1.5;
	const itemSpacing = 30; // px
	const minItemWidth = 490; // px

	let carouselIdx = 0;

	let carouselWidth: number;
	$: itemWidth = Math.max(carouselWidth / visibleItems, minItemWidth);

	$: relPosMap = Array.from({ length: items.length }, (_, i) =>
		Array.from({ length: items.length }, (_, j) => {
			const relPos = mod(i - j, items.length);
			return relPos <= items.length / 2 ? relPos : relPos - items.length;
		})
	);
	$: leftMap = Array.from({ length: items.length }, (_, i) =>
		Array.from({ length: items.length }, (_, j) => {
			const relPos = relPosMap[i][j];
			return (
				(carouselWidth - itemWidth) / 2 +
				relPos * itemWidth +
				Math.sign(relPos) * itemSpacing
			);
		})
	);
	$: topMap = Array.from({ length: items.length }, (_, i) =>
		Array.from({ length: items.length }, (_, j) => {
			const relPos = relPosMap[i][j];
			if (relPos === 0) return 0;

			const sign = Math.sign(relPos);
			const start = (sign === 1 ? i - relPos : i) + 1;
			const end = (sign === 1 ? i : i - relPos) + 1;

			let height = 0;
			for (let j = start; j < end; j++) height += infoContainerHeight;
			// height += infoHeights[mod(j, infoHeights.length)];

			return -sign * height;
		})
	);

	const pathLength = 1000;
	const pathInc = -8;
	const strokeWidth = 3;

	const pathGenerators: CreatePath[][] = [[], []];

	let activePath: Array<keyof ReturnType<typeof getDs>> = ['dRight', 'dLeft'];
	let pathChanged = false;

	const Mify = (d: string) => d.replace('L', 'M');
	const getDs = (width: number, height: number, strokeWidth: number) => {
		const startHeight = infoTopOffset;

		const midWidth = width / 2;
		const left = strokeWidth / 2;
		const right = width - strokeWidth / 2;
		const bottom = height - strokeWidth / 2;

		const arc = 20;

		const _arc = `A${arc},${arc} 0 0 1`;
		const _start = ``;
		// const _start = `L${midWidth},0`;
		const _endpoint = `L${midWidth},${startHeight}`;
		// const _endpoint = ``;

		// let _dLeft = `L${left + arc},${startHeight} A${arc},${arc} 0 0 0 ${left},${
		// 	startHeight + arc
		// } L${left},${bottom - arc} A${arc},${arc} 0 0 0 ${left + arc},${bottom} L${midWidth},${bottom}`;

		// let _dRight = `L${right - arc},${startHeight} ${_arc} ${right},${
		// 	startHeight + arc
		// } L${right},${bottom - arc} ${_arc} ${right - arc},${bottom} L${midWidth},${bottom}`;

		let _dLeft = `L${left + arc},${startHeight} A${arc},${arc} 0 0 0 ${left},${
			startHeight + arc
		} L${left},${bottom}`;

		let _dRight = `L${right - arc},${startHeight} ${_arc} ${right},${
			startHeight + arc
		} L${right},${bottom}`;

		// L${
		// 	left + arc
		// },${bottom} ${_arc} ${left},${bottom - arc} L${left},${
		// 	startHeight + arc
		// } ${_arc} ${left + arc},${startHeight}`;
		// let _dLeft = _dRight
		// 	.split(` ${_arc} `)
		// 	.map((s) =>
		// 		s
		// 			.split(' ')
		// 			.reverse()
		// 			.map((_s) => (_s[0] === 'L' ? _s.slice(1) : `L${_s}`))
		// 			.join(' ')
		// 	)
		// 	.reverse()
		// 	.join(` ${_arc} `.replace('1', '0'));
		// _dRight = `${_endpoint} ${_dRight} ${_endpoint}`;
		// _dLeft = `${_endpoint} ${_dLeft} ${_endpoint}`;

		let _dRightClear = _dRight
			.split(` ${_arc} `)
			.map((s) =>
				s
					.split(' ')
					.reverse()
					.map((_s) => (_s[0] === 'L' ? _s.slice(1) : `L${_s}`))
					.join(' ')
			)
			.reverse()
			.join(` ${_arc} `.replace('1', '0'));
		let _dLeftClear = _dLeft
			.split(` A${arc},${arc} 0 0 0 `)
			.map((s) =>
				s
					.split(' ')
					.reverse()
					.map((_s) => (_s[0] === 'L' ? _s.slice(1) : `L${_s}`))
					.join(' ')
			)
			.reverse()
			.join(` ${_arc} `);
		_dRight = `${_endpoint} ${_dRight}`;
		_dLeft = `${_endpoint} ${_dLeft}`;
		return {
			// dRight: `${Mify(_start)} ${_dRight}`,
			// dLeft: `${Mify(_start)} ${_dLeft}`,
			dRight: `${Mify(_dRight)}`,
			dLeft: `${Mify(_dLeft)}`,
			dRightClear: `M${_dRightClear} ${_endpoint} ${_start}`, //`${Mify(_dRight)} ${_start}`,
			dLeftClear: `M${_dLeftClear} ${_endpoint} ${_start}`, //`${Mify(_dLeft)} ${_start}`,
		};
	};

	$: Ds = Array.from(
		{ length: items.length },
		(_, i) => getDs(infoContainerWidth, infoContainerHeight ?? 0, strokeWidth)
		// getDs(infoContainerWidth, infoHeights[i] ?? 0, strokeWidth)
	);

	let prevPath: MySVGPathElement[] = [];
	const shiftIdx = (by: -1 | 0 | 1) => {
		const waitingToPlay = new WeakMap();
		const updateCarousel = () => {
			carouselIdx = mod(carouselIdx + by, items.length);

			// clear previous path
			if (prevPath[0]) {
				const waiting0 = waitingToPlay.get(prevPath[0]);
				if (waiting0) {
					console.log('deez');
					clearTimeout(waiting0);
					prevPath[0]?.__play();
					prevPath[1]?.__play();
					const prev0 = prevPath[0];
					const prev1 = prevPath[1];
					setTimeout(() => {
						prev0?.__clear();
						prev1?.__clear();
					}, 100);
				} else {
					console.log('nuts');
					prevPath[0]?.__clear();
					prevPath[1]?.__clear();
				}
			}

			const path0 = pathGenerators[0][carouselIdx]?.();
			const path1 = pathGenerators[1][carouselIdx]?.();
			if (path0) {
				console.log('huh');
				waitingToPlay.set(
					path0,
					setTimeout(() => {
						path0.__play();
						path1.__play();
						waitingToPlay.delete(path0);
					}, 200)
				);
				prevPath[0] = path0;
				prevPath[1] = path1;
			}
		};

		const _activePath0 =
			by === 1 ? 'dRight' : by === -1 ? 'dLeft' : activePath[0];
		const _activePath1 =
			by === 1 ? 'dLeft' : by === -1 ? 'dRight' : activePath[1];
		return () => {
			pathChanged = activePath[0] !== _activePath0;
			activePath[0] = _activePath0;
			activePath[1] = _activePath1;

			setTimeout(updateCarousel); // allow reactivity to update ^^
		};
	};

	const transTime = 500; // ms
	const transMod = 0.5; // mostly arbitrary
	const _minTransTime = transTime / 4; // ms, mostly arbitrary

	const options: PollRateOptions = {
		useQueue: true,
		maxQueue: items.length,
		adjustTimerForQueue: (timer, queue) =>
			Math.max(_minTransTime, timer / (queue.length + 2)),
	};
	const increment = usePollRate(shiftIdx(1), transTime * transMod, options);
	const decrement = usePollRate(shiftIdx(-1), transTime * transMod, options);

	const resetCarousel = () => {
		prevPath[0]?.__clear(true);
		prevPath[1]?.__clear(true);
		prevPath = [];

		setTimeout(shiftIdx(0));
	};

	onMount(resetCarousel);

	let blockTransitions = false;
</script>

<svelte:window
	on:resize={() => {
		blockTransitions = true;
		setTimeout(() => {
			resetCarousel();
			setTimeout(() => (blockTransitions = false), 7);
		}, 7);
	}}
	on:click={increment}
	on:contextmenu={(e) => {
		e.preventDefault();
		e.stopPropagation();

		decrement();
	}}
/>

<section>
	<div class="carousel-container" bind:offsetWidth={carouselWidth}>
		{#each items as item, i (i)}
			<!-- style:box-shadow={`${!blockTransitions && relPosMap[i][carouselIdx] === 0 ? `0 0 10px ${item.color}` : 'none'}`} -->
			<div
				data-idx={i}
				data-color={item.color}
				class="carousel-item"
				style:width={`${itemWidth}px`}
				style:border={`${!blockTransitions && relPosMap[i][carouselIdx] === 0 ? `2px solid ${item.color}` : '1px solid black'}`}
				style:left={`${leftMap[i][carouselIdx]}px`}
				style:transform={`scale(${
					(items.length - Math.abs(relPosMap[i][carouselIdx])) / 10
				})`}
				style:transition={`border ${transTime}ms ease-out, box-shadow ${transTime}ms ease-out, ${
					!blockTransitions &&
					Math.abs(relPosMap[i][carouselIdx]) < visibleItems + 2
						? `left ${transTime}ms ease-out, transform ${transTime}ms ease-out`
						: `none`
				}`}
				style:z-index={items.length - Math.abs(relPosMap[i][carouselIdx])}
			>
				<!-- {item.name.toUpperCase()} -->
				<!-- svelte-ignore a11y-missing-attribute -->
				<iframe
					src="https://{items[(carouselIdx + i) % items.length].url}"
					allowfullscreen
					height="100%"
					width="100%"
					loading="lazy"
				></iframe>
			</div>
		{/each}
	</div>
	<div
		class="info-container"
		bind:offsetWidth={infoContainerWidth}
		bind:offsetHeight={infoContainerHeight}
		style:width={`${itemWidth}px`}
	>
		{#each items as item, i (i)}
			<Path
				bind:createPath={pathGenerators[0][i]}
				width={infoContainerWidth}
				height={infoContainerHeight}
				{strokeWidth}
				{pathLength}
				{pathInc}
				activePath={activePath[0]}
				{pathChanged}
				color={item.color}
				zIndex={items.length - Math.abs(relPosMap[i][carouselIdx]) + 100}
				Ds={Ds[i]}
			/>
			<Path
				bind:createPath={pathGenerators[1][i]}
				width={infoContainerWidth}
				height={infoContainerHeight}
				{strokeWidth}
				{pathLength}
				{pathInc}
				activePath={activePath[1]}
				{pathChanged}
				color={item.color}
				zIndex={items.length - Math.abs(relPosMap[i][carouselIdx]) + 100}
				Ds={Ds[i]}
			/>
		{/each}
		<!-- style:max-height={`${infoHeights[carouselIdx] ?? 0}px`} -->
		<div
			class="info-window"
			style:margin-top={`${infoTopOffset}px`}
			style:transition={!blockTransitions
				? `max-height ${transTime * 0.85}ms ease-in-out`
				: 'none'}
		>
			<div class="info-gutter-outer">
				<div class="info-gutter-inner">
					{#each items as item, i (i)}
						<!-- <div
							class="info"
							bind:offsetHeight={infoHeights[i]}
							style:top={`${topMap[i][carouselIdx]}px`}
							style:max-height={`calc(${infoContainerHeight - infoTopOffset}px`}
							style:transition={`${
								!blockTransitions &&
								Math.abs(relPosMap[i][carouselIdx]) < visibleItems + 2
									? `top ${transTime}ms ease-out`
									: `none`
							}`}
							style:z-index={items.length - Math.abs(relPosMap[i][carouselIdx])}
						>
							<Info {item} />
						</div> -->
						<div
							class="info"
							bind:offsetHeight={infoHeights[i]}
							style:top={`${topMap[i][carouselIdx]}px`}
							style:max-height={`calc(${infoContainerHeight - infoTopOffset}px`}
							style:transition={`${
								!blockTransitions &&
								Math.abs(relPosMap[i][carouselIdx]) < visibleItems + 2
									? `top ${transTime}ms ease-out`
									: `none`
							}`}
							style:z-index={items.length - Math.abs(relPosMap[i][carouselIdx])}
						>
							<Info {item} />
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
	<!-- <div class="shadow left"></div>
	<div class="shadow right"></div> -->
</section>

<style>
	:global(.no-transition) {
		-webkit-transition: none !important;
		-moz-transition: none !important;
		-o-transition: none !important;
		transition: none !important;
	}

	section {
		width: 100%;
		height: 100%;
		padding-top: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;

		/* background-color: antiquewhite; */
	}

	section > * {
		user-select: none;
	}

	.shadow {
		--shadow-start: rgba(0, 0, 0, 1);
		--shadow-curve: 50%;
		--shadow-end: rgba(0, 0, 0, 0);
		position: absolute;
		top: 0;
		bottom: 0;
		width: 10%;
		z-index: 1000;
	}
	.shadow.left {
		left: 0;
		background: linear-gradient(
			to right,
			var(--shadow-start),
			var(--shadow-curve),
			var(--shadow-end)
		);
	}
	.shadow.right {
		right: 0;
		background: linear-gradient(
			to left,
			var(--shadow-start),
			var(--shadow-curve),
			var(--shadow-end)
		);
	}
	.shadow:hover {
		--shadow-curve: 70%;
	}

	.carousel-container {
		width: 100%;
		height: 40%;
		display: flex;
		flex-direction: row;
		position: relative;
	}

	.carousel-item {
		width: fit-content;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		bottom: 0;
		background: #161616;
		transition: left 0.5s ease-in-out;
		border-radius: 10px;
		overflow: hidden;
	}

	.carousel-item:hover {
		/* transition: transform 0.1s ease-in-out !important;
		transform: scale(1.02) !important; */
	}

	.info-container {
		flex: 1;
		width: fit-content;
		background-color: transparent;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
		transition: height 0.5s linear;
		overflow: hidden;
		/* max-width: 50%; */
	}
	.info-window {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		/* background-color: blue; */
		border-radius: 10px;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		padding: 0;
	}

	.info-gutter-outer {
		width: 100%;
		height: 100%;
		padding: 5px;
		padding-top: 4px;
		padding-bottom: 0;
		border-radius: 24px;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		background: #202020;
		border: 2px solid black;
		border-bottom: 0;
		overflow: hidden;
		/* outline: 1px solid black; */
	}

	.info-gutter-inner {
		/* margin: 3px; */
		width: 100%;
		height: 100%;
		border-radius: 18px;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		background: #161616;
		border: 2px solid black;
		border-bottom: none;
		overflow: hidden;
		position: relative;
	}

	.info {
		height: fit-content;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		position: absolute;
		overflow-y: auto;

		padding: 1rem;
	}
</style>
