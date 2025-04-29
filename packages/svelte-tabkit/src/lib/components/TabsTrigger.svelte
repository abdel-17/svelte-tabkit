<script lang="ts">
	import { mergeProps } from "@zag-js/svelte";
	import { getTabsContext } from "./Tabs.svelte";
	import { getTabsListContext } from "./TabsList.svelte";
	import { createTriggerState } from "./state.svelte.js";
	import type { TabsTriggerProps } from "./types.js";

	const { listRef } = getTabsListContext();
	const { api, onSwapTabs } = getTabsContext();

	let {
		children,
		value,
		disabled = false,
		ref = $bindable(null),
		class: classNameProp,
		style: styleProp,
		...rest
	}: TabsTriggerProps = $props();

	const triggerState = createTriggerState({
		disabled: () => disabled,
		ref: () => ref,
		listRef,
		onSwapTabs,
	});

	const triggerProps = $derived(api().getTriggerProps({ value, disabled }));

	const className = $derived(
		typeof classNameProp === "function" ? classNameProp(triggerState) : classNameProp,
	);

	const style = $derived(typeof styleProp === "function" ? styleProp(triggerState) : styleProp);
</script>

<div
	{...mergeProps(triggerProps, rest, {
		class: className,
		style,
	})}
	bind:this={ref}
>
	{@render children(triggerState)}
</div>
