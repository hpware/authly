<script lang="ts" setup>
import generateRandomString from "@/lib/generateRandomString";

const videos = ref([
    {
        url: "vOdxS-k_lac",
        liked: false,
        saved: false,
    },
]);

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
});
</script>
<template>
    <div>
        <div class="vidcontainer">
            <div v-for="video in videos" class="text-lg">
                <video :src="video.url" />
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
