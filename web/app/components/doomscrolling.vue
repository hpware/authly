<script lang="ts" setup>
import generateRandomString from "@/lib/generateRandomString";
import {
    ArrowBigDownDash,
    ThumbsUp,
    Bookmark,
    Play,
    Pause,
} from "lucide-vue-next";

interface Video {
    id: string;
    url: string;
    liked: boolean;
    saved: boolean;
    current: boolean;
}

let keepTrackOfTheIdInCaseIBrokeItLater = 0;

const emit = defineEmits(["sendData"]);

const getId = (() => {
    return () => ++keepTrackOfTheIdInCaseIBrokeItLater;
})();

const videos = ref<Video[]>([
    {
        id: getId(),
        url: "https://github.yuanhau.com/authly/videos/dlv7.mp4",
        liked: false,
        saved: false,
        current: false,
    },
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
    const newVideo = {
        id: getId(),
        url: videos.value[currentReplayIndex.value].url,
        liked: false,
        saved: false,
        current: false,
    };
    videos.value.push(newVideo);
    currentReplayIndex.value = (currentReplayIndex.value + 1) % 13;
};

// Keep track of currently playing video
const currentVideoId = ref<string | null>(null);

// Enhanced video playback control
const handleVideoIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        const videoId = video.dataset.videoId;

        if (entry.isIntersecting) {
            // If this is a new video becoming visible
            if (currentVideoId.value !== videoId) {
                // Pause the previous video if it exists
                if (currentVideoId.value) {
                    const prevVideo = document.querySelector(
                        `video[data-video-id="${currentVideoId.value}"]`,
                    ) as HTMLVideoElement;
                    if (prevVideo) {
                        prevVideo.pause();
                        const prevVideoObj = videos.value.find(
                            (v) => v.id === currentVideoId.value,
                        );
                        if (prevVideoObj) prevVideoObj.current = false;
                    }
                }

                // Play the new video
                video.play().catch((e) => console.log("Video play failed:", e));
                if (videoId) {
                    currentVideoId.value = videoId;
                    const videoObj = videos.value.find((v) => v.id === videoId);
                    if (videoObj) videoObj.current = true;
                }
            }
        }
    });
};

const toggleVideo = (event: Event, id: string) => {
    const videoElement = event.target as HTMLVideoElement;
    const video = videos.value.find((v) => v.id === id);

    if (videoElement.paused) {
        videoElement.play();
        if (video) {
            video.current = true;
            currentVideoId.value = id;
        }
    } else {
        videoElement.pause();
        if (video) {
            video.current = false;
            if (currentVideoId.value === id) {
                currentVideoId.value = null;
            }
        }
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
    // Video playback observer
    const videoObserver = new IntersectionObserver(handleVideoIntersection, {
        threshold: 0.7,
    });

    // Infinite scroll observer
    const infiniteScrollObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    loadMoreVideos();
                }
            });
        },
        {
            rootMargin: "100px", // Start loading before reaching the end
            threshold: 0,
        },
    );

    // Initial setup
    const setupObservers = () => {
        // Observe all videos for playback
        document.querySelectorAll("video").forEach((video) => {
            videoObserver.observe(video);
        });

        // Observe last video for infinite scroll
        const lastVideo = document.querySelector(".vidcontainer:last-child");
        if (lastVideo) {
            infiniteScrollObserver.observe(lastVideo);
        }
    };

    setupObservers();

    // Watch for changes in the videos array
    watch(
        videos,
        () => {
            nextTick(() => {
                // Disconnect infinite scroll observer before updating
                infiniteScrollObserver.disconnect();
                setupObservers();
            });
        },
        { deep: true },
    );

    watch(
        videos,
        (newVideos) => {
            emit("sendData", newVideos);
        },
        { deep: true, immediate: true },
    );

    // Start with the first video
    const firstVideo = document.querySelector("video") as HTMLVideoElement;
    if (firstVideo) {
        firstVideo
            .play()
            .catch((e) => console.log("Initial video play failed:", e));
        currentVideoId.value = firstVideo.dataset.videoId || null;
        if (currentVideoId.value) {
            const videoObj = videos.value.find(
                (v) => v.id === currentVideoId.value,
            );
            if (videoObj) videoObj.current = true;
        }
    }
});
</script>

<template>
    <div
        class="video-scroll-container overflow-y-scroll h-[100dvh] snap-y snap-mandatory"
    >
        <div class="vidcontainer">
            <div
                class="min-h-[99dvh] min-w-[98wvh] m-1 text-center justify-center flex flex-col align-middle border rounded"
            >
                <span>Please do to password action!</span>
                <ArrowBigDownDash
                    class="text-center justify-center align-middle mx-auto w-12 h-12"
                />
            </div>
        </div>
        <div
            v-for="(video, index) in videos"
            class="vidcontainer min-h-[100dvh] relative"
            :key="video.id"
        >
            <video
                class="w-full h-full object-cover"
                :src="video.url"
                loop
                :preload="index <= 1 ? 'auto' : 'none'"
                playsinline
                :data-video-id="video.id"
                :data-index="index"
                @click="(event) => toggleVideo(event, video.id)"
            />
            <div
                class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent justify-between flex flex-row"
            >
                <div class="flex flex-row gap-2 items-center">
                    <button
                        @click="() => likeVideo(video.id)"
                        class="bg-transparent p-2 rounded-full hover:bg-white/10"
                    >
                        <ThumbsUp
                            :class="{
                                'text-white fill-red-500': video.liked,
                                'text-white': !video.liked,
                            }"
                        />
                    </button>
                    <button
                        @click="() => saveVideo(video.id)"
                        class="bg-transparent p-2 rounded-full hover:bg-white/10"
                    >
                        <Bookmark
                            :class="{
                                'text-white fill-white': video.saved,
                                'text-white': !video.saved,
                            }"
                        />
                    </button>
                </div>
                <div
                    class="bg-transparent p-2 rounded-full hover:bg-white/10 text-white fill-white"
                >
                    <button>
                        <Play v-if="video.current" />
                        <Pause v-else />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.video-scroll-container {
    scroll-behavior: smooth;
}

.vidcontainer {
    scroll-snap-align: start;
    scroll-snap-stop: always;
}

video {
    max-height: 100dvh;
    width: 100%;
    object-fit: contain;
    background: black;
}
</style>
