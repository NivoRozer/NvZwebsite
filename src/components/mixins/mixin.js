export const mixin = {
    data() {
        return {
            // 用于判断组件是否激活
            activatedFlag: false
        };
    },
    activated() {
        this.activatedFlag = true;
    },
    deactivated() {
        this.activatedFlag = false;
    },
    filters: {
        //过滤空数据
        filterNull(item) {
            return item ? item : "暂无";
        },
        //过滤歌曲时长
        filterDuration(time) {
            if (time) {
                let duration = time;
                let min = parseInt(duration / 1000 / 60);
                if (min < 10) {
                    min = "0" + min;
                }
                let sec = parseInt((duration / 1000) % 60);
                if (sec < 10) {
                    sec = "0" + sec;
                }
                return `${min}:${sec}`;
            } else {
                return "暂无";
            }
        },
        // 过滤日期
        formatDate(time) {
            let date = new Date(time);
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            month = month < 10 ? "0" + month : month;
            day = day < 10 ? "0" + day : day;
            time = year + "-" + month + "-" + day;
            return time;
        },
    },
    methods: {
        generateUUID() {
            // 生成唯一标识符
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        },
        pushMusic(item) {
            let song = Object.assign({}, item);
            song.uuid = this.generateUUID();
            // 判断是否有正在播放的音乐，如果没有，则直接播放并push列表，如果有，则只push对象到列表
            // if (Object.keys(this.$store.state.music.isPlaying).length === 0) {
            //     this.$store.commit("pushMusic", song);
            //     this.$store.commit("playMusic", song);
            // } else {
            //     this.$store.commit("pushMusic", song);
            // }
            let musicLists = this.$store.state.music.musicLists
            let isPlayingId = this.$store.state.music.isPlaying.id

            // 判断要添加的音乐是否正在播放
            if (isPlayingId && isPlayingId == song.id) {
                this.$message('该音乐已在播放')
            }
            // 判断要添加的音乐是否已在播放列表
            else if (isPlayingId && musicLists.map(i => i.id).includes(song.id)) {
                this.$store.commit("playMusic", song.id);
            }
            else {
                this.$store.commit("pushMusic", song);
                this.$store.commit("playMusic", song.id);
                this.$message('已添加到播放列表')
            }
        },
        playAllMusic(data) {
            let musicLists = this.$store.state.music.musicLists
            let stateIds = musicLists.map(i => i.id)
            let dataIds = data.map(i => i.id)
            // 判断正在播放和即将播放列表是否一致
            if (JSON.stringify(stateIds) === JSON.stringify(dataIds)) {
                this.$message('已在播放')
            } else {
                this.$store.commit("removeAllMusic");
                for (let item of data) {
                    item.uuid = this.generateUUID();
                    this.$store.commit("pushAllMusic", item);
                }
                this.$message('已添加到播放列表')
                this.$store.commit("playMusic", this.$store.state.music.musicLists[0].id);
            }
        }
    },
}