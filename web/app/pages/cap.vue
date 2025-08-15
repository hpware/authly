<script lang="ts" setup>
useSeoMeta({
    title: "Cap Login | The Bottle TODO System!",
});

import generateRandomString from "@/lib/generateRandomString";
import DoomScroll from "@/components/doomscrolling.vue";
</script>
<template>
    <div class="">
        <div
            class="flex flex-col absolute inset-y-0 left-0 justify-center text-center w-1/2"
        >
            <h2 class="text-xl">
                Welcome to the bottle! Please login or signup for an account!
            </h2>
            <span class="text-md"
                >Please doomscoll to match the pin code you set on the signup
                process!</span
            >
            <input
                type="text"
                class="text-md text-center"
                placeholder="Please enter your uuid"
            />
            <span class="text-md">Swipe to your pin number!</span>
            <span class="text-md"
                >You are currently on the number
                <span class="underline text-underline">0001</span></span
            >
            <span class="text-md"
                >To prevent bots, please answer the question below.</span
            >
            <span class="text-md"
                >Who is the "emperor" that has rode a polar bear in a popular
                meme?</span
            >
            <input type="text" class="text-md" />
            <button class="text-md">Submit</button>
        </div>
        <DoomScroll class="max-w-1/2 absolute inset-y-0 right-0 mr-12" />
    </div>
</template>
