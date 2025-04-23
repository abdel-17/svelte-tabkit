<script lang="ts" module>
	import * as tabs from "@zag-js/tabs";
	import { mergeProps, normalizeProps, useMachine } from "@zag-js/svelte";
	import { DEV } from "esm-env";
	import { getContext, hasContext, setContext } from "svelte";
	import type { TabsProps } from "./types.js";

	export type TabsContext = {
		api: () => tabs.Api;
	};

	const CONTEXT_KEY = Symbol("Tabs");

	export function getTabsContext(): TabsContext {
		if (DEV && !hasContext(CONTEXT_KEY)) {
			throw new Error("No parent <Tabs> found");
		}

		return getContext(CONTEXT_KEY);
	}
</script>

<script lang="ts">
	let {
		children,
		loopFocus = true,
		selected = $bindable(),
		onSelectedChange,
		onFocusChange,
		orientation = "horizontal",
		activationMode = "automatic",
		dir = "ltr",
		ref = $bindable(null),
		...rest
	}: TabsProps = $props();

	const id = $props.id();
	const service = useMachine(tabs.machine, () => ({
		id,
		loopFocus,
		value: selected,
		onValueChange: (details) => {
			selected = details.value;
			onSelectedChange?.(selected);
		},
		onFocusChange: (details) => onFocusChange?.(details.focusedValue),
		orientation,
		activationMode,
		dir,
	}));
	const api = $derived(tabs.connect(service, normalizeProps));

	const context: TabsContext = {
		api: () => api,
	};
	setContext(CONTEXT_KEY, context);
</script>

<div {...mergeProps(api.getRootProps(), rest)} bind:this={ref}>
	{@render children()}
</div>
