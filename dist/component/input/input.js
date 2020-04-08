/*
 * @author kaysaith
 * @date 2020/3/13 16:06
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
var _placeHolder, _input, _clearButton, _inputStyle, _focusEvent, _blurEvent, _changeEvent, __hasClearButton, __hasDisplayedClearButton, _clearButtonSize;
import { Align, Cursor, DisplayType, Style, StyleTag, ViewPosition } from "../../value/style/style";
import { RelativeLayout } from "../relative_layout";
import { TextOverflow, TextView, WhiteSpace } from "../text_view";
import { Color } from "../../value/color";
import { ListenerType } from "../../value/type";
import { ImageMode, ImageView } from "../image_view";
export class Input extends RelativeLayout {
    constructor() {
        super();
        _placeHolder.set(this, new TextView());
        _input.set(this, document.createElement("input"));
        _clearButton.set(this, new ImageView());
        _inputStyle.set(this, new Style());
        _focusEvent.set(this, void 0);
        _blurEvent.set(this, void 0);
        _changeEvent.set(this, void 0);
        __hasClearButton.set(this, true);
        __hasDisplayedClearButton.set(this, false);
        _clearButtonSize.set(this, 12);
        this
            .setDisplay(DisplayType.Flex)
            .setMinHeight(30)
            .setOverflow("hidden")
            .setHorizontalPadding(15)
            .setBackgroundColor(Color.white);
        __classPrivateFieldGet(this, _clearButton).setWidth(__classPrivateFieldGet(this, _clearButtonSize))
            .setHeight(__classPrivateFieldGet(this, _clearButtonSize))
            .setRightPadding(10)
            .setRight(0)
            .setDisplay(DisplayType.None)
            .setImage("resource/image/close_icon.svg")
            .setMode(ImageMode.AspectFit)
            .setCursor(Cursor.Pointer)
            .onClick(_ => {
            this.setValue("");
            __classPrivateFieldSet(this, __hasDisplayedClearButton, false);
            __classPrivateFieldGet(this, _placeHolder).setOpacity(1).updateStyle();
            __classPrivateFieldGet(this, _clearButton).setDisplay(DisplayType.None).updateStyle();
        });
        const contentWidth = `calc(100% - ${(this.paddingLeft || 0) + (this.paddingRight || 0)}px - ${__classPrivateFieldGet(this, _clearButtonSize)}px)`;
        this.style.addRule(StyleTag.AlignItems, Align.Center);
        __classPrivateFieldGet(this, _inputStyle).addRule(StyleTag.Width, contentWidth)
            .addRule(StyleTag.Height, "100%")
            .addRule(StyleTag.Outline, "none")
            .addRule(StyleTag.Border, "none")
            .addRule(StyleTag.BoxSizing, "border-box")
            .addRule(StyleTag.Position, ViewPosition.Absolute)
            .addRule(StyleTag.Background, "none");
        __classPrivateFieldGet(this, _placeHolder).setPointerEvent("none")
            .setLeftPadding(3)
            .setWhiteSpace(WhiteSpace.Nowrap)
            .setPercentWidth(80)
            .setOverflow("hidden")
            .setTextOverflow(TextOverflow.Ellipsis);
    }
    get value() {
        return __classPrivateFieldGet(this, _input).value;
    }
    removeClearButton() {
        __classPrivateFieldSet(this, __hasClearButton, false);
        __classPrivateFieldGet(this, _clearButton).remove();
        __classPrivateFieldGet(this, _inputStyle).addRule(StyleTag.Width, "100%");
        __classPrivateFieldGet(this, _placeHolder).setPercentWidth(100);
        return this;
    }
    setValue(value) {
        __classPrivateFieldGet(this, _input).value = value;
        if (value.length) {
            __classPrivateFieldGet(this, _placeHolder).setOpacity(0).updateStyle();
        }
        return this;
    }
    setType(type) {
        switch (type) {
            case InputType.Tel: {
                __classPrivateFieldGet(this, _input).autocomplete = "tel";
                break;
            }
            case InputType.NewPassword: {
                __classPrivateFieldGet(this, _input).autocomplete = "new-password";
                break;
            }
        }
        __classPrivateFieldGet(this, _input).type = type;
        return this;
    }
    onShow() {
        super.onShow();
        !__classPrivateFieldGet(this, _focusEvent) || __classPrivateFieldGet(this, _input).addEventListener(ListenerType.Focus, __classPrivateFieldGet(this, _focusEvent));
        !__classPrivateFieldGet(this, _blurEvent) || __classPrivateFieldGet(this, _input).addEventListener(ListenerType.Blur, __classPrivateFieldGet(this, _blurEvent));
        !__classPrivateFieldGet(this, _changeEvent) || __classPrivateFieldGet(this, _input).addEventListener(ListenerType.Input, __classPrivateFieldGet(this, _changeEvent));
        return this;
    }
    onHide() {
        super.onHide();
        !__classPrivateFieldGet(this, _focusEvent) || __classPrivateFieldGet(this, _input).removeEventListener(ListenerType.Focus, __classPrivateFieldGet(this, _focusEvent));
        !__classPrivateFieldGet(this, _blurEvent) || __classPrivateFieldGet(this, _input).removeEventListener(ListenerType.Blur, __classPrivateFieldGet(this, _blurEvent));
        !__classPrivateFieldGet(this, _changeEvent) || __classPrivateFieldGet(this, _input).removeEventListener(ListenerType.Input, __classPrivateFieldGet(this, _changeEvent));
        return this;
    }
    onFocus(action) {
        if (!__classPrivateFieldGet(this, _focusEvent) && this.isEnable && this.isFocusable) {
            __classPrivateFieldSet(this, _focusEvent, (event) => {
                if (!this.isEnable || !this.isFocusable)
                    return;
                action();
                if (!this.value.length)
                    __classPrivateFieldGet(this, _placeHolder).setOpacity(0).updateStyle();
                event.stopPropagation();
            });
            __classPrivateFieldGet(this, _input).addEventListener(ListenerType.Focus, __classPrivateFieldGet(this, _focusEvent));
        }
        return this;
    }
    onChange(hold) {
        if (!__classPrivateFieldGet(this, _changeEvent) && this.isEnable && this.isFocusable) {
            __classPrivateFieldSet(this, _changeEvent, (event) => {
                if (!this.isEnable || !this.isFocusable)
                    return;
                if (this.value.length && !__classPrivateFieldGet(this, __hasDisplayedClearButton)) {
                    this.showClearButton(true);
                    __classPrivateFieldSet(this, __hasDisplayedClearButton, true);
                }
                else {
                    if (!this.value.length) {
                        this.showClearButton(false);
                        __classPrivateFieldSet(this, __hasDisplayedClearButton, false);
                    }
                }
                hold(this.value);
                event.stopPropagation();
            });
            __classPrivateFieldGet(this, _input).addEventListener(ListenerType.Input, __classPrivateFieldGet(this, _changeEvent));
        }
        return this;
    }
    onBlur(action) {
        if (!__classPrivateFieldGet(this, _blurEvent) && this.isEnable && this.isFocusable) {
            __classPrivateFieldSet(this, _blurEvent, (event) => {
                if (!this.isEnable || !this.isFocusable)
                    return;
                action();
                if (!this.value.length)
                    __classPrivateFieldGet(this, _placeHolder).setOpacity(1).updateStyle();
                event.stopPropagation();
            });
            __classPrivateFieldGet(this, _input).addEventListener(ListenerType.Blur, __classPrivateFieldGet(this, _blurEvent));
        }
        return this;
    }
    setTextSize(value) {
        __classPrivateFieldGet(this, _inputStyle).addRule(StyleTag.FontSize, `${value}px`);
        __classPrivateFieldGet(this, _placeHolder).setTextSize(value);
        return this;
    }
    setTextColor(color) {
        __classPrivateFieldGet(this, _inputStyle).addRule(StyleTag.Color, `${color.value}`);
        return this;
    }
    setTextWeight(value) {
        __classPrivateFieldGet(this, _inputStyle).addRule(StyleTag.FontWeight, value);
        return this;
    }
    setTextType(type) {
        __classPrivateFieldGet(this, _inputStyle).addRule(StyleTag.FontSize, type);
        __classPrivateFieldGet(this, _placeHolder).setTextType(type);
        return this;
    }
    setPlaceholder(value) {
        __classPrivateFieldGet(this, _placeHolder).setText(value);
        return this;
    }
    setPlaceholderColor(color) {
        __classPrivateFieldGet(this, _placeHolder).setTextColor(color);
        return this;
    }
    getClearButton(hold) {
        hold(__classPrivateFieldGet(this, _clearButton));
        return this;
    }
    onDetached() {
        !__classPrivateFieldGet(this, _focusEvent) || __classPrivateFieldGet(this, _input).removeEventListener(ListenerType.Focus, __classPrivateFieldGet(this, _focusEvent));
        !__classPrivateFieldGet(this, _focusEvent) || __classPrivateFieldGet(this, _input).removeEventListener(ListenerType.Blur, __classPrivateFieldGet(this, _focusEvent));
        super.onDetached();
    }
    _prepareLifeCycle() {
        const _super = Object.create(null, {
            _prepareLifeCycle: { get: () => super._prepareLifeCycle }
        });
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldGet(this, _inputStyle).setStyle(__classPrivateFieldGet(this, _input));
            this._element.appendChild(__classPrivateFieldGet(this, _input));
            this.addView(__classPrivateFieldGet(this, _clearButton));
            this.addView(__classPrivateFieldGet(this, _placeHolder));
            _super._prepareLifeCycle.call(this);
        });
    }
    showClearButton(status) {
        if (status && __classPrivateFieldGet(this, __hasClearButton)) {
            __classPrivateFieldGet(this, _clearButton).setDisplay(DisplayType.Block).updateStyle();
        }
        else {
            __classPrivateFieldGet(this, _clearButton).setDisplay(DisplayType.None).updateStyle();
        }
        return this;
    }
}
_placeHolder = new WeakMap(), _input = new WeakMap(), _clearButton = new WeakMap(), _inputStyle = new WeakMap(), _focusEvent = new WeakMap(), _blurEvent = new WeakMap(), _changeEvent = new WeakMap(), __hasClearButton = new WeakMap(), __hasDisplayedClearButton = new WeakMap(), _clearButtonSize = new WeakMap();
export var InputType;
(function (InputType) {
    InputType["Password"] = "password";
    InputType["NewPassword"] = "new-password";
    InputType["Email"] = "email";
    InputType["File"] = "file";
    InputType["Number"] = "number";
    InputType["Search"] = "search";
    InputType["Tel"] = "tel";
    InputType["Text"] = "text";
    InputType["URL"] = "url";
})(InputType || (InputType = {}));
