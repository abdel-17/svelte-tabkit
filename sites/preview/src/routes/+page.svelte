<script lang="ts">
	import { XIcon } from "@lucide/svelte";
	import {
		Tabs,
		TabsContent,
		TabsList,
		TabsTrigger,
		TabsTriggerClose,
		TabsTriggerInput,
	} from "svelte-tabkit";

	class Tab {
		readonly id = crypto.randomUUID();
		name = $state.raw("");

		constructor(name: string) {
			this.name = name;
		}
	}

	const tabs = $state([new Tab("Tab 1"), new Tab("Tab 2"), new Tab("Tab 3")]);
	let selectedId: string | undefined = $state.raw(tabs[0].id);
	let renamedId: string | undefined = $state.raw();

	function onSwapTabs(i: number, j: number): void {
		const ti = tabs[i];
		const tj = tabs[j];
		tabs[i] = tj;
		tabs[j] = ti;
	}

	function onCloseTab(i: number): void {
		tabs.splice(i, 1);

		if (tabs[i].id === renamedId) {
			renamedId = undefined;
		}
	}

	function onRenameTab(i: number): void {
		renamedId = tabs[i].id;
	}

	function canConfirmRename(value: string): boolean {
		return value.length !== 0;
	}

	function onConfirmRename(tab: Tab, value: string): void {
		tab.name = value;
		renamedId = undefined;
	}

	function onCancelRename(): void {
		renamedId = undefined;
	}
</script>

<main class="p-8">
	<Tabs {onSwapTabs} {onCloseTab} {onRenameTab} bind:value={selectedId}>
		<TabsList class="flex items-center gap-1 rounded-t-lg border border-gray-300 bg-gray-300">
			{#each tabs as tab (tab.id)}
				<TabsTrigger
					value={tab.id}
					class={({ dragged }) => [
						"flex min-w-30 items-center justify-between gap-2 rounded-[inherit] px-3 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-current data-selected:bg-gray-100",
						{
							"opacity-0": dragged,
						},
					]}
				>
					{#if tab.id === renamedId}
						<TabsTriggerInput
							value={tab.name}
							canConfirm={canConfirmRename}
							onConfirm={(value) => onConfirmRename(tab, value)}
							onCancel={onCancelRename}
						/>
					{:else}
						<span>{tab.name}</span>
						<TabsTriggerClose class="rounded-full p-0.25 hover:bg-current/8">
							<span class="sr-only">Close</span>
							<XIcon size={16} />
						</TabsTriggerClose>
					{/if}
				</TabsTrigger>
			{/each}

			<div class="my-1 w-px self-stretch rounded-full bg-slate-400"></div>
		</TabsList>

		{#each tabs as tab (tab.id)}
			<TabsContent
				value={tab.id}
				class="rounded-lg rounded-t-none border border-t-0 border-gray-300 p-4 focus-visible:outline-2 focus-visible:outline-current"
			>
				Content for {tab.name}
			</TabsContent>
		{/each}
	</Tabs>
</main>
