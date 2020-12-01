<template>
    <div class="search-albums">
        <ul>
            <li v-for="item in searchResult" :key="item.id">
                <img :src="item.picUrl" alt="" />
                <span class="album-name">{{ item.name }}</span>
                <span class="album-artist">{{ item.artist.name }}</span>
                <span>{{ item.publishTime | formatDate }}发行</span>
                <span>{{ item.size }}首</span>
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
};
</script>

<style lang='scss' scoped>
.search-albums {
    overflow: hidden;
    ul {
        li {
            img {
                border-radius: 5px;
                height: 100%;
                box-shadow: 0 0 5px rgb(0, 0, 0, 0.5),
                    10px 10px 20px rgb(0, 0, 0, 0.2);
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