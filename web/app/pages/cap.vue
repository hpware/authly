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
    <div class="flex flex-col">
        <h2>Welcome to the bottle! Please login or signup for an account!</h2>
        <span
            >Please doomscoll to match the pin code you set on the signup
            process!</span
        >
        <input type="text" placeholder="Please enter your uuid" />
        <span>Swipe to your pin number!</span>
        <span
            >You are currently on the number
            <span class="underline text-underline">0001</span></span
        >
        <button>Submit</button>
    </div>
</template>
