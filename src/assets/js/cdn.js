/* <script src="http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js"></script> */
export function flexible() {
    return new Promise(function (resolve, reject) {
        window.onload = function () {
            resolve(flexible)
        }
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js';
        script.onerror = reject;
        document.head.appendChild(script);
    })
}
export function removeCdn(name) {
    let src = 'script[src*=' + name + ']'
    // console.log(src);
    let cdn = document.querySelector(src);
    cdn.parentNode.removeChild(cdn);
    // console.log(cdn);
}