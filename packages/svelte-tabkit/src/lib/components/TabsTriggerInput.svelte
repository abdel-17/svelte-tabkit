<script lang="ts">
	import { mergeProps } from "@zag-js/svelte";
	import type { EventHandler } from "svelte/elements";
	import type { TabsTriggerInputProps } from "./types.js";

	let {
		ref,
		onConfirm,
		onCancel,
		value = $bindable(""),
		...rest
	}: TabsTriggerInputProps = $props();

	const onkeydown: EventHandler<KeyboardEvent, HTMLInputElement> = (event) => {
		// Prevent the trigger from handling input events from this input element.
		event.stopPropagation();

		switch (event.key) {
			case "Enter": {
				onConfirm?.(event.currentTarget.value);
				break;
			}
			case "Escape": {
				onCancel?.(event.currentTarget.value);
				break;
			}
			default: {
				return;
			}
		}

		event.preventDefault();
	};

	const onblur: EventHandler<FocusEvent, HTMLInputElement> = (event) => {
		onCancel?.(event?.currentTarget.value);
	};

	$effect(() => {
		ref!.focus();
		ref!.select();
	});
</script>

<input {...mergeProps(rest, { onkeydown, onblur })} bind:this={ref} bind:value />
