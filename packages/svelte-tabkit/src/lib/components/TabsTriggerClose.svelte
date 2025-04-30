<script lang="ts">
	import { mergeProps } from "@zag-js/svelte";
	import type { EventHandler } from "svelte/elements";
	import { getTabsTriggerContext } from "./TabsTrigger.svelte";
	import type { TabsTriggerCloseProps } from "./types.js";

	const tabsTrigger = getTabsTriggerContext();

	let { children, ref = $bindable(null), tabindex = -1, ...rest }: TabsTriggerCloseProps = $props();

	const onclick: EventHandler<MouseEvent, HTMLButtonElement> = (event) => {
		event.preventDefault();
		tabsTrigger.close();
	};
</script>

<button {...mergeProps(rest, { onclick })} bind:this={ref} {tabindex}>
	{@render children()}
</button>
