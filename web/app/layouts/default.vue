<template>
    <div class="hidden md:block"><slot></slot></div>
    <div class="block md:hidden">
        <div
            class="text-md justify-center absolute inset-0 flex flex-col text-center"
        >
            <span
                >Sorry, but mobile devices aren't supported on the bottle.
                😔</span
            >
            <span
                >If you know how can I make the login system better, you can add
                <a
                    href="https://github.com/hpware/authly/issues/new"
                    class="hover:cursor-pointer text-black/90 hover:text-blue-500 underline transition-all duration-300"
                    >a GitHub Issue to the repo.</a
                ></span
            >
        </div>
    </div>
</template>
