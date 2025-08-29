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
    if (textContent.value.length === 0) {
        alert("nothing is entered :(");
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
            alert("failed");
            return;
        }
        const res = await req.json();
    } catch (e) {
        console.log(e);
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
                data: !currentStatus,
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
                    <TableRow
                        v-for="i in todoData"
                        :class="`${i.done && 'line-through'}`"
                    >
                        <TableCell>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <input
                                            type="checkbox"
                                            @click="
                                                (event) => {
                                                    taskDone(
                                                        event,
                                                        i.uuid,
                                                        i.done,
                                                    );
                                                }
                                            "
                                            :value="i.done"
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Finish Your tasks</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider></TableCell
                        >
                        <TableCell>{{
                            new Date(i.created_at).toUTCString()
                        }}</TableCell>
                        <TableCell>
                            {{ i.data }}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>
