<template>
    <div class="search-songs">
        <ul>
            <li class="song-list-title">
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
            <li
                v-for="(item, index) in searchResult"
                :key="index"
                @click.stop="pushMusic(item)"
            >
                <div class="song-list-name">
                    <span>{{ item.name | filterNull }}</span>
                </div>
                <div class="song-list-artist">
                    <span v-for="(item, index) in item.artists" :key="index">{{
                        item.name | filterNull
                    }}</span>
                </div>
                <div class="song-list-album">
                    <span @click.stop="albumClick(item.album.id)">{{
                        item.album.name | filterNull
                    }}</span>
                </div>
                <div>
                    <span>{{ item.duration | filterDuration }}</span>
                </div>
            </li>
        </ul>
        <!-- <pagination
            @pageTurn="pageTurn"
            :total="total"
            :pageSize="limit"
            :curPage="curPage"
        /> -->
    </div>
</template>

<script>
import Pagination from "components/common/button/Pagination";
import { mixin } from "components/mixins/mixin";

export default {
    name: "SearchSongs",
    components: {
        Pagination,
    },
    props: ["searchResult"],
    mixins: [mixin],
    data() {
        return {
            // songs: this.searchResult,
        };
    },
    created() {},
    methods: {
        // songClick(item) {
        //     let song = Object.assign({}, item);
        //     song.uuid = this.generateUUID();
        //     this.$store.commit("pushMusic", song);
        // },
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

<style lang='scss' scoped>
.search-songs {
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
            text-shadow: 0 0 2px #0008;
        }

        .song-list-name {
            &:hover {
                text-shadow: 0 0 2px #fff8;
            }
        }
        .song-list-artist {
            font-size: 14px;
            line-height: 40px;
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
        .song-list-album {
            font-size: 14px;
            line-height: 40px;
            &:hover {
                text-shadow: 0 0 2px #fff8;
            }
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
    .song-list-title {
        background-color: #ddd8;
        color: #000;
    }
}
</style>