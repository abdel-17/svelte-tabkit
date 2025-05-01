import { DEV } from "esm-env";
import { getContext, hasContext, setContext } from "svelte";

// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/platform#examples
export function isControlOrMeta(event: KeyboardEvent | MouseEvent): boolean {
	if (navigator.platform.startsWith("Mac") || navigator.platform === "iPhone") {
		return event.metaKey;
	}

	return event.ctrlKey;
}

export function createContext<TContext>(): [
	get: () => TContext,
	set: (value: TContext) => TContext,
] {
	const key = Symbol();
	return [
		() => {
			if (DEV && !hasContext(key)) {
				throw new Error("Context not found");
			}

			return getContext(key);
		},
		(value) => setContext(key, value),
	];
}

export function noop(): void {}

export function swapIndex<TElement>(a: Array<TElement>, i: number, j: number): void {
	const ai = a[i];
	const aj = a[j];
	a[i] = aj;
	a[j] = ai;
}
