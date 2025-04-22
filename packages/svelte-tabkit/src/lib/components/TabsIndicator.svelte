<script lang="ts">
	import { mergeProps } from "@zag-js/svelte";
	import { getTabsContext } from "./Tabs.svelte";
	import type { TabsIndicatorProps } from "./types.js";

	const { api } = getTabsContext();

	let { children, ref = $bindable(null), ...rest }: TabsIndicatorProps = $props();
</script>

<div bind:this={ref} {...mergeProps(api().getIndicatorProps(), rest)}>
	{@render children()}
</div>
