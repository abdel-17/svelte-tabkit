<script lang="ts">
	import { XIcon } from "@lucide/svelte";
	import { Tabs, TabsContent, TabsList, TabsTrigger, TabsTriggerClose } from "svelte-tabkit";

	const tabs = $state(["Tab 1", "Tab 2", "Tab 3"]);
	let value: string | undefined = $state.raw(tabs[0]);

	function onSwapTabs(i: number, j: number): void {
		const ti = tabs[i];
		const tj = tabs[j];
		tabs[i] = tj;
		tabs[j] = ti;
	}

	function onCloseTab(i: number): void {
		tabs.splice(i, 1);
	}
</script>

<main class="p-8">
	<Tabs {onSwapTabs} {onCloseTab} bind:value>
		<TabsList class="flex items-center gap-1 rounded-t-lg border border-gray-300 bg-gray-300">
			{#each tabs as tab (tab)}
				<TabsTrigger
					value={tab}
					class={({ dragged }) => [
						"flex items-center rounded-[inherit] px-2 py-2 ps-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-current data-selected:bg-gray-100",
						{
							"opacity-0": dragged,
						},
					]}
				>
					<span>{tab}</span>
					<TabsTriggerClose class="ms-3 rounded-full p-0.25 hover:bg-current/8">
						<span class="sr-only">Close</span>
						<XIcon size={16} />
					</TabsTriggerClose>
				</TabsTrigger>
			{/each}

			<div class="my-1 w-px self-stretch rounded-full bg-slate-400"></div>
		</TabsList>

		{#each tabs as tab (tab)}
			<TabsContent
				value={tab}
				class="rounded-lg rounded-t-none border border-t-0 border-gray-300 p-4 focus-visible:outline-2 focus-visible:outline-current"
			>
				Content for {tab}
			</TabsContent>
		{/each}
	</Tabs>
</main>
