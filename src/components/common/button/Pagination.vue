<template>
    <div class="pagination" v-show="pageNum !== 1">
        <!-- <button>&lt;</button> -->
        <ul>
            <li @click="lastPage(curPage - 1)">&lt;</li>
            <li
                v-for="(item, index) in pageArray"
                :key="index"
                :class="{ active: item === curPage }"
                @click="pageTurn(item, index)"
            >
                <!-- <span v-text="showText(item)"></span> -->
                {{ item }}
            </li>
            <li @click="nextPage(curPage + 1)">&gt;</li>
        </ul>
        <!-- <button>&gt;</button> -->
    </div>
</template>

<script>
export default {
    name: "Pagination",
    props: ["pageSize", "curPage", "total"],
    data() {
        return {
            // pageSize: 30,
            // curPage: 6,
            // total: 387,
            pageNum: "",
            pageArray: [],
        };
    },
    created() {
        // this.initPage(this.pageSize, this.total);
        // this.showText();
    },
    watch: {
        total() {
            this.initPage(this.pageSize, this.total);
            this.showText();
        },
        curPage() {
            this.showText();
        },
    },
    computed: {},
    methods: {
        // 初始化页数（用computed更好，下次再改）
        initPage(pageSize, total) {
            this.pageNum = Math.ceil(total / pageSize);
        },
        // 初始化分页数组
        showText() {
            // const vm = this;
            const index = this.curPage;
            const sum = this.pageNum;
            this.pageArray = [];
            for (var i = 1; i <= sum; i++) {
                if (i < 3 || i > sum - 2) {
                    // 前两个和最后两个始终显示
                    // return i;
                    this.pageArray.push(i);
                } else if (i <= index + 2 && i >= index - 2) {
                    // 当前页的前一页和后一页始终显示
                    // return i;
                    this.pageArray.push(i);
                } else if (i === index + 3 || i === index - 3) {
                    // 当前页的前前页和后后页显示 ...
                    // return "...";
                    this.pageArray.push("...");
                } // 除此之外都不显示
                // return false;
            }
        },
        // 发射页码点击事件
        pageTurn(page) {
            this.$emit("pageTurn", page);
            console.log(page);
            console.log(this.pageNum);
        },
        // 上一页
        lastPage(page) {
            if (page >= 1) {
                this.$emit("pageTurn", page);
            }
        },
        // 下一页
        nextPage(page) {
            if (page <= this.pageNum) {
                this.$emit("pageTurn", page);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.pagination {
    ul {
        display: flex;
        justify-content: space-around;
        width: 500px;
        right: 0;
        li {
            cursor: pointer;
            &:hover {
                color: #fff;
            }
        }
        .active {
            color: #f00;
            &:hover {
                color: #f00;
            }
        }
    }
}
</style>