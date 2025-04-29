<script lang="ts" module>
	import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
	import { mergeProps } from "@zag-js/svelte";
	import { DEV } from "esm-env";
	import { getContext, hasContext, setContext } from "svelte";
	import { getTabsContext } from "./Tabs.svelte";
	import { dropTrigger } from "./state.svelte.js";
	import type { TabsListProps } from "./types.js";

	export type TabsListContext = {
		ref: () => HTMLDivElement | null;
	};

	const CONTEXT_KEY = Symbol("TabsList");

	export function getTabsListContext(): TabsListContext {
		if (DEV && !hasContext(CONTEXT_KEY)) {
			throw new Error("No parent <TabsList> found");
		}

		return getContext(CONTEXT_KEY);
	}
</script>

<script lang="ts">
	const tabs = getTabsContext();

	let { children, ref = $bindable(null), ...rest }: TabsListProps = $props();

	const context: TabsListContext = {
		ref: () => ref,
	};
	setContext(CONTEXT_KEY, context);

	const listProps = $derived(tabs.api().getListProps());

	$effect(() => {
		return monitorForElements({
			onDrop: (payload) => dropTrigger(payload, ref!, tabs.onSwapTabs),
		});
	});
</script>

<div {...mergeProps(listProps, rest)} bind:this={ref}>
	{@render children()}
</div>
