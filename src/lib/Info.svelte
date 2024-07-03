<script context="module" lang="ts">
	export type InfoItem = {
		name: string;
		url: string;
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
	import { shuffleArray } from './utils';

	export let item: InfoItem;
</script>

<h3>{item?.name}</h3>
<hr />
<small>
	<a href={`https://${item?.url}`} target="_blank" rel="noopener noreferrer">
		{`https://${item?.url}`}
	</a>
</small>
<span><strong>> started: </strong>{item?.started}</span>
<span><strong>> status: </strong>{item?.status}</span>
<span><strong>> stack: </strong>{item?.stack}</span>
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
</style>
