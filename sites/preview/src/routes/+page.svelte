<script lang="ts">
	import { Tabs, TabsContent, TabsList, TabsTrigger } from "svelte-tabkit";

	const tabs = $state(["Tab 1", "Tab 2", "Tab 3"]);
	let value: string | undefined = $state.raw(tabs[0]);

	function onSwapTabs(i: number, j: number): void {
		const ti = tabs[i];
		const tj = tabs[j];
		tabs[i] = tj;
		tabs[j] = ti;
	}
</script>

<main class="p-8">
	<Tabs {onSwapTabs} bind:value>
		<TabsList class="flex items-center rounded-t-lg border border-gray-300 bg-gray-300">
			{#each tabs as tab (tab)}
				<TabsTrigger
					value={tab}
					class={({ dragged }) => [
						"flex items-center gap-3 rounded-t-[inherit] px-2 py-2 ps-3 text-sm font-medium data-selected:bg-gray-100",
						{
							"!bg-gray-400 !text-transparent": dragged,
						},
					]}
				>
					{tab}
				</TabsTrigger>
			{/each}
		</TabsList>

		{#each tabs as tab (tab)}
			<TabsContent
				value={tab}
				class="rounded-lg rounded-t-none border border-t-0 border-gray-300 p-4"
			>
				Content for {tab}
			</TabsContent>
		{/each}
	</Tabs>
</main>
