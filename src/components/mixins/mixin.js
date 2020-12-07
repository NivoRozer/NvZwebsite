export const mixin = {
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
            this.$store.commit("pushMusic", song);
        }
    },
}