<script lang="ts">
	import { Tabs, TabsContent, TabsList, TabsTrigger } from "svelte-tabkit";

	const tabs = [
		{
			id: "1",
			title: "Tab 1",
		},
		{
			id: "2",
			title: "Tab 2",
		},
		{
			id: "3",
			title: "Tab 3",
		},
	];
</script>

<main class="p-8">
	<Tabs selected={tabs[0].id}>
		<TabsList class="flex items-center gap-2">
			{#each tabs as tab (tab.id)}
				<TabsTrigger
					tabId={tab.id}
					class="rounded-t-lg bg-gray-200 px-3 py-1.5 text-sm font-medium data-selected:text-blue-700"
				>
					{tab.title}
				</TabsTrigger>
			{/each}
		</TabsList>

		{#each tabs as tab, i (tab.id)}
			<TabsContent tabId={tab.id} class="mt-2">Content for Tab {i + 1}</TabsContent>
		{/each}
	</Tabs>
</main>
