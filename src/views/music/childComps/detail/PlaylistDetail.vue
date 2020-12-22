<template>
    <div class="playlist-detail">
        <div class="playlist-header" v-if="playlistInfo">
            <img :src="playlistInfo.coverImgUrl" alt="" />
            <div class="playlist-info">
                <div class="playlist-name">
                    <span>
                        {{ playlistInfo.name }}
                    </span>
                    <span
                        v-for="item in playlistInfo.tags"
                        :key="item"
                        class="playlist-tag"
                    >
                        {{ item }}
                    </span>
                </div>
                <div class="playlist-creator">
                    <img :src="playlistInfo.creator.avatarUrl" alt="" />
                    <span
                        >{{ playlistInfo.creator.nickname }} {{ playlistInfo.createTime | formatDate }}创建</span
                    >
                </div>

                <div class="playlist-description">
                    <span>
                        {{ playlistInfo.description }}
                    </span>
                </div>
                <!-- <button>播放全部</button> -->
                <play-all-button @click.native="playAllMusic(searchResult)" />
            </div>
        </div>
        <search-songs v-if="searchResult" :searchResult="searchResult" />
        <div class="playlist-loading" v-if="!searchResult">加载中……</div>
    </div>
</template>

<script>
import { getPlaylistDetail, getSongDetail } from "network/detail";
import { mixin } from "components/mixins/mixin";

import SearchSongs from "../search/SearchSongs";
import PlayAllButton from "components/content/button/PlayAllButton";

export default {
    name: "PlaylistDetail",
    components: {
        SearchSongs,
        PlayAllButton,
    },
    mixins: [mixin],
    data() {
        return {
            id: "",
            playlistInfo: "",
            searchResult: "",
        };
    },
    created() {
        this.id = this.$route.query.id;
        this.getPlaylistDetail(this.id);
    },
    filters: {
        //过滤空数据
        filterNull(item) {
            return (item = item ? item : "暂无");
        },
        //过滤歌曲时长
        filterDuration(time) {
            if (time) {
                let duration = time;
                let min = parseInt(duration / 1000 / 60);
                if (min < 10) {
                    min = "0" + min;
                }
                let sec = parseInt((duration / 1000) % 60);
                if (sec < 10) {
                    sec = "0" + sec;
                }
                return `${min}:${sec}`;
            } else {
                return "暂无";
            }
        },
    },
    methods: {
        getPlaylistDetail(id) {
            getPlaylistDetail(id)
                .then((result) => {
                    console.log(result);
                    this.playlistInfo = result.playlist;
                    document.getElementsByTagName("title")[0].innerText =
                        result.playlist.name;

                    let trackIds = result.playlist.trackIds.map((x) => {
                        return x.id;
                    });
                    let ids = trackIds.join(",");
                    // 获取歌单详情后需要拿全部trackIds去请求歌曲详情
                    getSongDetail(ids)
                        .then((result) => {
                            console.log(result);
                            let songResult = result.songs.map((x) => {
                                return {
                                    id: x.id,
                                    name: x.name,
                                    artists: x.ar,
                                    album: x.al,
                                    duration: x.dt,
                                };
                            });
                            console.log(songResult);
                            this.searchResult = songResult;
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style lang='scss' scoped>
.playlist-header {
    padding: 20px;
    display: grid;
    grid-template-columns: 200px auto;
    column-gap: 20px;
    img {
        height: 200px;
        width: 200px;
        border-radius: 10px;
        box-shadow: 0 0 5px rgb(0, 0, 0, 0.5), 10px 10px 20px rgb(0, 0, 0, 0.2);
    }
}
.playlist-info {
    div {
        margin: 0 0 15px 0;
    }
}
.playlist-name {
    height: 30px;
    font-size: 22px;
    span {
        vertical-align: middle;
    }
}
.playlist-tag {
    display: inline-block;
    background-color: #fff2;
    border-radius: 4px;
    font-size: 14px;
    // line-height: 20px;
    padding: 2px 2px;
    margin: 0 5px;
}
.playlist-creator {
    display: grid;
    grid-template-columns: 30px auto;
    column-gap: 10px;
    img {
        height: 30px;
        width: 30px;
        border-radius: 50%;
    }
    span {
        height: 30px;
        line-height: 30px;
    }
}
.playlist-description {
    span {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
}
.playlist-loading {
    text-align: center;
    line-height: 200px;
}
</style>