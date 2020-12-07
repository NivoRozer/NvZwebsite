<template>
    <div class="music-swiper">
        <swiper class="swiper" :options="swiperOptions" ref="mySwiper">
            <swiper-slide v-for="(item, encodeId) in banners" :key="encodeId">
                <img :src="item.imageUrl" alt="" />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <!--以下看需要添加-->
            <div
                class="swiper-button-next"
                @click="next"
                slot="button-next"
            ></div>
            <!-- 下一项 -->
            <div
                class="swiper-button-prev"
                @click="prev"
                slot="button-prev"
            ></div>
            <!-- 上一项 -->
            <div class="swiper-pagination" slot="pagination"></div>
            <!-- 标页码 -->
        </swiper>
    </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";

import "swiper/css/swiper.css";

export default {
    name: "MusicSwiper",
    components: {
        Swiper,
        SwiperSlide,
    },
    directives: {
        swiper: directive,
    },
    props: {
        banners: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    data() {
        return {
            swiperOptions: {
                notNextTick: true,
                // initialslider:0,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },

                effect: "coverflow",
                // grabCursor: true,
                centeredSlides: true,
                slidesPerView: "auto",

                loop: true,

                autoplay: {
                    disableOnInteraction: false,
                    delay: 3000,
                },
                slideToClickedSlide: true,

                speed: 800,

                coverflowEffect: {
                    rotate: 30,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                },
            },
        };
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.$swiper;
        },
    },
    mounted() {
        console.log("Current Swiper instance object", this.swiper);
        this.swiper.slideTo(3, 1000, false);
    },
    methods: {
        prev() {
            this.$refs.mySwiper.$swiper.slidePrev();
        },
        next() {
            this.$refs.mySwiper.$swiper.slideNext();
        },
    },
};
</script>

<style lang="scss" scoped>
.music-swiper {
    // position: relative;
    // .swiper-slide {
    //     img {
    //         position: absolute;
    //         width: 100%;
    //     }
    // }
    width: 100%;
    --swiper-pagination-color: #fff;
    // height: 400px;
    // padding-top: 50px;
    // padding-bottom: 50px;
}
.swiper {
    // height: 100%;
    width: 100%;
    border-radius: 10px;
    filter: drop-shadow(0 0 10px #0008);
    padding: 50px 0;

    .swiper-slide {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 300px;
        height: 300px;
        text-align: center;
        font-weight: bold;
        // background-color: #2c8dfb;
        background-position: center;
        background-size: cover;
        backface-visibility: hidden;

        img {
            border-radius: 10px;
            border: 1px solid transparent;
            height: 100%;
            // width: 100%;
            transition: all 0.2s ease;
            &:hover {
                box-shadow: 0 0 1px 2px #fffb;
            }
        }
        // .swiper-pagination {
        //     .swiper-pagination-bullet-active {

        //     }
        // }
    }

    .swiper-button-next {
        color: #fff8;
        filter: drop-shadow(0 0 10px #000f);
        transition: all 0.5s ease;
        &:hover {
            color: #fff;
            transform: scale(1.2);
        }
        &:active {
            transform: scale(0.8);
        }
    }
    .swiper-button-prev {
        color: #fff8;
        filter: drop-shadow(0 0 10px #000f);
        transition: all 0.5s ease;
        &:hover {
            color: #fff;
            transform: scale(1.2);
        }
        &:active {
            transform: scale(0.8);
        }
    }
}
</style>