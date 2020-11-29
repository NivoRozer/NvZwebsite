<template>
    <div class="nav-bar">
        <div
            v-for="(item, index) in titles"
            :key="index"
            class="nav-bar-item"
            :class="{ active: index === currentIndex }"
            @click="itemClick(item.type, index)"
        >
            {{ item.name }}
        </div>
    </div>
</template>

<script>
export default {
    name: "NavBar",
    props: {
        titles: {
            type: Array,
            default() {
                return [];
            },
        },
        curType: {
            type: Number,
            default() {
                return 1;
            },
        },
    },
    data() {
        return {
            currentIndex: 0,
        };
    },
    created() {
        this.initNav(this.titles, this.curType);
    },
    watch: {
        curType() {
            this.initNav(this.titles, this.curType);
        },
    },
    methods: {
        // 接收外部的curType来初始化nav的选中状态
        initNav(titles, type) {
            let index = titles.findIndex((item) => item.type === type);
            this.currentIndex = index;
        },
        itemClick(type, index) {
            if (index !== this.currentIndex) {
                this.currentIndex = index;
                this.$emit("navClick", type);
            }
        },
    },
};
</script>

<style lang='scss' scoped>
.nav-bar {
    display: flex;
    justify-content: flex-start;
    div {
        // margin-right: 10px;
        cursor: pointer;
        position: relative;
        padding: 5px;
        &:hover {
            text-shadow: 0 0 4px #ddd8;
        }
    }
    // 以下为菜单跟随滚动条效果
    div::before {
        content: "";
        // display:block;
        position: absolute;
        width: 0;
        bottom: 0;
        left: 100%;
        // height: 0;
        border-bottom: 2px solid #ddd8;
        transition: 0.2s all linear;
    }
    div:hover::before {
        left: 0;
        width: 100%;
        transition-delay: 0.1s;
    }
    div:hover ~ div::before {
        left: 0;
    }
    .active {
        // border-bottom: 2px solid #fff8;
        // box-shadow: 2px 0 2px #fff8;
        // transition: 0.2s all ease;
        &::before {
            // border-bottom: none;
            left: 0;
            width: 100%;
        }
    }
}
</style>