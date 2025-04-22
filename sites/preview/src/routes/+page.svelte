<script lang="ts">
	import { Tabs, TabsContent, TabsList, TabsTrigger } from "svelte-tabkit";
</script>

<main class="p-8">
	<Tabs value="tab1">
		<TabsList>
			<TabsTrigger
				value="tab1"
				class="rounded-t-lg bg-gray-200 px-3 py-1.5 text-sm font-medium data-selected:text-blue-700"
			>
				Tab 1
			</TabsTrigger>

			<TabsTrigger
				value="tab2"
				class="rounded-t-lg bg-gray-200 px-3 py-1.5 text-sm font-medium data-selected:text-blue-700"
			>
				Tab 2
			</TabsTrigger>

			<TabsTrigger
				value="tab3"
				class="rounded-t-lg bg-gray-200 px-3 py-1.5 text-sm font-medium data-selected:text-blue-700"
			>
				Tab 3
			</TabsTrigger>
		</TabsList>

		<TabsContent value="tab1" class="mt-2">Content for Tab 1</TabsContent>

		<TabsContent value="tab2" class="mt-2">Content for Tab 2</TabsContent>

		<TabsContent value="tab3" class="mt-2">Content for Tab 3</TabsContent>
	</Tabs>
</main>
