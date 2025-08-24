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
const uuid_data = ref();
const captcha_data = ref();
const error = ref();
const errorMsg = ref();

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
    if (checkSessionSystem.loggedin === true) {
        router.push("/bottle/");
    }
});

const submitData = async () => {
    try {
        error.value = false;
        if (
            !(
                captcha_data.value &&
                uuid_data.value &&
                uuid_data.value.match(
                    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
                )
            )
        ) {
            error.value = true;
            errorMsg.value = `there is nothing i can do, other than waiting you to enter all the data.`;
            return;
        }
        const normalizedAnswer = captcha_data.value.toLowerCase().trim();
        const validAnswers = [
            "qin shi huang",
            "qinshihuang",
            "秦始皇",
            "qin shi huangdi",
            "qinshihuangdi",
            "idk", // yeah some ppl just don't know this
            "🐻‍❄️",
        ];
        if (!validAnswers.some((answer) => normalizedAnswer.includes(answer))) {
            error.value = true;
            errorMsg.value = `Huh, what even is this answer? You could've put in "idk" or "🐻‍❄️" as the answer`;
            return;
        }
        const req = await fetch("/api/ditchcopypaste", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: uuid_data.value,
                captcha_data: captcha_data.value,
                video_json_data: videoData.value,
            }),
        });
        if (!req.ok) {
            error.value = true;
            errorMsg.value = `yeah network issues`;
            return;
        }
        const res = await req.json();
        if (res.true !== "yes") {
            error.value = true;
            errorMsg.value = res.msg;
            return;
        }
        router.push("/bottle");
    } catch (e) {
        error.value = true;
        errorMsg.value = e.msg;
        return;
    }
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
                    class="text-teal-300 hover:text-teal-200 duration-300 transition-all"
                    >signup</a
                >
                for an account!
            </h2>
            <span class="text-md">Please enter your UUID that you set.</span>
            <input
                type="text"
                class="text-center text-white border mx-auto w-[70%] p-1 my-1 rounded"
                v-model="uuid_data"
            />
            <span class="text-md"
                >To prevent bots, please answer the question below.</span
            >
            <span class="text-sm"
                >Who is the "emperor" that has rode a polar bear in a popular
                meme?</span
            >
            <input
                type="text"
                class="text-center text-white border mx-auto w-[70%] p-1 my-1 rounded"
                v-model="captcha_data"
            />
            <span v-if="error" class="text-red-300">{{ errorMsg }}</span>
            <button
                class="transition-all duration-500 hover:cursor-pointer bg-gradient-to-bl from-teal-300 to-blue-200 hover:from-teal-400 hover:to-blue-300 mx-auto w-fit p-2 rounded text-black"
                @click="submitData"
            >
                Submit
            </button>
            <div
                class="flex flex-row justify-center text-center text-transparent bg-clip-text bg-gradient-to-tl from-blue-300 to-sky-400 gap-1"
            >
                <span>Stats!</span>
                <span>Total Videos: {{ totalVideoCount }}</span>
                <span>Total Likes: {{ totalLikeVideoCount }}</span>
                <span>Total Saves: {{ totalSaveCount }}</span>
            </div>
            <span
                class="text-xs hover:text-gray-100/50 text-black duration-100 transition-all"
                >psst, open the console to see the json!</span
            >
        </div>
        <DoomScroll
            class="max-w-1/2 absolute inset-y-0 right-0 mr-12"
            @send-data="sendData"
        />
    </div>
</template>
