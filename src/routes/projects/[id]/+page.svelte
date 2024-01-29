<script>
    export let data;
    let { user, project } = data;

    export let form;

    import Logout from "../../../svgs/Logout.svelte";
    import Back from "../../../svgs/Back.svelte";
    import Add from "../../../svgs/Add.svelte";
    import Delete from "../../../svgs/Delete.svelte";

    let title = "";
    let size = "";

    let new_items = [];

    let deleting = false;
    function toggleDeleting() { deleting = !deleting; }

    let editing = true;
    function toggleEditing(inventory, slot) { editing = project.inventories.find(i => i.id === inventory).items.find(i => i.slot === slot); }
</script>

<head>
    <title>{project.title} • {user.username}</title>
</head>
<main class="h-full">
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
    <div class="flex flex-row mt-2">
        <!-- sidebar -->
        <div class="flex flex-col px-6 text-center shrink-0">
            <input class="text-xl font-bold py-2 mr-2 outline-none bg-slate-900 border-b-2 border-slate-700 focus:border-slate-500 mb-4" value={project.title} />

            <!-- add new inventory -->
            {#if form?.success === false && form?.err_type === "addinv"}
                <div class="bg-red-400 border-2 border-red-500 text-red-600 rounded-lg">
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

            <form method="POST" action="?/save" class="flex">
                <button type="submit" class="grow px-4 py-2 bg-green-500 border-3 border-green-600 hover:bg-green-400 duration-75 my-2 rounded-md">Save Changes</button>                    
            </form>

            {#if deleting}
                <form method="POST" action="?/deleteproject" class="flex">
                    <button type="submit" class="grow px-4 py-2 bg-red-500 border-3 border-red-600 hover:bg-red-400 duration-75 my-2 rounded-md">Are you sure?</button>
                </form>
            {:else}
                <button on:click={toggleDeleting} class="px-4 py-2 bg-red-500 border-3 border-red-600 hover:bg-red-400 duration-75 my-2 rounded-md">Delete project</button>
            {/if}
        </div>



        <!-- inventories -->
        <div class="flex flex-col mb-8">
            {#each project.inventories as inventory}
                <div class="flex flex-col gap-4 mx-4 my-2">
                    <!-- title -->
                    <form method="POST" action="?/removeinv" class="flex flex-row">
                        <p class="text-xl font-bold mr-4">{inventory.title}</p>
                        
                        <input name="id" type="text" bind:value={inventory.id} class="hidden" />
                        <button type="submit">
                            <Delete />
                        </button>
                    </form>

                    <!-- grid -->
                    <div class="bg-slate-700 rounded-md grid grid-cols-9 self-center float-left gap-4 p-4">
                        {#each {length: inventory.size} as _, i}
                            <!-- item -->    
                            <button on:click={() => toggleEditing(_, inventory.id)} class="bg-slate-600 hover:bg-slate-500 duration-100 rounded-md h-20 w-20 flex justify-center items-center focus:bg-slate-500 shadow-lg">
                                {#if inventory.items[i]?.slot === i}
                                    <img src={`/images/items/${inventory.items[i].type}.webp`} alt={`${inventory.items[i].type}`} class="h-16 w-16" />
                                {/if}
                            </button>
                        {/each}
                    </div>
                </div>
            {:else}
                <p class="text-center p-4 text-2xl font-bold">Nothing here yet!</p>
            {/each}
        </div>



        <!-- item editor -->
        <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <!--
              Background backdrop, show/hide based on modal state.
          
              Entering: "ease-out duration-300"
                From: "opacity-0"
                To: "opacity-100"
              Leaving: "ease-in duration-200"
                From: "opacity-100"
                To: "opacity-0"
            -->
            <div class={`${editing ? "opacity-100 duration-300": "hidden"} fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity`}></div>
          
            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <!--
                  Modal panel, show/hide based on modal state.
          
                  Entering: "ease-out duration-300"
                    From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    To: "opacity-100 translate-y-0 sm:scale-100"
                  Leaving: "ease-in duration-200"
                    From: "opacity-100 translate-y-0 sm:scale-100"
                    To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                -->
                <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                    <div>
                        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                            <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </div>
                        <div class="mt-3 text-center sm:mt-5">
                            <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Payment successful</h3>
                            <div class="mt-2">
                                    <p class="text-sm text-gray-500">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aliquam laudantium explicabo pariatur iste dolorem animi vitae error totam. At sapiente aliquam accusamus facere veritatis.</p>
                                </div>
                            </div>
                        </div>
                        <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                            <button on:click={toggleEditing} type="button" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2">Deactivate</button>
                            <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
          
    </div>
</main>