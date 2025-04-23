<script lang="ts" generics="TTab extends TabsListTab = TabsListTab">
	import { mergeProps } from "@zag-js/svelte";
	import { dndzone } from "svelte-dnd-action";
	import { flip } from "svelte/animate";
	import { getTabsContext } from "./Tabs.svelte";
	import type { TabsListProps, TabsListTab } from "./types.js";

	const { api } = getTabsContext();

	let {
		tab,
		tabs = $bindable(),
		onTabsChange,
		flipDuration = 200,
		ref = $bindable(null),
		...rest
	}: TabsListProps<TTab> = $props();

	function setTabs(value: Array<TTab>) {
		tabs = value;
		onTabsChange?.(tabs);
	}
</script>

<div
	{...mergeProps(api().getListProps(), rest)}
	bind:this={ref}
	use:dndzone={{
		items: tabs,
		flipDurationMs: flipDuration,
	}}
	onconsider={(event) => setTabs(event.detail.items)}
	onfinalize={(event) => setTabs(event.detail.items)}
>
	{#each tabs as t (t.id)}
		<button
			{...mergeProps(
				api().getTriggerProps({
					value: t.id,
					disabled: t.disabled,
				}),
				rest,
			)}
			animate:flip={{ duration: flipDuration }}
		>
			{@render tab({ tab: t })}
		</button>
	{/each}
</div>
