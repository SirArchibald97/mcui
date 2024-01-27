<script>
    export let form;
</script>

<main class="sm:pt-24 sm:max-w-xl sm:mx-auto h-screen">
    {#if form?.success === false}
        <div class="bg-red-400 rounded-xl border-4 border-red-600 px-12 mb-4">
            <p class="text-xl text-center py-2 text-red-700">{form?.message}</p>
        </div>
    {/if}

    <!-- signup form -->
    <form method="POST" class="bg-slate-800 rounded-xl border-4 border-slate-700 px-12">
        <h1 class="text-3xl text-center pt-6 pb-2">Sign Up</h1>
        <p class="text-md text-center text-slate-400 mb-6">Already registered? <a href="/login" class="text-blue-600 underline">Login</a></p>
    
        <!-- username -->
        <div class="flex flex-col pb-4">
            <p class="text-slate-100 pb-1">Username</p>
            <div class="bg-slate-700 rounded-xl border-4 border-slate-700">
                <input name="username" type="username" class="bg-slate-700 rounded-xl border-4 border-slate-700 px-4 py-1 text-slate-100 outline-none w-full" />
            </div>
        </div>

        <!-- email address -->
        <div class="flex flex-col pb-4">
            <p class="text-slate-100 pb-1">Email</p>
            <div class="bg-slate-700 rounded-xl border-4 border-slate-700">
                <input name="email" type="email" class="bg-slate-700 rounded-xl border-4 border-slate-700 px-4 py-1 text-slate-100 outline-none w-full" />
            </div>
        </div>

        <!-- password -->
        <div class="flex flex-col pb-4">
            <p class="text-slate-100 pb-1">Password</p>
            <div class="bg-slate-700 rounded-xl border-4 border-slate-700">
                <input name="password" type="password" class="bg-slate-700 rounded-xl border-4 border-slate-700 px-4 py-1 text-slate-100 outline-none w-full" />
            </div>
        </div>
        <!-- confirm password -->
        <div class="flex flex-col pb-4">
            <p class="text-slate-100 pb-1">Confirm Password</p>
            <div class="bg-slate-700 rounded-xl border-4 border-slate-700">
                <input name="confirm" type="password" class="bg-slate-700 rounded-xl border-4 border-slate-700 px-4 py-1 text-slate-100 outline-none w-full" />
            </div>
        </div>

        <!-- remember me -->
        <div class="flex flex-row pb-8">
            <input name="remember" type="checkbox" />
            <p class="text-slate-100 ml-2">Keep me logged in</p>
        </div>

        <!-- submit -->
        <div class="flex flex-col pb-8">
            <button type="submit" class="bg-slate-700 hover:bg-slate-600 rounded-xl border-4 border-slate-500 px-4 py-2 text-slate-100">Submit</button>
        </div>
    </form>
</main>