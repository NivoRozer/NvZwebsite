<template>
    <div id="music-controler">
        <div id="progress-bar"></div>
        <div class="music-controler-container">
            <div id="music-info">
                <div id="music-cover"></div>
                <div id="music-name">{{ nowPlaying.name }}</div>
            </div>
            <div id="music-control">
                <!-- <div id="play-mode" @click="playMode">顺序</div> -->
                <div id="last" @click="last">上一首</div>
                <div id="play-pause" @click="togglePlay">{{ playButton }}</div>
                <div id="next" @click="next">下一首</div>
                <!-- <div id="volume" @click="volume">音量</div> -->
            </div>
        </div>
        <!-- <div id="getStatus" @click="getStatus">获取音频状态</div> -->
        <!-- <div>{{ nowPlaying }}</div>
        <div>{{ status }}</div> -->
    </div>
</template>

<script>
// import audio from "@/assets/js/audio.js";

const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = new AudioContext();
let audioCtxSource;

export default {
    name: "MusicControler",
    props: ["musicInfo"],
    data() {
        return {
            nowPlaying: this.musicInfo,
            status: "",
            path: this.musicInfo.path,
            // path: '/cloudmusic/url?id=1487528112.mp3',
            playButton: "暂停",
            refresh: "",
        };
    },
    created() {
        console.log(this.nowPlaying.name);
        console.log(this.path);

        this.createAudio();
        this.playAudio();

        this.refresh = this.debounce(this.playAudio, 500);
    },
    mounted() {
        // console.log(audio.audioContext);
        // console.log(this.audioContext);
        console.log(audioCtx.state);
    },
    updated() {
        console.log(this.path);
    },
    watch: {
        musicInfo() {
            this.nowPlaying = this.musicInfo;
            // this.path = `http://localhost:8080${this.nowPlaying.path}`;
            this.path = this.nowPlaying.path;

            // this.playAudio();
        },
        path() {
            this.refresh();
        },
    },
    beforeDestroy() {
        audioCtx.close();
    },
    methods: {
        // getStatus() {
        //     // this.status = audioCtx.state;
        //     console.log("abc");
        // },
        //防抖
        debounce(fn, delay) {
            let timer = null;
            return function () {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(fn, delay);
            };
        },

        createAudio() {
            if (audioCtx.state === "closed") {
                audioCtx = new AudioContext();
            }
        },
        async initAudio(path) {
            console.log(audioCtx);
            console.log(path);
            const res = await fetch(path);
            const arraybuffer = await res.arrayBuffer();
            const audioBuffer = await audioCtx.decodeAudioData(arraybuffer);
            const source = audioCtx.createBufferSource();

            // const gainNode = audioCtx.createGain();
            // source.connect(gainNode);
            // gainNode.gain.value = 0.1;//音量调节

            source.connect(audioCtx.destination); //连接上实例
            source.buffer = audioBuffer;
            source.addEventListener("ended", () => {
                this.audioEnded();
            });
            return source;
        },
        audioEnded() {
            console.log("onended");
            this.next();
        },
        playAudio() {
            audioCtx.close();
            if (audioCtx.state === "closed") {
                this.createAudio();
                this.initAudio(this.path)
                    .then((result) => {
                        console.log(result);
                        audioCtxSource = result;
                        // result.start();
                        audioCtxSource.start();
                    })
                    .catch((err) => {
                        console.log("获取歌曲失败");
                    });
            }
        },
        last() {
            this.$emit("lastMusic");
            console.log(this.path);
        },
        togglePlay() {
            // audio.text();
            // audioCtxSource && audioCtxSource.start();
            if (audioCtx.state === "running") {
                audioCtx.suspend().then(() => {
                    // susresBtn.textContent = "Resume context";
                    console.log("暂停音乐");
                    console.log(audioCtx.state);
                    this.playButton = "播放";
                });
            } else if (audioCtx.state === "suspended") {
                audioCtx.resume().then(() => {
                    // susresBtn.textContent = "Suspend context";
                    console.log("恢复音乐");
                    console.log(audioCtx.state);
                    this.playButton = "暂停";
                });
            } else {
                // this.initAudio()
                //     .then((result) => {
                //         console.log(result);
                //         result.start();
                //     })
                //     .catch((err) => {
                //         console.log("获取歌曲失败");
                //     });
                // audioCtxSource && audioCtxSource.start();
                this.playButton = "暂停";
                console.log(audioCtx.state);
            }
        },
        next() {
            this.$emit("nextMusic");
            console.log(this.path);

            // console.log(audioCtxSource.start);
        },
    },
};
</script>

<style lang='scss' scoped>
#getStatus:hover {
    text-shadow: 0 0 2px #fff8;
    background-color: #fff2;
}
.music-controler-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    // padding: 0 20%;
    div {
        overflow: hidden;
        height: 40px;
        line-height: 40px;
        text-shadow: 0 0 4px #0008;
    }
}
#music-info {
    display: grid;
    grid-template-columns: 1fr 4fr;
    padding: 0 0 0 0;
    div {
        transition: all 0.5s ease;
    }
    div:hover {
        text-shadow: 0 0 2px #fff8;
        background-color: #fff2;
    }
}
// #music-name {
//     transition: all 0.5s ease;
// }
#music-control {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 0 20%;
    grid-column-gap: 20px;
    div {
        transition: all 0.5s ease;
    }
    div:hover {
        text-shadow: 0 0 2px #fff8;
        background-color: #fff2;
    }
}
#last {
    cursor: pointer;
}
#play-pause {
    cursor: pointer;
}
#next {
    cursor: pointer;
}
</style>