import type { HTMLDivAttributes } from "$lib/internal/types.js";
import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";

export interface TabsProps extends HTMLDivAttributes {
	children: Snippet;

	/**
	 * Whether the keyboard navigation will loop from last tab to first,
	 * and vice versa.
	 *
	 * @default true
	 */
	loopFocus?: boolean;

	/**
	 * The id of the selected value.
	 */
	selected?: string;

	/**
	 * A callback that is called when the selected tab changes.
	 */
	onSelectedChange?: (value: string) => void;

	/**
	 * A callback that is called when the focused tab changes.
	 */
	onFocusChange?: (value: string) => void;

	/**
	 * The orientation of the tabs.
	 *
	 * - `horizontal`: only left and right arrow key navigation will work.
	 * - `vertical`: only up and down arrow key navigation will work.
	 *
	 * @default "horizontal"
	 */
	orientation?: "horizontal" | "vertical";

	/**
	 * The activation mode of the tabs.
	 *
	 * - `manual`: Tabs are activated when clicked or press `enter` key.
	 * - `automatic`: Tabs are activated when receiving focus.
	 *
	 * @default "automatic"
	 */
	activationMode?: "manual" | "automatic";

	/**
	 * The document's text/writing direction.
	 *
	 * @default "ltr"
	 */
	dir?: "ltr" | "rtl";

	/**
	 * The rendered element.
	 */
	ref?: HTMLDivElement | null;
}

export interface TabsContentProps extends HTMLDivAttributes {
	children: Snippet;

	/**
	 * The id of the shown tab.
	 */
	tabId: string;

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

export type TabsListTab = {
	/**
	 * A unique value identifying each tab.
	 */
	id: string;

	/**
	 * Whether or not the tab is disabled.
	 */
	disabled?: boolean;
};

export type TabsListTabProps<TTab extends TabsListTab = TabsListTab> = {
	tab: TTab;
};

export interface TabsListProps<TTab extends TabsListTab = TabsListTab>
	extends Omit<HTMLDivAttributes, "children"> {
	tab: Snippet<[props: TabsListTabProps<TTab>]>;

	/**
	 * A list of shown tabs.
	 */
	tabs: Array<TTab>;

	/**
	 * A callback that is called when the list of shown tabs changes.
	 */
	onTabsChange?: (value: Array<TTab>) => void;

	/**
	 * The duration of the flip animation in milliseconds.
	 *
	 * @default 200
	 */
	flipDuration?: number;

	/**
	 * The rendered element.
	 */
	ref?: HTMLDivElement | null;
}

export interface TabsTriggerProps extends HTMLButtonAttributes {
	children: Snippet;

	/**
	 * The id of the triggered tab.
	 */
	tabId: string;

	/**
	 * Whether or not the trigger is disabled.
	 *
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * The rendered element.
	 */
	ref?: HTMLButtonElement | null;
}
