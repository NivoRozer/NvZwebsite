<template>
    <div class="album-detail">
        <div class="album-header" v-if="albumInfo">
            <img :src="albumInfo.blurPicUrl" alt="" />
            <div class="album-info">
                <div class="album-name">
                    <span>
                        {{ albumInfo.name }}
                    </span>
                    <span
                        v-for="item in albumInfo.alias"
                        :key="item"
                        class="album-alias"
                    >
                        {{ item }}
                    </span>
                </div>
                <div class="album-artists">
                    艺术家：
                    <span
                        v-for="(item, index) in albumInfo.artists"
                        :key="index"
                        >{{ item.name }}</span
                    >
                </div>
                <div class="publish-time">
                    <span
                        >发行时间：{{
                            albumInfo.publishTime | formatDate
                        }}</span
                    >
                </div>
                <div class="album-description">
                    <span>
                        描述：{{ albumInfo.description | filterNull }}
                    </span>
                </div>
                <button>播放全部</button>
            </div>
        </div>
        <search-songs v-if="searchResult" :searchResult="searchResult" />
        <div class="album-loading" v-if="!searchResult">加载中……</div>
    </div>
</template>

<script>
import { getAlbumDetail, getSongDetail } from "network/detail";
import { mixin } from "components/mixins/mixin";

import SearchSongs from "../search/SearchSongs";

export default {
    name: "AlbumDetail",
    components: {
        SearchSongs,
    },
    mixins: [mixin],
    data() {
        return {
            id: "",
            albumInfo: "",
            searchResult: "",
        };
    },
    created() {
        this.id = this.$route.query.id;
        this.getAlbumDetail(this.id);
    },
    watch: {
        $route() {
            this.id = this.$route.query.id;
            this.getAlbumDetail(this.id);
        },
    },
    methods: {
        getAlbumDetail(id) {
            getAlbumDetail(id)
                .then((result) => {
                    console.log(result);
                    this.albumInfo = result.album;

                    let songResult = result.songs.map((x) => {
                        return {
                            id: x.id,
                            name: x.name,
                            artists: x.ar,
                            album: x.al,
                            duration: x.dt,
                        };
                    });
                    this.searchResult = songResult;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style lang='scss' scoped>
.album-header {
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
.album-info {
    div {
        margin: 0 0 10px 0;
    }
}
.album-name {
    height: 30px;
    font-size: 22px;
    margin: 0 0 20px 0 !important;
    span {
        vertical-align: middle;
    }
}
.album-alias {
    display: inline-block;
    background-color: #fff2;
    border-radius: 4px;
    font-size: 14px;
    // line-height: 20px;
    padding: 2px 2px;
    margin: 0 5px;
}
.album-artists {
    height: 20px;
    span {
        transition: all 0.5s ease;
        &:hover {
            text-shadow: 0 0 2px #fff8;
        }
        &:not(:last-child)::after {
            content: "/";
        }
    }
}
.publish-time {
    height: 20px;
}
.album-description {
    height: 40px;
    span {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
}
.album-loading {
    text-align: center;
    line-height: 200px;
}
button {
    cursor: pointer;
    height: 40px;
    width: 100px;
    border-radius: 20px;
    border: none;
    background-color: #fff2;
    transition: all 0.2s ease;
    color: #fff;
    &:hover {
        box-shadow: 0 0 4px #fff;
        background-color: #fff4;
    }
}
</style>