<script lang="ts" module>
	import {
		draggable,
		dropTargetForElements,
	} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
	import { mergeProps } from "@zag-js/svelte";
	import { DEV } from "esm-env";
	import { getContext, hasContext, setContext } from "svelte";
	import type { EventHandler } from "svelte/elements";
	import { getTabsContext } from "./Tabs.svelte";
	import { getTabsListContext } from "./TabsList.svelte";
	import { dropTrigger, getTriggers, TriggerStateImpl } from "./state.svelte.js";
	import type { TabsTriggerProps } from "./types.js";

	export type TabsTriggerContext = {
		close: () => void;
	};

	const CONTEXT_KEY = Symbol("TabsTrigger");

	export function getTabsTriggerContext(): TabsTriggerContext {
		if (DEV && !hasContext(CONTEXT_KEY)) {
			throw new Error("No parent <TabsTrigger> found");
		}

		return getContext(CONTEXT_KEY);
	}
</script>

<script lang="ts">
	const tabsList = getTabsListContext();
	const tabs = getTabsContext();

	let {
		children,
		value,
		disabled = false,
		ref = $bindable(null),
		class: classNameProp,
		style: styleProp,
		...rest
	}: TabsTriggerProps = $props();

	function close() {
		const triggers = getTriggers(tabsList.ref()!);
		const index = triggers.indexOf(ref!);
		if (index === -1) {
			return;
		}

		if (tabs.value() === value) {
			if (index === triggers.length - 1) {
				tabs.api().selectPrev();
			} else {
				tabs.api().selectNext();
			}
		}

		tabs.onCloseTab(index);
	}

	const context: TabsTriggerContext = {
		close,
	};
	setContext(CONTEXT_KEY, context);

	const triggerProps = $derived(tabs.api().getTriggerProps({ value, disabled }));

	const triggerState = new TriggerStateImpl();

	const className = $derived(
		typeof classNameProp === "function" ? classNameProp(triggerState) : classNameProp,
	);

	const style = $derived(typeof styleProp === "function" ? styleProp(triggerState) : styleProp);

	const onkeydown: EventHandler<KeyboardEvent, HTMLDivElement> = (event) => {
		switch (event.key) {
			case "Delete": {
				close();
				break;
			}
			default: {
				return;
			}
		}

		event.preventDefault();
	};

	$effect(() => {
		return draggable({
			element: ref!,
			canDrag: () => !disabled,
			onDragStart: () => {
				triggerState.dragged = true;
			},
			onDrop: () => {
				triggerState.dragged = false;
			},
		});
	});

	$effect(() => {
		return dropTargetForElements({
			element: ref!,
			onDragEnter: (payload) => dropTrigger(payload, tabsList.ref()!, tabs.onSwapTabs),
		});
	});
</script>

<div
	{...mergeProps(triggerProps, rest, {
		class: className,
		style,
		onkeydown,
	})}
	bind:this={ref}
>
	{@render children(triggerState)}
</div>
