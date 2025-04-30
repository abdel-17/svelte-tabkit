<script lang="ts" module>
	import { isControlOrMeta } from "$lib/internal/helpers.js";
	import {
		draggable,
		dropTargetForElements,
	} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
	import { mergeProps } from "@zag-js/svelte";
	import { DEV } from "esm-env";
	import { getContext, hasContext, setContext, tick } from "svelte";
	import type { EventHandler } from "svelte/elements";
	import { getTabsContext } from "./Tabs.svelte";
	import { getTabsListContext } from "./TabsList.svelte";
	import type { TabsTriggerProps, TabsTriggerState } from "./types.js";

	export type TabsTriggerContext = {
		ref: () => HTMLElement | null;
		close: () => void;
	};

	const CONTEXT_KEY = Symbol("TabsTrigger");

	export function getTabsTriggerContext(): TabsTriggerContext {
		if (DEV && !hasContext(CONTEXT_KEY)) {
			throw new Error("No parent <TabsTrigger> found");
		}

		return getContext(CONTEXT_KEY);
	}

	class TabsTriggerStateImpl implements TabsTriggerState {
		dragged = $state.raw(false);
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

	function close(): void {
		const triggers = tabsList.getTriggers();
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
		ref: () => ref,
		close,
	};
	setContext(CONTEXT_KEY, context);

	const triggerProps = $derived(tabs.api().getTriggerProps({ value, disabled }));

	const triggerState = new TabsTriggerStateImpl();

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
			case "ArrowLeft":
			case "ArrowUp": {
				if (event.key === "ArrowLeft" && tabs.orientation() !== "horizontal") {
					return;
				}

				if (event.key === "ArrowUp" && tabs.orientation() !== "vertical") {
					return;
				}

				if (!event.shiftKey || !isControlOrMeta(event)) {
					return;
				}

				const triggers = tabsList.getTriggers();
				const index = triggers.indexOf(ref!);
				if (index === -1) {
					return;
				}

				if (index === 0) {
					if (!tabs.loopFocus()) {
						return;
					}

					tabs.onSwapTabs(index, triggers.length - 1);
				} else {
					tabs.onSwapTabs(index, index - 1);
				}

				tick().then(() => ref?.focus());
				break;
			}
			case "ArrowRight":
			case "ArrowDown": {
				if (event.key === "ArrowRight" && tabs.orientation() !== "horizontal") {
					return;
				}

				if (event.key === "ArrowDown" && tabs.orientation() !== "vertical") {
					return;
				}

				if (!event.shiftKey || !isControlOrMeta(event)) {
					return;
				}

				const triggers = tabsList.getTriggers();
				const index = triggers.indexOf(ref!);
				if (index === -1) {
					return;
				}

				if (index === triggers.length - 1) {
					if (!tabs.loopFocus()) {
						return;
					}

					tabs.onSwapTabs(index, 0);
				} else {
					tabs.onSwapTabs(index, index + 1);
				}

				tick().then(() => ref?.focus());
				break;
			}
			case "F2": {
				const triggers = tabsList.getTriggers();
				const index = triggers.indexOf(ref!);
				if (index === -1) {
					return;
				}

				tabs.onRenameTab(index);
				break;
			}
			default: {
				return;
			}
		}

		event.preventDefault();
	};

	const ondblclick: EventHandler<MouseEvent, HTMLDivElement> = (event) => {
		const triggers = tabsList.getTriggers();
		const index = triggers.indexOf(ref!);
		if (index === -1) {
			return;
		}

		event.preventDefault();
		tabs.onRenameTab(index);
	};

	$effect(() => {
		return draggable({
			element: ref!,
			canDrag: () => !disabled,
			onDragStart: () => {
				triggerState.dragged = true;
			},
			onDrop: ({ source }) => {
				triggerState.dragged = false;
				source.element.focus();
			},
		});
	});

	$effect(() => {
		return dropTargetForElements({
			element: ref!,
			onDragEnter: (payload) => {
				const location = payload.location.current;
				if (location.dropTargets.length === 0) {
					return;
				}

				const source = payload.source;
				const target = location.dropTargets[0];

				const triggers = tabsList.getTriggers();
				const startIndex = triggers.indexOf(source.element);
				const targetIndex = triggers.indexOf(target.element);
				if (startIndex === -1 || targetIndex === -1 || startIndex === targetIndex) {
					return;
				}

				if (startIndex < targetIndex) {
					//  s       t
					// [1] [2] [3]
					// [2] [1] [3]
					// [2] [3] [1]
					for (let i = startIndex; i < targetIndex; i++) {
						tabs.onSwapTabs(i, i + 1);
					}
				} else {
					//  t       s
					// [3] [2] [1]
					// [3] [1] [2]
					// [1] [3] [2]
					for (let i = startIndex; i > targetIndex; i--) {
						tabs.onSwapTabs(i, i - 1);
					}
				}
			},
		});
	});
</script>

<div
	{...mergeProps(triggerProps, rest, {
		class: className,
		style,
		onkeydown,
		ondblclick,
	})}
	bind:this={ref}
>
	{@render children(triggerState)}
</div>
