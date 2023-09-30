<template>
    <div class="max-w-4xl m-auto py-6 px-4">
        <div v-if="myData">
            <h1 class="text-3xl font-semibold mb-3 py-3 px-4 bg-gray-100 rounded-lg">Welcome to your Steam profile 👋</h1>
            <div class="flex">
                <img :src="myData.avatarfull" class="h-fit" alt="My Image">
                <div class="ml-3 py-4">
                    <h2 class="text-3xl"><b class="mr-3">Name:</b> {{ myData.personaname }}</h2>
                    <p class="mb-2"><b class="mr-3">Realname:</b>{{ myData.realname }}</p>
                    <p class="mb-2"><b class="mr-3">SteamID:</b>{{ myData.steamid }}</p>
                    <p class="mb-2"><b class="mr-3">Country:</b>{{ myData.loccountrycode }}</p>
                    <p><b class="mr-3">Last Log Off:</b>{{ new Date(myData.lastlogoff * 1000).toUTCString() }}</p>
                </div>
            </div>
        </div>
        <p class="text-center" v-else>{{ message }}</p>
    </div>
</template>

<script setup>
    const message = ref("Fetching data...");
    const config = useRuntimeConfig();
    const myData = ref(null);
    onMounted(async () => {
        const params = new URLSearchParams(window.location.search);
        const openidMode = params.get('openid.mode');
        if (openidMode === 'id_res') {
            const steamId = params.get('openid.claimed_id').replace('https://steamcommunity.com/openid/id/', '');
            message.value = "Login Success";
            const data = await $fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${config.public.api}&steamids=${steamId}`);
            myData.value = data.response.players[0];
            useHead({
                title: `${myData.value.personaname}'s Profile`
            })
        } else {
            message.value = "Steam login failed";
        }
    });
</script>