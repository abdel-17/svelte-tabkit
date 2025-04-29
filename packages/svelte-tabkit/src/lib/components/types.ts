import type { HTMLDivAttributes } from "$lib/internal/types.js";
import type { Snippet } from "svelte";
import type { ClassValue } from "svelte/elements";

export type TabsOrientation = "horizontal" | "vertical";

export type TabsActivationMode = "manual" | "automatic";

export type TabsDir = "ltr" | "rtl";

export interface TabsProps extends HTMLDivAttributes {
	children: Snippet;

	/**
	 * The selected tab value.
	 */
	value?: string;

	/**
	 * A callback that is called when the selected tab changes.
	 */
	onValueChange?: (value: string) => void;

	/**
	 * A callback that is called when the focused tab changes.
	 */
	onFocusChange?: (value: string) => void;

	/**
	 * A callback that is called when two adjacent tabs are swapped.
	 * @param i - The index of the first tab.
	 * @param j - The index of the second tab.
	 */
	onSwapTabs?: (i: number, j: number) => void;

	/**
	 * Whether the keyboard navigation will loop from last tab to first,
	 * and vice versa.
	 *
	 * @default true
	 */
	loopFocus?: boolean;

	/**
	 * The orientation of the tabs.
	 *
	 * - `horizontal`: only left and right arrow key navigation will work.
	 * - `vertical`: only up and down arrow key navigation will work.
	 *
	 * @default "horizontal"
	 */
	orientation?: TabsOrientation;

	/**
	 * The activation mode of the tabs.
	 *
	 * - `manual`: Tabs are activated when clicked or press `enter` key.
	 * - `automatic`: Tabs are activated when receiving focus.
	 *
	 * @default "automatic"
	 */
	activationMode?: TabsActivationMode;

	/**
	 * The document's text/writing direction.
	 *
	 * @default "ltr"
	 */
	dir?: TabsDir;

	/**
	 * The rendered element.
	 */
	ref?: HTMLDivElement | null;
}

export interface TabsContentProps extends HTMLDivAttributes {
	children: Snippet;

	/**
	 * The value of the shown tab.
	 */
	value: string;

	/**
	 * The rendered element.
	 */
	ref?: HTMLDivElement | null;
}

export interface TabsIndicatorProps extends HTMLDivAttributes {
	/**
	 * The rendered element.
	 */
	ref?: HTMLDivElement | null;
}

export interface TabsListProps extends Omit<HTMLDivAttributes, "children"> {
	children: Snippet;

	/**
	 * The rendered element.
	 */
	ref?: HTMLDivElement | null;
}

/**
 * @property dragged - Whether the current tab is being dragged.
 */
export type TabsTriggerState = {
	dragged: boolean;
};

export interface TabsTriggerProps extends Omit<HTMLDivAttributes, "children" | "class" | "style"> {
	children: Snippet<[state: TabsTriggerState]>;

	/**
	 * The value of the triggered tab.
	 */
	value: string;

	/**
	 * Whether the trigger is disabled.
	 *
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * The rendered element.
	 */
	ref?: HTMLDivElement | null;

	/**
	 * The CSS class for the element.
	 *
	 * A function may be provided to compute the class based on component state.
	 */
	class?: ClassValue | ((state: TabsTriggerState) => ClassValue | undefined);

	/**
	 * The inline style for the element.
	 *
	 * A function may be provided to compute the style based on component state.
	 */
	style?: string | ((state: TabsTriggerState) => string | undefined);
}
