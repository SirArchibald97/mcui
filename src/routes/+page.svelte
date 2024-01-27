<script>
    export let data;
    const { user } = data;

    import Logout from "../svgs/Logout.svelte";
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
        <p class="underline">{user.username}</p>
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

    <!-- footer -->
    <footer class="sm:mt-44u">

    </footer>
</main>