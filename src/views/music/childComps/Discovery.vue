<template>
    <div class="discovery">
        <div class="top">
            <!-- <home-swiper :banners="banners" /> -->
            <music-swiper :banners="banners" />
        </div>
        <div class="mid">
            <h2>热门歌单</h2>
            <div class="playlists">
                <playlist-card
                    v-for="item in playlists"
                    :key="item.id"
                    :playlistInfo="item"
                />
            </div>
        </div>
        <div class="bot">
            <h2>最新音乐</h2>
            <div class="new-songs">
                <song-card
                    v-for="item in newSongs.slice(0, 12)"
                    :key="item.id"
                    :songInfo="item"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { getBanner, getRecommend, getNewSongs } from "network/home";

import HomeSwiper from "./HomeSwiper";
import MusicSwiper from "components/common/swiper/MusicSwiper";
import PlaylistCard from "components/content/cards/PlaylistCard";
import SongCard from "components/content/cards/SongCard";

export default {
    name: "Discovery",
    components: {
        HomeSwiper,
        MusicSwiper,
        PlaylistCard,
        SongCard,
    },
    data() {
        return {
            banners: [],
            playlists: [],
            newSongs: [],
        };
    },
    created() {
        this.getHomeMultidata();
    },
    methods: {
        getHomeMultidata() {
            //1.请求多个数据
            getBanner()
                .then((result) => {
                    // console.log(result.banners);
                    this.banners = result.banners;
                })
                .catch((err) => {
                    console.log(err);
                });
            getRecommend()
                .then((result) => {
                    // console.log(result);
                    this.playlists = result.playlists;
                })
                .catch((err) => {
                    console.log(err);
                });
            getNewSongs(0)
                .then((result) => {
                    console.log(result.data);
                    this.newSongs = result.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.discovery {
    // background-color: #ddd8;
    // height: 100vh;
    // display: grid;
    // grid-template-rows: 50px 1fr 30px;
    position: relative;
    // .top {
        // .music-swiper {
            // position: absolute;
            // width: 500px;
        // }
    // }
    .mid {
        margin-bottom: 20px;
        h2 {
            margin: 0 35px;
        }
        .playlists {
            display: grid;
            justify-content: space-around;
            grid-template-columns: repeat(auto-fill, 250px);
        }
    }
    .bot {
        h2 {
            margin: 0 35px;
        }
        .new-songs {
            margin: 0 35px;
            display: grid;
            justify-items: center;
            column-gap: 50px;
            justify-content: space-around;
            grid-template-columns: repeat(auto-fill, 300px);
        }
    }
}
</style>