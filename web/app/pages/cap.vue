<script lang="ts" setup>
import generateRandomString from "@/lib/generateRandomString";
const isWindows = ref(false);
const requestString = ref("");
onMounted(() => {
    if (navigator.userAgent.includes("Windows")) {
        isWindows.value = true;
    }
    const browserID = localStorage.getItem("browserID");
    const randomString = generateRandomString(20);
    if (!browserID || !browserID.match(/^[a-zA-Z0-9-_.]{20}$/)) {
        requestString.value = randomString;
        localStorage.setItem("browserID", randomString);
    } else {
        requestString.value = browserID;
    }
});

const getLoginHook = () => {};

const checkIfUserIsDone = async () => {
    const req = await fetch("/api/ditchcopypaste");
    const res = await req.json();
};
</script>
<template>
    <div class="flex flex-col">
        <h2>
            Welcome to the bottle! Please login or signup for an account! You
            can do both here!
        </h2>
        <span
            >Please doomscoll and like or note the specitfic posts to login!
        </span>
        <input type="text" placeholder="Please enter your uuid" />
        <span
            >you can get one at
            <a href="https://everyuuid.com">everyuuid.com </a></span
        >
        <!--DOOMSCROLL-->
    </div>
</template>
