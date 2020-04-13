/*
 * @author kaysaith
 * @date 2020/3/14 22:12
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
var _lastKnownScrollValue, _adapter, _isScrollingToPast, _scrollbar, _scrollContent, _lastHeight, _lastWidth, __orientation, __onReachedEnd;
import { RelativeLayout } from "../relative_layout";
import Scrollbar, { ScrollbarPlugin } from "smooth-scrollbar";
import { ViewGroup } from "../../base/view_group";
import easingsFunctions from "../../animation/easing_functions";
import { Orientation } from "../../value/style/style";
import { throttle } from "../../util/performance";
export class RecyclerView extends ViewGroup {
    constructor() {
        super();
        this.contentView = new RelativeLayout();
        _lastKnownScrollValue.set(this, 0);
        _adapter.set(this, void 0);
        _isScrollingToPast.set(this, void 0);
        _scrollbar.set(this, void 0);
        _scrollContent.set(this, void 0);
        _lastHeight.set(this, void 0);
        _lastWidth.set(this, void 0);
        __orientation.set(this, Orientation.Vertical);
        __onReachedEnd.set(this, void 0);
        this.setOverflow("hidden");
        this.onCreate();
    }
    onAttached() {
        const _super = Object.create(null, {
            onAttached: { get: () => super.onAttached }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.onAttached.call(this);
            this.contentView.setFullParent().updateStyle();
        });
    }
    set adapter(adapter) {
        var _a, _b;
        __classPrivateFieldSet(this, _adapter, adapter);
        __classPrivateFieldSet(this, __orientation, ((_a = __classPrivateFieldGet(this, _adapter)) === null || _a === void 0 ? void 0 : _a.orientation) || Orientation.Vertical);
        // After the content was turned, you need to obtain the new content height to
        // update the height value corresponding to the scroll table and scroll area.
        (_b = __classPrivateFieldGet(this, _adapter)) === null || _b === void 0 ? void 0 : _b.afterDatasetChanged(() => {
            var _a, _b, _c;
            (_c = (_a = this.contentView) === null || _a === void 0 ? void 0 : _a.setHeight(((_b = __classPrivateFieldGet(this, _adapter)) === null || _b === void 0 ? void 0 : _b.getContentSize()) || 0)) === null || _c === void 0 ? void 0 : _c.updateStyle();
        });
    }
    get adapter() {
        return __classPrivateFieldGet(this, _adapter);
    }
    scrollToStart() {
        var _a;
        (_a = __classPrivateFieldGet(this, _scrollbar)) === null || _a === void 0 ? void 0 : _a.scrollTo(0, 0, 200, {
            callback: () => {
                var _a;
                __classPrivateFieldSet(this, _scrollbar, undefined);
                __classPrivateFieldSet(this, _scrollContent, undefined);
                __classPrivateFieldSet(this, _lastKnownScrollValue, 0);
                __classPrivateFieldSet(this, _isScrollingToPast, false);
                (_a = __classPrivateFieldGet(this, _adapter)) === null || _a === void 0 ? void 0 : _a.recoveryItemPosition();
                this.onCreate();
            },
            easing: (percent) => easingsFunctions.easeInOutQuad(percent)
        });
    }
    setHeight(value) {
        if (!__classPrivateFieldGet(this, _lastHeight)) {
            __classPrivateFieldSet(this, _lastHeight, value);
            return super.setHeight(value);
        }
        else if (value !== __classPrivateFieldGet(this, _lastHeight)) {
            this.scrollToStart();
            return super.setHeight(value);
        }
        return this;
    }
    setWidth(value) {
        if (!__classPrivateFieldGet(this, _lastWidth)) {
            __classPrivateFieldSet(this, _lastWidth, value);
            return super.setWidth(value);
        }
        else if (value !== __classPrivateFieldGet(this, _lastWidth)) {
            this.scrollToStart();
            return super.setWidth(value);
        }
        return this;
    }
    addView(view) {
        this.contentView.addView(view);
    }
    getSubviewByElement(element) {
        // return this.contentView.subviews.find(view => view._element === element) as T;
        return this.contentView.getSubviewByElement(element);
    }
    onCreate() {
        // Control Scroll Speed For Recycler View
        class ScalePlugin extends ScrollbarPlugin {
            transformDelta(delta) {
                return {
                    x: delta.x * 0.5,
                    y: delta.y * 0.5,
                };
            }
        }
        ScalePlugin.pluginName = "scale";
        ScalePlugin.defaultOptions = {
            speed: 1,
        };
        Scrollbar.use(ScalePlugin);
        __classPrivateFieldSet(this, _scrollbar, Scrollbar.init(this._element, {
            alwaysShowTracks: false,
            thumbMinSize: 150,
            damping: 0.05
        }));
        __classPrivateFieldSet(this, _scrollContent, new ViewGroup(__classPrivateFieldGet(this, _scrollbar).contentEl));
        __classPrivateFieldGet(this, _scrollContent).setFullParent()
            .updateStyle()
            .addView(this.contentView);
        let preContentArea = 0;
        let currentContentArea = 0;
        const calculateReachedEndValue = (orientation) => {
            var _a, _b, _c, _d, _e, _f;
            currentContentArea = (((_b = (_a = __classPrivateFieldGet(this, _scrollbar)) === null || _a === void 0 ? void 0 : _a.size) === null || _b === void 0 ? void 0 : _b.container[orientation === Orientation.Vertical ? "height" : "width"]) || 0) +
                (((_d = (_c = __classPrivateFieldGet(this, _scrollbar)) === null || _c === void 0 ? void 0 : _c.offset) === null || _d === void 0 ? void 0 : _d[orientation === Orientation.Vertical ? "y" : "x"]) || 0);
            if (preContentArea === currentContentArea) {
                return undefined;
            }
            else {
                return currentContentArea === ((_f = (_e = __classPrivateFieldGet(this, _scrollbar)) === null || _e === void 0 ? void 0 : _e.size) === null || _f === void 0 ? void 0 : _f.content[orientation === Orientation.Vertical ? "height" : "width"]) &&
                    __classPrivateFieldGet(this, _isScrollingToPast) === false;
            }
        };
        __classPrivateFieldGet(this, _scrollbar).track.update = () => {
            var _a, _b, _c, _d, _e, _f, _g;
            if ((_a = __classPrivateFieldGet(this, _scrollbar)) === null || _a === void 0 ? void 0 : _a.scrollTop) {
                if (calculateReachedEndValue(__classPrivateFieldGet(this, __orientation))) {
                    preContentArea = (_c = (_b = __classPrivateFieldGet(this, _scrollbar)) === null || _b === void 0 ? void 0 : _b.size) === null || _c === void 0 ? void 0 : _c.content[__classPrivateFieldGet(this, __orientation) === Orientation.Vertical ? "height" : "width"];
                    !__classPrivateFieldGet(this, __onReachedEnd) || __classPrivateFieldGet(this, __onReachedEnd).call(this);
                }
                if (__classPrivateFieldGet(this, __orientation) === Orientation.Vertical) {
                    __classPrivateFieldSet(this, _isScrollingToPast, ((_d = __classPrivateFieldGet(this, _scrollbar)) === null || _d === void 0 ? void 0 : _d.scrollTop) < __classPrivateFieldGet(this, _lastKnownScrollValue));
                    __classPrivateFieldSet(this, _lastKnownScrollValue, (_e = __classPrivateFieldGet(this, _scrollbar)) === null || _e === void 0 ? void 0 : _e.scrollTop);
                }
                else {
                    __classPrivateFieldSet(this, _isScrollingToPast, ((_f = __classPrivateFieldGet(this, _scrollbar)) === null || _f === void 0 ? void 0 : _f.scrollLeft) < __classPrivateFieldGet(this, _lastKnownScrollValue));
                    __classPrivateFieldSet(this, _lastKnownScrollValue, (_g = __classPrivateFieldGet(this, _scrollbar)) === null || _g === void 0 ? void 0 : _g.scrollLeft);
                }
                this.didScroll();
            }
        };
    }
    onReachedEnd(action) {
        __classPrivateFieldSet(this, __onReachedEnd, throttle(() => {
            var _a, _b, _c, _d;
            action();
            (_d = (_a = this.contentView) === null || _a === void 0 ? void 0 : _a.setHeight(((_c = (_b = __classPrivateFieldGet(this, _scrollbar)) === null || _b === void 0 ? void 0 : _b.size) === null || _c === void 0 ? void 0 : _c.content[__classPrivateFieldGet(this, __orientation) === Orientation.Vertical ? "height" : "width"]) || 0)) === null || _d === void 0 ? void 0 : _d.updateStyle();
        }, 500));
        return this;
    }
    // Because scrolling may trigger page turning and cause the content height
    // to rise, Let the height of the scroll bar correspond to the change of the
    // real-time scroll height of the content in real time
    didScroll() {
        var _a, _b, _c, _d, _e;
        if (__classPrivateFieldGet(this, __orientation) === Orientation.Vertical) {
            (_a = __classPrivateFieldGet(this, _scrollbar)) === null || _a === void 0 ? void 0 : _a.track.yAxis.update(__classPrivateFieldGet(this, _lastKnownScrollValue), this.height, (_b = __classPrivateFieldGet(this, _adapter)) === null || _b === void 0 ? void 0 : _b.getContentSize());
        }
        else {
            (_c = __classPrivateFieldGet(this, _scrollbar)) === null || _c === void 0 ? void 0 : _c.track.xAxis.update(__classPrivateFieldGet(this, _lastKnownScrollValue), this.width, (_d = __classPrivateFieldGet(this, _adapter)) === null || _d === void 0 ? void 0 : _d.getContentSize());
        }
        (_e = __classPrivateFieldGet(this, _adapter)) === null || _e === void 0 ? void 0 : _e.onScroll(__classPrivateFieldGet(this, _lastKnownScrollValue), __classPrivateFieldGet(this, _isScrollingToPast) === undefined ? false : __classPrivateFieldGet(this, _isScrollingToPast));
    }
    onDetached() {
        var _a;
        super.onDetached();
        this.contentView.clear();
        (_a = this.adapter) === null || _a === void 0 ? void 0 : _a.reset();
        this.adapter = undefined;
    }
}
_lastKnownScrollValue = new WeakMap(), _adapter = new WeakMap(), _isScrollingToPast = new WeakMap(), _scrollbar = new WeakMap(), _scrollContent = new WeakMap(), _lastHeight = new WeakMap(), _lastWidth = new WeakMap(), __orientation = new WeakMap(), __onReachedEnd = new WeakMap();
