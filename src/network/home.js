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

export function getRecommend() {
    return request({
        url: '/top/playlist/highquality',
        params: {
            limit: 5
        }
    })
};

export function getHomeGoods(type,limit,offset) {
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
