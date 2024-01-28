<script>
    export let data;
    const { user } = data;

    import Logout from "../svgs/Logout.svelte";
    import Create from "../svgs/Create.svelte";
    import Edit from "../svgs/Edit.svelte";
    import Share from "../svgs/Share.svelte";

    let tab = 0;
    function setTab(new_tab) { tab = new_tab; }
</script>

<main>
    <nav class="flex flex-row justify-end gap-8 text-xl mr-6 pt-4">
    {#if !user}
        <!-- login & signup -->
        <a href="/login" class="hover:text-slate-300">
            Login
        </a>
        <a href="/signup" class="hover:text-slate-300">
            Sign Up
        </a>
    {:else}
        <!-- username -->
        <a href="/projects" class="underline hover:text-slate-400">{user.username}</a>
        <a href="/logout" class="flex flex-row gap-2 hover:text-slate-400">
            <span>Logout</span>
            <Logout />
        </a>
    {/if}
    </nav>

    <!-- hero -->
    <div class="sm:mx-24 sm:mt-32">
        <h1 class="text-8xl font-bold">Minecraft UIs</h1>
        <p class="text-2xl mt-4 text-slate-400">Create, edit and share inventory-based UIs with ease!</p>

        <!-- buttons -->
        <div class="flex flex-row gap-4 mt-8 mb-24">
            <a href="/create" class="border-2 border-slate-400 rounded-md hover:bg-slate-700 px-4 py-2">
                Get Started
            </a>
        </div>
    </div>

    <!-- features -->
    <div class="sm:max-w-3xl sm:mx-auto mt-24">
        <!-- tabs -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-12 z-0">
            <button class={`flex flex-col justify-center items-center gap-3 bg-slate-800 border-slate-400 ${tab === 0 ? "z-10" : "z-0"} border-t-4 border-x-4 border-b-0 rounded-t-lg text-xl text-center p-2`}>
                <Create />
                <p class="font-bold text-2xl text-slate-100">Create</p>
            </button>
            <button class="flex flex-col justify-center items-center gap-2 bg-slate-800 border-slate-400 border-t-4 border-x-4 border-b-0 rounded-t-lg text-xl text-center p-2">
                <Edit />
                <p class="font-bold text-2xl text-slate-100">Edit</p>
            </button>
            <button class="flex flex-col justify-center items-center gap-2 bg-slate-800 border-slate-400 border-t-4 border-x-4 border-b-0 rounded-t-lg text-xl text-center p-2">
                <Share />
                <p class="font-bold text-2xl text-slate-100">Share</p>
            </button>
        </div>

        <!-- images -->
        <div class="border-slate-400 border-4 rounded-b-lg bg-slate-800">
            <img src="/images/image.jpg" alt="Create" class="rounded-lg p-2" />
        </div>
    </div>

    <!-- footer -->
    <footer class="sm:mt-44u">

    </footer>
</main>