<template>
    <div class="new-songs">
        <div class="top">
            <nav-bar
                :titles="navData"
                :curType="type"
                @navClick="navClick"
            ></nav-bar>
            <play-all-button @click.native="playAllMusic(newSongs)" />
        </div>
        <!-- <div class="mid"> -->
        <!-- <div class="bot">最新音乐</div> -->
        <ul class="music-list">
            <li
                v-for="item in newSongs"
                :key="item.id"
                class="music-list-item"
                @click.stop="pushMusic(item)"
            >
                <div class="album-image">
                    <img :src="item.album.picUrl" alt="" />
                </div>
                <div class="music-list-name">
                    <span>{{ item.name | filterNull }}</span>
                </div>
                <div class="music-list-artist">
                    <span
                        class="album-artist"
                        v-for="item in item.artists"
                        :key="item.id"
                        >{{ item.name }}</span
                    >
                </div>
                <div class="music-list-album">
                    <span
                        class="album-name"
                        @click.stop="albumClick(item.album.id)"
                        >{{ item.album.name | filterNull }}</span
                    >
                </div>
                <div class="duration">
                    <span>{{ item.duration | filterDuration }}</span>
                </div>
            </li>
        </ul>
        <div class="playlist-loading" v-if="!newSongs">加载中……</div>
    </div>
</template>

<script>
import { getNewSongs } from "network/home";
import { mixin } from "components/mixins/mixin";

import NavBar from "components/common/button/NavBar";
import PlayAllButton from "components/content/button/PlayAllButton";

export default {
    name: "SuggestPlaylists",
    components: {
        NavBar,
        PlayAllButton,
    },
    mixins: [mixin],
    data() {
        return {
            newSongs: "",
            type: 0,
            navData: [
                { name: "全部", type: 0 },
                { name: "华语", type: 7 },
                { name: "欧美", type: 96 },
                { name: "日本", type: 8 },
                { name: "韩国", type: 16 },
            ],
        };
    },
    created() {
        this.searchNewSongs(0);
    },
    methods: {
        searchNewSongs(type) {
            getNewSongs(type)
                .then((result) => {
                    this.newSongs = result.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        navClick(type) {
            this.type = type;
            this.searchNewSongs(this.type);
        },
        albumClick(id) {
            this.$router.push({
                name: "AlbumDetail",
                query: {
                    id: id,
                },
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.new-songs {
    .top {
        padding: 20px 30px 0 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .nav-bar {
            height: 30px;
        }
        .play-all-button {
            height: 40px;
        }
    }
}
.music-list-item {
    margin: 10px;
    height: 100px;
    border-radius: 5px;

    display: grid;
    // justify-content: space-around;
    align-items: center;
    grid-template-columns: 1fr 3fr 2fr 2fr 1fr;
    column-gap: 20px;

    border: 2px solid #fff0;
    transition: all 0.2s ease;
    &:hover {
        border: 2px solid #fff8;
        box-shadow: 0 0 6px #fff8;
    }
}
.album-image {
    img {
        border-radius: 5px;
        height: 96px;
        box-shadow: 0 0 5px rgb(0, 0, 0, 0.5), 5px 5px 10px rgb(0, 0, 0, 0.2);
    }
}
.album-artist {
    &:hover {
        text-shadow: 0 0 2px #fff8;
    }
    &:not(:last-child)::after {
        content: "/";
    }
}
.album-name {
    cursor: pointer;
    &:hover {
        text-shadow: 0 0 2px #fff8;
    }
}
.duration {
    padding: 0 40px 0 0;
    span {
        float: right;
    }
}
.playlist-loading {
    text-align: center;
    line-height: 200px;
}
</style>