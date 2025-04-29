<script lang="ts">
	import { mergeProps } from "@zag-js/svelte";
	import { getTabsContext } from "./Tabs.svelte";
	import type { TabsContentProps } from "./types.js";

	const tabs = getTabsContext();

	let { children, value, ref = $bindable(null), ...rest }: TabsContentProps = $props();

	const contentProps = $derived(tabs.api().getContentProps({ value }));
</script>

<div {...mergeProps(contentProps, rest)} bind:this={ref}>
	{@render children()}
</div>
