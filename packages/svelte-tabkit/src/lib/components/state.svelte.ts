export class TriggerDragData {
	readonly value: () => string;
	[key: PropertyKey]: unknown;

	constructor(value: () => string) {
		this.value = value;
	}
}
