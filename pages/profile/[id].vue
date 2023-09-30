<template>
    <div class="max-w-4xl m-auto py-6 px-4">
        <div v-if="myData">
            <div class="flex justify-between items-center mb-3 py-3 px-4 bg-gray-100 rounded-lg">
                <h1 class="text-3xl font-semibold">Welcome to your Steam profile 👋</h1>
                <button @click="logout" class="bg-orange-500 text-dark font-bold py-2 px-5 rounded-md">Logout</button>
            </div>
            <div class="flex mb-3">
                <img :src="myData.avatarfull" class="h-fit rounded-md" alt="My Image">
                <div class="ml-3 py-4">
                    <h2 class="text-3xl"><b class="mr-3">Name:</b> {{ myData.personaname }}</h2>
                    <p class="mb-2"><b class="mr-3">Realname:</b>{{ myData.realname }}</p>
                    <p class="mb-2"><b class="mr-3">SteamID:</b>{{ myData.steamid }}</p>
                    <p class="mb-2"><b class="mr-3">Country:</b>{{ myData.loccountrycode }}</p>
                    <p><b class="mr-3">Last Log Off:</b>{{ new Date(myData.lastlogoff * 1000).toUTCString() }}</p>
                </div>
            </div>
            <div class="flex flex-col">
                <img src="/banner.png" class="w-full rounded-lg mb-3" alt="CSGO / CS2 Banner">
                <ul class="text-white font-semibold grid grid-cols-2 gap-5">
                    <li v-for="(stat, index) in stats" :key="index" class="flex border border-light/10 justify-between items-center p-4 rounded-lg bg-dark">
                        <span class="text-orange-500">{{ stat.name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }}</span>
                        <span class="">{{ stat.value }}</span>
                    </li>
                </ul>
            </div>
        </div>
        <p v-else class="flex mb-3 items-center w-fit m-auto scale-110 font-semibold bg-black p-2 px-6 rounded-md text-white"><Icon name="svg-spinners:270-ring" class="mr-2" /> {{ message }}</p>
    </div>
</template>

<script setup>
    const message = ref("Fetching data...");
    const config = useRuntimeConfig();
    const myData = ref(null);
    const stats = ref(null);
    const route = useRoute();
    onMounted(async () => {
        if(route.params.id.length == 17){
            const data = await $fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${config.public.api}&steamids=${route.params.id}`);

            const stats_result = await $fetch(`https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=${config.public.api}&steamid=${route.params.id}`);

            myData.value = data.response.players[0];
            stats.value = stats_result.playerstats.stats;

            useHead({
                title: `${myData.value.personaname}'s Profile`
            })
        }else{
            return navigateTo('/');
        }
    });

    function logout(){
        return navigateTo('/');
    }
</script>