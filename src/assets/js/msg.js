import vue from 'vue'

// 这里就是我们刚刚创建的那个静态组件
import Message from "components/common/info/Message";

// 返回一个 扩展实例构造器
const MessageConstructor = vue.extend(Message)

// 定义弹出组件的函数 接收2个参数, 要显示的文本 和 显示时间
function showMsg(text, duration = 3000) {

    // 实例化一个 Message.vue
    const msgDom = new MessageConstructor({
        el: document.createElement('div'),
        data() {
            return {
                text: text,
                visible: true
            }
        }
    })

    // 把 实例化的 Message.vue 添加到 body 里
    document.body.appendChild(msgDom.$el);

    // 过了 duration 时间后隐藏
    setTimeout(() => {
        msgDom.visible = false
    }, duration);
}

// 注册为全局组件的函数
function msg() {
    // 将组件注册到 vue 的 原型链里去,
    // 这样就可以在所有 vue 的实例里面使用 this.$toast()
    vue.prototype.$message = showMsg
}

export default msg