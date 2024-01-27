<script>
    export let data;
    const { user } = data;

    import Logout from "../../svgs/Logout.svelte";
    import NewProject from "../../svgs/NewProject.svelte";

    function formatDate(timestamp) {
        const date = new Date(Date.now());
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
</script>

<head>
    <title>{user.username}'s Projects</title>
</head>
<main>
    <!-- navbar -->
    <nav class="flex flex-row justify-end gap-8 text-xl pr-6 py-4 bg-slate-800">
        <!-- username -->
        <p class="underline">{user.username}</p>
        <a href="/logout" class="flex flex-row gap-2 hover:text-slate-400">
            <span>Logout</span>
            <Logout />
        </a>
    </nav>

    <!-- project list -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:mx-24 mt-12">
        {#each user.projects as project}
            <a href={`/projects/${project.id}`} class="border-4 border-slate-400 hover:border-slate-300 rounded-lg py-2 px-4 text-slate-200">
                <p class="text-2xl font-bold mb-2">{project.title}</p>
                <p class="text-lg font-semibold text-slate-400">Created {formatDate(project.created)}</p>
                <p class="text-lg font-semibold text-slate-400">{project.inventories.length} inventories</p>
            </a>
        {/each}

        <a href="/projects/new" class="border-4 border-slate-600 border-dashed rounded-lg p-2 text-center hover:border-slate-300 text-slate-500 hover:text-slate-300 flex items-center justify-center">
            <NewProject />
        </a>
    </div>
</main>