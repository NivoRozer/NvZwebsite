<template>
    <transition name="fade">
        <div class="music-list" @click.stop>
            <span
                class="default-list"
                v-if="!$store.state.music.musicLists.length"
            >
                你还没有添加任何歌曲
            </span>
            <transition-group name="list-complete" tag="ul" mode="out-in">
                <div
                    :key="0"
                    class="music-list-info"
                    v-if="$store.state.music.musicLists.length"
                >
                    <span
                        >{{ $store.state.music.musicLists.length }}首歌曲</span
                    >
                    <span class="clear-list" @click="clearAll">全部清除</span>
                </div>
                <li
                    v-for="(item, index) in $store.state.music.musicLists"
                    :key="item.uuid"
                    @click="songClick(item)"
                    class="list-complete-item"
                    :class="{
                        active: item.uuid === $store.state.music.isPlaying.uuid,
                    }"
                >
                    <div class="music-list-name">
                        <span>{{ item.name | filterNull }}</span>
                    </div>
                    <div class="music-list-artist">
                        <span
                            v-for="(item, index) in item.artists"
                            :key="index"
                            >{{ item.name | filterNull }}</span
                        >
                        <span v-if="!item.artists">暂无</span>
                    </div>
                    <div class="music-list-size">
                        <span>{{ item.duration | filterDuration }}</span>
                    </div>
                    <div
                        class="music-list-remove"
                        @click.stop="removeSong(index)"
                    >
                        <span>X</span>
                    </div>
                </li>
            </transition-group>
        </div>
    </transition>
</template>

<script>
export default {
    name: "MusicList",
    data() {
        return {};
    },
    filters: {
        //过滤空数据
        filterNull(item) {
            return item ? item : "暂无";
        },
        //过滤歌曲时长
        filterDuration(time) {
            if (time) {
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
            } else {
                return "暂无";
            }
        },
    },
    methods: {
        songClick(item) {
            if (item.uuid !== this.$store.state.music.isPlaying.uuid) {
                console.log("play" + item.uuid);
                this.$store.commit("playMusic", item.id);

                // this.$emit("listPlay", item.id);
            } else {
                console.log("click" + item.uuid);
            }
        },
        removeSong(index) {
            this.$store.commit("removeMusic", index);
        },
        clearAll() {
            this.$store.commit("removeAllMusic");
        },
    },
};
</script>

<style lang='scss' scoped>
.music-list {
    position: absolute;
    width: 500px;

    overflow: hidden;

    bottom: 80px;
    right: 0px;

    z-index: 100;
    border-radius: 10px 4px 4px 10px;
    background-color: #222d;
    box-shadow: 0 0 5px rgb(0, 0, 0, 0.5), 10px 10px 20px rgb(0, 0, 0, 0.2);
    backdrop-filter: blur(5px);

    .default-list {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }

    .active {
        color: #0f0;
        &:hover {
            color: #0f0;
        }
    }

    ul {
        overflow-y: auto;
        overflow-x: hidden;
        max-height: calc(100vh - 250px);
        min-height: 200px;
        .music-list-info {
            display: flex;
            justify-content: space-between;
            padding: 10 20px;
            align-items: center;
            margin: 10px 50px 10px 20px;
            .clear-list {
                cursor: pointer;
                transition: all 0.5s ease;
                // color: #fff;
                &:hover {
                    text-shadow: 0 0 2px #fff;
                }
            }
        }
    }
    li {
        display: grid;
        grid-template-columns: 4fr 3fr 1fr 10px;
        grid-column-gap: 20px;
        text-align: left;
        // position: relative;
        padding: 0 20px;
        transition: all 0.5s ease;
        background-color: #fff0;

        // &:not(:last-child) {
        // border-bottom: 2px solid #fff2;
        // box-shadow: 0 0 2px #fff8;
        // }
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
            // font-size: 14px;
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
        // .music-list-size {
        // font-size: 14px;
        // }
        .music-list-remove {
            display: none;
        }
    }
    li:hover {
        color: #eee;
        background-color: #fff2;
        cursor: pointer;
        .music-list-remove {
            display: block;
        }
    }
}
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s ease;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
    transform: translateY(100%);
}

.list-complete-item {
    transition: all 1s;
    display: inline-block;
}
.list-complete-move {
    transition: all 1s;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateX(100%);
}
.list-complete-leave-active {
    position: absolute;
}
</style>