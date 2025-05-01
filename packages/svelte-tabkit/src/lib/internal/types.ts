import type { HTMLAttributes } from "svelte/elements";

export type HTMLDivAttributes = HTMLAttributes<HTMLDivElement>;

export interface RefProp<TRef> {
	/**
	 * The underlying DOM element being rendered.
	 *
	 * You can bind to this to get a reference to the element.
	 */
	ref?: TRef | null;
}
