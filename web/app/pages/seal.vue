<script lang="ts" setup>
import generateRandomString from "@/lib/generateRandomString";
</script>
<template>
    <div class="flex flex-col">
        <h2>Welcome to the bottle cap sealer!</h2>
        <input type="text" placeholder="Please enter your uuid of choice!" />
        <span
            >you can get one at
            <a href="https://everyuuid.com">everyuuid.com </a></span
        >
        <input type="number" />
        <span
            >Number of likes for each 10 posts (interval) for every 10 scrolls
            resets this number</span
        >
        <input type="number" />
        <span>To prevent bots, please answer the question below.</span>
        <span
            >Who rode the polar bear (hint hint, it a old emperor of china from
            the chieng times, and it's a meme)</span
        >
        <input type="text" />
    </div>
</template>
<!--psst, the answer is Qin Shi Huang or (秦始皇) both works-->
