var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _styleContent;
/*
 * @author kaysaith
 * @date 2020/3/24 22:22
 */
import { Style } from "./style";
const STYLE_ID = "soid-global-style";
let isStyleAttached = false;
export class GlobalStyle {
    constructor() {
        _styleContent.set(this, "");
    }
    addTag(tag, hold) {
        const style = new Style();
        hold(style);
        __classPrivateFieldSet(this, _styleContent, __classPrivateFieldGet(this, _styleContent) + `${tag} {${style.generateCssText()}}`);
    }
    static getInstance() {
        if (!GlobalStyle.globalStyle) {
            GlobalStyle.globalStyle = new GlobalStyle();
        }
        return GlobalStyle.globalStyle;
    }
    attachStyle() {
        if (isStyleAttached || typeof window === "undefined") {
            return;
        }
        const styleEl = document.createElement("style");
        styleEl.id = STYLE_ID;
        styleEl.textContent = __classPrivateFieldGet(this, _styleContent);
        if (document.head) {
            document.head.appendChild(styleEl);
        }
        isStyleAttached = true;
    }
    detachStyle() {
        if (!isStyleAttached || typeof window === "undefined") {
            return;
        }
        const styleEl = document.getElementById(STYLE_ID);
        if (!styleEl || !styleEl.parentNode) {
            return;
        }
        styleEl.parentNode.removeChild(styleEl);
        isStyleAttached = false;
    }
}
_styleContent = new WeakMap();
