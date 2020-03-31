/*
 * @author kaysaith
 * @date 2020/3/11 00:01
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
var _visibilityEvent, _resizeEvent, _onResizeEvent, _afterResizedEvent, _time, _timeout, _delta;
import { ViewGroup } from "../view_group";
import { BrowserService, BrowserServiceType } from "../../service/browser_service";
export class Fragment {
    constructor() {
        this.childFragments = [];
        this.contentView = new ViewGroup();
        _visibilityEvent.set(this, void 0);
        _resizeEvent.set(this, void 0);
        _onResizeEvent.set(this, void 0);
        _afterResizedEvent.set(this, void 0);
        // For Resizing Event
        _time.set(this, void 0);
        _timeout.set(this, false);
        _delta.set(this, 300);
        this.contentView.setFullParent();
        __classPrivateFieldSet(this, _visibilityEvent, status => status ? this.onResume() : this.onPause());
        const resizeEnd = (event) => {
            if (new Date().getTime() - __classPrivateFieldGet(this, _time) < __classPrivateFieldGet(this, _delta)) {
                window.setTimeout(() => resizeEnd(event), __classPrivateFieldGet(this, _delta));
            }
            else {
                __classPrivateFieldSet(this, _timeout, false);
                !__classPrivateFieldGet(this, _afterResizedEvent) || __classPrivateFieldGet(this, _afterResizedEvent).call(this, event);
            }
        };
        __classPrivateFieldSet(this, _resizeEvent, event => {
            !__classPrivateFieldGet(this, _onResizeEvent) || __classPrivateFieldGet(this, _onResizeEvent).call(this, event);
            __classPrivateFieldSet(this, _time, new Date().getTime());
            if (!__classPrivateFieldGet(this, _timeout)) {
                __classPrivateFieldSet(this, _timeout, true);
                window.setTimeout(() => resizeEnd(event), __classPrivateFieldGet(this, _delta));
            }
        });
    }
    onAttach() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onViewCreated() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onStart() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onResume() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onPause() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onDestroy() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onDetached() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onResize(hold) {
        __classPrivateFieldSet(this, _onResizeEvent, hold);
        return this;
    }
    afterResized(hold) {
        __classPrivateFieldSet(this, _afterResizedEvent, hold);
        return this;
    }
    addFragment(fragment) {
        return __awaiter(this, void 0, void 0, function* () {
            this.childFragments.push(fragment);
            yield fragment._beforeAttached();
            this.contentView.addView(fragment.contentView);
        });
    }
    replaceFragment(newFragment, oldFragment) {
        return __awaiter(this, void 0, void 0, function* () {
            this.childFragments[this.childFragments.indexOf(oldFragment)] = newFragment;
            const children = this.contentView._element.children;
            const length = children.length;
            for (let index = 0; index < length; index++) {
                if (children.item(index) === oldFragment.contentView._element) {
                    yield oldFragment._beforeDestroyed();
                    yield newFragment._beforeAttached();
                    yield newFragment.contentView._prepareLifeCycle();
                    this.contentView._element.replaceChild(newFragment.contentView._element, oldFragment.contentView._element);
                }
            }
        });
    }
    removeFragment(fragment) {
        return __awaiter(this, void 0, void 0, function* () {
            fragment.listenBrowserEvents(false);
            yield fragment._beforeDestroyed();
            const target = this.childFragments.find(item => item === fragment);
            this.childFragments.deleteItem(target);
            target === null || target === void 0 ? void 0 : target.contentView.remove();
        });
    }
    listenBrowserEvents(needListen) {
        if (needListen) {
            BrowserService
                .getInstance()
                .register(BrowserServiceType.VisibilityChange, __classPrivateFieldGet(this, _visibilityEvent))
                .register(BrowserServiceType.Resize, __classPrivateFieldGet(this, _resizeEvent));
        }
        else {
            BrowserService
                .getInstance()
                .unregister(BrowserServiceType.VisibilityChange, __classPrivateFieldGet(this, _visibilityEvent))
                .unregister(BrowserServiceType.Resize, __classPrivateFieldGet(this, _resizeEvent));
        }
    }
    _beforeAttached() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.onAttach();
            yield this.onCreateView(this.contentView);
            yield this.onViewCreated();
            yield this.onStart();
        });
    }
    _beforeDestroyed() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.onDestroy();
            this.childFragments.forEach(child => {
                child._beforeDestroyed();
            });
            this.childFragments.slice(0, this.childFragments.length);
            yield this.onDetached();
        });
    }
}
_visibilityEvent = new WeakMap(), _resizeEvent = new WeakMap(), _onResizeEvent = new WeakMap(), _afterResizedEvent = new WeakMap(), _time = new WeakMap(), _timeout = new WeakMap(), _delta = new WeakMap();
