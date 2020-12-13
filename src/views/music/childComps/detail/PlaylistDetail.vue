<template>
    <div class="playlist-detail">
        {{ id }}
    </div>
</template>

<script>
import { getPlaylistDetail } from "network/detail";
export default {
    name: "PlaylistDetail",
    data() {
        return {
            id: "",
        };
    },
    created() {
        this.id = this.$route.query.id;
        this.getPlaylistDetail(this.id);
    },
    methods: {
        getPlaylistDetail(id) {
            getPlaylistDetail(id)
                .then((result) => {
                    console.log(result);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style lang='scss' scoped>
</style>