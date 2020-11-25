<template>
    <div class="search-detail">
        <header>
            <span>搜索</span>
            <span>{{ keywords }}</span>
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
                </li>
            </ul>
        </body>
        <footer>
            <h2>分页</h2>
        </footer>
    </div>
</template>

<script>
import { search } from "network/search";

export default {
    name: "SearchDetail",
    data() {
        return {
            keywords: "",
            type: 1,
            searchCount: "",
            searchResult: "",
        };
    },
    filters: {
        //过滤空数据
        filterNull(item) {
            return (item = item ? item : "暂无");
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
        search(keywords, type) {
            // console.log();
            search(keywords, type)
                .then((result) => {
                    console.log(result.result);
                    this.searchCount = result.result.songCount;
                    this.searchResult = result.result.songs;
                })
                .catch((err) => {
                    console.log(err);
                });
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
    footer {
        height: 50px;
    }
    body {
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
        li:hover {
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