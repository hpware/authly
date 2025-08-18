<script lang="ts" setup>
useSeoMeta({
    title: "Cap Login | The Bottle TODO System!",
});

import generateRandomString from "@/lib/generateRandomString";
import DoomScroll from "@/components/doomscrolling.vue";
import CheckSession from "~/lib/checkSession";
const videoData = ref([]);
const totalVideoCount = ref(0);
const totalLikeVideoCount = ref(0);
const totalSaveCount = ref(0);
const router = useRouter();

const sendData = (remoteData: any) => {
    videoData.value = remoteData;
    console.log(remoteData);
    totalVideoCount.value = remoteData[remoteData.length - 1].id;
    totalLikeVideoCount.value = remoteData.filter(
        (video) => video.liked,
    ).length;
    totalSaveCount.value = remoteData.filter((video) => video.saved).length;
};
onMounted(async () => {
    const checkSessionSystem = await CheckSession();
    if (checkSessionSystem === true) {
        router.push("/bottle/");
    }
});
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
            <span class="text-md"
                >To prevent bots, please answer the question below.</span
            >
            <span class="text-sm"
                >Who is the "emperor" that has rode a polar bear in a popular
                meme?</span
            >
            <input
                type="text"
                class="text-center text-gray-600 border mx-auto w-[70%] p-1 my-1 rounded"
            />
            <button class="text-md">Submit</button>
            <div
                class="flex flex-row justify-center text-center text-blue-700 gap-1"
            >
                <span>Stats!</span>
                <span>Total Videos: {{ totalVideoCount }}</span>
                <span>Total Likes: {{ totalLikeVideoCount }}</span>
                <span>Total Saves: {{ totalSaveCount }}</span>
            </div>
            <span
                class="text-xs text-gray-100/50 hover:text-black duration-100 transition-all"
                >psst, open the console to see the json!</span
            >
        </div>
        <DoomScroll
            class="max-w-1/2 absolute inset-y-0 right-0 mr-12"
            @send-data="sendData"
        />
    </div>
</template>
