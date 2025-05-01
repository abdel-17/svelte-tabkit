<script lang="ts">
	import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
	import { mergeProps } from "@zag-js/svelte";
	import { getTabsContext } from "./Tabs.svelte";
	import { TriggerDragData } from "./state.svelte.js";
	import type { TabsListProps, TabsTab } from "./types.js";

	const tabsContext = getTabsContext();

	let { children, ref = $bindable(null), ...rest }: TabsListProps = $props();

	const listProps = $derived(tabsContext.api().getListProps());

	$effect(() => {
		return dropTargetForElements({
			element: ref!,
			onDragLeave: ({ source }) => {
				if (source.data instanceof TriggerDragData) {
					tabsContext.onDragLeaveList();
				}
			},
		});
	});
</script>

<div {...mergeProps(listProps, rest)} bind:this={ref} class={rest.class}>
	{@render children()}
</div>
