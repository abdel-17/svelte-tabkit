import {
	draggable,
	dropTargetForElements,
	monitorForElements,
	type ElementEventPayloadMap,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import type { TabsTriggerState } from "./types.js";

function onDrop(
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

	const triggers = Array.from(listRef.querySelectorAll("[data-part='trigger']"));
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

export type ListDropMonitorProps = {
	ref: () => HTMLElement | null;
	onSwapTabs: (i: number, j: number) => void;
};

export function useListDropMonitor(props: ListDropMonitorProps): void {
	$effect(() => {
		const ref = props.ref();
		if (ref === null) {
			return;
		}

		return monitorForElements({
			onDrop: (payload) => onDrop(payload, ref, props.onSwapTabs),
		});
	});
}

class TriggerStateImpl implements TabsTriggerState {
	dragged = $state.raw(false);
}

export type TriggerStateProps = {
	disabled: () => boolean;
	ref: () => HTMLElement | null;
	listRef: () => HTMLElement | null;
	onSwapTabs: (i: number, j: number) => void;
};

export function createTriggerState(props: TriggerStateProps): TabsTriggerState {
	const triggerState = new TriggerStateImpl();

	$effect(() => {
		const ref = props.ref();
		const listRef = props.listRef();
		if (ref === null || listRef === null) {
			return;
		}

		$effect(() => {
			return draggable({
				element: ref,
				canDrag: () => !props.disabled(),
				onDragStart: () => {
					triggerState.dragged = true;
				},
				onDrop: () => {
					triggerState.dragged = false;
				},
			});
		});

		$effect(() => {
			return dropTargetForElements({
				element: ref,
				onDragEnter: (payload) => onDrop(payload, listRef, props.onSwapTabs),
			});
		});
	});

	return triggerState;
}
