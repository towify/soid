/*
 * @author kaysaith
 * @date 2020/3/12 18:18
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
var _span, _spanStyle, __textContent;
import { View } from "../base/view";
import { DisplayType, Style, StyleTag } from "../value/style/style";
export class TextView extends View {
    constructor() {
        super();
        _span.set(this, document.createElement("span"));
        _spanStyle.set(this, new Style());
        __textContent.set(this, void 0);
        this.setDisplay(DisplayType.Flex);
        this.style.addRule(StyleTag.AlignItems, "center");
        __classPrivateFieldGet(this, _spanStyle).addRule(StyleTag.PointerEvents, "none")
            .addRule(StyleTag.Display, DisplayType.InlineBlock)
            .addRule(StyleTag.Width, "100%");
    }
    get textContent() {
        return __classPrivateFieldGet(this, __textContent);
    }
    setTextSize(value) {
        __classPrivateFieldGet(this, _spanStyle).addRule(StyleTag.FontSize, `${value}px`);
        return this;
    }
    setFont(font) {
        __classPrivateFieldGet(this, _spanStyle).addRule(StyleTag.FontFamily, font);
        return this;
    }
    setTextDecoration(decoration) {
        __classPrivateFieldGet(this, _spanStyle).addRule(StyleTag.TextDecoration, decoration);
        return this;
    }
    setTextType(type) {
        __classPrivateFieldGet(this, _spanStyle).addRule(StyleTag.FontSize, type);
        return this;
    }
    setTextWeight(weight) {
        __classPrivateFieldGet(this, _spanStyle).addRule(StyleTag.FontWeight, weight);
        return this;
    }
    setTextColor(color) {
        __classPrivateFieldGet(this, _spanStyle).addRule(StyleTag.Color, color.value);
        return this;
    }
    setTextOverflow(type) {
        __classPrivateFieldGet(this, _spanStyle).addRule(StyleTag.TextOverflow, type);
        return this;
    }
    setOverflow(value) {
        __classPrivateFieldGet(this, _spanStyle).addRule(StyleTag.Overflow, value);
        return super.setOverflow(value);
    }
    setWhiteSpace(type) {
        __classPrivateFieldGet(this, _spanStyle).addRule(StyleTag.WhiteSpace, type);
        return this;
    }
    setTextUnderLine() {
        __classPrivateFieldGet(this, _spanStyle).addRule(StyleTag.TextDecoration, "underline");
        return this;
    }
    setLineHeight(value) {
        __classPrivateFieldGet(this, _spanStyle).addRule(StyleTag.LineHeight, `${value}px`);
        return this;
    }
    setText(text, specificStyle) {
        var _a;
        __classPrivateFieldSet(this, __textContent, text);
        if (specificStyle) {
            const style = new Style();
            style.addRule(StyleTag.Display, DisplayType.InlineBlock);
            specificStyle.hold(style);
            __classPrivateFieldGet(this, _span).innerHTML = ((_a = __classPrivateFieldGet(this, __textContent)) === null || _a === void 0 ? void 0 : _a.substr(0, specificStyle.start)) + `<span style=${style.generateCssText()}>${text.substr(specificStyle.start, specificStyle.end)}</span>`;
        }
        else {
            __classPrivateFieldGet(this, _span).textContent = __classPrivateFieldGet(this, __textContent);
        }
        return this;
    }
    setTextAlign(align) {
        __classPrivateFieldGet(this, _spanStyle).addRule(StyleTag.TextAlign, align);
        return this;
    }
    updateStyle() {
        __classPrivateFieldGet(this, _spanStyle).setStyle(__classPrivateFieldGet(this, _span));
        return super.updateStyle();
    }
    _prepareLifeCycle() {
        const _super = Object.create(null, {
            _prepareLifeCycle: { get: () => super._prepareLifeCycle }
        });
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldGet(this, _spanStyle).setStyle(__classPrivateFieldGet(this, _span));
            this._element.appendChild(__classPrivateFieldGet(this, _span));
            _super._prepareLifeCycle.call(this);
        });
    }
}
_span = new WeakMap(), _spanStyle = new WeakMap(), __textContent = new WeakMap();
var TextType;
(function (TextType) {
    TextType["Inherit"] = "inherit";
    TextType["Large"] = "large";
    TextType["Larger"] = "larger";
    TextType["Medium"] = "medium";
    TextType["Small"] = "small";
    TextType["XXSmall"] = "xx-small";
    TextType["XXLarge"] = "xx-large";
    TextType["XSmall"] = "x-small";
    TextType["XLarge"] = "x-large";
})(TextType || (TextType = {}));
var TextDecoration;
(function (TextDecoration) {
    TextDecoration["Underline"] = "underline";
    TextDecoration["LineThrough"] = "line-through";
    TextDecoration["Overline"] = "overline";
})(TextDecoration || (TextDecoration = {}));
var WhiteSpace;
(function (WhiteSpace) {
    WhiteSpace["Nowrap"] = "nowrap";
    WhiteSpace["Pre"] = "pre";
})(WhiteSpace || (WhiteSpace = {}));
var TextOverflow;
(function (TextOverflow) {
    TextOverflow["Ellipsis"] = "ellipsis";
    TextOverflow["Clip"] = "clip";
})(TextOverflow || (TextOverflow = {}));
export { TextType, TextDecoration, WhiteSpace, TextOverflow };
