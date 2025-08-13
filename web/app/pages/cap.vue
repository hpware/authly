<script lang="ts" setup>
import generateRandomString from "@/lib/generateRandomString";
</script>
<template>
    <div class="flex flex-col">
        <h2>Welcome to the bottle! Please login or signup for an account!</h2>
        <span
            >Please doomscoll to match the pin code you set on the signup
            process!</span
        >
        <input type="text" placeholder="Please enter your uuid" />
        <span>Swipe to your pin number!</span>
        <span
            >You are currently on the number
            <span class="underline text-underline">0001</span></span
        >
        <button>Submit</button>
    </div>
</template>
