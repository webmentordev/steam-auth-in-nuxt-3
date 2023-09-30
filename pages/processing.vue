<template>
    <section class="h-screen flex items-center justify-center">
        <div class="text-center">
            <p v-if="message" class="flex mb-3 items-center m-auto scale-110 font-semibold bg-black p-2 px-3 rounded-md text-white">{{ message }}</p>
            <p v-else class="flex mb-3 items-center m-auto scale-110 font-semibold bg-black p-2 px-3 rounded-md text-white"><Icon name="svg-spinners:270-ring" class="mr-2" /> Processing...</p>
        </div>
    </section>
</template>

<script setup>
    const message = ref(null);
    useHead({
        title: `Processing data`
    })
    onMounted(async () => {
        message.value = "Processing..."
        const params = new URLSearchParams(window.location.search);
        const openidMode = params.get('openid.mode');
        if (openidMode === 'id_res') {
            const steamId = params.get('openid.claimed_id').replace('https://steamcommunity.com/openid/id/', '');
            message.value = "Login Success!";
            if(steamId){
                return navigateTo('/profile/'+steamId);
            }
        } else {
            message.value = "Steam login failed";
        }
    });
</script>