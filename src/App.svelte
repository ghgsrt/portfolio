<script lang="ts">
	import Scrollbar from './lib/Scrollbar.svelte';
	import Index from './lib/Index.svelte';

	let main: HTMLElement;
	let innerWidth: number;

	const IS_IOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
	if (IS_IOS) {
		const element = document.querySelector('meta[name=viewport]')!;
		let content = element.getAttribute('content');

		element.setAttribute('content', content + ', maximum-scale=1.0');
	}
</script>

<svelte:window bind:innerWidth />

<Scrollbar parent={main} arcTop={40} arcBottom={innerWidth < 660 ? 0 : 40} />
<main bind:this={main}>
	<section>
		<a
			class="resume"
			href="/Resume 2024.pdf"
			target="_blank"
			rel="noopener noreferrer"
			><span>
				{'resume'}
			</span>
		</a>
		<a
			class="github"
			href="https://github.com/ghgsrt/portfolio"
			target="_blank"
			rel="noopener noreferrer">{''}</a
		>
		<div class="wrapper">
			<div class="header">
				<h2>Alex Bosco's</h2>
				<h1>Project Portfolio</h1>
			</div>
			<p>
				A brief showcase of the projects that proved interesting enough to bear <em
					>some</em
				> fruit, as well as plans for the future
			</p>
		</div>
		<small style:color="var(--color-accent-sys)"
			>* this showcase is neither exhaustive nor representative of all the code
			I have written over the last 4-7 years; it is merely the most presentable</small
		>
		<button
			class="indicator"
			on:click={() => {
				main.scrollBy({ top: main.offsetHeight, behavior: 'smooth' });
			}}>V</button
		>
	</section>
	<section>
		<Index />
	</section>
</main>

<style>
	main {
		position: relative;
		width: 100%;
		max-width: 100%;
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
	}

	.wrapper {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.wrapper > * {
		margin-bottom: 2rem;
	}

	.header h1 {
		font-size: 3rem;
	}

	p,
	small {
		padding: 0 1rem;
	}
	p {
		font-size: 1.2rem;
	}

	.indicator {
		pointer-events: auto;
		--dim: 3.5rem;
		width: var(--dim);
		height: var(--dim);
		font-size: 2rem;
		padding: 0.75rem;
		text-align: center;
		border-radius: 50% !important;
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
		/* outline: 3px ridge #909090; */
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

	.github,
	.resume {
		--dims: 2rem;
		position: absolute;
		right: 0;
		top: 0;
		margin: 3rem 3rem;
		width: var(--dims);
		height: var(--dims);
		cursor: pointer;
		opacity: 0.5;
		background: url('/github.webp') no-repeat center;
		background-size: contain;
		border: none;
	}
	:is(.github, .resume):hover {
		opacity: 1;
	}
	.resume {
		right: unset;
		margin-top: 2.5rem;
		--dims: 3rem;
		left: 0;
		background: url('/icons8-resume-50.png') no-repeat center;
		filter: invert(100%);
		/* outline: 2px solid black; */
	}
	.resume span {
		position: absolute;
		left: 3.5rem;
		top: 0.6rem;
		color: black;
	}
</style>
