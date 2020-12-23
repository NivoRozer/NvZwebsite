<template>
    <div class="suggest-playlists">
        <div class="top">
            <!-- <img :src="playlistInfo.coverImgUrl" alt="" /> -->
            <div class="top-playlist">
                <div class="playlist-name">
                    <span>
                        <!-- {{ playlistInfo.name }} -->
                    </span>
                </div>
                <!-- <div class="playlist-creator">
                    <img :src="playlistInfo.creator.avatarUrl" alt="" />
                    <span
                        >{{ playlistInfo.creator.nickname }} {{ playlistInfo.createTime | formatDate }}创建</span
                    >
                </div> -->

                <div class="playlist-description">
                    <span>
                        <!-- {{ playlistInfo.description }} -->
                    </span>
                </div>
            </div>
            <cat-bar
                :titles="cat"
                :curType="type"
                @catClick="catClick"
            ></cat-bar>
        </div>
        <div class="mid">
            <search-playlists :searchResult="searchResult"></search-playlists>
        </div>
        <div class="bot">
            <pagination
                @pageTurn="pageTurn"
                :total="searchCount"
                :pageSize="limit"
                :curPage="curPage"
            />
        </div>
        <!-- <span class="construction">施工中</span> -->
        <div class="playlist-loading" v-if="!searchResult">加载中……</div>
    </div>
</template>

<script>
import { getCategories, getTopPlaylists, getCatlists } from "network/home";
// import { mixin } from "components/mixins/mixin";

// import SongCard from "components/content/cards/SongCard";
import CatBar from "components/common/button/CatBar";
import SearchPlaylists from "./search/SearchPlaylists";
import Pagination from "components/common/button/Pagination";

export default {
    name: "SuggestPlaylists",
    components: {
        // SongCard,
        CatBar,
        SearchPlaylists,
        Pagination,
    },
    data() {
        return {
            type: "全部",
            cat: [],
            curPage: 1,
            limit: 60,
            searchCount: "",
            searchResult: "",
        };
    },
    created() {
        this.initCategories();
        this.getTopPlaylists();
        // this.test();
    },
    methods: {
        // test() {
        //     getCatlists()
        //         .then((result) => {
        //             console.log(result);
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //         });
        // },
        initCategories() {
            getCategories()
                .then((result) => {
                    let cat = result.tags.map((item) => {
                        return {
                            name: item.name,
                            type: item.name,
                        };
                    });
                    cat.unshift({ name: "全部", type: "全部" });
                    this.cat = cat;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getTopPlaylists(cat, page = 1) {
            this.curPage = page;
            let limit = this.limit;
            let offset = (page - 1) * limit;

            getTopPlaylists(cat, limit, offset)
                .then((result) => {
                    console.log(result);
                    this.searchResult = result.playlists;
                    this.searchCount = result.total;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        catClick(type) {
            this.type = type;
            this.getTopPlaylists(this.type);
        },
        // 跳页
        pageTurn(page) {
            this.getTopPlaylists(this.type, page);
            this.curPage = page;
        },
    },
};
</script>

<style lang="scss" scoped>
.suggest-playlists {
    .top {
        padding: 20px 0px 0 10px;
        margin: 5px 0;
    }
}
.construction {
    font-size: 100px;
}
// .top-playlist {
//     div {
//         margin: 0 0 15px 0;
//     }
// }
// .playlist-name {
//     height: 30px;
//     font-size: 22px;
//     span {
//         vertical-align: middle;
//     }
// }
// .playlist-description {
//     span {
//         overflow: hidden;
//         text-overflow: ellipsis;
//         display: -webkit-box;
//         -webkit-line-clamp: 3;
//         -webkit-box-orient: vertical;
//     }
// }
.bot {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.playlist-loading {
    text-align: center;
    line-height: 200px;
}
</style>