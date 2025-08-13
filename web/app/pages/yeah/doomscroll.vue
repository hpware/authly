<script lang="ts" setup>
import generateRandomString from "@/lib/generateRandomString";
import { ref, onMounted } from "vue";

// State management
const isWindows = ref(false);
const requestString = ref("");
const currentVideoIndex = ref(0);
const videos = ref([
    {
        id: "vOdxS-k_lac", // Example YouTube video ID
        title: "Sample Video 1",
        likes: 0,
        notes: [],
    },
    {
        id: "vOdxS-k_lac", // Example YouTube video ID
        title: "Sample Video 1",
        likes: 0,
        notes: [],
    },
    {
        id: "vOdxS-k_lac", // Example YouTube video ID
        title: "Sample Video 1",
        likes: 0,
        notes: [],
    },
    {
        id: "vOdxS-k_lac", // Example YouTube video ID
        title: "Sample Video 1",
        likes: 0,
        notes: [],
    },
    {
        id: "vOdxS-k_lac", // Example YouTube video ID
        title: "Sample Video 1",
        likes: 0,
        notes: [],
    },
    {
        id: "vOdxS-k_lac", // Example YouTube video ID
        title: "Sample Video 1",
        likes: 0,
        notes: [],
    },
    {
        id: "vOdxS-k_lac", // Example YouTube video ID
        title: "Sample Video 1",
        likes: 0,
        notes: [],
    },
    {
        id: "vOdxS-k_lac", // Example YouTube video ID
        title: "Sample Video 1",
        likes: 0,
        notes: [],
    },
    {
        id: "vOdxS-k_lac", // Example YouTube video ID
        title: "Sample Video 1",
        likes: 0,
        notes: [],
    },
    // Add more video objects as needed
]);

// Browser identification setup
onMounted(() => {
    if (navigator.userAgent.includes("Windows")) {
        isWindows.value = true;
    }
    const browserID = localStorage.getItem("browserID");
    const randomString = generateRandomString(20);
    if (!browserID || !browserID.match(/^[a-zA-Z0-9-_.]{20}$/)) {
        requestString.value = randomString;
        localStorage.setItem("browserID", randomString);
    } else {
        requestString.value = browserID;
    }

    // Set up Intersection Observer for infinite scroll
    setupInfiniteScroll();
});

// Video interaction methods
const likeVideo = (videoIndex: number) => {
    videos.value[videoIndex].likes++;
};

const addNote = (videoIndex: number, note: string) => {
    videos.value[videoIndex].notes.push({
        text: note,
        timestamp: new Date().toISOString(),
        user: requestString.value,
    });
};

// Infinite scroll setup
const setupInfiniteScroll = () => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Load more videos when reaching the bottom
                    loadMoreVideos();
                }
            });
        },
        { threshold: 0.5 },
    );

    // Observe the last video container
    const lastVideoElement = document.querySelector(
        ".video-container:last-child",
    );
    if (lastVideoElement) {
        observer.observe(lastVideoElement);
    }
};

const loadMoreVideos = () => {
    // Add more videos to the videos array
    // This is where you would typically fetch more videos from your API
    videos.value.push({
        id: generateRandomString(11), // YouTube videos have 11-character IDs
        title: `Video ${videos.value.length + 1}`,
        likes: 0,
        notes: [],
    });
};

// Keep your existing methods
const getLoginHook = () => {};
const checkIfUserIsDone = async () => {
    const req = await fetch("/api/ditchcopypaste");
    const res = await req.json();
};
</script>

<template>
    <div class="flex flex-col h-screen bg-black text-white">
        <!-- Header -->
        <header class="p-4 border-b border-gray-800">
            <h2 class="text-xl font-bold">YouTube Shorts Experience</h2>
        </header>

        <!-- Main content area -->
        <main class="flex-1 overflow-hidden flex justify-center bg-black">
            <!-- Video feed -->
            <div
                class="snap-y snap-mandatory h-full overflow-y-scroll w-full max-w-[500px]"
            >
                <div
                    v-for="(video, index) in videos"
                    :key="video.id"
                    class="video-container h-screen w-full snap-start relative flex justify-center"
                >
                    <!-- Video wrapper with correct aspect ratio -->
                    <div
                        class="relative w-full max-w-[500px] h-full flex justify-center"
                    >
                        <div
                            class="w-full h-full max-h-[calc(100vh-120px)] relative"
                        >
                            <!-- YouTube iframe with shorts embed -->
                            <iframe
                                :src="`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1&playsinline=1&enablejsapi=1&widgetid=1&controls=0&loop=1`"
                                class="absolute inset-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen
                            ></iframe>

                            <!-- Video overlay controls -->
                            <div class="absolute inset-0 pointer-events-none">
                                <!-- Right sidebar controls -->
                                <div
                                    class="absolute right-4 bottom-20 flex flex-col gap-6 items-center pointer-events-auto"
                                >
                                    <button
                                        @click="likeVideo(index)"
                                        class="flex flex-col items-center"
                                    >
                                        <div
                                            class="w-12 h-12 flex items-center justify-center rounded-full bg-white/10"
                                        >
                                            <span class="text-2xl">👍</span>
                                        </div>
                                        <span class="text-sm mt-1">{{
                                            video.likes
                                        }}</span>
                                    </button>
                                    <button class="flex flex-col items-center">
                                        <div
                                            class="w-12 h-12 flex items-center justify-center rounded-full bg-white/10"
                                        >
                                            <span class="text-2xl">💬</span>
                                        </div>
                                        <span class="text-sm mt-1">{{
                                            video.notes.length
                                        }}</span>
                                    </button>
                                    <button class="flex flex-col items-center">
                                        <div
                                            class="w-12 h-12 flex items-center justify-center rounded-full bg-white/10"
                                        >
                                            <span class="text-2xl">↪️</span>
                                        </div>
                                        <span class="text-sm mt-1">Share</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<style scoped>
.video-container {
    scroll-snap-align: start;
    scroll-snap-stop: always;
}
</style>
