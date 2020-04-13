/*
 * @author kaysaith
 * @date 2020/4/10 18:39
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
var _iconButton, _imageContainer, _clickEvent;
import { ImageMode, ImageView } from "../image_view";
import { BaseInputGroup } from "../../base/base_input_group/base_input_group";
import { ViewGroup } from "../../base/view_group";
import { Cursor, DisplayType, JustifyContent, StyleTag } from "../../value/style/style";
export class ButtonInput extends BaseInputGroup {
    constructor() {
        super();
        _iconButton.set(this, void 0);
        _imageContainer.set(this, void 0);
        _clickEvent.set(this, void 0);
        __classPrivateFieldSet(this, _imageContainer, new ViewGroup()
            .setDisplay(DisplayType.Flex)
            .setJustifyContent(JustifyContent.Center)
            .setAlignItem(JustifyContent.Center)
            .setFullParent()
            .onClick(_ => !__classPrivateFieldGet(this, _clickEvent) || __classPrivateFieldGet(this, _clickEvent).call(this)));
        __classPrivateFieldSet(this, _iconButton, new ImageView()
            .setPointerEvent("none")
            .setWidth(14)
            .setHeight(14)
            .setMode(ImageMode.AspectFit));
    }
    setIconSize(value) {
        __classPrivateFieldGet(this, _iconButton).setWidth(value)
            .setHeight(value);
        return this;
    }
    setImage(path) {
        __classPrivateFieldGet(this, _iconButton).setImage(path);
        return this;
    }
    setIconBackgroundColor(color) {
        __classPrivateFieldGet(this, _imageContainer).setBackgroundColor(color);
        return this;
    }
    onClickButton(action) {
        __classPrivateFieldGet(this, _imageContainer).setCursor(Cursor.Pointer);
        __classPrivateFieldSet(this, _clickEvent, action);
        return this;
    }
    setRadius(radius) {
        __classPrivateFieldGet(this, _imageContainer).addStyleRule(StyleTag.BorderRadius, `0 ${radius}px ${radius}px 0`);
        this.input.addStyleRule(StyleTag.BorderRadius, `${radius}px 0 0 ${radius}px`);
        return super.setRadius(radius);
    }
    beforeAttached() {
        const _super = Object.create(null, {
            beforeAttached: { get: () => super.beforeAttached }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.beforeAttached.call(this);
            __classPrivateFieldGet(this, _imageContainer).addView(__classPrivateFieldGet(this, _iconButton));
            this.addView(__classPrivateFieldGet(this, _imageContainer));
        });
    }
}
_iconButton = new WeakMap(), _imageContainer = new WeakMap(), _clickEvent = new WeakMap();
