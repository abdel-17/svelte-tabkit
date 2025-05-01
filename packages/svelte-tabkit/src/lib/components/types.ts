import type { HTMLDivAttributes, RefProp } from "$lib/internal/types.js";
import type { Snippet } from "svelte";
import type { HTMLButtonAttributes, HTMLInputAttributes } from "svelte/elements";

/**
 * @property value The value of the tab.
 */
export type TabsTab = {
	value: string;
};

export type TabsOrientation = "horizontal" | "vertical";

export type TabsActivationMode = "manual" | "automatic";

export interface TabsProps<TTab extends TabsTab = TabsTab>
	extends RefProp<HTMLDivElement>,
		HTMLDivAttributes {
	children: Snippet;

	/**
	 * The tabs displayed in the list.
	 */
	tabs: Array<TTab>;

	/**
	 * A callback that is called when the order of the tabs changes.
	 * @param value The new value of the tabs.
	 */
	onTabsChange?: (value: Array<TTab>) => void;

	/**
	 * The value of the selected tab.
	 */
	value?: string;

	/**
	 * A callback that is called when the selected tab changes.
	 * @param value The value of the new selected tab.
	 */
	onValueChange?: (value: string) => void;

	/**
	 * The orientation of the tabs. Can be `horizontal` or `vertical`.
	 *
	 * - `horizontal`: Only left and right arrow key navigation will work.
	 * - `vertical`: Only up and down arrow key navigation will work.
	 *
	 * @default "horizontal"
	 */
	orientation?: TabsOrientation;

	/**
	 * The activation mode of the tabs. Can be `manual` or `automatic`.
	 *
	 * - `manual`: Tabs are activated when clicked or press `Enter` key.
	 * - `automatic`: Tabs are activated when receiving focus.
	 *
	 * @default "automatic"
	 */
	activationMode?: TabsActivationMode;

	/**
	 * Whether the keyboard navigation will loop from last tab to first,
	 * and vice versa.
	 *
	 * @default true
	 */
	loopFocus?: boolean;
}

export interface TabsContentProps extends RefProp<HTMLDivElement>, HTMLDivAttributes {
	children: Snippet;

	/**
	 * The value of the tab this content represents.
	 */
	value: string;
}

export interface TabsListProps extends RefProp<HTMLDivElement>, HTMLDivAttributes {
	children: Snippet;
}

export interface TabsRenameInputProps
	extends RefProp<HTMLInputElement>,
		Omit<HTMLInputAttributes, "children"> {
	/**
	 * A callback that is called when the user confirms renaming the tab.
	 * @param value The current value of the input.
	 */
	onConfirm?: (value: string) => void;

	/**
	 * A callback that is called when the user cancels renaming the tab.
	 * @param value The current value of the input.
	 */
	onCancel?: (value: string) => void;
}

export interface TabsTriggerProps extends RefProp<HTMLButtonElement>, HTMLButtonAttributes {
	children: Snippet;

	/**
	 * The value of the tab this trigger represents.
	 */
	value: string;

	/**
	 * Whether this tab is disabled.
	 *
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * A callback that is called when this tab is closed.
	 *
	 * You can call `event.preventDefault()` to prevent the tab
	 * from being closed.
	 */
	onClose?: (event: Event) => void;

	/**
	 * A callback that is called when this tab is renamed.
	 */
	onRename?: () => void;

	/**
	 * A callback that is called when this tab starts being dragged.
	 */
	onDragStart?: () => void;

	/**
	 * A callback that is called when this tab stops being dragged.
	 */
	onDragEnd?: () => void;
}
