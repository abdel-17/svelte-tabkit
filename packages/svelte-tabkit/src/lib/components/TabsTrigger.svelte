<script lang="ts">
	import { mergeProps } from "@zag-js/svelte";
	import { getTabsContext } from "./Tabs.svelte";
	import type { TabsTriggerProps } from "./types.js";

	const { api } = getTabsContext();

	let {
		children,
		value,
		disabled = false,
		ref = $bindable(null),
		...rest
	}: TabsTriggerProps = $props();
</script>

<button bind:this={ref} {...mergeProps(api().getTriggerProps({ value, disabled }), rest)}>
	{@render children()}
</button>
