<script lang="ts">
	import { mergeProps } from "@zag-js/svelte";
	import { getTabsContext } from "./Tabs.svelte";
	import type { TabsListProps } from "./types.js";

	const { api } = getTabsContext();

	let { children, ref = $bindable(null), ...rest }: TabsListProps = $props();
</script>

<div {...mergeProps(api().getListProps(), rest)} bind:this={ref}>
	{@render children()}
</div>
