<template>
    <div class="song-card" @click="pushMusic(songInfo)">
        <div class="song-image">
            <img :src="songInfo.album.picUrl" alt="" />
        </div>
        <!-- <div class="play-button"></div> -->
        <div class="song-name">
            <span>{{ songInfo.name }}</span>
        </div>
        <div class="song-artists-name">
            <span v-for="item in songInfo.artists" :key="item.id">{{
                item.name
            }}</span>
        </div>
    </div>
</template>

<script>
import { mixin } from "components/mixins/mixin";
export default {
    name: "SongCard",
    props: ["songInfo"],
    mixins: [mixin],
};
</script>

<style lang="scss" scoped>
.song-card {
    height: 100px;
    width: 300px;
    // box-shadow: 0 0 6px #0008;
    box-shadow: 0 0 5px rgb(0, 0, 0, 0.5), 10px 10px 20px rgb(0, 0, 0, 0.2);
    border-radius: 10px;
    overflow: hidden;
    margin: 10px;
    border: 2px solid #fff1;
    background-color: #0002;

    transition: all 0.2s ease;
    cursor: pointer;
    &:hover {
        border: 2px solid #fff8;
        box-shadow: 0 0 6px #fff8;
        img {
            transform: scale(1.2);
        }
    }

    display: grid;
    grid-auto-flow: column;
    grid-template: 1fr 1fr / auto 1fr;
    grid-template-areas: "a b" "a c";
    .song-image {
        grid-area: a;
        overflow: hidden;
        height: 100%;
        width: 96px;
    }
    .song-name {
        margin: auto 0;
        padding: 0 10px;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .song-artists-name {
        margin: auto 0;
        padding: 0 10px;
        span {
            &:not(:last-child)::after {
                content: "/";
            }
        }
    }
    img {
        transition: all 0.5s ease;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
    }
}
</style>