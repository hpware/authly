<script lang="ts" setup>
import { videos } from "./videos";
const currentVideoIndex = ref(0);
const currentVideo = computed(() => videos[currentVideoIndex.value]);
const videoUpstuff = ref({ videos });

// Actions!
const likeVideo = (index: number) => {
  videoUpstuff.value[index].liked = !videoUpstuff.value[index].liked;
};
const nenVideo = (index: number) => {
  videoUpstuff.value[index].nen = !videoUpstuff.value[index].nen;
};

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          currentVideoIndex.value = videos.findIndex(
            (video) => video.id === entry.target.id,
          );
        }
      });
    },
    { threshold: 0.5 },
  );
  const lastVideoElement = document.querySelector(".video-container:last-child");
  if (lastVideoElement) {
    observer.observe(lastVideoElement);
  }
});
</script>
<template>
  <div>
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
          <div class="relative w-full max-w-[500px] h-full flex justify-center">
            <div class="w-full h-full max-h-[calc(100vh-120px)] relative">
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
                    <span class="text-sm mt-1">{{ video.likes }}</span>
                  </button>
                  <button class="flex flex-col items-center">
                    <div
                      class="w-12 h-12 flex items-center justify-center rounded-full bg-white/10"
                    >
                      <span class="text-2xl">💬</span>
                    </div>
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
