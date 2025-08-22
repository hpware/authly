<script lang="ts" setup>
useSeoMeta({
    title: "Seal Register | The Bottle TODO System!",
});

import generateRandomString from "@/lib/generateRandomString";
import DoomScroll from "@/components/doomscrolling.vue";
import CheckSession from "~/lib/checkSession";

import { v4 as uuidv4 } from "uuid";

const uuidEnter = ref();
const captchaAnswer = ref();
const error = ref(false);
const errorHTML = ref();
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

const generateUUID = () => {
    uuidEnter.value = uuidv4();
};
const submitSeal = async () => {
    try {
        error.value = false;
        errorHTML.value = "";
        if (!captchaAnswer.value || !uuidEnter.value) {
            error.value = true;
            errorHTML.value = `Yeah, you didn't put in the values in.`;
            return;
        }
        const normalizedAnswer = captchaAnswer.value.toLowerCase().trim();
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
            errorHTML.value = `Huh, what even is this answer? You could've put in "idk" as the answer`;
            return;
        }
        const req = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                uuid: uuidEnter.value,
                captcha_answer: normalizedAnswer,
                video_json_data: videoData.value,
            }),
        });
        const res = await req.json();
        if (res.true !== "yes") {
            error.value = true;
            errorHTML.value = res.msg;
            return;
        }
        alert("You are signed in!");
        router.push("/bottle/");
    } catch (e) {
        console.error(e);
    } finally {
    }
};
</script>
<template>
    <div class="">
        <div
            class="flex flex-col absolute inset-y-0 left-0 justify-center text-center w-1/2"
        >
            <h2>Welcome to the bottle cap sealer!</h2>
            <span
                >lease enter your uuid of choice! or
                <button
                    @click="generateUUID"
                    class="hover:cursor-pointer hover:text-blue-300 text-blue-500 transition-all duration-300"
                >
                    generate one
                </button></span
            >
            <input
                type="text"
                v-model="uuidEnter"
                class="text-center text-gray-600 border mx-auto w-[70%] p-1 my-1 rounded"
            />
            <span class="text-md"
                >Who is the "emperor" that has rode a polar bear in a popular
                meme?
            </span>
            <input
                type="text"
                class="text-center text-gray-600 border mx-auto w-[70%] p-1 my-1 rounded"
                v-model="captchaAnswer"
            />
            <span v-if="error" class="text-red-600">{{ errorHTML }}</span>
            <button
                class="transition-all duration-500 hover:cursor-pointer bg-gradient-to-bl from-teal-300 to-blue-200 hover:from-teal-400 hover:to-blue-300 mx-auto w-fit p-2 rounded text-black"
                @click="submitSeal"
            >
                Submit
            </button>
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
<!--psst, the answer is Qin Shi Huang or (秦始皇) both works-->
