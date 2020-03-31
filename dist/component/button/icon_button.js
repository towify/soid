/*
 * @author kaysaith
 * @date 2020/3/13 12:16
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
var _icon, _isLeft, _iconSize;
import { Button } from "./button";
import { ImageMode, ImageView } from "../image_view";
import { Align, DisplayType, StyleTag } from "../../value/style/style";
export class IconButton extends Button {
    constructor() {
        super();
        _icon.set(this, new ImageView());
        _isLeft.set(this, true);
        _iconSize.set(this, void 0);
        __classPrivateFieldGet(this, _icon).setPointerEvent("none")
            .setFullParent();
        this.setDisplay(DisplayType.Grid);
        this.style.addRule(StyleTag.AlignItems, Align.Center);
        this.style.addRule(StyleTag.JustifyItems, Align.Center);
    }
    setHeight(value) {
        __classPrivateFieldSet(this, _iconSize, value);
        return super.setHeight(value);
    }
    setMinHeight(minHeight) {
        __classPrivateFieldSet(this, _iconSize, minHeight);
        return super.setMinHeight(minHeight);
    }
    setGap(value) {
        this.style.addRule(StyleTag.ColumnGap, `${value}px`);
        return this;
    }
    setIconSize(value) {
        __classPrivateFieldSet(this, _iconSize, value);
        __classPrivateFieldGet(this, _icon).setWidth(value).setHeight(value);
        return this;
    }
    isRightIcon() {
        __classPrivateFieldGet(this, _icon).setOrder(1);
        __classPrivateFieldSet(this, _isLeft, false);
        return this;
    }
    setImage(path) {
        __classPrivateFieldGet(this, _icon).setImage(path)
            .setMode(ImageMode.AspectFit);
        return this;
    }
    _prepareLifeCycle() {
        const _super = Object.create(null, {
            _prepareLifeCycle: { get: () => super._prepareLifeCycle }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const templateValue = __classPrivateFieldGet(this, _isLeft) ? `${__classPrivateFieldGet(this, _iconSize)}px auto` : `auto ${__classPrivateFieldGet(this, _iconSize)}px`;
            this.style.addRule(StyleTag.GridTemplateColumns, templateValue);
            yield __classPrivateFieldGet(this, _icon)._prepareLifeCycle();
            this._element.appendChild(__classPrivateFieldGet(this, _icon)._element);
            _super._prepareLifeCycle.call(this);
        });
    }
}
_icon = new WeakMap(), _isLeft = new WeakMap(), _iconSize = new WeakMap();
