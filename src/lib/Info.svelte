<script context="module" lang="ts">
	export type InfoItem = {
		name: string;
		url: string;
		github: string;
		color: string;
		started: string;
		status: string;
		dependencies: Array<string>;
		short: string;
		completed: string;
		todo: string;
	};
</script>

<script lang="ts">
	export let item: InfoItem;
</script>

<div class="header">
	<div class="spacer"></div>
	<h3>
		{#if item?.url}
			<a
				href={item?.url.slice(5) === 'https'
					? item.url
					: `https://${item?.url}`}
				target="_blank"
				rel="noopener noreferrer"
			>
				{item?.name}
			</a>
		{:else}
			{item?.name}
		{/if}
	</h3>
	{#if item?.github}
		<a
			class="github"
			href={item?.github.slice(0, 5) === 'https'
				? item.github
				: `https://github.com/ghgsrt/${item?.github}`}
			target="_blank"
			rel="noopener noreferrer">{''}</a
		>
	{:else}
		<div class="spacer"></div>
	{/if}
</div>
<span><strong>> started: </strong>{item?.started}</span>
<span><strong>> status: </strong>{item?.status}</span>
<span><strong>> dependencies: </strong>{item?.dependencies.join(', ')}</span>
<br />
<span>{item?.short}</span>
{#if item?.completed}
	<br />
	<h4>completed</h4>
	<p>{@html item?.completed}</p>
{/if}
{#if item?.todo}
	<br />
	<h4>todo</h4>
	<p>
		{item?.todo}
	</p>
{/if}

<style>
	a,
	a:visited {
		color: inherit;
	}
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
	.header {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	/* .github {
		--dims: 2rem;
		position: absolute;
		right: 0;
		top: 0;
		margin: 2rem 3rem;
		width: var(--dims);
		height: var(--dims);
		cursor: pointer;
		opacity: 0.5;
		background: url('/github.webp') no-repeat center;
		background-size: contain;
		border: none;
	} */
	.github,
	.spacer {
		width: 2rem;
		height: 2rem;
	}

	.github {
		cursor: pointer;
		opacity: 0.5;
		background: url('/github.webp') no-repeat center;
		background-size: contain;
		border: none;
		align-self: start;
	}
	.github:hover {
		opacity: 1;
	}
</style>
