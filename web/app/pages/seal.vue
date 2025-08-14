<script lang="ts" setup>
import generateRandomString from "@/lib/generateRandomString";
import DoomScroll from "@/components/doomscrolling.vue";
</script>
<template>
  <div class="flex flex-col">
    <h2>Welcome to the bottle cap sealer!</h2>
    <input type="text" placeholder="Please enter your uuid of choice!" />
    <span
      >you can get one at
      <a href="https://everyuuid.com">everyuuid.com </a></span
    >
    <DoomScroll />
    <span>To prevent bots, please answer the question below.</span>
    <span
      >Who rode the polar bear (hint hint, it a old emperor of china from the
      chieng dynasty, and it's a meme)</span
    >
    <span class="text-gray-500 text-xs"
      >you can throw the thing into chatgpt and it will return the answer
      btw</span
    >
    <!--ChatGPT: https://chatgpt.com/share/689d440a-cc3c-8003-bc7d-8ef969e61e19-->
    <input type="text" />
    <!--psst, the answer is Qin Shi Huang or (秦始皇) both works-->
  </div>
</template>
