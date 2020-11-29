<template>
    <div class="search-albums">
        专辑
        <!-- <pagination
            @pageTurn="pageTurn"
            :total="searchCount"
            :pageSize="limit"
            :curPage="curPage"
        /> -->
        {{searchResult}}
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
};
</script>

<style lang='scss' scoped>
</style>