<script lang="ts">
	import { mergeProps } from "@zag-js/svelte";
	import { getTabsContext } from "./Tabs.svelte";
	import type { TabsContentProps } from "./types.js";

	const { api } = getTabsContext();

	let { children, tabId, ref = $bindable(null), ...rest }: TabsContentProps = $props();
</script>

<div {...mergeProps(api().getContentProps({ value: tabId }), rest)} bind:this={ref}>
	{@render children()}
</div>
