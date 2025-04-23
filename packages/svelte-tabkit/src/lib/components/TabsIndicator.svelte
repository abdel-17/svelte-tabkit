<script lang="ts">
	import { mergeProps } from "@zag-js/svelte";
	import { getTabsContext } from "./Tabs.svelte";
	import type { TabsIndicatorProps } from "./types.js";

	const { api } = getTabsContext();

	let { ref = $bindable(null), ...rest }: TabsIndicatorProps = $props();
</script>

<div {...mergeProps(api().getIndicatorProps(), rest)} bind:this={ref}></div>
