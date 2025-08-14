<script lang="ts" setup>
import generateRandomString from "@/lib/generateRandomString";
import { ArrowBigDownDash, ThumbsUp, Bookmark } from "lucide-vue-next";

interface Video {
    url: string;
    liked: boolean;
    saved: boolean;
    current: boolean;
}

const videos = ref<Video[]>([
    {
        url: "https://github.yuanhau.com/authly/videos/dlv1.mp4",
        liked: false,
        saved: false,
        current: false,
    },
    {
        url: "https://github.yuanhau.com/authly/videos/dlv2.mp4",
        liked: false,
        saved: false,
        current: false,
    },
    {
        url: "https://github.yuanhau.com/authly/videos/dlv3.mp4",
        liked: false,
        saved: false,
        current: false,
    },
    {
        url: "https://github.yuanhau.com/authly/videos/dlv4.mp4",
        liked: false,
        saved: false,
        current: false,
    },
    {
        url: "https://github.yuanhau.com/authly/videos/dlv5.mp4",
        liked: false,
        saved: false,
        current: false,
    },
    {
        url: "https://github.yuanhau.com/authly/videos/dlv6.mp4",
        liked: false,
        saved: false,
        current: false,
    },
    {
        url: "https://github.yuanhau.com/authly/videos/dlv7.mp4",
        liked: false,
        saved: false,
        current: false,
    },
    {
        url: "https://github.yuanhau.com/authly/videos/dlv8.mp4",
        liked: false,
        saved: false,
        current: false,
    },
    {
        url: "https://github.yuanhau.com/authly/videos/dlv9.mp4",
        liked: false,
        saved: false,
        current: false,
    },
    {
        url: "https://github.yuanhau.com/authly/videos/dlv10.mp4",
        liked: false,
        saved: false,
        current: false,
    },
    {
        url: "https://github.yuanhau.com/authly/videos/dlv11.mp4",
        liked: false,
        saved: false,
        current: false,
    },
    {
        url: "https://github.yuanhau.com/authly/videos/dlv12.mp4",
        liked: false,
        saved: false,
        current: false,
    },
    {
        url: "https://github.yuanhau.com/authly/videos/dlv13.mp4",
        liked: false,
        saved: false,
        current: false,
    },
]);

const currentReplayIndex = ref(0);
const loadMoreVideos = () => {
    videos.value.push({
        url: videos.value[currentReplayIndex.value].url,
        liked: false,
        saved: false,
        current: false,
    });
    currentReplayIndex.value += 1;
};

const toggleVideo = (event: Event, url: string) => {
    const video = videos.value.find((v) => v.url === url);
    const videoElement = event.target as HTMLVideoElement;
    if (videoElement.paused) {
        videoElement.play();
        if (video) video.current = true;
    } else {
        videoElement.pause();
        if (video) video.current = false;
    }
};

onMounted(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    loadMoreVideos();
                }
            });
        },
        { threshold: 0.5 },
    );

    const lastVideoElement = document.querySelector(".vidcontainer:last-child");
    if (lastVideoElement) {
        observer.observe(lastVideoElement);
    }
    loadMoreVideos();
});
</script>
<template>
    <div>
        <div class="vidcontainer">
            <div
                class="min-h-[99dvh] min-w-[98wvh] m-1 text-center justify-center flex flex-col align-middle border rounded"
            >
                <span>Start scrolling to get started!</span>
                <ArrowBigDownDash
                    class="text-center justify-center align-middle mx-auto w-12 h-12"
                />
            </div>
            <div v-for="video in videos" class="text-lg m-2">
                <video
                    class="max-h-screen min-w-[98wvh]"
                    :src="video.url"
                    loop
                    :autoplay="video.current"
                    @click="(event) => toggleVideo(event, video.url)"
                />
                <span>{{ JSON.stringify(video) }}</span>
                <div class="flex flex-row gap-2 pl-2 py-2">
                    <button><ThumbsUp /></button>
                    <button><Bookmark /></button>
                </div>
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
