/*
 * @author kaysaith
 * @date 2020/3/12 15:59
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
var _domFragment, _visibilityEvent, _hasCommitted;
import "./extension/array_extension";
import "./extension/html_element_extension";
import "./extension/number_extension";
import "./extension/string_extension";
import "./extension/object_extension";
import { DomFragment } from "./base/dom_fragment";
import { BrowserService, BrowserServiceType } from "./service/browser_service";
import { ListenerType } from "./value/type";
import { GlobalStyle } from "./value/style/global_style";
export class App {
    constructor() {
        this.childFragment = [];
        _domFragment.set(this, new DomFragment());
        _visibilityEvent.set(this, (status) => __awaiter(this, void 0, void 0, function* () { return status ? yield this.onResume() : yield this.onPause(); }));
        _hasCommitted.set(this, false);
        window.addEventListener(ListenerType.BeforeUnload, () => __awaiter(this, void 0, void 0, function* () {
            yield this.onDestroy();
        }));
    }
    onStart() {
        return __awaiter(this, void 0, void 0, function* () {
            // mount browser visibility status into visible fragment
            this.childFragment.forEach(model => {
                model.fragment.listenBrowserEvents(model.visible);
            });
        });
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
    addFragment(model) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model.fragment._beforeAttached();
            this.childFragment.push(model);
            if (__classPrivateFieldGet(this, _hasCommitted)) {
                yield document.body.addView(model.fragment.contentView);
            }
            else {
                yield __classPrivateFieldGet(this, _domFragment).addView(model.fragment.contentView);
            }
        });
    }
    replaceFragment(newFragment, oldFragment) {
        return __awaiter(this, void 0, void 0, function* () {
            const targetPosition = this.getTargetChildFragmentPosition(oldFragment);
            if (targetPosition) {
                const target = this.childFragment[targetPosition];
                this.childFragment[targetPosition] = new ChildFragmentModel(newFragment, target.visible);
            }
            const children = document.body.children;
            const length = document.body.children.length;
            for (let index = 0; index < length; index++) {
                if (children.item(index) === oldFragment.contentView._element) {
                    oldFragment.listenBrowserEvents(false);
                    yield oldFragment._beforeDestroyed();
                    yield newFragment._beforeAttached();
                    yield newFragment.contentView._prepareLifeCycle();
                    document.body.replaceChild(newFragment.contentView._element, oldFragment.contentView._element);
                    oldFragment.contentView.remove();
                }
            }
        });
    }
    removeFragment(fragment) {
        return __awaiter(this, void 0, void 0, function* () {
            // Remove all of this fragment's listener events in browser service
            yield fragment._beforeDestroyed();
            fragment.listenBrowserEvents(false);
            const targetPosition = this.getTargetChildFragmentPosition(fragment);
            if (targetPosition) {
                this.childFragment.splice(targetPosition, 1);
            }
        });
    }
    commit() {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldSet(this, _hasCommitted, true);
            yield this.beforeAttachedToBody();
            systemInfo.windowWidth = window.innerWidth;
            systemInfo.windowHeight = window.innerHeight;
            document.body.addDomFragment(__classPrivateFieldGet(this, _domFragment));
        });
    }
    beforeAttachedToBody() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.onCreate();
            yield this.onStart();
            BrowserService
                .getInstance()
                .register(BrowserServiceType.VisibilityChange, __classPrivateFieldGet(this, _visibilityEvent));
            GlobalStyle
                .getInstance()
                .attachStyle();
        });
    }
    getTargetChildFragmentPosition(fragment) {
        let position;
        this.childFragment
            .find((model, index) => {
            if (model.fragment === fragment) {
                position = index;
                return true;
            }
        });
        return position;
    }
}
_domFragment = new WeakMap(), _visibilityEvent = new WeakMap(), _hasCommitted = new WeakMap();
export class ChildFragmentModel {
    constructor(fragment, visible) {
        this.fragment = fragment;
        this.visible = visible;
    }
}
export const systemInfo = {
    windowWidth: 0,
    windowHeight: 0
};
