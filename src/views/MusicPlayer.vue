<template>
    <div class="music-player">
        <div class="player-container frosted-glass">
            <h2>Music Player</h2>
            <div class="music-list">
                <ul>
                    <li v-for="(item, id) in musicList" :key="id">
                        <div class="music-list-name">
                            <span>{{ item.name | filterNull }}</span>
                        </div>
                        <div class="music-list-artist">
                            <span>{{ item.artist | filterNull }}</span>
                        </div>
                        <div class="music-list-album">
                            <span>{{ item.album | filterNull }}</span>
                        </div>
                        <div class="music-list-control">播放</div>
                    </li>
                </ul>
            </div>
            <music-controler
                :musicInfo="musicInfo"
                @lastMusic="lastMusic"
                @nextMusic="nextMusic"
            ></music-controler>
        </div>
    </div>
</template>

<script>
import MusicControler from "@/components/common/MusicControler";
export default {
    name: "MusicPlayer",
    components: {
        MusicControler,
    },
    data() {
        return {
            index: 0,
            musicInfo: "",
            musicList: [
                // {
                //     id:'001',
                //     name: "onj001",
                //     artist: "",
                //     album: "",
                //     path: "/mp3/onj001.mp3",
                // },
                {
                    id: "001",
                    name: "Shake",
                    artist: "",
                    album: "",
                    path: "/mp3/Test00.wav",
                },
                {
                    id: "002",
                    name: "アングレカム",
                    artist: "Innocent Grey",
                    album: "FLOWERS ORIGINAL SOUNDTRACK -PRINTEMPS-",
                    path: "/mp3/Test01.mp3",
                },
                {
                    id: "003",
                    name: "WINGS ~TYPE-MOON Fes. Opening Theme~",
                    artist: "深澤秀行",
                    album: "TYPE-MOON Fes. -10th Anniversary Blu-ray Disc Box-",
                    path: "/mp3/Test02.mp3",
                },
            ],
        };
    },
    filters: {
        //过滤空数据
        filterNull(item) {
            return (item = item ? item : "暂无");
        },
    },
    created() {
        this.musicInfo = this.musicList[0];
    },
    mounted() {},
    methods: {
        lastMusic() {
            if (this.index === 0) {
                this.index = this.musicList.length - 1;
                this.musicInfo = this.musicList[this.index];
            } else {
                this.musicInfo = this.musicList[this.index - 1];
                this.index--;
            }
            console.log(this.index);
            console.log(this.musicInfo);
        },
        nextMusic() {
            if (this.index + 1 >= this.musicList.length) {
                this.index = 0;
                this.musicInfo = this.musicList[this.index];
            } else {
                this.musicInfo = this.musicList[this.index + 1];
                this.index++;
            }
            console.log(this.index);
            console.log(this.musicInfo);
        },
    },
};
</script>

<style lang='scss' scoped>
.music-player {
    height: 100vh;
    // overflow: hidden;
    padding: 40px;
    color: #ccc;
    background: url(~@/assets/img/4dfce2edfaaaffbdc6339399cc340997.png) center
        center / cover no-repeat fixed;
}
.player-container {
    padding: 20px 0;
    border-radius: 10px;
    box-shadow: 0 0 5px rgb(0, 0, 0, 0.5), 0 0 20px rgb(0, 0, 0, 0.2);
    transition: all 0.5s ease;
    h2 {
        margin: 0 0 20px 0;
    }
}
.frosted-glass {
    z-index: 10;
    overflow: hidden; // 为防止效果不超出 content 的范围
    background-size: 100%;
    position: relative;
}
.frosted-glass::after {
    content: "";
    background: url(~@/assets/img/4dfce2edfaaaffbdc6339399cc340997.png) center
        center / cover no-repeat fixed;
    filter: blur(10px) brightness(100%);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    margin: -30px; //为解决元素的边缘模糊的效果减弱
}

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

@media screen and (max-width: 600px) {
    .music-player {
        padding: 20px;
        position: fixed;
    }
    .player-container {
        h2 {
            margin: 0;
        }
    }
    .music-list {
        li {
            padding: 8px;
            display: grid;
            grid-auto-flow: row;
            grid-template: 1fr/ 1fr 1fr;
            grid-template-areas: "a a " "b c";
            grid-column-gap: 20px;
            .music-list-name {
                // min-width: 200px;
                line-height: 30px;
                grid-area: a;
            }
            .music-list-artist {
                font-size: 10px;
                line-height: 12px;
            }
            .music-list-album {
                font-size: 10px;
                line-height: 12px;
            }
            .music-list-control {
                display: none;
            }
        }
    }
}
</style>