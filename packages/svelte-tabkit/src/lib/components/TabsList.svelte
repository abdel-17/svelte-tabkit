<script lang="ts" module>
	import { mergeProps } from "@zag-js/svelte";
	import { DEV } from "esm-env";
	import { getContext, hasContext, setContext } from "svelte";
	import { getTabsContext } from "./Tabs.svelte";
	import type { TabsListProps } from "./types.js";

	export type TabsListContext = {
		getTriggers: () => Array<Element>;
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
		getTriggers: () => Array.from(ref!.querySelectorAll("[data-part='trigger']")),
	};
	setContext(CONTEXT_KEY, context);

	const listProps = $derived(tabs.api().getListProps());
</script>

<div {...mergeProps(listProps, rest)} bind:this={ref}>
	{@render children()}
</div>
