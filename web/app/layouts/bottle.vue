<script setup lang="ts">
import CheckSession from "~/lib/checkSession";
const router = useRouter();
const user = ref();
onMounted(async () => {
    const checkSessionSystem = await CheckSession();
    if (checkSessionSystem.loggedin !== true) {
        logoutAction();
        return;
    }
    user.value = checkSessionSystem.user;
});

const logoutAction = async () => {
    const req = await fetch("/api/bye");
    const res = await req.json();
    if (res.true === "yes") {
        router.push("/cap");
        return;
    }
    alert("logout failed");
};
</script>
<template>
    <div class="hidden md:block">
        <!--NAV-->
        <div class="flex flex-row justify-between p-2 m-2">
            <NuxtLink href="/bottle/"
                ><h1 class="text-3xl">The Bottle!</h1></NuxtLink
            >
            <div class="gap-1 mr-2">
                <span class="p-1 m-2">Hi, {{ user }}!</span>
                <button
                    class="transition-all duration-500 hover:cursor-pointer bg-gradient-to-bl from-teal-300 to-blue-200 hover:from-teal-400 hover:to-blue-300 mx-1 w-fit p-2 rounded text-black"
                    @click="logoutAction"
                >
                    Logout
                </button>
                <NuxtLink href="/bottle/user">
                    <button
                        class="transition-all duration-500 hover:cursor-pointer bg-gradient-to-bl from-teal-300 to-blue-200 hover:from-teal-400 hover:to-blue-300 mx-1 w-fit p-2 rounded text-black"
                    >
                        Manage
                    </button></NuxtLink
                >
            </div>
        </div>
        <!--MAIN APP-->
        <div><slot></slot></div>
    </div>
    <div class="block md:hidden">
        <div
            class="text-md justify-center absolute inset-0 flex flex-col text-center"
        >
            <span
                >Sorry, but mobile devices aren't supported on the bottle.
                😔</span
            >
            <span
                >If you know how can I make the login system better, you can add
                <a
                    href="https://github.com/hpware/authly/issues/new"
                    class="hover:cursor-pointer text-blue-300 hover:text-blue-200 underline transition-all duration-300"
                    >a GitHub Issue to the repo.</a
                ></span
            >
        </div>
    </div>
</template>
