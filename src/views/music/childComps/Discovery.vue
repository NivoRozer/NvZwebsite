<template>
    <div class="discovery">
        <div class="top">
            <home-swiper :banners="banners" />
            <music-swiper :banners="banners" />
        </div>
        <div class="mid">
            推荐歌单
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
                <li>9</li>
                <li>10</li>
                <li>11</li>
                <li>12</li>
                <li>13</li>
                <li>14</li>
                <li>15</li>
                <li>16</li>
                <li>17</li>
                <li>18</li>
                <li>19</li>
                <li>20</li>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
                <li>9</li>
                <li>10</li>
                <li>11</li>
                <li>12</li>
                <li>13</li>
                <li>14</li>
                <li>15</li>
                <li>16</li>
                <li>17</li>
                <li>18</li>
                <li>19</li>
                <li>20</li>
            </ul>
        </div>
        <div class="bot">最新音乐</div>
    </div>
</template>

<script>
import { getBanner } from "network/home";

import HomeSwiper from "./HomeSwiper";
import MusicSwiper from "components/common/swiper/MusicSwiper";

export default {
    name: "Discovery",
    components: {
        HomeSwiper,
        MusicSwiper,
    },
    data() {
        return {
            banners: [],
        };
    },
    created() {
        this.getHomeMultidata();
    },
    methods: {
        getHomeMultidata() {
            //1.请求多个数据
            getBanner()
                .then((result) => {
                    console.log(result.banners);
                    this.banners = result.banners;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.discovery {
    // background-color: #ddd8;
    // height: 100vh;
    // display: grid;
    // grid-template-rows: 50px 1fr 30px;
    position: relative;
    .top {
        
        .music-swiper {
            // position: absolute;
            // width: 500px;
        }
    }
    .mid {
        overflow-y: auto;
    }
}
</style>