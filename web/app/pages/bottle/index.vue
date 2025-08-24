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
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
const router = useRouter();
const user = ref();
const textContent = ref();
const todoData = ref([]);
onMounted(async () => {
    const checkSessionSystem = await CheckSession();
    if (checkSessionSystem.loggedin !== true) {
        logoutAction();
        return;
    }
    user.value = checkSessionSystem.user;
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
const submitContent = async () => {};
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
                class="transition-all duration-500 hover:cursor-pointer bg-gradient-to-bl from-teal-300 to-blue-200 hover:from-teal-400 hover:to-blue-300 p-2 rounded text-black"
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
                            <Transition
                                enter-active-class="animate__animated animate__fadeInDown animate_fast03"
                                leave-active-class="animate__animated animate__fadeOutUp animate_fast03"
                            >
                                <RefreshCcw />
                            </Transition>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell><input type="checkbox" /></TableCell>
                        <TableCell>{{ new Date().toUTCString() }}</TableCell>
                        <TableCell>
                            idk idk idk idk idk idk idk idk idk idk idk idk idk
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>
