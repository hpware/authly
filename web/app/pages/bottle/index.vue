<script setup lang="ts">
useSeoMeta({
    title: "Bottle! | The Bottle TODO System!",
});
definePageMeta({
    layout: "bottle",
});
import CheckSession from "~/lib/checkSession";
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
</script>
<template>
    <div>
        <div class="flex flex-col ml-4">
            <span>Put your todos' here!</span>
            <input type="text" />
            <button
                class="transition-all duration-500 hover:cursor-pointer bg-gradient-to-bl from-teal-300 to-blue-200 hover:from-teal-400 hover:to-blue-300 mx-auto w-fit p-2 rounded text-black"
            >
                Submit!
            </button>
        </div>
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead class="w-[100px]"> Invoice </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead class="text-right"> Amount </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell class="font-medium"> INV001 </TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell class="text-right"> $250.00 </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>
