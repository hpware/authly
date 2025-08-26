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
const updatingData = ref(false);

const getData = async () => {
    updatingData.value = true;
    const req = await fetch("/api/bottle/get_data");
    if (!req.ok) {
        console.error("Request Failed!");
        return;
    }
    const res = await req.json();
    todoData.value = res;
    updatingData.value = false;
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
    if (textContent.value.length === 0) {
        alert("nothing is entered :(");
        return;
    }
    try {
        updatingData.value = true;
        const req = await fetch("/api/bottle/publish", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                action: "submit",
                content: textContent,
            }),
        });
    } catch (e) {
        console.log(e);
    } finally {
        updatingData.value = false;
    }
};

const refreshContent = async () => {
    getData();
};

const taskDone = async (event: Event) => {};
</script>
<template>
    <div>
        <h2>Todo manager!</h2>
        <div class="flex flex-row ml-4">
            <span>Put your todos' here!</span>
            <input
                type="text"
                class="ml-2 mr-2 my-2 border p-1"
                v-model="textContent"
            />
            <button
                class="transition-all duration-500 hover:cursor-pointer bg-gradient-to-bl from-cyan-300 to-red-200 hover:from-cyan-400 hover:to-red-300 p-2 rounded text-black"
                @click="submitContent"
            >
                Submit!
            </button>
        </div>
        <div class="m-auto w-[80dvw] text-white dark">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead class="w-[40px]">Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead> TODO </TableHead>
                        <TableHead class="text-right">
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
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="i in todoData">
                        <TableCell>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <input
                                            type="checkbox"
                                            @click="
                                                (event) => {
                                                    taskDone(event);
                                                }
                                            "
                                            value="1"
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Finish Your tasks</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider></TableCell
                        >
                        <TableCell>{{
                            new Date(i.date).toUTCString()
                        }}</TableCell>
                        <TableCell>
                            {{ i.text }}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>
