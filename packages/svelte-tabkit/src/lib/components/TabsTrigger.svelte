<script lang="ts">
	import { isControlOrMeta, noop } from "$lib/internal/helpers.js";
	import {
		draggable,
		dropTargetForElements,
	} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
	import { mergeProps } from "@zag-js/svelte";
	import { tick } from "svelte";
	import type { EventHandler } from "svelte/elements";
	import { getTabsContext } from "./Tabs.svelte";
	import { TriggerDragData } from "./state.svelte.js";
	import type { TabsTriggerProps } from "./types.js";

	const tabsContext = getTabsContext();

	let {
		children,
		value,
		disabled = false,
		onClose = noop,
		onRename = noop,
		onDragStart = noop,
		onDragEnd = noop,
		ref = $bindable(null),
		...rest
	}: TabsTriggerProps = $props();

	const triggerProps = $derived(tabsContext.api().getTriggerProps({ value, disabled }));

	/**
	 * Closes the current tab, unless `event.preventDefault()` is called
	 * in the `onClose` event handler.
	 */
	export function close(): void {
		const event = new CustomEvent("close", { cancelable: true });
		onClose(event);

		if (event.defaultPrevented) {
			return;
		}

		tabsContext.close(value);
	}

	const onkeydown: EventHandler<KeyboardEvent, HTMLDivElement> = (event) => {
		switch (event.key) {
			case "Delete": {
				close();
				break;
			}
			case "ArrowLeft":
			case "ArrowUp": {
				if (event.key === "ArrowLeft" && tabsContext.orientation() !== "horizontal") {
					return;
				}

				if (event.key === "ArrowUp" && tabsContext.orientation() !== "vertical") {
					return;
				}

				if (!event.shiftKey || !isControlOrMeta(event)) {
					return;
				}

				tabsContext.swapPrevious(value);
				tick().then(() => {
					ref?.focus();
				});
				break;
			}
			case "ArrowRight":
			case "ArrowDown": {
				if (event.key === "ArrowRight" && tabsContext.orientation() !== "horizontal") {
					return;
				}

				if (event.key === "ArrowDown" && tabsContext.orientation() !== "vertical") {
					return;
				}

				if (!event.shiftKey || !isControlOrMeta(event)) {
					return;
				}

				tabsContext.swapNext(value);
				tick().then(() => {
					ref?.focus();
				});
				break;
			}
			case "F2": {
				onRename();
				break;
			}
			default: {
				return;
			}
		}

		event.preventDefault();
	};

	const ondblclick: EventHandler<MouseEvent, HTMLDivElement> = (event) => {
		event.preventDefault();
		onRename();
	};

	$effect(() => {
		return draggable({
			element: ref!,
			getInitialData: () => new TriggerDragData(() => value),
			canDrag: () => !disabled,
			onDragStart: () => onDragStart(),
			onDrop: ({ source }) => {
				onDragEnd();
				source.element.focus();
			},
		});
	});

	$effect(() => {
		return dropTargetForElements({
			element: ref!,
			onDragEnter: ({ source }) => {
				if (source.data instanceof TriggerDragData) {
					tabsContext.reorder(source.data.value(), value);
				}
			},
		});
	});
</script>

<button
	{...mergeProps(triggerProps, rest, {
		onkeydown,
		ondblclick,
	})}
	bind:this={ref}
	class={rest.class}
>
	{@render children()}
</button>
