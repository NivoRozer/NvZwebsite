<template>
    <div class="search-detail">
        <header>
            <div class="search-result">
                <span>搜索</span>
                <strong>{{ keywords }}</strong>
                <span>找到{{ searchCount }}个结果</span>
            </div>
            <nav-bar
                :titles="navData"
                :curType="type"
                @navClick="navClick"
            ></nav-bar>
        </header>
        <body class="music-list">
            <component :is="navIndex" :searchResult="searchResult"></component>
        </body>
        <footer>
            <pagination
                @pageTurn="pageTurn"
                :total="searchCount"
                :pageSize="limit"
                :curPage="curPage"
            />
        </footer>
    </div>
</template>

<script>
import { search } from "network/search";
import { mixin } from "components/mixins/mixin";

import NavBar from "components/common/button/NavBar";
import SearchSongs from "./search/SearchSongs";
import SearchAlbums from "./search/SearchAlbums";
import SearchPlaylists from "./search/SearchPlaylists";
import Pagination from "components/common/button/Pagination";

export default {
    name: "SearchDetail",
    components: {
        NavBar,
        SearchSongs,
        SearchAlbums,
        SearchPlaylists,
        Pagination,
    },
    mixins: [mixin],
    data() {
        return {
            keywords: "",
            type: 1,
            curPage: 1,
            limit: 30,
            searchCount: "",
            searchResult: "",
            navIndex: "SearchSongs",
            navData: [
                { name: "歌曲", type: 1 },
                { name: "专辑", type: 10 },
                { name: "歌单", type: 1000 },
            ],
        };
    },
    // filters: {
    //     //过滤空数据
    //     filterNull(item) {
    //         return (item = item ? item : "暂无");
    //     },
    //     //过滤歌曲时长
    //     filterDuration(time) {
    //         let duration = time;
    //         let min = parseInt(duration / 1000 / 60);
    //         if (min < 10) {
    //             min = "0" + min;
    //         }
    //         let sec = parseInt((duration / 1000) % 60);
    //         if (sec < 10) {
    //             sec = "0" + sec;
    //         }
    //         return `${min}:${sec}`;
    //     },
    // },
    created() {
        this.keywords = this.$route.query.keywords;
        this.type = this.$route.query.type
            ? parseInt(this.$route.query.type)
            : 1;
        this.initSearchType(this.type);

        // console.log(this.keywords);
        // console.log(this.type);

        this.search(this.keywords, this.type);
    },
    mounted() {},
    watch: {
        // 监听路由发起请求
        $route() {
            // 判断是否位于当前路由
            if (this.$route.path.includes("search")) {
                this.keywords = this.$route.query.keywords;
                this.type = this.$route.query.type
                    ? parseInt(this.$route.query.type)
                    : this.type;

                // console.log(this.keywords);
                // console.log(this.type);

                this.search(this.keywords, this.type);
            }
        },
    },
    methods: {
        // 根据type动态切换子组件
        initSearchType(type) {
            switch (type) {
                case 1:
                    this.navIndex = "SearchSongs";
                    break;
                case 10:
                    this.navIndex = "SearchAlbums";
                    break;
                case 1000:
                    this.navIndex = "SearchPlaylists";
                    break;
            }
        },
        // 请求歌曲查询接口
        search(keywords, type, page) {
            // console.log();
            if (!page) {
                this.curPage = 1;
                page = 1;
            }
            let limit = this.limit;
            let offset = (page - 1) * limit;

            search(keywords, type, offset)
                .then((result) => {
                    console.log(result.result);
                    switch (type) {
                        case 1:
                            // console.log(result.result.songCount);
                            this.searchCount = result.result.songCount;
                            this.searchResult = result.result.songs;
                            break;
                        case 10:
                            // console.log(result.result.albumCount);
                            this.searchCount = result.result.albumCount;
                            this.searchResult = result.result.albums;
                            break;
                        case 1000:
                            // console.log(result.result.playlistCount);
                            this.searchCount = result.result.playlistCount;
                            this.searchResult = result.result.playlists;
                            break;
                        default:
                            break;
                    }
                    // 根据type动态切换子组件
                    this.initSearchType(this.type);
                    // this.searchCount = result.result.songs.length;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        navClick(type) {
            this.type = type;
            this.search(this.keywords, this.type);
            // this.initSearchType(this.type);
        },
        // 跳页
        pageTurn(page) {
            this.search(this.keywords, this.type, page);
            this.curPage = page;
        },
    },
};
</script>

<style lang="scss" scoped>
.search-detail {
    display: grid;
    grid-template-rows: auto 1fr 30px;
    position: relative;
    header {
        // height: 50px;
        .search-result {
            padding: 5px;
            margin: 0 0 10px 0;
            strong {
                font-size: 30px;
                margin: 0 5px;
            }
        }
        // .navlist {
        //     ul {
        //         display: flex;
        //         justify-content: flex-start;
        //         li {
        //             // margin-right: 10px;
        //             cursor: pointer;
        //             position: relative;
        //             padding: 5px;
        //             &:hover {
        //                 text-shadow: 0 0 4px #ddd8;
        //             }
        //         }
        //         // 以下为菜单跟随滚动条效果
        //         li::before {
        //             content: "";
        //             // display:block;
        //             position: absolute;
        //             width: 0;
        //             bottom: 0;
        //             left: 100%;
        //             // height: 0;
        //             border-bottom: 2px solid #ddd8;
        //             transition: 0.2s all linear;
        //         }
        //         li:hover::before {
        //             left: 0;
        //             width: 100%;
        //             transition-delay: 0.1s;
        //         }
        //         li:hover ~ li::before {
        //             left: 0;
        //         }
        //         .active {
        //             border-bottom: 2px solid #fff8;
        //             // box-shadow: 2px 0 2px #fff8;
        //             transition: 0.2s all ease;
        //             &::before {
        //                 border-bottom: none;
        //             }
        //         }
        //     }
        // }
    }
    // body {
    // }
    footer {
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .music-list {
        overflow-y: auto;
        li {
            display: grid;
            grid-template-columns: 5fr 2fr 4fr 1fr;
            grid-column-gap: 20px;
            text-align: left;
            position: relative;
            padding: 0 20px;
            transition: all 0.5s ease;
            background-color: #fff0;
            // grid-auto-flow: row dense;
            div {
                // height: 30px;
                transition: all 0.5s ease;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                line-height: 40px;
                text-shadow: 0 0 4px #0008;
            }
            div:hover {
                text-shadow: 0 0 2px #fff8;
            }
            // .music-list-name {
            // min-width: 200px;
            // line-height: 30px;
            // grid-area: a;
            // }
            .music-list-artist {
                font-size: 14px;
                line-height: 40px;
            }
            .music-list-album {
                font-size: 14px;
                line-height: 40px;
            }
        }
        li:not(:first-child):hover {
            color: #eee;
            background-color: #fff2;
            cursor: pointer;
        }
        li:not(:last-child)::after {
            content: "";
            position: absolute;
            width: 100%;
            bottom: 0;
            border-bottom: 1px solid #fff2;
            box-shadow: 0 0 1px #fff8;
        }
    }
}
</style>