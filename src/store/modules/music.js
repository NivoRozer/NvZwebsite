export default {
    state: {
        musicLists: [],
        isPlaying: {}
    },
    mutations: {
        pushMusic(state, data) {
            state.musicLists.push(data);
            console.log(state.musicLists);
        },
        removeMusic(state, data) {
            // 判断播放列表中移除的音乐是否正在播放
            if (state.musicLists[data].uuid === state.isPlaying.uuid) {
                // endMusic
                state.isPlaying = {}
            };
            state.musicLists.splice(data, 1);
        },
        removeAllMusic(state) {
            state.isPlaying = {};
            state.musicLists = [];
        },

        playMusic(state, data) {
            // state.isPlaying.album.picUrl = data.picUrl
            state.isPlaying = {};
            state.isPlaying.name = data.name;
            state.isPlaying.artists = data.artists;
            state.isPlaying.id = data.id;
            // state.isPlaying.audioUrl = data.uuid
            state.isPlaying.uuid = data.uuid;
        },
        lastMusic(state) {
            let isPlayIndex = state.musicLists.findIndex(item => {
                return item.uuid === state.isPlaying.uuid
            })
            let lastIndex = isPlayIndex;

            if (isPlayIndex === 0) {
                // this.musicInfo = this.musicList[isPlayIndex];
                console.log(state.musicLists[state.musicLists.length - 1]);
                lastIndex = state.musicLists.length - 1;
            } else {
                // this.musicInfo = this.musicList[isPlayIndex - 1];
                console.log(state.musicLists[isPlayIndex - 1]);
                lastIndex = isPlayIndex - 1
            }
            state.isPlaying = state.musicLists[lastIndex];
        },
        nextMusic(state) {
            let isPlayIndex = state.musicLists.findIndex(item => {
                return item.uuid === state.isPlaying.uuid
            })
            let nextIndex = isPlayIndex

            if (isPlayIndex === state.musicLists.length - 1) {
                // this.musicInfo = this.musicList[isPlayIndex];
                console.log(state.musicLists[0]);
                nextIndex = 0;
            } else {
                // this.musicInfo = this.musicList[isPlayIndex - 1];
                console.log(state.musicLists[isPlayIndex + 1]);
                nextIndex = isPlayIndex + 1;
            }
            state.isPlaying = state.musicLists[nextIndex];
        }
    },
    actions: {
    },
    modules: {
    }
}
