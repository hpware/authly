<script lang="ts" setup>
import generateRandomString from "@/lib/generateRandomString";
import { ArrowBigDownDash, ThumbsUp, Bookmark } from "lucide-vue-next";

interface Video {
    id: string;
    url: string;
    liked: boolean;
    saved: boolean;
    current: boolean;
}
let keepTrackOfTheIdInCaseIBrokeItLater = 0;

const getId = (() => {
    return () => ++keepTrackOfTheIdInCaseIBrokeItLater;
})();

const videos = ref<Video[]>([
    {
        id: getId(),
        url: "https://github.yuanhau.com/authly/videos/dlv1.mp4",
        liked: false,
        saved: false,
        current: false,
    },
    {
        id: getId(),
        url: "https://github.yuanhau.com/authly/videos/dlv2.mp4",
        liked: false,
        saved: false,
        current: false,
    },
    {
        id: getId(),
        url: "https://github.yuanhau.com/authly/videos/dlv3.mp4",
        liked: false,
        saved: false,
        current: false,
    },
    {
        id: getId(),
        url: "https://github.yuanhau.com/authly/videos/dlv4.mp4",
        liked: false,
        saved: false,
        current: false,
    },
    {
        id: getId(),
        url: "https://github.yuanhau.com/authly/videos/dlv5.mp4",
        liked: false,
        saved: false,
        current: false,
    },
    {
        id: getId(),
        url: "https://github.yuanhau.com/authly/videos/dlv6.mp4",
        liked: false,
        saved: false,
        current: false,
    },
    {
        id: getId(),
        url: "https://github.yuanhau.com/authly/videos/dlv7.mp4",
        liked: false,
        saved: false,
        current: false,
    },
    {
        id: getId(),
        url: "https://github.yuanhau.com/authly/videos/dlv8.mp4",
        liked: false,
        saved: false,
        current: false,
    },
    {
        id: getId(),
        url: "https://github.yuanhau.com/authly/videos/dlv9.mp4",
        liked: false,
        saved: false,
        current: false,
    },
    {
        id: getId(),
        url: "https://github.yuanhau.com/authly/videos/dlv10.mp4",
        liked: false,
        saved: false,
        current: false,
    },
    {
        id: getId(),
        url: "https://github.yuanhau.com/authly/videos/dlv11.mp4",
        liked: false,
        saved: false,
        current: false,
    },
    {
        id: getId(),
        url: "https://github.yuanhau.com/authly/videos/dlv12.mp4",
        liked: false,
        saved: false,
        current: false,
    },
    {
        id: getId(),
        url: "https://github.yuanhau.com/authly/videos/dlv13.mp4",
        liked: false,
        saved: false,
        current: false,
    },
]);

const currentReplayIndex = ref(0);
const loadMoreVideos = () => {
    console.log(currentReplayIndex.value);
    videos.value.push({
        id: getId(),
        url: videos.value[currentReplayIndex.value].url,
        liked: false,
        saved: false,
        current: false,
    });
    currentReplayIndex.value += 1;
};

const toggleVideo = (event: Event, id: string) => {
    const video = videos.value.find((v) => v.id === id);
    const videoElement = event.target as HTMLVideoElement;
    if (videoElement.paused) {
        videoElement.play();
        if (video) video.current = true;
    } else {
        videoElement.pause();
        if (video) video.current = false;
    }
};

const likeVideo = (id: string) => {
    const video = videos.value.find((v) => v.id === id);
    if (video) video.liked = !video.liked;
};

const saveVideo = (id: string) => {
    const video = videos.value.find((v) => v.id === id);
    if (video) video.saved = !video.saved;
};

onMounted(() => {
    console.log(videos.value);
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    //loadMoreVideos();
                }
            });
        },
        { threshold: 0.5 },
    );

    const lastVideoElement = document.querySelector(".vidcontainer:last-child");
    if (lastVideoElement) {
        observer.observe(lastVideoElement);
    }
});

// TEMP SOL
const loadMoreVideosCount = ref(0);
const loadMoreVideosForm = (e: Event) => {
    e.preventDefault();
    const count = loadMoreVideosCount.value - 1;
    for (let i = 0; i < count; i++) {
        //loadMoreVideos();
        console.log(videos.value);
    }
};
</script>
<template>
    <div>
        <div class="vidcontainer">
            <div
                class="min-h-[99dvh] min-w-[98wvh] m-1 text-center justify-center flex flex-col align-middle border rounded"
            >
                <span>Please do to password action!</span>
                <ArrowBigDownDash
                    class="text-center justify-center align-middle mx-auto w-12 h-12"
                />
            </div>
            <div v-for="video in videos" class="text-lg m-2" :key="video.id">
                <div class="vidcontainer">
                    <video
                        class="max-h-screen min-w-[98wvh]"
                        :src="video.url"
                        loop
                        preload="auto"
                        playsinline
                        :autoplay="video.current"
                        @click="(event) => toggleVideo(event, video.id)"
                    />
                </div>
                <span>{{ JSON.stringify(video) }}</span>
                <div class="flex flex-row gap-2 pl-2 py-2">
                    <button
                        @click="
                            () => {
                                likeVideo(video.id);
                            }
                        "
                    >
                        <ThumbsUp
                            :class="{ 'text-black fill-red-300': video.liked }"
                        />
                    </button>
                    <button
                        @click="
                            () => {
                                saveVideo(video.id);
                            }
                        "
                    >
                        <Bookmark
                            :class="{ 'text-black fill-black': video.saved }"
                        />
                    </button>
                </div>
                <!--TEMP SOL-->
                <!--<form
                    @submit.prevent="loadMoreVideosForm"
                    v-if="video.id === keepTrackOfTheIdInCaseIBrokeItLater"
                    class="flex flex-row gap-2 m-2 p-2 pb-4"
                >
                    <input
                        type="number"
                        max="100"
                        min="1"
                        v-model="loadMoreVideosCount"
                    />
                    <button>Submit</button>
                    </form>-->
            </div>
        </div>
    </div>
</template>
<style>
.vidcontainer {
    scroll-snap-align: start;
    scroll-snap-stop: always;
}
</style>
