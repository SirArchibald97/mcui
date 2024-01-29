<script>
    export let data;
    let { user, project } = data;

    export let form;

    import Logout from "../../../svgs/Logout.svelte";
    import Back from "../../../svgs/Back.svelte";
    import Add from "../../../svgs/Add.svelte";

    let title = "";
    let size = "";
</script>

<main class="h-screen">
    <!-- navbar -->
    <nav class="flex flex-row justify-end gap-8 text-xl pr-6 py-4 bg-slate-800">
        <!-- back button -->
        <div class="grow ml-6">
            <a href="/projects" class="flex flex-row gap-2 hover:text-slate-400">
                <Back />
                <span>Back</span>
            </a>
        </div>

        <!-- username -->
        <a href="/projects" class="underline hover:text-slate-400">{user.username}</a>
        <a href="/logout" class="flex flex-row gap-2 hover:text-slate-400">
            <span>Logout</span>
            <Logout />
        </a>
    </nav>

    <!-- main -->
    <div class="flex flex-row h-dvh">
        <!-- sidebar -->
        <div class="flex flex-col bg-slate-700 px-6 text-center shrink-0">
            <p class="text-xl font-bold py-2">{project.title}</p>

            <!-- add new inventory -->
            {#if form?.success === false && form?.err_type === "addinv"}
                <div class="bg-red-400 border-2 border-red-500 text-red-600 rounded-md">
                    <p class="text-md font-semibold p-1">{form.message}</p>
                </div>
            {/if}
            <form method="POST" action="?/addinv" class="flex flex-col bg-slate-600 rounded-md my-2">
                <div class="flex flex-col rounded-md">
                    <input name="title" type="text" placeholder="Title" bind:value={title} class="bg-slate-600 border-b-2 border-slate-500 focus:border-slate-300 outline-none m-2 px-3 py-1" />
                </div>
                <div class="flex flex-row rounded-md">
                    <input name="size" type="text" bind:value={size} class="bg-slate-600 border-b-2 border-slate-500 focus:border-slate-300 outline-none m-2 px-3 py-1" /><span class="py-1 my-2 pr-2">rows</span>
                </div>
                {#if size.length === 0 || title.length === 0}
                    <button type="submit" disabled class="flex flex-row gap-x-2 px-4 py-2 my-2 bg-slate-500 mx-2 rounded-md"><Add /><span>Add Inventory</span></button>
                {:else}
                    <button type="submit" class="flex flex-row gap-x-2 px-4 py-2 my-2 bg-slate-500 hover:bg-slate-400 mx-2 rounded-md"><Add /><span>Add Inventory</span></button>
                {/if}
            </form>

            <!-- save -->
            <button class="px-4 py-2 bg-green-500 border-3 border-green-600 hover:bg-green-400 my-2 mb-4 rounded-md">Save Changes</button>
        </div>

        <!-- inventories -->
        <div class="grow">
            {#each project.inventories as inventory}
                <div>
                    <p>{inventory.title}</p>
                </div>
            {/each}
        </div>

        <!-- item editor -->
        <div>

        </div>    
    </div>
</main>