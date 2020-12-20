<template>
    <div class="search-albums">
        <ul>
            <li
                v-for="item in searchResult"
                :key="item.id"
                @click="albumClick(item.id)"
            >
                <div class="album-image">
                    <img :src="item.picUrl" alt="" />
                </div>
                <div>
                    <span class="album-name">{{ item.name }}</span>
                </div>
                <div>
                    <span
                        class="album-artist"
                        v-for="item in item.artists"
                        :key="item.id"
                        >{{ item.name }}</span
                    >
                </div>
                <div>
                    <span>{{ item.publishTime | formatDate }}发行</span>
                </div>
                <div class="album-size">
                    <span>{{ item.size }}首</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import Pagination from "components/common/button/Pagination";

export default {
    name: "SearchAlbums",
    components: {
        Pagination,
    },
    props: ["searchResult"],
    filters: {
        formatDate(time) {
            let date = new Date(time);
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            month = month < 10 ? "0" + month : month;
            day = day < 10 ? "0" + day : day;
            time = year + "-" + month + "-" + day;
            return time;
        },
    },
    methods: {
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
.search-albums {
    overflow: hidden;
    ul {
        li {
            .album-image {
                img {
                    border-radius: 5px;
                    height: 96px;
                    box-shadow: 0 0 5px rgb(0, 0, 0, 0.5),
                        5px 5px 10px rgb(0, 0, 0, 0.2);
                }
            }

            .album-name {
                cursor: pointer;
                &:hover {
                    text-shadow: 0 0 2px #fff8;
                }
            }
            .album-artist {
                cursor: pointer;
                &:hover {
                    text-shadow: 0 0 2px #fff8;
                }
                &:not(:last-child)::after {
                    content: "/";
                }
            }
            .album-size {
                padding: 0 40px 0 0;
                span {
                    float: right;
                }
            }
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
    }
}
</style>