<template>
    <div v-if="visible" class="message">
        <span>{{ text }}</span>
    </div>
</template>

<script>
export default {
    name: "Message",
    data() {
        return {
            visible: false,
            text: "",
        };
    },
};
</script>

<style lang='scss' scoped>
.message {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 10px 20px;
    line-height: 30px;
    min-height: 50px;
    max-width: 500px;
    border-radius: 10px;
    backdrop-filter: blur(5px);
    background-color: #222d;
    box-shadow: 0 0 5px rgb(0, 0, 0, 0.5), 10px 10px 20px rgb(0, 0, 0, 0.2);
    z-index: 10000;
    transition: all 0.5s ease;
    animation:showMsg ease 3s forwards;
}
@keyframes showMsg {
    0% {
        opacity: 0;
    }
    20% {
        opacity: 1;
    }
    80% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
</style>