<script lang="ts">
	import { Tabs, TabsContent, TabsList } from "svelte-tabkit";

	let tabs = $state([
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
	]);
</script>

<main class="p-8">
	<Tabs selected={tabs[0].id}>
		<TabsList bind:tabs class="flex items-center gap-2">
			{#snippet tab({ tab })}
				<div
					class="rounded-t-lg bg-gray-200 px-3 py-1.5 text-sm font-medium data-selected:text-blue-700"
				>
					{tab.title}
				</div>
			{/snippet}
		</TabsList>

		{#each tabs as tab, i (tab.id)}
			<TabsContent tabId={tab.id} class="mt-2">Content for Tab {i + 1}</TabsContent>
		{/each}
	</Tabs>
</main>
