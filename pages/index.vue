<template>
    <section class="h-screen flex items-center justify-center">
        <div class="text-center">
            <button @click="loginHandler" class="flex mb-3 items-center m-auto scale-110 font-semibold bg-black p-2 px-3 rounded-md text-white"><Icon name="simple-icons:steam" class="mr-2" /> Sign In via Steam</button>
            <p>Created by <nuxt-link to="https://fiverr.com/mahmer97" class="font-semibold underline">Ahmer / WebMentor</nuxt-link></p>
        </div>
    </section>
</template>

<script setup>
    const config = useRuntimeConfig()
    const domain = config.public.domain;
    useHead({
        title: `Steam Authentication — Nuxt 3`
    })
    function loginHandler(){
        const url = `https://steamcommunity.com/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.mode=checkid_setup&openid.return_to=${encodeURIComponent(domain+'/processing')}&openid.realm=${encodeURIComponent(domain)}&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select`;
        return navigateTo(url, { external: true });
    }
</script>