<script lang="ts" module>
	import { createContext, noop, swapIndex } from "$lib/internal/helpers.js";
	import { mergeProps, normalizeProps, useMachine } from "@zag-js/svelte";
	import * as zagTabs from "@zag-js/tabs";
	import type { TabsProps, TabsTab } from "./types.js";

	export type TabsContext = {
		api: () => zagTabs.Api;
		orientation: () => "horizontal" | "vertical";
		close: (tabValue: string) => void;
		swapPrevious: (tabValue: string) => void;
		swapNext: (tabValue: string) => void;
		reorder: (startValue: string, finishValue: string) => void;
		onDragStart: () => void;
		onDragLeaveList: () => void;
		onDrop: () => void;
	};

	const [getTabsContext, setTabsContext] = createContext<TabsContext>();

	export { getTabsContext };
</script>

<script lang="ts" generics="TTab extends TabsTab = TabsTab">
	let {
		children,
		tabs = $bindable(),
		onTabsChange = noop,
		value = $bindable(),
		onValueChange = noop,
		orientation = "horizontal",
		activationMode = "automatic",
		loopFocus = true,
		ref = $bindable(null),
		...rest
	}: TabsProps<TTab> = $props();

	const id = $props.id();
	const service = useMachine(zagTabs.machine, () => ({
		id,
		value,
		onValueChange: (details) => {
			value = details.value;
			onValueChange(details.value);
		},
		orientation,
		activationMode,
		loopFocus,
	}));
	const api = $derived(zagTabs.connect(service, normalizeProps));

	function setTabs(newTabs: Array<TTab>): void {
		tabs = newTabs;
		onTabsChange(newTabs);
	}

	function close(tabValue: string): void {
		const index = tabs.findIndex((tab) => tab.value === tabValue);
		if (index === -1) {
			return;
		}

		const isTabSelected = tabValue === value;
		if (isTabSelected) {
			if (index === tabs.length - 1) {
				api.selectPrev();
			} else {
				api.selectNext();
			}
		}

		const newTabs = [...tabs];
		newTabs.splice(index, 1);
		setTabs(newTabs);
	}

	function swapPrevious(tabValue: string): void {
		const index = tabs.findIndex((tab) => tab.value === tabValue);
		if (index === -1) {
			return;
		}

		if (index === 0 && !loopFocus) {
			return;
		}

		const newTabs = [...tabs];
		if (index === 0) {
			swapIndex(newTabs, index, newTabs.length - 1);
		} else {
			swapIndex(newTabs, index, index - 1);
		}
		setTabs(newTabs);
	}

	function swapNext(tabValue: string): void {
		const index = tabs.findIndex((tab) => tab.value === tabValue);
		if (index === -1) {
			return;
		}

		const lastIndex = tabs.length - 1;
		if (index === lastIndex && !loopFocus) {
			return;
		}

		const newTabs = [...tabs];
		if (index === lastIndex) {
			swapIndex(newTabs, index, 0);
		} else {
			swapIndex(newTabs, index, index + 1);
		}
		setTabs(newTabs);
	}

	function reorder(startValue: string, finishValue: string): void {
		const startIndex = tabs.findIndex((tab) => tab.value === startValue);
		const finishIndex = tabs.findIndex((tab) => tab.value === finishValue);
		if (startIndex === -1 || finishIndex === -1 || startIndex === finishIndex) {
			return;
		}

		const newTabs = [...tabs];
		if (startIndex < finishIndex) {
			for (let i = startIndex; i < finishIndex; i++) {
				swapIndex(newTabs, i, i + 1);
			}
		} else {
			for (let i = startIndex; i > finishIndex; i--) {
				swapIndex(newTabs, i, i - 1);
			}
		}
		setTabs(newTabs);
	}

	let snapshot: Array<TTab> | undefined;

	function onDragStart(): void {
		snapshot = tabs;
	}

	function onDragLeaveList(): void {
		if (snapshot !== undefined) {
			setTabs(snapshot);
		}
	}

	function onDrop(): void {
		snapshot = undefined;
	}

	setTabsContext({
		api: () => api,
		orientation: () => orientation,
		close,
		swapPrevious,
		swapNext,
		reorder,
		onDragStart,
		onDragLeaveList,
		onDrop,
	});

	const rootProps = $derived(api.getRootProps());
</script>

<div {...mergeProps(rootProps, rest)} bind:this={ref} class={rest.class}>
	{@render children()}
</div>
