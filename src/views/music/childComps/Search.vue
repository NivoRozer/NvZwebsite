<template>
    <div class="search">
        <div class="search-bar">
            <input
                type="text"
                @focus="searchActive"
                @blur="searchDisactive"
                :placeholder="defaultSearch"
                v-model="inputValue"
                @keyup.enter="search(inputValue)"
                ref="inputVal"
            />
            <img
                src="~@/assets/img/music/search.png"
                @click="search(inputValue)"
                alt=""
            />
        </div>
        <transition name="fade">
            <div class="search-list" v-show="isShow">
                <ul v-if="suggestSongs">
                    <span>单曲</span>
                    <li
                        v-for="item in suggestSongs"
                        :key="item.id"
                        @click="search(item.name)"
                    >
                        {{ item.name }}
                    </li>
                </ul>
                <ul v-if="suggestAlbums">
                    <span>专辑</span>
                    <li
                        v-for="item in suggestAlbums"
                        :key="item.id"
                        @click="search(item.name, 10)"
                    >
                        {{ item.name }}
                    </li>
                </ul>
                <ul v-if="!suggestSongs & !suggestAlbums">
                    <span>热门搜索</span>
                    <li
                        v-for="(item, index) in searchHot"
                        :key="index"
                        @click="search(item.first)"
                    >
                        {{ item.first }}
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
import { searchDefault, searchHot, searchSuggest } from "network/search";

export default {
    name: "Search",
    data() {
        return {
            defaultSearch: "搜索",
            realkeyword: "",
            searchHot: "",
            suggestSongs: "",
            suggestAlbums: "",
            isShow: false,
            inputValue: "",
            refresh: "",
        };
    },
    created() {
        this.initSearch();
        this.refresh = this.debounce(this.searchSuggest, 500);
    },
    watch: {
        inputValue() {
            this.refresh();
        },
    },
    methods: {
        debounce(fn, delay) {
            let timer = null;
            return function () {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(fn, delay);
            };
        },
        initSearch() {
            searchDefault()
                .then((result) => {
                    console.log(result.data);
                    this.defaultSearch = result.data.showKeyword;
                    this.realkeyword = result.data.realkeyword;
                })
                .catch((err) => {
                    console.log(err);
                });
            searchHot()
                .then((result) => {
                    console.log(result.result);
                    this.searchHot = result.result.hots;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        searchSuggest() {
            if (this.inputValue) {
                searchSuggest(this.inputValue)
                    .then((result) => {
                        this.suggestSongs = result.result.songs
                            ? result.result.songs
                            : "";
                        this.suggestAlbums = result.result.albums
                            ? result.result.albums
                            : "";
                        console.log(result.result);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                this.suggestSongs = "";
                this.suggestAlbums = "";
            }
        },
        search(keywords, type) {
            this.$refs.inputVal.blur();
            // type ? type : 1;
            if (keywords) {
                this.inputValue = keywords;
                // keywords === this.inputValue ? keywords : this.inputValue;
                //     searchMultiMatch(keywords)
                //         .then((result) => {
                //             console.log(result);
                //         })
                //         .catch((err) => {
                //             console.log(err);
                //         });
                this.$emit("search", keywords, type);
            } else if (this.realkeyword) {
                let keywords = this.realkeyword;
                this.inputValue = keywords;
                this.$emit("search", keywords, type);
            }
        },
        searchActive() {
            this.isShow = true;
        },
        searchDisactive() {
            this.isShow = false;
        },
    },
};
</script>

<style lang="scss" scoped>
.search-bar {
    position: relative;
    width: 300px;
    height: 30px;
    border-radius: 15px;
    box-shadow: 0 0 4px #0006;
    color: #fff;

    display: flex;
    align-items: center;
    overflow: hidden;
    &:hover {
        input {
            background: #ddd;
            color: #333;
        }
    }

    input {
        outline: none;
        border: none;
        padding: 0 30px 0 10px;

        background: #ddd2;
        height: 30px;
        width: 100%;
        border-radius: 15px;
        transition: all 0.5s ease;

        &:focus {
            background: #ddd;
            color: #333;
            & {
                & {
                    .search-detail {
                        opacity: 0;
                    }
                }
            }
        }
    }
    img {
        position: absolute;
        right: 0;
        cursor: pointer;
        height: 80%;
        opacity: 0.4;
    }
}
.search-list {
    z-index: 100;

    margin: 5px 0 0 0;
    padding: 10px;
    border-radius: 15px;
    width: 300px;
    position: absolute;
    box-shadow: 0 0 4px #0006;
    background-color: #222d;

    transition: all 0.5s ease;
    transition-delay: 0.1s;

    ul:not(:last-child) {
        border-bottom: 1px solid #ddd8;
    }
    li {
        padding: 2px 0 2px 32px;
        border-radius: 4px;
    }
    li:hover {
        color: #eee;
        background-color: #fff2;
        cursor: pointer;
    }
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>