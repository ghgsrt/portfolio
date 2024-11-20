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
	import Scrollbar from './Scrollbar.svelte';

	let infoWindow: HTMLElement;
	let info: HTMLElement[] = [];
	let infoHeights: number[] = []; // "let" to be reactive
	let infoContainerWidth: number;
	let infoContainerHeight: number;
	$: infoTopOffset = Math.floor(infoContainerHeight / 15);

	const visibleItems = 1.5;
	const itemSpacing = 30; // px

	let carouselIdx = 0;

	let carouselHeight: number;
	let carouselWidth: number;
	let itemWidth: number;
	let itemHeight: number;

	const initialMap = Array(items.length).fill([]);
	let relPosMap: number[][] = initialMap;
	let leftMap: number[][] = initialMap;
	let topMap: number[][] = initialMap;

	const computeMapsAndSizing = () => {
		itemHeight = carouselHeight * 0.95;
		let _itemWidth = (itemHeight * 16) / 9;
		itemWidth =
			window.innerWidth < _itemWidth ? window.innerWidth * 0.95 : _itemWidth;

		console.log('HUH', carouselWidth, carouselHeight, itemWidth, itemHeight);
		relPosMap = Array.from({ length: items.length }, (_, i) =>
			Array.from({ length: items.length }, (_, j) => {
				const relPos = mod(i - j, items.length);
				return relPos <= items.length / 2 ? relPos : relPos - items.length;
			})
		);
		leftMap = Array.from({ length: items.length }, (_, i) =>
			Array.from({ length: items.length }, (_, j) => {
				const relPos = relPosMap[i][j];
				return (
					(carouselWidth - itemWidth) / 2 +
					relPos * itemWidth +
					Math.sign(relPos) * itemSpacing
				);
			})
		);
		topMap = Array.from({ length: items.length }, (_, i) =>
			Array.from({ length: items.length }, (_, j) => {
				const relPos = relPosMap[i][j];
				if (relPos === 0) return 0;

				const sign = Math.sign(relPos);
				const start = (sign === 1 ? i - relPos : i) + 1;
				const end = (sign === 1 ? i : i - relPos) + 1;

				let height = 0;
				for (let j = start; j < end; j++) height += infoContainerHeight;

				return -sign * height;
			})
		);

		console.log('Bro?', relPosMap, leftMap, topMap);
	};

	const pathLength = 1000;
	const pathInc = -8;
	const strokeWidth = 3;

	const pathGenerators: CreatePath[][] = [[], []];

	let activePath: Array<keyof ReturnType<typeof getDs>> = ['dRight', 'dLeft'];
	let pathChanged = false;

	const Mify = (d: string) => d.replace('L', 'M');
	const toggleL = (s: string) =>
		s
			.split(' ')
			.reverse()
			.map((_s) => (_s[0] === 'L' ? _s.slice(1) : `L${_s}`))
			.join(' ');

	const getDs = (width: number, height: number, strokeWidth: number) => {
		const startHeight = infoTopOffset;

		const midWidth = width / 2;
		const left = strokeWidth / 2;
		const right = width - strokeWidth / 2;
		const bottom = height - strokeWidth / 2;

		const arc = 20;

		const _arc = `A${arc},${arc} 0 0 1`;
		const _start = `L${midWidth},0`;
		const _endpoint = `L${midWidth},${startHeight}`;

		let _dLeft = `L${left + arc},${startHeight} A${arc},${arc} 0 0 0 ${left},${
			startHeight + arc
		} L${left},${bottom}`;

		let _dRight = `L${right - arc},${startHeight} ${_arc} ${right},${
			startHeight + arc
		} L${right},${bottom}`;

		let _dRightClear = _dRight
			.split(` ${_arc} `)
			.map(toggleL)
			.reverse()
			.join(` ${_arc} `.replace('1', '0'));
		let _dLeftClear = _dLeft
			.split(` A${arc},${arc} 0 0 0 `)
			.map(toggleL)
			.reverse()
			.join(` ${_arc} `);

		_dRight = `${_endpoint} ${_dRight}`;
		_dLeft = `${_endpoint} ${_dLeft}`;
		return {
			dRight: `${Mify(_start)} ${_dRight}`,
			dLeft: `${Mify(_start)} ${_dLeft}`,
			dRightClear: `M${_dRightClear} ${_endpoint} ${_start}`,
			dLeftClear: `M${_dLeftClear} ${_endpoint} ${_start}`,
		};
	};

	$: Ds = Array.from({ length: items.length }, (_, i) =>
		getDs(infoContainerWidth, infoContainerHeight ?? 0, strokeWidth)
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
					prevPath[0]?.__clear();
					prevPath[1]?.__clear();
				}
			}

			const path0 = pathGenerators[0][carouselIdx]?.();
			const path1 = pathGenerators[1][carouselIdx]?.();
			if (path0) {
				waitingToPlay.set(
					path0,
					setTimeout(() => {
						path0.__play();
						path1.__play();
						waitingToPlay.delete(path0);
					}, transTime)
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

		setTimeout(shiftIdx(0), 50);
	};

	onMount(() => {
		resetCarousel();
		console.log('onmount', 0);
		computeMapsAndSizing();
		console.log('onmount', 1);
	});

	let blockTransitions = false;
</script>

<svelte:window
	on:resize={() => {
		blockTransitions = true;
		setTimeout(() => {
			resetCarousel();
			console.log('onresize', 0);
			computeMapsAndSizing();
			console.log('onresize', 1);

			setTimeout(() => (blockTransitions = false), 7);
		}, 10);
	}}
/>

<section>
	<div
		class="carousel-container"
		bind:offsetHeight={carouselHeight}
		bind:offsetWidth={carouselWidth}
	>
		<div class="button-wrapper">
			<button class="button left" on:click={decrement}></button>
			<button class="button right" on:click={increment}></button>
		</div>
		{#each items as item, i (i)}
			<div
				data-idx={i}
				data-color={item.color}
				class="carousel-item"
				style:height={`${itemHeight}px`}
				style:width={`${itemWidth}px`}
				style:border={`${!blockTransitions && relPosMap[i][carouselIdx] === 0 ? `2px solid ${item.color}` : '1px solid black'}`}
				style:left={`${leftMap[i][carouselIdx]}px`}
				style:transform={`scale(${
					(items.length - Math.abs(relPosMap[i][carouselIdx])) / items.length
				})`}
				style:transition={`border ${transTime}ms ease-out, box-shadow ${transTime}ms ease-out, ${
					!blockTransitions &&
					Math.abs(relPosMap[i][carouselIdx]) < visibleItems + 2
						? `left ${transTime}ms ease-out, transform ${transTime}ms ease-out`
						: `left 0ms linear`
				}`}
				style:z-index={items.length - Math.abs(relPosMap[i][carouselIdx])}
			>
				{#if items[i]?.url}
					{#each items[i].url as url}
						<iframe
							title={items[i]?.short}
							src="https://{url}"
							allowfullscreen
							height="100%"
							width="{100 / items[i].url.length}%"
							loading="lazy"
							sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads"
						></iframe>
					{/each}
				{:else if items[i]?.svgFallback}
					<svelte:component this={items[i]?.svgFallback} class="svg-fallback" />
				{:else if items[i]?.github}
					<a
						class="github"
						href={items[i]?.github.slice(0, 5) === 'https'
							? items[i].github
							: `https://github.com/ghgsrt/${items[i]?.github}`}
						target="_blank"
						rel="noopener noreferrer">{''}</a
					>
				{/if}
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
		<div
			bind:this={infoWindow}
			class="info-window"
			style:margin-top={`${infoTopOffset + 1}px`}
			style:transition={!blockTransitions
				? `max-height ${transTime * 0.85}ms ease-in-out`
				: 'none'}
			style:padding={'0px 0'}
		>
			<div
				style:height={'100%'}
				style:z-index={2000}
				style:border-radius={'20px 20px 0 0'}
			>
				<Scrollbar parent={info[carouselIdx]} arcTop={20} />
			</div>

			{#each items as item, i (i)}
				<div
					class="info"
					bind:this={info[i]}
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
</section>

<style>
	:global(.no-transition) {
		-webkit-transition: none !important;
		-moz-transition: none !important;
		-o-transition: none !important;
		transition: none !important;
	}

	iframe {
		object-fit: fill;
	}

	section {
		width: 100%;
		height: 100%;
		padding-top: 1.25rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
	}

	section > * {
		user-select: none;
	}

	.button-wrapper {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 2rem;
		z-index: 1000;
		pointer-events: none;
	}
	.button {
		pointer-events: auto;
		--dim: 3.5rem;
		width: var(--dim);
		height: var(--dim);
		font-size: 2.5rem;
		padding: 0.75rem;
		text-align: center;
		border-radius: 50% !important;
		opacity: 0.3;
		outline: 1px solid #242424;
		-webkit-text-stroke: 1px #303030;
		transition:
			opacity 0.1s ease-in-out,
			outline 0.05s ease-in-out;
		position: relative;
	}
	.button:hover {
		opacity: 1;
		/* outline: 3px ridge #909090; */
	}
	.button.left {
		left: 0;
	}
	.button.left::after {
		content: '<';
		position: absolute;
		top: 23%;
		left: 23%;
	}
	.button.right {
		right: 0;
	}
	.button.right::after {
		content: '>';
		position: absolute;
		top: 23%;
		right: 23%;
	}

	.carousel-container {
		width: 100%;
		height: 50%;
		display: flex;
		flex-direction: row;
		position: relative;
	}

	.carousel-item {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		bottom: 0;
		background: #161616;
		border-radius: 10px;
		overflow: hidden;
	}

	.info-container {
		flex: 1;
		width: fit-content;
		max-width: 700px;
		background-color: transparent;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
		transition: height 0.5s linear;
		overflow: hidden;
		padding-bottom: 0;
	}
	.info-window {
		position: relative;
		width: calc(100% - 6px);
		height: 100%;
		overflow: hidden;
		border-radius: 20px;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		padding: 0;
		/* margin: 0 2px; */
		/* margin-top: 1px; */
		background: #161616;
		z-index: 2000;
	}

	.info {
		height: fit-content;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		position: absolute;
		overflow-y: auto;
		width: 100%;
		padding: 1rem;
	}

	.github {
		--dims: 10rem;
		--pos: calc(50% - var(--dims) / 2);
		width: var(--dims);
		height: var(--dims);
		cursor: pointer;
		opacity: 0.5;
		background: url('/github.webp') no-repeat center;
		background-size: contain;
		border: none;
		align-self: start;
		position: absolute;
		top: var(--pos);
		left: var(--pos);
	}
	.github:hover {
		opacity: 1;
	}
</style>
