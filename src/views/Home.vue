<template>
    <div class="home bg">
        <!-- <music-icon></music-icon> -->
        <header class="header">
            <div id="top-logo">
                <img src="/img/MasterChief.png" alt="" />
            </div>
            <div id="top-title">
                <span id="title01">个人小站</span>
                <hr />
                <span id="title02">nvz.xiuuhui.com</span>
            </div>
        </header>
        <nav class="navlist">
            <div><router-link to="/portal">入口</router-link></div>
            <div>
                <a href="https://github.com/NivoRozer/NvZwebsite">GitHub</a>
            </div>
            <!-- <div><router-link to="">个人介绍</router-link></div> -->
            <!-- <div><router-link to="">其他</router-link></div> -->
            <!-- <div><router-link to="">关于</router-link></div> -->
        </nav>
        <footer id="bottom-footer">
            <div>
                <hr />
                <span>This is a simple personal learning website by NvZ.</span>
            </div>
            <div>
                <hr />
                <span>
                    <a href="http://beian.miit.gov.cn/"
                        >赣ICP备2020011012号-1</a
                    >
                </span>
                <span>Copyright © 2020-2020 NvZ</span>
            </div>
        </footer>
    </div>
</template>

<script>
// @ is an alias to /src
import MusicIcon from "components/common/MusicIcon";

export default {
    name: "Home",
    components: {
        MusicIcon,
    },
    data() {
        return {
            publicPath: process.env.BASE_URL,
        };
    },
};
</script>

<style lang="scss" scoped>
.home {
    width: 100%;
    height: 100%;
    padding: 100px 0 10px;
    background: url(~@/assets/img/4dfce2edfaaaffbdc6339399cc340997.png)
        no-repeat center;
    background-size: cover;
    position: fixed;
    text-align: center;
    font-family: "dengxian";
}
.header {
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
}
#top-logo {
    height: 30vh;
    width: 30vh;
    min-height: 100px;
    min-width: 100px;
    max-height: 200px;
    max-width: 200px;
    border-radius: 50%;
    padding: 10px;
    margin: 0 0 20px 0;
    overflow: hidden;
    background-color: rgb(255, 255, 255, 0.2);
    transition: all 0.2s ease;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    box-shadow: 2px 2px 10px rgb(0, 0, 0, 0.4);
    filter: drop-shadow(0 0 4px rgb(0, 0, 0, 0.5));
    // animation: logo-rotate 10s linear infinite;
    img {
        border-radius: 50%;
        height: 100%;
        width: 100%;
    }
}
#top-logo:hover {
    background-color: rgba(43, 131, 231, 1);
    box-shadow: 0px 0px 10px 2px rgba(43, 131, 231, 1);
}
#top-title {
    // display: flex;
    // justify-content: center;
    // align-items: center;
    color: #fff;
    width: 100vw;
    margin: 0 0 20px 0;
    #title01 {
        font-size: 36px;
    }
    hr {
        width: 70%;
        margin: 5px auto;
        border: 0;
        border-bottom: 1px solid #fff;
        border-image: linear-gradient(to right, #fff2, #ffff, #fff2) 1 8 1;
    }
    #title02 {
        font-size: 10px;
    }
}
.navlist {
    // display: grid;
    margin: 0 0 20px 0;
    width: 30%;
    height: 220px;
    max-width: 200px;
    margin-left: auto;
    margin-right: auto;
    div {
        transition: all 0.5s ease;
        width: 70%;
        margin: 0 auto;
        max-height: 40px;
        min-height: 10px;
        margin-top: 15px;
        text-decoration: none;
        border-radius: 20px;
        filter: drop-shadow(1px 1px 4px rgb(0, 0, 0, 0.3));
        a {
            display: block;
            width: 100%;
            line-height: 40px;
        }
    }
    div:hover {
        a {
            color: $primary-color;
        }
        background-color: #fff;
        width: 100%;
    }
}
#bottom-footer {
    padding: 4px 10px;
    background-color: #04202c80;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 12;
    div {
        color: #858585;
        font-size: 10px;
        letter-spacing: 1.5px;
        line-height: 16px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        span {
            line-height: 24px;
            margin: 0 10px;
            a {
                color: #858585;
            }
        }
    }
    hr {
        border: 0;
        border-bottom: 1px dashed #858585;
    }
}
.bg {
    background-image: linear-gradient(
        125deg,
        #ee7752,
        #e73c7e,
        #9c27b0,
        #3f51b5,
        #2196f3
    );
    background-size: 400%;
    animation: bganimation 20s ease infinite;
}
@keyframes bganimation {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
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
