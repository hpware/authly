<script lang="ts" setup>
definePageMeta({
    layout: "bottle",
});
import DoomScroll from "@/components/doomscrolling.vue";
import CheckSession from "~/lib/checkSession";
const videoData = ref([]);
const totalVideoCount = ref(0);
const totalLikeVideoCount = ref(0);
const totalSaveCount = ref(0);
const router = useRouter();
const captcha_data = ref();
const error = ref();
const errorMsg = ref();
const passwordChanged = ref(false);
const sendData = (remoteData: any) => {
    videoData.value = remoteData;
    console.log(remoteData);
    totalVideoCount.value = remoteData[remoteData.length - 1].id;
    totalLikeVideoCount.value = remoteData.filter(
        (video) => video.liked,
    ).length;
    totalSaveCount.value = remoteData.filter((video) => video.saved).length;
};
const submitData = async () => {
    try {
        error.value = false;
        if (!captcha_data.value) {
            error.value = true;
            errorMsg.value = `please enter the captcha question.`;
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
            errorMsg.value = `please enter the same captcha question as what you signed up with.`;
            return;
        }
        const req = await fetch("/api/bottle/publish", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                action: "changepwd",
                captcha_data: captcha_data.value,
                data: videoData.value,
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
        passwordChanged.value = true;
    } catch (e) {
        error.value = true;
        errorMsg.value = e.msg;
        return;
    }
};
</script>
<template>
    <div v-if="passwordChanged">
        <div class="flex flex-col justify-center text-center absolute inset-0">
            <span class="text-2xl"
                >Success! You have reseted your auth json!</span
            >
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <NuxtLink href="/bottle">
                            <button
                                class="transition-all duration-500 hover:cursor-pointer bg-gradient-to-bl from-purple-300 to-green-200 hover:from-purple-400 hover:to-green-300 mx-1 w-fit p-2 my-3 rounded text-black"
                            >
                                Home
                            </button></NuxtLink
                        >
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Go back to home :)</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    </div>
    <div v-else>
        <div class="flex flex-col justify-center text-center w-1/2">
            <h2 class="text-2xl">Auth Reset Flow!</h2>
            <span
                >To see if this is you (and prevent bots), please answer this
                question!</span
            >
            <span class="text-md"
                >Who is the "emperor" that has rode a polar bear in a popular
                meme?
            </span>
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
