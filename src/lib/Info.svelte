<script context="module" lang="ts">
	export type InfoItem = {
		name: string;
		url: string;
		github: string;
		color: string;
		started: string;
		status: string;
		stack: Array<string>;
		short: string;
		completed: string;
		todo: string;
	};
</script>

<script lang="ts">
	import { colors } from './data/siteInfo';
	import { shuffleArray } from './utils';

	export let item: InfoItem;
</script>

<div>
	<h3>{item?.name}</h3>
	<hr />
	<small>
		<a href={`https://${item?.url}`} target="_blank" rel="noopener noreferrer">
			{`https://${item?.url}`}
		</a>
	</small>
	<button
		class="github"
		on:click={() => {
			window.open(`https://github.com/ghgsrt/${item?.github}`, '_blank');
		}}
	/>
</div>
<span><strong>> started: </strong>{item?.started}</span>
<span><strong>> status: </strong>{item?.status}</span>
<span
><strong>> stack: </strong>{
	item?.stack
	}</span>
	<!-- // (item?.stack).map((entry) => { -->
	<!-- // 	if (entry in colors)
	// 		return `<span style:color={${colors[entry]}}>${entry}</span>`;
	// 	else entry;
	// }) -->
<br />
<span>{item?.short}</span>
<br />
<h4>completed</h4>
<p>
	{item?.completed}
	<!-- {shuffleArray(item?.description.split(' ') ?? []).join(' ') +
		(Math.random() > 0.5 ? item?.description : '')} -->
</p>
<br />
<h4>todo</h4>
<p>
	{item?.todo}
</p>

<style>
	span {
		align-self: start;
		text-align: left;
	}

	p {
		margin-top: 0.5rem;
		align-self: start;
		text-align: left;
		font-size: 0.8rem;
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

	button {
		
	}

	.github a {
		pointer-events: all;
		min-width: var(--dims);
		min-height: var(--dims);
	}
</style>
