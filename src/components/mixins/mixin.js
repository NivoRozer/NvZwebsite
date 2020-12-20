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
            if (Object.keys(this.$store.state.music.isPlaying).length === 0) {
                this.$store.commit("pushMusic", song);
                this.$store.commit("playMusic", song);
            } else {
                this.$store.commit("pushMusic", song);
            }
            this.$message('已添加到播放列表')
        }
    },
}