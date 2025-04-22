<script lang="ts">
	import { mergeProps } from "@zag-js/svelte";
	import { getTabsContext } from "./Tabs.svelte";
	import type { TabsContentProps } from "./types.js";

	const { api } = getTabsContext();

	let { children, value, ref = $bindable(null), ...rest }: TabsContentProps = $props();
</script>

<div bind:this={ref} {...mergeProps(api().getContentProps({ value }), rest)}>
	{@render children()}
</div>
