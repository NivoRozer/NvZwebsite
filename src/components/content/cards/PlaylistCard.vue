<template>
    <div class="playlist-card">
        <div class="played-times"></div>
        <img :src="playlistInfo.coverImgUrl" alt="" />
        <div class="play-button"></div>
        <div class="playlist-name">
            <span>{{ playlistInfo.name }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "PlaylistCard",
    props: ["playlistInfo"],
};
</script>

<style lang="scss" scoped>
.playlist-card {
    height: 250px;
    width: 200px;
    box-shadow: 0 0 6px #0008;
    border-radius: 10px;
    overflow: hidden;
    margin: 5px;
    border: 2px solid #0001;
    transition: all 0.2s ease;
    cursor: pointer;
    &:hover {
        border: 2px solid #fff8;
        box-shadow: 0 0 6px #fff8;
    }
    img {
        height: 200px;
        width: 200px;
    }
}
</style>