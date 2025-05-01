<script lang="ts">
	import { noop } from "$lib/internal/helpers.js";
	import { mergeProps } from "@zag-js/svelte";
	import type { EventHandler } from "svelte/elements";
	import type { TabsRenameInputProps } from "./types.js";

	let {
		onConfirm = noop,
		onCancel = noop,
		ref = $bindable(null),
		value = $bindable(""),
		...rest
	}: TabsRenameInputProps = $props();

	const onkeydown: EventHandler<KeyboardEvent, HTMLInputElement> = (event) => {
		switch (event.key) {
			case "Enter": {
				onConfirm(value);
				break;
			}
			case "Escape": {
				onCancel(event.currentTarget.value);
				break;
			}
			default: {
				return;
			}
		}

		event.preventDefault();
	};

	const onblur: EventHandler<FocusEvent, HTMLInputElement> = (event) => {
		onCancel(event.currentTarget.value);
	};

	$effect(() => {
		ref!.focus();
		ref!.select();
	});
</script>

<input
	{...mergeProps(rest, {
		onkeydown,
		onblur,
	})}
	bind:this={ref}
	bind:value
	class={rest.class}
/>
