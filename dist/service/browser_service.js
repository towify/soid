/*
 * @author kaysaith
 * @date 2020/3/11 12:33
 */
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _events, _visibilityListener, _resizeListener, _clickListener;
import { ListenerType } from "../value/type";
import { debounce } from "../util/performance";
import { systemInfo } from "../app";
export class BrowserService {
    constructor() {
        _events.set(this, void 0);
        _visibilityListener.set(this, void 0);
        _resizeListener.set(this, void 0);
        _clickListener.set(this, void 0);
        __classPrivateFieldSet(this, _events, new Map());
        // browser tab switching event listener
        __classPrivateFieldSet(this, _visibilityListener, (_) => {
            var _a, _b;
            if (document.visibilityState == "visible") {
                (_a = __classPrivateFieldGet(this, _events).get(BrowserServiceType.VisibilityChange)) === null || _a === void 0 ? void 0 : _a.forEach(value => value(true));
            }
            else if (document.visibilityState == "hidden") {
                (_b = __classPrivateFieldGet(this, _events).get(BrowserServiceType.VisibilityChange)) === null || _b === void 0 ? void 0 : _b.forEach(value => value(false));
            }
        });
        __classPrivateFieldSet(this, _resizeListener, (event) => {
            var _a, _b, _c;
            systemInfo.windowHeight = ((_a = event.target) === null || _a === void 0 ? void 0 : _a.innerHeight) || 0;
            systemInfo.windowWidth = ((_b = event.target) === null || _b === void 0 ? void 0 : _b.innerWidth) || 0;
            (_c = __classPrivateFieldGet(this, _events).get(BrowserServiceType.Resize)) === null || _c === void 0 ? void 0 : _c.forEach(item => item(event));
        });
        __classPrivateFieldSet(this, _clickListener, (event) => {
            var _a;
            (_a = __classPrivateFieldGet(this, _events).get(BrowserServiceType.Click)) === null || _a === void 0 ? void 0 : _a.forEach(item => item(event));
        });
        document.addEventListener(ListenerType.VisibilityChange, __classPrivateFieldGet(this, _visibilityListener));
        window.addEventListener(ListenerType.Resize, event => debounce(__classPrivateFieldGet(this, _resizeListener), 25)(event));
        window.addEventListener(ListenerType.Click, event => debounce(__classPrivateFieldGet(this, _clickListener), 25)(event));
    }
    static getInstance() {
        if (!BrowserService.service) {
            BrowserService.service = new BrowserService();
        }
        return BrowserService.service;
    }
    register(type, event) {
        var _a;
        if (__classPrivateFieldGet(this, _events).has(type)) {
            (_a = __classPrivateFieldGet(this, _events).get(type)) === null || _a === void 0 ? void 0 : _a.add(event);
        }
        else {
            const set = new Set();
            set.add(event);
            __classPrivateFieldGet(this, _events).set(type, set);
        }
        return this;
    }
    unregister(type, event) {
        var _a;
        (_a = __classPrivateFieldGet(this, _events).get(type)) === null || _a === void 0 ? void 0 : _a.delete(event);
        return this;
    }
    destroy() {
        document.removeEventListener(ListenerType.VisibilityChange, __classPrivateFieldGet(this, _visibilityListener));
        window.removeEventListener(ListenerType.Resize, __classPrivateFieldGet(this, _visibilityListener));
        window.removeEventListener(ListenerType.Click, __classPrivateFieldGet(this, _clickListener));
    }
}
_events = new WeakMap(), _visibilityListener = new WeakMap(), _resizeListener = new WeakMap(), _clickListener = new WeakMap();
export var BrowserServiceType;
(function (BrowserServiceType) {
    BrowserServiceType["VisibilityChange"] = "visibilitychange";
    BrowserServiceType["Resize"] = "resize";
    BrowserServiceType["Click"] = "click";
})(BrowserServiceType || (BrowserServiceType = {}));
