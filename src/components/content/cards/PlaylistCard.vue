<template>
    <div class="playlist-card" @click="detail(playlistInfo.id)">
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
    methods: {
        detail(id) {
            this.$router.push({
                name: "PlaylistDetail",
                query: {
                    id: id,
                },
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.playlist-card {
    position: relative;
    height: 250px;
    width: 200px;
    // box-shadow: 0 0 6px #0008;
    box-shadow: 0 0 5px rgb(0, 0, 0, 0.5), 10px 10px 20px rgb(0, 0, 0, 0.2);
    border-radius: 10px;
    overflow: hidden;
    margin: 10px;
    border: 2px solid #fff1;
    background-color: #fff1;
    // backdrop-filter: blur(50px);

    transition: all 0.2s ease;
    cursor: pointer;
    &:hover {
        border: 2px solid #fff8;
        box-shadow: 0 0 6px #fff8;
        &::before {
            content: "";
            background-position: 100% 0;
        }
        img {
            transform: scale(1.2);
        }
    }
    &::before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 10;
        background-image: linear-gradient(30deg, #0000 65%, #fff4 70%);
        background-size: 200%;
        background-position: 40% 0;

        transition: all 0.5s ease-out;
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
.playlist-name {
    padding: 5px;
    span {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
}
</style>