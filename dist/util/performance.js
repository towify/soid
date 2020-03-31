/*
 * @author kaysaith
 * @date 2020/3/19 21:25
 */
export function debounce(action, timeout) {
    let timer;
    return (...args) => {
        window.clearTimeout(timer);
        timer = window.setTimeout(() => action(...args), timeout);
    };
}
export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export function throttle(func, threshhold = 20, scope) {
    if (threshhold < 0) {
        throw new TypeError("invalid thresh hold value.");
    }
    let timer = 0;
    let rtn;
    return function (...args) {
        if (!timer) {
            const ctx = typeof scope === "undefined" ? this : scope;
            timer = setTimeout(() => {
                timer = 0;
                rtn = func.apply(ctx, args);
            }, threshhold);
        }
        return rtn;
    };
}
