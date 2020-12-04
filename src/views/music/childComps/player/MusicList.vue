<template>
    <div class="music-list">
        <ul>
            <li v-for="(item, id) in musicLists" :key="id">
                <div class="music-list-name">
                    <span>{{ item.name | filterNull }}</span>
                </div>
                <div class="music-list-artist">
                    <span>{{ item.artist | filterNull }}</span>
                </div>
                <div class="music-list-size">
                    <span>{{
                        item.duration | filterNull | filterDuration
                    }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "MusicList",
    data() {
        return {
            musicLists: [],
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
};
</script>

<style lang='scss' scoped>
.music-list {
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
        //     // min-width: 200px;
        // }
        .music-list-artist {
            font-size: 14px;
            line-height: 40px;
        }
        .music-list-album {
            font-size: 14px;
            line-height: 40px;
        }
        .music-list-control {
            text-align: center;
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
</style>