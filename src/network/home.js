import { request } from "./request";

export function login(email, password) {
    return request({
        method: 'post',
        url: '/login',
        params: {
            email,
            password
        }
    })
};

export function getBanner() {
    return request({
        url: '/banner',
    })
};

// 获取歌单分类
export function getCatlists() {
    return request({
        url: '/playlist/catlist',
        params: {

        }
    })
};

// 获取热门歌单分类
export function getCategories() {
    return request({
        url: '/playlist/hot',
    })
};

// 获取精品歌单
export function getRecommend(limit) {
    return request({
        url: '/top/playlist/highquality',
        params: {
            limit
        }
    })
};

// 获取网友精选碟歌单
export function getTopPlaylists(cat, limit, offset) {
    return request({
        url: '/top/playlist',
        params: {
            // order: 'hot',
            cat,
            limit,
            offset
        }
    })
};

export function getNewSongs(type) {
    return request({
        url: '/top/song',
        params: {
            type
        }
    })
};

export function getHomeGoods(type, limit, offset) {
    return request({
        url: '/artist/list',
        params: {
            type,
            area: 96,
            limit,
            offset
        }
    })
}
