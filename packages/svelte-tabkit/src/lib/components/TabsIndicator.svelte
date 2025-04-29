<script lang="ts">
	import { mergeProps } from "@zag-js/svelte";
	import { getTabsContext } from "./Tabs.svelte";
	import type { TabsIndicatorProps } from "./types.js";

	const tabs = getTabsContext();

	let { ref = $bindable(null), ...rest }: TabsIndicatorProps = $props();

	const indicatorProps = $derived(tabs.api().getIndicatorProps());
</script>

<div {...mergeProps(indicatorProps, rest)} bind:this={ref}></div>
