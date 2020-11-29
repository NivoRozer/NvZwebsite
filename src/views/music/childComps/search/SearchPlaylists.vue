<template>
    <div class="search-playlist">
        <playlist-card
            v-for="item in searchResult"
            :key="item.id"
            :playlistInfo="item"
        />
    </div>
</template>

<script>
import Pagination from "components/common/button/Pagination";
import PlaylistCard from "components/content/cards/PlaylistCard";

export default {
    name: "SearchPlaylists",
    components: {
        Pagination,
        PlaylistCard,
    },
    props: ["searchResult"],
};
</script>

<style lang='scss' scoped>
.search-playlist{
    overflow: hidden;
    display: grid;
    justify-content: space-around;
    grid-template-columns: repeat(auto-fill, 250px);
    // column-gap: 20px;
    // row-gap: 20px;
}
</style>