export default {
    state: {
        str: '这是播放器的str',
        musicLists: []
    },
    mutations: {
        pushMusic(state, data) {
            state.musicLists.push(data);
            console.log(state.musicLists);
        },
        removeMusic(state, data) {
            state.musicLists.splice(data, 1)
        }
    },
    actions: {
    },
    modules: {
    }
}
