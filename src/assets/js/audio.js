const test = "测试，测试！！！"
const AudioContext =
    window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
const finish = audioContext.destination;
const resume = audioContext.resume();
const pause = audioContext.suspend();

export default {
    test,
    AudioContext,
    audioContext,
    text(test) {
        console.log(test)
    },
    initAudio() {
        
    },
    toggleAudioState() {
        if (audioCtx.state === 'running') {
            audioCtx.suspend().then(function () {
                susresBtn.textContent = 'Resume context';
            });
        } else if (audioCtx.state === 'suspended') {
            audioCtx.resume().then(function () {
                susresBtn.textContent = 'Suspend context';
            });
        }
    },
    testAudio() {
        let path = `http://localhost:8080${this.nowPlaying.path}`;
        async function play() {
            const res = await fetch(path);
            const arraybuffer = await res.arrayBuffer();
            const audioBuffer = await audioContext.decodeAudioData(
                arraybuffer
            );
            const source = audioContext.createBufferSource();
            source.connect(audioContext.destination); //连接上实例
            source.buffer = audioBuffer;
            source.start();
        }
        return play();
    },
}
// // 创建音频
// function createAudio(buffer) {
//     // 如果音频是关闭状态，则重新新建一个全局音频上下文
//     if (ac.state === 'closed') {
//         ac = new (window.AudioContext || window.webkitAudioContext)();
//     }
//     audioBuffer = buffer;
//     ac.onstatechange = onStateChange;

//     // 创建BufferSrouceNode
//     bufferSource = ac.createBufferSource();
//     bufferSource.buffer = buffer;

//     // 创建音量节点
//     gainNode = ac.createGain();
//     gainNode.gain.value = gainValue;

//     // 创建分析节点
//     analyser = ac.createAnalyser();
//     analyser.fftSize = fftSize;

//     bufferSource.onended = onPlayEnded;

//     // 嵌套连接
//     bufferSource.connect(analyser);
//     analyser.connect(gainNode);
//     gainNode.connect(ac.destination);
// }

// // 获取音频解析数据
// function getByteFrequencyData() {
//     var arr = new Uint8Array(analyser.frequencyBinCount);
//     analyser.getByteFrequencyData(arr);
//     renderCanvas(arr);

//     renderInter = window.requestAnimationFrame(getByteFrequencyData);
// }

// //恢复播放
// function resumeAudio() {
//     playState = PLAY_STATE.RUNNING;

//     // 在当前AudioContext被挂起的状态下，才能使用resume进行重新激活
//     ac.resume();

//     // 重新恢复可视化
//     resumeRenderCanvas();

//     // 重启定时器
//     startInter && clearInterval(startInter);
//     startInter = setInterval(function () {
//         renderTime(start, executeTime(startSecond));
//         updateProgress(startSecond, totalTime);
//         startSecond++;
//     }, 1000);
// }


// //暂停播放
// function suspendAudio() {
//     playState = PLAY_STATE.SUSPENDED;

//     // 停止可视化
//     stopRenderCanvas();

//     // 收起磁头
//     upPin();

//     startInter && clearInterval(startInter);

//     // 挂起当前播放
//     ac.suspend();
// }

// //列表循环
// function onPlayEnded() {
//     var acState = ac.state;

//     // 在进行上一曲和下一曲或者跳跃播放的时候
//     // 如果调用stop方法，会进入当前回调，因此要作区分
//     // 上一曲和下一曲的时候，由于是新的资源，因此采用关闭当前的AduioContext, load的时候重新生成
//     // 这样acState的状态就是suspended，这样就不会出现播放错位
//     // 而在跳跃播放的时候，由于是同一个资源，因此加上skip标志就可以判断出来
//     // 发现如果是循环播放，onPlayEnded方法不会被执行，因此采用加载相同索引的方式

//     if (acState === 'running' && !skip) {
//         var index = getNextPlayIndex();
//         loadMusic(playItems[index], index);
//     }
// }