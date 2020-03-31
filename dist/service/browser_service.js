/*
 * @author kaysaith
 * @date 2020/3/11 12:33
 */
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
var _events, _visibilityListener, _resizeListener;
import { ListenerType } from "../value/type";
import { debounce } from "../util/performance";
import { systemInfo } from "../app";
export class BrowserService {
    constructor() {
        _events.set(this, {});
        _visibilityListener.set(this, void 0);
        _resizeListener.set(this, void 0);
        // browser tab switching event listener
        __classPrivateFieldSet(this, _visibilityListener, (_) => {
            if (document.visibilityState == "visible") {
                __classPrivateFieldGet(this, _events)[BrowserServiceType.VisibilityChange]
                    .forEach(item => item(true));
            }
            else if (document.visibilityState == "hidden") {
                __classPrivateFieldGet(this, _events)[BrowserServiceType.VisibilityChange]
                    .forEach(item => item(false));
            }
        });
        __classPrivateFieldSet(this, _resizeListener, (event) => {
            var _a, _b;
            systemInfo.windowHeight = ((_a = event.target) === null || _a === void 0 ? void 0 : _a.innerHeight) || 0;
            systemInfo.windowWidth = ((_b = event.target) === null || _b === void 0 ? void 0 : _b.innerWidth) || 0;
            __classPrivateFieldGet(this, _events)[BrowserServiceType.Resize]
                .forEach(item => item(event));
        });
        document.addEventListener(ListenerType.VisibilityChange, __classPrivateFieldGet(this, _visibilityListener));
        window.addEventListener(ListenerType.Resize, event => debounce(__classPrivateFieldGet(this, _resizeListener), 25)(event));
    }
    static getInstance() {
        if (!BrowserService.service) {
            BrowserService.service = new BrowserService();
        }
        return BrowserService.service;
    }
    register(type, event) {
        let target = __classPrivateFieldGet(this, _events)[type];
        if (!target) {
            target = [event];
            __classPrivateFieldGet(this, _events)[type] = target;
        }
        else {
            __classPrivateFieldGet(this, _events)[type].push(event);
        }
        return this;
    }
    unregister(type, event) {
        let targetType = __classPrivateFieldGet(this, _events)[type];
        const targetEvent = targetType.find(item => item === event);
        !targetEvent || targetType.deleteItem(targetEvent);
        return this;
    }
    destroy() {
        document.removeEventListener(ListenerType.VisibilityChange, __classPrivateFieldGet(this, _visibilityListener));
        document.removeEventListener(ListenerType.Resize, __classPrivateFieldGet(this, _visibilityListener));
    }
}
_events = new WeakMap(), _visibilityListener = new WeakMap(), _resizeListener = new WeakMap();
export var BrowserServiceType;
(function (BrowserServiceType) {
    BrowserServiceType["VisibilityChange"] = "visibilitychange";
    BrowserServiceType["Resize"] = "resize";
})(BrowserServiceType || (BrowserServiceType = {}));
