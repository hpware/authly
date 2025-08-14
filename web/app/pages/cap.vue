<script lang="ts" setup>
import generateRandomString from "@/lib/generateRandomString";
import DoomScroll from "@/components/doomscrolling.vue";
</script>
<template>
  <div class="flex flex-row p-2 m-2 max-w-full">
    <div class="flex flex-col max-w-full md:max-w-1/2 fixed">
      <h2 class="text-lg">Welcome to the bottle! Please login or signup for an account!</h2>
      <span class="text-sm"
        >ENter your UUID that you set!</span
      >
      <input type="text" class="text-sm" placeholder="Please enter your uuid" />
      <span class="text-sm"
        >Please doomscoll to match the pin code you set on the signup
        process!</span
      >
      <span  class="text-sm"
        >You are currently on the number
        <span class="underline text-underline text-sm">0001</span></span
      >
      <span  class="text-sm">To prevent bots, please answer the question below.</span>
      <span  class="text-sm"
        >Who rode the polar bear (hint hint, it a old emperor of china from the
        chieng dynasty, and it's a meme)</span
      >
      <span class="text-gray-500 text-xs"
        >psst, the source code contains the answer</span
      >
      <!--ChatGPT: https://chatgpt.com/share/689d440a-cc3c-8003-bc7d-8ef969e61e19-->
      <input type="text"  class="text-sm" />
      <!--psst, the answer is Qin Shi Huang or (秦始皇) both works-->
      <button  class="text-sm">Submit</button>
      <span  class="text-sm"    
        >Don't have a account? <a href="/seal">Get to the seal here!</a></span
      >
    </div>
        <DoomScroll />
  </div>
</template>
