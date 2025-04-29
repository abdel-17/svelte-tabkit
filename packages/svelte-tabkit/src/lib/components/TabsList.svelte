<script lang="ts" module>
	import { mergeProps } from "@zag-js/svelte";
	import { DEV } from "esm-env";
	import { getContext, hasContext, setContext } from "svelte";
	import { getTabsContext } from "./Tabs.svelte";
	import { useListDropMonitor } from "./state.svelte.js";
	import type { TabsListProps } from "./types.js";

	export type TabsListContext = {
		listRef: () => HTMLElement | null;
	};

	const CONTEXT_KEY = Symbol("TabsList");

	export function getTabsListContext(): TabsListContext {
		if (DEV && !hasContext(CONTEXT_KEY)) {
			throw new Error("No parent <Tabs> found");
		}

		return getContext(CONTEXT_KEY);
	}
</script>

<script lang="ts">
	const { api, onSwapTabs } = getTabsContext();

	let { children, ref = $bindable(null), ...rest }: TabsListProps = $props();

	const context: TabsListContext = {
		listRef: () => ref,
	};
	setContext(CONTEXT_KEY, context);

	const listProps = $derived(api().getListProps());

	useListDropMonitor({
		ref: () => ref,
		onSwapTabs,
	});
</script>

<div {...mergeProps(listProps, rest)} bind:this={ref}>
	{@render children()}
</div>
