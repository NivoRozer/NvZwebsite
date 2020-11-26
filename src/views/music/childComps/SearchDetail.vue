<template>
    <div class="search-detail">
        <header>
            <span>搜索</span>
            <strong>{{ keywords }}</strong>
            <span>找到{{ searchCount }}个结果</span>
            <nav class="navlist">
                <ul>
                    <li>歌曲</li>
                    <li>歌单</li>
                    <li>专辑</li>
                </ul>
            </nav>
        </header>
        <body class="music-list">
            <ul>
                <li>
                    <div>
                        <span>音乐标题</span>
                    </div>
                    <div>
                        <span>艺术家</span>
                    </div>
                    <div>
                        <span>专辑</span>
                    </div>
                    <div>
                        <span>时长</span>
                    </div>
                </li>
                <li v-for="item in searchResult" :key="item.id">
                    <div class="music-list-name">
                        <span>{{ item.name | filterNull }}</span>
                    </div>
                    <div class="music-list-artist">
                        <span>{{ item.artists[0].name | filterNull }}</span>
                    </div>
                    <div class="music-list-album">
                        <span>{{ item.album.name | filterNull }}</span>
                    </div>
                    <div>
                        <span>{{
                            item.duration | filterNull | filterDuration
                        }}</span>
                    </div>
                </li>
            </ul>
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

import Pagination from "components/common/button/Pagination";

export default {
    name: "SearchDetail",
    components: {
        Pagination,
    },
    data() {
        return {
            keywords: "",
            type: 1,
            curPage: 1,
            limit: 30,
            searchCount: "",
            searchResult: "",
        };
    },
    filters: {
        //过滤空数据
        filterNull(item) {
            return (item = item ? item : "暂无");
        },
        //过滤歌曲时长
        filterDuration(time) {
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
        },
    },
    created() {
        this.keywords = this.$route.query.keywords;

        console.log(this.keywords);
        console.log(this.type);
        this.search(this.keywords, this.type);
    },
    mounted() {},
    watch: {
        $route() {
            this.keywords = this.$route.query.keywords;
            this.search(this.keywords, this.type);
        },
    },
    methods: {
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
                    this.searchCount = result.result.songCount;
                    // this.searchCount = result.result.songs.length;
                    this.searchResult = result.result.songs;
                })
                .catch((err) => {
                    console.log(err);
                });
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
    grid-template-rows: 50px 1fr 30px;
    position: relative;
    header {
        height: 50px;
        .navlist {
            ul {
                display: flex;
                justify-content: flex-start;
                li {
                    margin-right: 10px;
                }
            }
        }
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