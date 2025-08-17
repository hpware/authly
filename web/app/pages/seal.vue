<script lang="ts" setup>
useSeoMeta({
    title: "Seal Register | The Bottle TODO System!",
});

import generateRandomString from "@/lib/generateRandomString";
import DoomScroll from "@/components/doomscrolling.vue";
import { v4 as uuidv4 } from "uuid";

const uuidEnter = ref();
const captchaAnswer = ref();
const error = ref(false);
const errorHTML = ref();
const videoData = ref();

const sendData = (remoteData: any) => {
    videoData.value = remoteData;
};

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
        ];
        if (!validAnswers.some((answer) => normalizedAnswer.includes(answer))) {
            error.value = true;
            errorHTML.value = `Huh, what even is this answer? You could've put in "idk" as the answer`;
            return;
        }
    } catch (e) {
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
                class="hover:cursor-pointer p-2 bg-gray-300 mx-auto w-fit p-2 rounded"
                @click="submitSeal"
            >
                Submit
            </button>
        </div>
        <DoomScroll
            class="max-w-1/2 absolute inset-y-0 right-0 mr-12"
            @send-data="sendData"
        />
    </div>
</template>
<!--psst, the answer is Qin Shi Huang or (秦始皇) both works-->
