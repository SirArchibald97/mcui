<script>
    export let data;
    const { user, project } = data;

    import Logout from "../../../svgs/Logout.svelte";
    import Back from "../../../svgs/Back.svelte";
    import Add from "../../../svgs/Add.svelte";
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
            <!-- new inventory -->
            <button class="flex flex-row gap-x-2 px-4 py-2 bg-slate-600 border-2 border-slate-400 hover:bg-slate-500 my-2"><Add /><span>New Inventory</span></button>
            
            <!-- save -->
            <button class="px-4 py-2 bg-green-500 border-3 border-green-600 hover:bg-green-400 my-2 mb-4">Save Changes</button>
        </div>

        <!-- content -->
        <div class="grow">
            <img src="/images/inventory.png" alt="inventory" class="w-3/5" />
        </div>
    </div>
</main>