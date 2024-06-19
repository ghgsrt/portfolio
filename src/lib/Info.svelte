<script lang="ts">
	import type { InfoItem } from './Test.svelte';
	import { shuffleArray } from './utils';

	export let item: InfoItem;
</script>

<h3>{item?.name}</h3>
<hr />
<small>
	{`https://${item?.url}`}
</small>
<p>> blah</p>
<p style:color={item?.color}>> blah</p>
<p>> blah</p>
<br />
<p>
	{shuffleArray(item?.description.split(' ') ?? []).join(' ') +
		(Math.random() > 0.5 ? item?.description : '')}
</p>

<style>
	p {
		margin-top: 0.5rem;
		align-self: start;
	}
</style>
