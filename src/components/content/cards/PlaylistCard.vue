<template>
    <div class="playlist-card">
        <div class="played-times"></div>
        <div class="playlist-image">
            <img :src="playlistInfo.coverImgUrl" alt="" />
        </div>
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
    // box-shadow: 0 0 6px #0008;
    box-shadow: 0 0 5px rgb(0, 0, 0, 0.5), 10px 10px 20px rgb(0, 0, 0, 0.2);
    border-radius: 10px;
    overflow: hidden;
    margin: 10px;
    border: 2px solid #fff1;
    background-color: #fff1;

    transition: all 0.2s ease;
    cursor: pointer;
    &:hover {
        border: 2px solid #fff8;
        box-shadow: 0 0 6px #fff8;
        img {
            transform: scale(1.2);
        }
    }
    .playlist-image {
        overflow: hidden;
        height: 200px;
        width: 200px;
    }
    img {
        transition: all 0.5s ease;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
    }
}
</style>