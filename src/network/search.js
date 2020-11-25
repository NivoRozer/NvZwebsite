import { request } from "./request";

export function searchDefault() {
    return request({
        // method: 'post',
        url: '/search/default'
    })
};

export function searchHot() {
    return request({
        url: '/search/hot',
    })
};

export function searchSuggest(keywords) {
    return request({
        url: '/search/suggest',
        params: {
            keywords
        }
    })
};

export function search(keywords, type, limit, offset) {
    return request({
        url: '/search',
        params: {
            keywords,
            type,
            limit,
            offset
        }
    })
}
