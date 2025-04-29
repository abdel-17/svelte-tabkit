import type { ElementEventPayloadMap } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import type { TabsTriggerState } from "./types.js";

export class TriggerStateImpl implements TabsTriggerState {
	dragged = $state.raw(false);
}

export function getTriggers(listRef: HTMLElement): Array<Element> {
	return Array.from(listRef.querySelectorAll("[data-part='trigger']"));
}

export function dropTrigger(
	payload: ElementEventPayloadMap["onDrop"],
	listRef: HTMLElement,
	onSwapTabs: (i: number, j: number) => void,
): void {
	const location = payload.location.current;
	if (location.dropTargets.length === 0) {
		return;
	}

	const source = payload.source;
	const target = location.dropTargets[0];

	const triggers = getTriggers(listRef);
	const startIndex = triggers.indexOf(source.element);
	const targetIndex = triggers.indexOf(target.element);

	if (startIndex === -1 || targetIndex === -1 || startIndex === targetIndex) {
		return;
	}

	if (startIndex < targetIndex) {
		//  s       t
		// [1] [2] [3]
		// [2] [1] [3]
		// [2] [3] [1]
		for (let i = startIndex; i < targetIndex; i++) {
			onSwapTabs(i, i + 1);
		}
	} else {
		//  t       s
		// [3] [2] [1]
		// [3] [1] [2]
		// [1] [3] [2]
		for (let i = startIndex; i > targetIndex; i--) {
			onSwapTabs(i, i - 1);
		}
	}
}
