import { request } from "./request";

export function getSongDetail(ids) {
    return request({
        // method: 'post',
        url: '/song/detail',
        params: {
            ids
        }
    })
};
export function getSongURL(id) {
    return request({
        // method: 'post',
        url: '/song/url',
        params: {
            id
        }
    })
};