<script lang="ts" setup>
useSeoMeta({
    title: "Cap Login | The Bottle TODO System!",
});

import generateRandomString from "@/lib/generateRandomString";
import DoomScroll from "@/components/doomscrolling.vue";
const videoData = ref();

const sendData = (remoteData: any) => {
    videoData.value = remoteData;
};
</script>
<template>
    <div class="">
        <div
            class="flex flex-col absolute inset-y-0 left-0 justify-center text-center w-1/2"
        >
            <h2 class="text-xl">
                Welcome to the bottle! Please login or
                <a
                    href="/seal"
                    class="text-blue-500 hover:text-blue-400 duration-300 transition-all"
                    >signup</a
                >
                for an account!
            </h2>
            <span class="text-md">Please enter your UUID that you set.</span>
            <input
                type="text"
                class="text-center text-gray-600 border mx-auto w-[70%] p-1 my-1 rounded"
            />
            <input type="text" class="text-md text-center" />
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
        <DoomScroll
            class="max-w-1/2 absolute inset-y-0 right-0 mr-12"
            @send-data="sendData"
        />
    </div>
</template>
