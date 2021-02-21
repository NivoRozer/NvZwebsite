export default {
    state: {
        isPlaying: {},
        musicLists: [],
        shuffledLists: [],
        loopState: 0,
    },
    mutations: {
        pushMusic(state, data) {
            // state.musicLists.push(data);
            // console.log(state.musicLists);
            let isPlayIndex = state.musicLists.findIndex(item => {
                return item.uuid === state.isPlaying.uuid
            })
            // 在当前播放歌曲位置后插入音乐
            state.musicLists.splice(isPlayIndex + 1, 0, data);

            // 判断当前循环模式，如果是随机播放，则在shuffledLists当前播放位置后插入音乐
            if (state.loopState === 2) {
                let shuffledIndex = state.shuffledLists.findIndex(item => {
                    return item.uuid === state.isPlaying.uuid
                })
                state.shuffledLists.splice(shuffledIndex + 1, 0, data);
            }
        },
        pushAllMusic(state, data) {
            state.musicLists.push(data);
        },
        removeMusic(state, index) {
            // 判断当前循环模式，如果是随机播放，则在shuffledLists当前播放位置移除音乐
            if (state.loopState === 2) {
                let shuffledIndex = state.shuffledLists.findIndex(item => {
                    return item.uuid === state.musicLists[index].uuid
                })
                state.shuffledLists.splice(shuffledIndex, 1);
            }

            // 判断播放列表中移除的音乐是否正在播放
            if (state.musicLists[index].uuid === state.isPlaying.uuid) {
                // endMusic
                state.isPlaying = {}
            };
            state.musicLists.splice(index, 1);

        },
        removeAllMusic(state) {
            state.isPlaying = {};
            state.musicLists = [];
        },

        playMusic(state, id) {
            // state.isPlaying.album.picUrl = data.picUrl
            state.isPlaying = {};
            state.isPlaying = state.musicLists.find(item => {
                return item.id === id
            })
            // state.isPlaying.name = data.name;
            // state.isPlaying.artists = data.artists;
            // state.isPlaying.id = data.id;
            // state.isPlaying.uuid = data.uuid;
        },
        lastMusic(state) {
            // 判断当前循环模式，如果是全部循环/单曲循环，取musicLists；如果是随机播放，取shuffledLists
            let musicLists = state.loopState !== 2 ? state.musicLists : state.shuffledLists;

            let index = musicLists.findIndex(item => {
                return item.uuid === state.isPlaying.uuid
            });
            if (index === 0) {
                index = musicLists.length - 1;
            } else {
                index -= 1
            }
            state.isPlaying = musicLists[index];
        },
        nextMusic(state) {
            // 判断当前循环模式，如果是全部循环/单曲循环，取musicLists；如果是随机播放，取shuffledLists
            let musicLists = state.loopState !== 2 ? state.musicLists : state.shuffledLists;

            let index = musicLists.findIndex(item => {
                return item.uuid === state.isPlaying.uuid
            });
            if (index === musicLists.length - 1) {
                index = 0;
            } else {
                index += 1;
            }
            state.isPlaying = musicLists[index];
        }
    },
    actions: {
    },
    modules: {
    }
}
