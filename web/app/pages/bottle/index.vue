<script setup lang="ts">
useSeoMeta({
    title: "Bottle! | The Bottle TODO System!",
});
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
    <div>
        <h1 class="text-3xl p-2 m-2">Todo manager!</h1>
        <span>{{ user }}</span>
        <button
            class="hover:cursor-pointer bg-gray-300 mx-auto w-fit p-2 rounded"
            @click="logoutAction"
        >
            Logout
        </button>
        <div class="flex flex-col ml-4">
            <span>Put your todos' here!</span>
            <input type="text" />
            <button
                class="hover:cursor-pointer bg-gray-300 mx-auto w-fit p-2 rounded"
            >
                Submit!
            </button>
        </div>
        <table class="flex flex-col">
            <thead class="flex flex-row">
                <tr>
                    AAAAAdf dw
                </tr>
            </thead>
            <tbody class="flex flex-row">
                <tr>
                    AAAAAcdocdcd
                </tr>
                <tr>
                    AAAAAcdocdcd
                </tr>
                <tr>
                    AAAAAcdocdcd
                </tr>
                <tr>
                    AAAAAcdocdcd
                </tr>
                <tr>
                    AAAAAcdocdcd
                </tr>
            </tbody>
        </table>
    </div>
</template>
