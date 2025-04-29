<script lang="ts" module>
	import { mergeProps, normalizeProps, useMachine } from "@zag-js/svelte";
	import * as tabs from "@zag-js/tabs";
	import { DEV } from "esm-env";
	import { getContext, hasContext, setContext } from "svelte";
	import type { TabsProps } from "./types.js";

	export type TabsContext = {
		api: () => tabs.Api;
		onSwapTabs: (i: number, j: number) => void;
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
		value = $bindable(),
		onValueChange,
		onFocusChange,
		onSwapTabs,
		loopFocus = true,
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
		value,
		onValueChange: (details) => {
			value = details.value;
			onValueChange?.(value);
		},
		onFocusChange: (details) => onFocusChange?.(details.focusedValue),
		orientation,
		activationMode,
		dir,
	}));
	const api = $derived(tabs.connect(service, normalizeProps));

	const context: TabsContext = {
		api: () => api,
		onSwapTabs: (i, j) => onSwapTabs?.(i, j),
	};
	setContext(CONTEXT_KEY, context);

	const rootProps = $derived(api.getRootProps());
</script>

<div {...mergeProps(rootProps, rest)} bind:this={ref}>
	{@render children()}
</div>
