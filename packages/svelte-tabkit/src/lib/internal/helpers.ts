// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/platform#examples
export function isControlOrMeta(event: KeyboardEvent | MouseEvent): boolean {
	if (navigator.platform.startsWith("Mac") || navigator.platform === "iPhone") {
		return event.metaKey;
	}

	return event.ctrlKey;
}
