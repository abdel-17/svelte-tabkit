<script lang="ts">
	import { Tabs, TabsContent, TabsList, TabsTrigger } from "svelte-tabkit";

	class Tab {
		readonly value: string;
		name = $state.raw("");
		dragged = $state.raw(false);

		constructor({ value, name }: { value: string; name: string }) {
			this.value = value;
			this.name = name;
		}
	}

	let tabs = $state([
		new Tab({
			value: "tab-1",
			name: "Tab 1",
		}),
		new Tab({
			value: "tab-2",
			name: "Tab 2",
		}),
		new Tab({
			value: "tab-3",
			name: "Tab 3",
		}),
	]);
	let value: string | undefined = $state.raw("tab-1");
</script>

<main class="p-8">
	<Tabs bind:tabs bind:value>
		<TabsList class="flex items-center gap-1 rounded-t-lg border border-gray-300 bg-gray-300">
			{#each tabs as tab (tab.value)}
				<TabsTrigger
					value={tab.value}
					onDragStart={() => {
						tab.dragged = true;
					}}
					onDragEnd={() => {
						tab.dragged = false;
					}}
					class={[
						"flex min-w-30 items-center justify-between gap-2 rounded-[inherit] px-3 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-current data-selected:bg-gray-100",
						{
							"opacity-0": tab.dragged,
						},
					]}
				>
					<span>{tab.name}</span>
				</TabsTrigger>
			{/each}

			<div class="my-1 w-px self-stretch rounded-full bg-slate-400"></div>
		</TabsList>

		{#each tabs as tab (tab.value)}
			<TabsContent
				value={tab.value}
				class="rounded-lg rounded-t-none border border-t-0 border-gray-300 p-4 focus-visible:outline-2 focus-visible:outline-current"
			>
				Content for {tab.name}
			</TabsContent>
		{/each}
	</Tabs>
</main>
