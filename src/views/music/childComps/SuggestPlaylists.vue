<template>
    <div class="suggest-playlists">
        <!-- <div class="top">顶端图</div>
        <div class="mid">
        <div class="bot">最新音乐</div> -->
        <span class="construction">施工中</span>
        
        <nav-bar
            :titles="navData"
            :curType="type"
            @navClick="navClick"
        ></nav-bar>
    </div>
</template>

<script>
export default {
    name: "SuggestPlaylists",
};
</script>

<style lang="scss" scoped>
// .suggest-playlists {
// background-color: #ddd8;
// height: 100vh;
// display: grid;
// grid-template-rows: 50px 1fr 30px;
// .mid{
// overflow-y: auto;
// }
// }
.construction {
    font-size: 100px;
}
</style>