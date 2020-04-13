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
var __isEnable, __isClickable, __isFocusable, __clickEvent, __mouseoverEvent, __mouseleaveEvent;
import { ListenerType } from "../value/type";
import { DisplayType, Style, StyleTag } from "../value/style/style";
export class View {
    constructor(element) {
        this.element = element;
        this.style = new Style();
        __isEnable.set(this, true);
        __isClickable.set(this, true);
        __isFocusable.set(this, true);
        __clickEvent.set(this, void 0);
        __mouseoverEvent.set(this, void 0);
        __mouseleaveEvent.set(this, void 0);
        if (this.element) {
            this._element = this.element;
        }
        else {
            this._element = document.createElement("div");
        }
        // default style without outline
        this.style
            .addRule(StyleTag.Outline, "none")
            .addRule(StyleTag.BoxSizing, "border-box");
    }
    addStyleRule(tag, value) {
        this.style.addRule(tag, value);
        return this;
    }
    // Property Methods
    setDataset(key, value) {
        this._element.dataset[key] = value;
        return this;
    }
    setID(id) {
        this._element.id = id;
        return this;
    }
    get id() {
        return this._element.id;
    }
    setAttribute(qualifiedName, value) {
        this._element.setAttribute(qualifiedName, value);
        return this;
    }
    get cssText() {
        return this._element.style.cssText;
    }
    get isClickable() {
        return __classPrivateFieldGet(this, __isClickable);
    }
    set isClickable(status) {
        this.setPointerEvent(status ? "auto" : "none");
        __classPrivateFieldSet(this, __isClickable, status);
    }
    set isEnable(status) {
        __classPrivateFieldSet(this, __isEnable, status);
    }
    get isEnable() {
        return __classPrivateFieldGet(this, __isEnable);
    }
    set isFocusable(status) {
        __classPrivateFieldSet(this, __isFocusable, status);
    }
    get isFocusable() {
        return __classPrivateFieldGet(this, __isFocusable);
    }
    resetStyle(style) {
        this.style = style;
        return this;
    }
    // Dom Node Methods
    remove() {
        this.clearEventListenerIfNeed();
        this._element.remove();
        this.onDetached();
    }
    setOrder(value) {
        this.style.addRule(StyleTag.Order, `${value}`);
        return this;
    }
    // Behavior Operation Methods
    setPointerEvent(value) {
        this.style.addRule(StyleTag.PointerEvents, value);
        return this;
    }
    onMouseover(action) {
        if (!__classPrivateFieldGet(this, __mouseoverEvent) && this.isEnable && this.isFocusable) {
            __classPrivateFieldSet(this, __mouseoverEvent, (event) => {
                if (!this.isEnable || !this.isFocusable)
                    return;
                action(event);
                event.stopPropagation();
            });
            this._element.addEventListener(ListenerType.Mouseover, __classPrivateFieldGet(this, __mouseoverEvent));
        }
        return this;
    }
    onMouseleave(action) {
        if (!__classPrivateFieldGet(this, __mouseleaveEvent) && this.isEnable && this.isFocusable) {
            __classPrivateFieldSet(this, __mouseleaveEvent, (event) => {
                if (!this.isEnable || !this.isFocusable)
                    return;
                action(event);
                event.stopPropagation();
            });
            this._element.addEventListener(ListenerType.Mouseleave, __classPrivateFieldGet(this, __mouseleaveEvent));
        }
        return this;
    }
    onClick(action) {
        if (!__classPrivateFieldGet(this, __clickEvent) && this.isEnable && this.isClickable) {
            __classPrivateFieldSet(this, __clickEvent, (event) => {
                if (!this.isEnable || !this.isClickable)
                    return;
                action(event);
                event.stopPropagation();
            });
            this._element.addEventListener(ListenerType.Click, __classPrivateFieldGet(this, __clickEvent));
        }
        return this;
    }
    // Cross Platform Methods
    serialize(platform) {
        // convert the code to target platform version
        return "";
    }
    // Life Cycle
    beforeAttached() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onAttached() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onShow(action) {
        this.recoveryEventListenerIfNeed();
        !action || action();
        return this;
    }
    onHide(action) {
        this.clearEventListenerIfNeed();
        !action || action();
        return this;
    }
    clearEventListenerIfNeed() {
        !__classPrivateFieldGet(this, __clickEvent) || this._element.removeEventListener(ListenerType.Click, __classPrivateFieldGet(this, __clickEvent));
        !__classPrivateFieldGet(this, __mouseoverEvent) || this._element.removeEventListener(ListenerType.Mouseover, __classPrivateFieldGet(this, __mouseoverEvent));
        !__classPrivateFieldGet(this, __mouseleaveEvent) || this._element.removeEventListener(ListenerType.Mouseleave, __classPrivateFieldGet(this, __mouseleaveEvent));
    }
    recoveryEventListenerIfNeed() {
        !__classPrivateFieldGet(this, __clickEvent) || this._element.addEventListener(ListenerType.Click, __classPrivateFieldGet(this, __clickEvent));
        !__classPrivateFieldGet(this, __mouseoverEvent) || this._element.addEventListener(ListenerType.Mouseover, __classPrivateFieldGet(this, __mouseoverEvent));
        !__classPrivateFieldGet(this, __mouseleaveEvent) || this._element.addEventListener(ListenerType.Mouseleave, __classPrivateFieldGet(this, __mouseleaveEvent));
    }
    onDetached() { }
    _prepareLifeCycle() {
        return __awaiter(this, void 0, void 0, function* () {
            this.style.setStyle(this);
            yield this.beforeAttached();
            yield this.onAttached();
        });
    }
    // Interface Settings Methods
    updateStyle() {
        this.style.setStyle(this);
        return this;
    }
    cloneCssText() {
        return this.style.generateCssText();
    }
    setCssText(cssText) {
        this.style.cssText = cssText;
        return this;
    }
    setClass(className) {
        this._element.classList.add(className);
        return this;
    }
    setDisplay(type) {
        if (!this.initialDisplayType) {
            this.initialDisplayType = type;
        }
        if (type === DisplayType.None) {
            if (this.isDisplayNone !== undefined)
                this.onHide();
            this.isDisplayNone = true;
        }
        else {
            if (this.isDisplayNone) {
                this.onShow();
                this.isDisplayNone = false;
            }
        }
        this.style.addRule(StyleTag.Display, type);
        return this;
    }
    setWidth(value) {
        this.style.addRule(StyleTag.Width, `${value}px`);
        return this;
    }
    setHeight(value) {
        this.style.addRule(StyleTag.Height, `${value}px`);
        return this;
    }
    setPercentWidth(value) {
        this.style.addRule(StyleTag.Width, `${value}%`, false);
        return this;
    }
    setPercentHeight(value) {
        this.style.addRule(StyleTag.Height, `${value}%`, false);
        return this;
    }
    setMinWidth(minWidth) {
        this.style.addRule(StyleTag.MinWidth, `${minWidth}px`);
        return this;
    }
    setMaxWidth(maxWidth) {
        this.style.addRule(StyleTag.MaxWidth, `${maxWidth}px`);
        return this;
    }
    setMinHeight(minHeight) {
        this.style.addRule(StyleTag.MinHeight, `${minHeight}px`);
        return this;
    }
    setFullParent() {
        this.style
            .addRule(StyleTag.Width, "100%")
            .addRule(StyleTag.Height, "100%");
        return this;
    }
    setFullScreen() {
        this.style
            .addRule(StyleTag.Width, "100vw")
            .addRule(StyleTag.Height, "100vh");
        return this;
    }
    setHorizontalPadding(value) {
        this.style
            .addRule(StyleTag.PaddingLeft, `${value}px`)
            .addRule(StyleTag.PaddingRight, `${value}px`);
        return this;
    }
    setVerticalPadding(value) {
        this.style
            .addRule(StyleTag.PaddingTop, `${value}px`)
            .addRule(StyleTag.PaddingBottom, `${value}px`);
        return this;
    }
    setTopPadding(value) {
        this.style.addRule(StyleTag.PaddingTop, `${value}px`);
        return this;
    }
    setBottomPadding(value) {
        this.style.addRule(StyleTag.PaddingBottom, `${value}px`);
        return this;
    }
    setLeftPadding(value) {
        this.style.addRule(StyleTag.PaddingLeft, `${value}px`);
        return this;
    }
    setRightPadding(value) {
        this.style.addRule(StyleTag.PaddingRight, `${value}px`);
        return this;
    }
    setMargin(value) {
        this.style.addRule(StyleTag.Margin, value);
        return this;
    }
    setMarginTop(value) {
        this.style.addRule(StyleTag.MarginTop, `${value}px`);
        return this;
    }
    setMarginTopAuto() {
        this.style.addRule(StyleTag.MarginTop, "auto");
        return this;
    }
    setMarginLeftAuto() {
        this.style.addRule(StyleTag.MarginLeft, "auto");
        return this;
    }
    setMarginBottom(value) {
        this.style.addRule(StyleTag.MarginBottom, `${value}px`);
        return this;
    }
    setMarginLeft(value) {
        this.style.addRule(StyleTag.MarginLeft, `${value}px`);
        return this;
    }
    setMarginRight(value) {
        this.style.addRule(StyleTag.MarginRight, `${value}px`);
        return this;
    }
    setPosition(position) {
        this.style.addRule(StyleTag.Position, position);
        return this;
    }
    setZIndex(value) {
        this.style.addRule(StyleTag.ZIndex, `${value}`);
        return this;
    }
    setTop(value) {
        this.style.addRule(StyleTag.Top, `${value}px`);
        return this;
    }
    setBottom(value) {
        this.style.addRule(StyleTag.Bottom, `${value}px`);
        return this;
    }
    setRight(value) {
        this.style.addRule(StyleTag.Right, `${value}px`);
        return this;
    }
    setLeft(value) {
        this.style.addRule(StyleTag.Left, `${value}px`);
        return this;
    }
    setBackgroundColor(color) {
        this.style.addRule(StyleTag.BackgroundColor, `${color.value}`);
        return this;
    }
    setBackground(value) {
        this.style.addRule(StyleTag.Background, value);
        return this;
    }
    setOpacity(opacity) {
        if (opacity === 0) {
            this.onHide();
        }
        if (opacity === 1) {
            this.onShow();
        }
        this.style.addRule(StyleTag.Opacity, `${opacity}`);
        return this;
    }
    setWillChange(type) {
        this.style.addRule(StyleTag.WillChange, type);
        return this;
    }
    setOverflow(value) {
        this.style.addRule(StyleTag.Overflow, value);
        return this;
    }
    setOverflowY(value) {
        this.style.addRule(StyleTag.OverflowY, value);
        return this;
    }
    setOverflowX(value) {
        this.style.addRule(StyleTag.OverflowX, value);
        return this;
    }
    setBoxSizing(value) {
        this.style.addRule(StyleTag.BoxSizing, value);
        return this;
    }
    setBorder(value) {
        this.style.addRule(StyleTag.Border, value);
        return this;
    }
    setBorderColor(color) {
        this.style.addRule(StyleTag.BorderColor, color.value);
        return this;
    }
    setTopBorderColor(color) {
        this.style.addRule(StyleTag.BorderTopColor, color.value);
        return this;
    }
    setBottomBorderColor(color) {
        this.style.addRule(StyleTag.BorderBottomColor, color.value);
        return this;
    }
    setLeftBorderColor(color) {
        this.style.addRule(StyleTag.BorderLeftColor, color.value);
        return this;
    }
    setRightBorderColor(color) {
        this.style.addRule(StyleTag.BorderRightColor, color.value);
        return this;
    }
    setRightBorder(value) {
        this.style.addRule(StyleTag.BorderRight, value);
        return this;
    }
    setLeftBorder(value) {
        this.style.addRule(StyleTag.BorderLeft, value);
        return this;
    }
    setBottomBorder(value) {
        this.style.addRule(StyleTag.BorderBottom, value);
        return this;
    }
    setTopBorder(value) {
        this.style.addRule(StyleTag.BorderTop, value);
        return this;
    }
    setRadius(radius) {
        this.style.addRule(StyleTag.BorderRadius, `${radius}px`);
        return this;
    }
    setShadow(value) {
        this.style.addRule(StyleTag.BoxShadow, value);
        return this;
    }
    setCursor(cursor) {
        this.style.addRule(StyleTag.Cursor, cursor);
        return this;
    }
    // Filter Style
    setBackDropFilter(value) {
        this.style.addRule(StyleTag.BackDropFilter, value);
        return this;
    }
    // Transform Styles
    setRotate(angle) {
        this.style.transform.addRotate(angle);
        return this;
    }
    setTranslate(x, y) {
        this.style.transform.addTranslate(x, y);
        return this;
    }
    setTranslateStyleRule(x, y) {
        this.style.transform.addTranslateValue(x, y);
        return this;
    }
    setScale(widthRatio, heightRatio) {
        this.style.transform.addScale(widthRatio, heightRatio);
        return this;
    }
    setScaleX(widthRatio) {
        this.style.transform.addScaleX(widthRatio);
        return this;
    }
    setScaleY(heightRatio) {
        this.style.transform.addScaleY(heightRatio);
        return this;
    }
    setSkewY(y) {
        this.style.transform.addSkewY(y);
        return this;
    }
    setSkewX(x) {
        this.style.transform.addSkewX(x);
        return this;
    }
    setSkew(x, y) {
        this.style.transform.addSkew(x, y);
        return this;
    }
    setMatrix(a, b, c, d, e, f) {
        this.style.transform.addMatrix(a, b, c, d, e, f);
        return this;
    }
    // Layout Settings Methods
    setFlex(value) {
        // value 1 flex-grow 2 flex-shrink 3 flex-basis
        this.style.addRule(StyleTag.Flex, value);
        return this;
    }
    setGridArea(value) {
        this.style.addRule(StyleTag.GridArea, value);
        return this;
    }
    setJustifyContent(value) {
        this.style.addRule(StyleTag.JustifyContent, value);
        return this;
    }
    setJustifyItem(value) {
        this.style.addRule(StyleTag.JustifyItems, value);
        return this;
    }
    setAlignItem(value) {
        this.style.addRule(StyleTag.AlignItems, value);
        return this;
    }
    // Interface Getting Methods
    get width() {
        return this.style.values.width;
    }
    get height() {
        return this.style.values.height;
    }
    get left() {
        return this.style.values.left;
    }
    get right() {
        return this.style.values.right;
    }
    get top() {
        return this.style.values.top;
    }
    get bottom() {
        return this.style.values.bottom;
    }
    get paddingLeft() {
        return this.style.values.paddingLeft;
    }
    get paddingRight() {
        return this.style.values.paddingRight;
    }
    get hasHorizontalPadding() {
        return this.style.values.hasHorizontalPadding;
    }
    get displayType() {
        return this.initialDisplayType;
    }
}
__isEnable = new WeakMap(), __isClickable = new WeakMap(), __isFocusable = new WeakMap(), __clickEvent = new WeakMap(), __mouseoverEvent = new WeakMap(), __mouseleaveEvent = new WeakMap();
