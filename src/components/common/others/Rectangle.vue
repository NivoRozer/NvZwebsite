<template>
    <div class="base_Container_left">
        <div
            class="mainmenu_base shadow_move button_box_parallelogram_left button_box_motion button_box_invert button_box_blur mountain1"
        >
            <!-- <img src="" class="svg_logo" /> -->
            <slot name="slotcontent"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "Rectangle",
};
</script>

<style lang='scss' scoped>
.button_box_blur::before {
    content: "";
}
.button_box_blur:hover::before {
    content: "";
    filter: blur(5px);
}
.button_box_blur:active::before {
    content: "";
    filter: blur(0px);
}
.button_box_invert {
    content: "";
    transition: all 0.2s ease;
    filter: invert(0%);
}
.button_box_invert:active {
    content: "";
    filter: invert(100%);
}
.button_box_motion {
    background: #000
        linear-gradient(140deg, rgba(16, 78, 139, 0), rgba(16, 78, 139, 1));
}
// .button_box_motion:active {
/* transform: scale(0.9); */
// }
.button_box_motion::before {
    content: "";
    position: fixed;
    z-index: -1;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(#1c86ee, #104e8b);
    opacity: 0;
    transition: all 0.2s ease;
}
.button_box_motion:hover::before {
    transition: all 1s ease;
    opacity: 1;
    box-shadow: 0 0 5rem 0rem rgba(96, 98, 155, 0.5);
}
.button_box_parallelogram_left {
    transform-origin: 20% 80% 0;
}
.button_box_parallelogram_left:hover {
    transform: rotateY(10deg) rotateX(-3deg);
    /* transform: matrix3d(2,2,2,2,1,1,1,1,0,0,0,1,0,0,0,1); */
}
.button_box_parallelogram_left:active {
    transform: rotateY(10deg) rotateX(-3deg) scale(0.96);
    /* transform: matrix3d(2,2,2,2,1,1,1,1,0,0,0,1,0,0,0,1); */
}
.base_Container_left {
    float: left;
    height: 160px;
    width: 300px;
    perspective: 600px;
}
.mainmenu_base {
    perspective: 100px;
    transition: all 0.5s ease;
    height: 160px;
    width: 300px;
    background-color: rgba(255, 255, 255, 0.2);
    /* background: linear-gradient(160deg,rgba(255,255,255,0.1) 50%,rgba(230,235,240,0.5)); */
    filter: drop-shadow(-0.5rem -0.5rem 0 rgba(0, 0, 0, 0.5)) invert(0%);
}
div.mainmenu_base:hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.7);
    /* background: linear-gradient(160deg,rgba(255,255,255,0.5) 50%,rgba(230,235,240,0.5)); */
    filter: drop-shadow(-2rem -1rem 0 rgba(0, 0, 0, 0.2));
}
div.mainmenu_base:active {
    transition: all 0.05s ease-in;
    filter: drop-shadow(-2rem -1rem 0 rgba(0, 0, 0, 0.2)) invert(100%);
}
.svg_logo {
    user-select: none;
    transition: all 0.5s ease;
    margin: 16px 86px;
    opacity: 0.7;
    filter: drop-shadow(-0.5rem -0.5rem 0.05rem rgba(0, 0, 0, 0.2));
}
</style>