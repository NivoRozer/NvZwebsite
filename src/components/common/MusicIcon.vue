<template>
    <div class="music-icon frosted-glass">
        <div class="music-container">
            <div
                class="play-pause"
                :style="{ 'animation-play-state': animationShow }"
                @click="togglePlay"
            >
                <img src="~@/assets/img/music_single_cccccc.png" alt="" />
                <audio
                    id="music-player"
                    :autoplay="isPlaying"
                    :src="musicSource"
                ></audio>
            </div>
            <div class="music-menu" @click="menuBtn">
                <img src="~@/assets/img/menu.png" alt="" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MusicIcon",
    data() {
        return {
            // animationShow: "running",
            // isPlaying: true,
            animationShow: "paused",
            isPlaying: false,
            isMobile: false,
            //返回资源地址
            musicSource: "",
            musicList: [
                "http://m8.music.126.net/20201213125229/cfe73786398e8aa24f7dd01247662079/ymusic/da36/0f09/c0aa/7367f9cb301fe664af56e96d218accff.mp3",
                "http://m8.music.126.net/20201213125025/05df785f9b48e47547a9a978572cbba9/ymusic/f540/24b8/9196/901233efe81fd44d0e88495368dc8fed.mp3",
            ],
        };
    },
    created() {
        this.musicSource = this.musicList[0];
    },
    mounted() {
        this.userDevice();
        this.audioInit();
        // this.initPlay();
    },
    methods: {
        //判断设备类型
        userDevice() {
            let flag = navigator.userAgent.match(
                /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
            );
            this.isMobile = flag;
        },
        // 根据设备类型初始化播放状态
        initPlay() {
            this.isMobile ? this.pauseMusic() : this.playMusic();
            // document.querySelector(".play-pause").onclick;
        },
        audioInit() {
            let audio = document.querySelector("#music-player");
            let index = 0;
            //监听音频结束
            audio.addEventListener("ended", () => {
                console.log("ended");
                this.pauseMusic();
                //循环播放列表音乐
                if (index + 1 >= this.musicList.length) {
                    index = 0;
                    this.musicSource = this.musicList[index];
                } else {
                    this.musicSource = this.musicList[index + 1];
                    index++;
                }
                console.log(index);
                console.log(this.musicSource);
                setTimeout(() => {
                    this.playMusic();
                }, 500);
            });
        },
        //点击切换播放/暂停
        togglePlay() {
            this.animationShow === "running"
                ? this.pauseMusic()
                : this.playMusic();
        },
        //播放音乐
        playMusic() {
            let audio = document.querySelector("#music-player");
            if (audio.paused && !this.isPlaying) {
                audio.play();
                this.isPlaying = true;
                this.animationShow = "running";
            }
        },
        // 暂停音乐
        pauseMusic() {
            let audio = document.querySelector("#music-player");
            if (!audio.paused && this.isPlaying) {
                audio.pause();
                this.isPlaying = false;
                // audio.currentTime = 0;
                this.animationShow = "paused";
            }
        },
        //跳转到音乐详情页
        menuBtn() {
            this.$router.push("/music");
        },
        //以下是AudioContext方法
        // testAudio() {
        //     const audioContext = new AudioContext();
        //     async function play() {
        //         const res = await fetch("http://localhost/file/audio.mp3");
        //         const arraybuffer = await res.arrayBuffer();
        //         const audioBuffer = await audioContext.decodeAudioData(
        //             arraybuffer
        //         );
        //         const source = audioContext.createBufferSource();
        //         source.connect(audioContext.destination); //连接上实例
        //         source.buffer = audioBuffer;
        //         source.start();
        //     }
        //     button.addEventListener("click", play, false);
        // },
    },
};
</script>

<style lang='scss' scoped>
.music-icon {
    height: 4rem;
    width: 4rem;
    position: fixed;
    top: 2rem;
    right: 2rem;
    border-radius: 2rem;
    box-shadow: 0 0 5px rgb(0, 0, 0, 0.4);
    transition: all 0.5s ease;
    overflow: hidden;
    .music-menu {
        transition: all 0.5s ease;
        opacity: 0;
    }
}
.music-icon:hover {
    height: 8rem;
    width: 4rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    .music-menu {
        opacity: 1;
    }
}
.music-container {
    height: 8rem;
    width: 4rem;
    // padding: 0 0 0 5px;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.play-pause {
    border-radius: 50%;
    height: 4rem;
    width: 4rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    // margin: 0 2px 0 0;
    animation: logo-rotate 10s linear infinite;
    filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.5));
    img {
        height: 70%;
        width: 70%;
    }
}
.play-pause:hover {
    filter: brightness(150%) drop-shadow(0 0 4px $primary-shadow-color);
}
.music-menu {
    border-radius: 50%;
    height: 4rem;
    width: 4rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.5));
    img {
        height: 70%;
        width: 70%;
    }
}
.music-menu:hover {
    filter: brightness(150%) drop-shadow(0 0 4px $primary-shadow-color);
}
.frosted-glass {
    z-index: 10;
    // position: absolute;
    overflow: hidden; // 为防止效果不超出 content 的范围
    // background: url(~@/assets/logo.png) center;
    background-size: 100%;
    background-color: #0002;
}
.frosted-glass::after {
    content: "";
    // background: url(~@/assets/img/4dfce2edfaaaffbdc6339399cc340997.png) center
    //     center / cover no-repeat fixed;
    filter: blur(4px) brightness(120%);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -2;
    margin: -30px; //为解决元素的边缘模糊的效果减弱
}

@keyframes logo-rotate {
    0% {
        transform: rotate(0);
    }
    50% {
        transform: rotate(180deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>