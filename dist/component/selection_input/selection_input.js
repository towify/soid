/*
 * @author kaysaith
 * @date 2020/4/10 12:25
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
var _selection;
import { Align, DisplayType, StyleTag } from "../../value/style/style";
import { Selection } from "../selection/selection";
import { Color } from "../../value/color";
import { BaseInputGroup } from "../../base/base_input_group/base_input_group";
export class SelectionInput extends BaseInputGroup {
    constructor(isFixedOption = false) {
        super();
        this.isFixedOption = isFixedOption;
        _selection.set(this, void 0);
        this
            .setDisplay(DisplayType.Grid)
            .addStyleRule(StyleTag.GridTemplateColumns, "auto 40px");
        __classPrivateFieldSet(this, _selection, new Selection(isFixedOption)
            .setContentTextAlign(Align.Center)
            .setHorizontalPadding(5)
            .setWidth(40)
            .setOptionHeight(20)
            .setTextSize(9)
            .setListBackgroundColor(Color.white));
    }
    setOptionHeight(value) {
        __classPrivateFieldGet(this, _selection).setOptionHeight(value);
        return this;
    }
    setArrowColor(color) {
        __classPrivateFieldGet(this, _selection).setArrowColor(color);
        return this;
    }
    setSelectionTextColor(color) {
        __classPrivateFieldGet(this, _selection).setSelectionTextColor(color);
        return this;
    }
    setOptionTextColor(color) {
        __classPrivateFieldGet(this, _selection).setOptionTextColor(color);
        return this;
    }
    setSelectionTextWeight(value) {
        __classPrivateFieldGet(this, _selection).setTextWeight(value);
        return this;
    }
    setSelectionFont(value) {
        __classPrivateFieldGet(this, _selection).setFont(value);
        return this;
    }
    setSelectionData(data, defaultIndex, bindOption) {
        return __classPrivateFieldGet(this, _selection).setData(data, defaultIndex, bindOption);
    }
    setHeight(value) {
        __classPrivateFieldGet(this, _selection).setHeight(value);
        return super.setHeight(value);
    }
    setRadius(radius) {
        __classPrivateFieldGet(this, _selection).setOptionBoardRadius(radius);
        __classPrivateFieldGet(this, _selection).addStyleRule(StyleTag.BorderRadius, `0 ${radius}px ${radius}px 0`);
        this.input.addStyleRule(StyleTag.BorderRadius, `${radius}px 0 0 ${radius}px`);
        return super.setRadius(radius);
    }
    setSelectionOptionBoardGap(value) {
        __classPrivateFieldGet(this, _selection).setGapBetweenSelectionAndOption(value);
        return this;
    }
    setSelectionBackgroundColor(color) {
        __classPrivateFieldGet(this, _selection).setBackgroundColor(color);
        return this;
    }
    setOptionSelectedBackgroundColor(color) {
        __classPrivateFieldGet(this, _selection).setOptionSelectedBackgroundColor(color);
        return this;
    }
    beforeAttached() {
        const _super = Object.create(null, {
            beforeAttached: { get: () => super.beforeAttached }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.beforeAttached.call(this);
            this.addView(__classPrivateFieldGet(this, _selection));
        });
    }
}
_selection = new WeakMap();
