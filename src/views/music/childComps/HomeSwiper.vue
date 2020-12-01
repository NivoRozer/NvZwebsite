<template>
    <swiper>
        <swiper-item v-for="(item,encodeId) in banners" :key="encodeId">
            <a :href="item.link">
                <img :src="item.imageUrl" @load="imgLoad" alt="">
            </a>
        </swiper-item>
    </swiper>
</template>

<script>
    import { Swiper, SwiperItem } from 'components/common/swiper'
    export default {
        name: "HomeSwiper",
        props: {
            banners: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                isLoad: false
            }
        },
        components: {
            Swiper,
            SwiperItem
        },
        methods: {
            imgLoad() {
                if (!this.isLoad) {
                    console.log('swiper图片加载');
                    this.$emit('swiperImgLoad');
                    this.isLoad = true
                }

            }
        },
    }
</script>

<style scoped>

</style>