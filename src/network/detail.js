import { request } from "./request";

export function getArtist(id) {
    return request({
        method: 'get',
        url: '/artists',
        params: {
            id
        }
    })
};

export function getArtistAlbum(id, limit, offset) {
    return request({
        method: 'get',
        url: '/artist/album',
        params: {
            id,
            limit,
            offset
        }
    })
};

export function getArtistDesc(id) {
    return request({
        method: 'get',
        url: '/artist/desc',
        params: {
            id
        }
    })
};

// export class ArtistDesc{
//     constructor(introduction,briefDesc,topicData){

//     }
// }
export function getPlaylistDetail(id) {
    return request({
        method: 'get',
        url: '/playlist/detail',
        params: {
            id
        }
    })
};
export function getAlbumDetail(id) {
    return request({
        method: 'get',
        url: '/album',
        params: {
            id
        }
    })
};
export function getSongDetail(ids) {
    return request({
        method: 'get',
        url: '/song/detail',
        params: {
            ids
        }
    })
};