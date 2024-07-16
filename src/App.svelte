<script lang="ts">
	import Scrollbar from './lib/Scrollbar.svelte';
	import Test from './lib/Test.svelte';

	let main: HTMLElement;
	let innerWidth: number;
</script>

<svelte:window bind:innerWidth />

<main bind:this={main}>
	<Scrollbar parent={main} arcTop={40} arcBottom={innerWidth < 660 ? 0 : 40} />
	<section>
		<button
			class="github"
			on:click={() => {
				window.open(`https://github.com/ghgsrt/portfolio`, '_blank');
			}}
		/>
		<div class="wrapper">
			<div class="header">
				<h3>Alex Bosco's</h3>
				<h1>Project Purgatory</h1>
			</div>
			<p>
				A brief showcase of the projects that made it past the concept stage,
				yet were inevitably cast aside for more interesting endeavors
			</p>
		</div>
		<small style:color="var(--color-accent-sys)"
			>* this showcase is neither exhaustive nor representative of all the code
			I have written over the last 4-7 years; it is merely the most presentable</small
		>
		<button
			class="indicator"
			on:click={() => {
				console.log('scrolling');
				main.scrollBy({ top: main.offsetHeight, behavior: 'smooth' });
			}}>V</button
		>
	</section>
	<section>
		<Test />
	</section>
</main>

<style>
	svg {
		position: absolute;
		top: 0;
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

	main {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		overflow-x: hidden;
		scroll-behavior: smooth !important;
	}

	section {
		height: 100%;
		min-height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		/* padding: 2rem; */
	}

	.wrapper {
		/* height: 88%; */
		flex: 1;
		/* margin: -3rem; */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.wrapper > * {
		margin-bottom: 2rem;
	}

	p,
	small {
		padding: 0 1rem;
	}

	.indicator {
		pointer-events: auto;
		--dim: 3.5rem;
		width: var(--dim);
		height: var(--dim);
		font-size: 2rem;
		padding: 0.75rem;
		text-align: center;
		/* margin: 0.75rem 0; */
		border-radius: 50%;
		opacity: 0.3;
		outline: 1px solid #242424;
		-webkit-text-stroke: 1px #303030;
		transition:
			opacity 0.5s ease-in-out,
			outline 0.05s ease-in-out;
		position: relative;
		animation: blink 2s infinite;
		cursor: pointer;
		margin: 0.75rem 0;
	}
	.indicator::after {
		content: 'V';
		position: absolute;
		top: 30%;
		left: 32%;
	}
	.indicator:hover {
		opacity: 1;
		animation: none;
		outline: 3px ridge #909090;
	}

	@keyframes blink {
		0% {
			opacity: 0.2;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0.2;
		}
	}

	.github {
		--dims: 2rem;
		position: absolute;
		right: 0;
		top: 0;
		margin: 2rem 3rem;
		width: var(--dims);
		height: var(--dims);
		cursor: pointer;
		opacity: 0.5;
		/* border-radius: 50%; */
		/* background-color: #909090; */
		background: url('/github.webp') no-repeat center;
		background-size: contain;
		border: none;
	}
	.github:hover {
		opacity: 1;
	}
</style>
