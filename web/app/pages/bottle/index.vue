<script setup lang="ts">
useSeoMeta({
    title: "Bottle! | The Bottle TODO System!",
});
definePageMeta({
    layout: "bottle",
});
import CheckSession from "~/lib/checkSession";
import { RefreshCcw } from "lucide-vue-next";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
const router = useRouter();
const user = ref();
const textContent = ref();
const todoData = ref([]);
const error = ref(false);
const errorMsg = ref();
const updatingData = ref(false);
const lastUpdatedAt = ref();

const getData = async () => {
    try {
        const req = await fetch("/api/bottle/get_data");
        if (!req.ok) {
            console.error("Request Failed!");
            return;
        }
        const res = await req.json();
        if (res.true !== "yes") {
            console.error("Request Failed!");
            return;
        }
        todoData.value = res.bottle;
    } catch (e) {
        console.log(e);
        return;
    } finally {
        lastUpdatedAt.value = new Date().toLocaleTimeString("zh-TW");
    }
};

onMounted(async () => {
    const checkSessionSystem = await CheckSession();
    if (checkSessionSystem.loggedin !== true) {
        logoutAction();
        return;
    }
    user.value = checkSessionSystem.user;
    getData();
    setInterval(getData, 10000);
});

const logoutAction = async () => {
    const req = await fetch("/api/bye");
    const res = await req.json();
    if (res.true === "yes") {
        router.push("/cap");
        return;
    }
    alert("logout failed");
};
const submitContent = async () => {
    error.value = false;
    if (!textContent.value) {
        error.value = true;
        errorMsg.value = "nothing is entered :(";
        return;
    }
    try {
        const req = await fetch("/api/bottle/publish", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                action: "submit",
                data: textContent.value,
            }),
        });
        if (!req.ok) {
            error.value = true;
            errorMsg.value = "i hope it is just a network issue";
            return;
        }
        const res = await req.json();
    } catch (e) {
        console.log(e);
        error.value = true;
        errorMsg.value = "oh no! something really went south";
    } finally {
        refreshContent();
        textContent.value = "";
    }
};

const refreshContent = async () => {
    updatingData.value = true;
    await getData();
    setTimeout(() => {
        updatingData.value = false;
    }, 645);
};

const taskDone = async (event: Event, uuid: string, currentStatus: boolean) => {
    try {
        const req = await fetch("/api/bottle/publish", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                action: "done",
                to: uuid,
                data: (event.target as HTMLInputElement).checked,
            }),
        });
        if (!req.ok) {
            alert("failed");
            return;
        }
        const res = await req.json();
    } catch (e) {
        console.log(e);
    } finally {
        refreshContent();
    }
};
</script>
<template>
    <div class="flex flex-row gap-1">
        <div class="mx-4">
            <div class="flex flex-col ml-4 mt-4">
                <span>Please enter your note!</span>
                <textarea
                    class="ml-2 mr-2 my-2 border p-1 rounded"
                    v-model="textContent"
                />
                <span
                    v-if="error"
                    class="text-red-300 mb-2 text-center justify-center"
                    >{{ errorMsg }}</span
                >
                <button
                    class="transition-all duration-500 w-full hover:cursor-pointer bg-gradient-to-bl from-cyan-300 to-red-200 hover:from-cyan-400 hover:to-red-300 p-2 rounded text-black"
                    @click="submitContent"
                >
                    Submit!
                </button>
            </div>
            <hr class="my-3 p-1" />
            <div class="flex flex-col ml-2">
                <span>wanna change your really hard auth?</span>
                <NuxtLink href="/bottle/password">
                    <button
                        class="transition-all w-full duration-500 hover:cursor-pointer bg-gradient-to-bl from-cyan-300 to-red-200 hover:from-cyan-400 hover:to-red-300 p-2 m-2 rounded text-black"
                    >
                        change here!
                    </button></NuxtLink
                >
            </div>
        </div>
        <div class="m-auto w-[80dvw] text-white px-4 dark">
            <div class="align-right justify-between flex flex-row mr-5">
                <div></div>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <button @click="refreshContent">
                                <RefreshCcw
                                    :class="`${updatingData && 'animate-spin'}`"
                                />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Update TODOs</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4"
            >
                <div
                    v-for="item in todoData"
                    :key="item.uuid"
                    class="relative rounded-lg shadow-md backdrop-blur-xl bg-white/70 p-4 transition-all duration-200 ease-in-out"
                    :class="{ 'line-through opacity-70': item.done }"
                >
                    <div class="flex items-center justify-between mb-2">
                        <h2 class="text-lg font-semibold text-gray-800">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger as-child>
                                        <input
                                            type="checkbox"
                                            class="form-checkbox h-5 w-5 text-indigo-600 rounded mr-2"
                                            :checked="item.done"
                                            @change="
                                                (event) =>
                                                    taskDone(
                                                        event,
                                                        item.uuid,
                                                        item.done,
                                                    )
                                            "
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>
                                            {{
                                                !item.done
                                                    ? "Finish Your tasks"
                                                    : "Unfinish Your tasks"
                                            }}
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </h2>
                        <span class="text-sm text-gray-500">
                            {{
                                new Date(item.created_at).toLocaleString(
                                    "zh-TW",
                                )
                            }}
                        </span>
                    </div>
                    <p
                        class="text-gray-700 leading-relaxed whitespace-pre-wrap"
                    >
                        {{ item.data }}
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div
        class="fixed bottom-0 inset-x-0 justify-center align-center m-auto w-fit text-gray-500 pb-1"
    >
        Last Updated at: {{ lastUpdatedAt }}
    </div>
</template>
