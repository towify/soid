/*
 * @author kaysaith
 * @date 2020/3/14 12:30
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
var _selection, _dataList, _isOpening, _optionStyle, _optionSelectedColor, _selectedOption, _optionClickEvent, _selectionGap;
import { TextType, TextView } from "../text_view";
import { RelativeLayout } from "../relative_layout";
import { DomFragment } from "../../base/dom_fragment";
import { LinearLayout } from "../linear_layout";
import { Cursor, DisplayType, JustifyContent, Orientation, Style, StyleTag, ViewPosition } from "../../value/style/style";
import { Color } from "../../value/color";
export class Selection extends RelativeLayout {
    constructor(isFixedOption = false) {
        super();
        this.isFixedOption = isFixedOption;
        _selection.set(this, new TextView());
        _dataList.set(this, new LinearLayout());
        _isOpening.set(this, false);
        _optionStyle.set(this, new Style());
        _optionSelectedColor.set(this, void 0);
        _selectedOption.set(this, void 0);
        _optionClickEvent.set(this, void 0);
        _selectionGap.set(this, 0);
        __classPrivateFieldGet(this, _selection).setPercentHeight(100)
            .setText("Default")
            .setTextType(TextType.Small)
            .onClick(_ => this.switchDatalist());
        __classPrivateFieldGet(this, _optionStyle).addRule(StyleTag.AlignItems, JustifyContent.Center)
            .addRule(StyleTag.Display, DisplayType.Flex)
            .addRule(StyleTag.Cursor, Cursor.Pointer);
    }
    setBackgroundColor(color) {
        __classPrivateFieldGet(this, _selection).setBackgroundColor(color);
        __classPrivateFieldGet(this, _dataList).setBackgroundColor(color);
        return this;
    }
    onClickOption(hold) {
        __classPrivateFieldSet(this, _optionClickEvent, hold);
        return this;
    }
    setListBackgroundColor(color) {
        __classPrivateFieldGet(this, _dataList).setBackgroundColor(color);
        return this;
    }
    setOptionSelectedBackgroundColor(color) {
        __classPrivateFieldSet(this, _optionSelectedColor, color);
        return this;
    }
    setHorizontalPadding(value) {
        __classPrivateFieldGet(this, _selection).setHorizontalPadding(value);
        __classPrivateFieldGet(this, _optionStyle).addRule(StyleTag.PaddingLeft, `${value}px`);
        __classPrivateFieldGet(this, _optionStyle).addRule(StyleTag.PaddingRight, `${value}px`);
        return this;
    }
    setOptionHeight(value) {
        __classPrivateFieldGet(this, _optionStyle).addRule(StyleTag.Height, `${value}px`);
        return this;
    }
    setWidth(value) {
        __classPrivateFieldGet(this, _selection).setWidth(value);
        __classPrivateFieldGet(this, _dataList).setWidth(value);
        return super.setWidth(value);
    }
    setData(data, defaultIndex, bindOption) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let option;
            let domFragment = new DomFragment();
            yield data.forEach((item, index) => {
                option = new TextView()
                    .resetStyle(__classPrivateFieldGet(this, _optionStyle))
                    .setText(item);
                if (index === defaultIndex) {
                    __classPrivateFieldGet(this, _selection).setText(item);
                    __classPrivateFieldSet(this, _selectedOption, option);
                }
                !bindOption || bindOption(option);
                domFragment.addView(option);
            });
            yield __classPrivateFieldGet(this, _dataList).addDomFragment(domFragment);
            !__classPrivateFieldGet(this, _optionSelectedColor) || ((_a = __classPrivateFieldGet(this, _selectedOption)) === null || _a === void 0 ? void 0 : _a.setBackgroundColor(__classPrivateFieldGet(this, _optionSelectedColor)).updateStyle());
            __classPrivateFieldGet(this, _dataList).onClick(event => {
                const currentOption = __classPrivateFieldGet(this, _dataList).getSubviewByElement(event.target);
                if (currentOption instanceof TextView) {
                    !__classPrivateFieldGet(this, _optionClickEvent) || __classPrivateFieldGet(this, _optionClickEvent).call(this, currentOption);
                    __classPrivateFieldGet(this, _selection).setText(currentOption.textContent || "");
                    if (__classPrivateFieldGet(this, _selectedOption) && __classPrivateFieldGet(this, _selectedOption) !== currentOption) {
                        __classPrivateFieldGet(this, _selectedOption).setBackgroundColor(Color.none)
                            .updateStyle();
                        __classPrivateFieldSet(this, _selectedOption, currentOption);
                    }
                    this.switchDatalist();
                }
            });
        });
    }
    setOptionTextColor(color) {
        __classPrivateFieldGet(this, _optionStyle).addRule(StyleTag.Color, color.value);
        return this;
    }
    setSelectionTextColor(color) {
        __classPrivateFieldGet(this, _selection).setTextColor(color);
        return this;
    }
    setTextSize(value) {
        __classPrivateFieldGet(this, _optionStyle).addRule(StyleTag.FontSize, `${value}px`);
        __classPrivateFieldGet(this, _selection).setTextSize(value);
        return this;
    }
    setRadius(radius) {
        __classPrivateFieldGet(this, _selection).setRadius(radius);
        __classPrivateFieldGet(this, _dataList).setRadius(radius);
        return this;
    }
    setGapBetweenSelectionAndOption(value) {
        __classPrivateFieldSet(this, _selectionGap, value);
        return this;
    }
    prepareDataList() {
        let preMouseoverOption;
        __classPrivateFieldGet(this, _dataList).setZIndex(10)
            .setMarginTop((this.height || 0) + __classPrivateFieldGet(this, _selectionGap))
            .setDisplay(DisplayType.None)
            .setOrientation(Orientation.Vertical)
            .onMouseover(event => {
            if (preMouseoverOption && preMouseoverOption !== __classPrivateFieldGet(this, _selectedOption)) {
                preMouseoverOption
                    .setBackgroundColor(Color.none)
                    .updateStyle();
            }
            const currentOption = __classPrivateFieldGet(this, _dataList).getSubviewByElement(event.target);
            if (__classPrivateFieldGet(this, _optionSelectedColor)) {
                currentOption
                    .setBackgroundColor(__classPrivateFieldGet(this, _optionSelectedColor))
                    .updateStyle();
            }
            preMouseoverOption = currentOption;
        })
            .onMouseleave(_ => {
            if (preMouseoverOption && preMouseoverOption !== __classPrivateFieldGet(this, _selectedOption)) {
                preMouseoverOption
                    .setBackgroundColor(Color.none)
                    .updateStyle();
            }
        });
        __classPrivateFieldGet(this, _optionStyle).addRule(StyleTag.Cursor, Cursor.Pointer)
            .addRule(StyleTag.Display, DisplayType.Flex)
            .addRule(StyleTag.AlignItems, "center");
    }
    switchDatalist() {
        __classPrivateFieldGet(this, _dataList).setDisplay(__classPrivateFieldGet(this, _isOpening) ? DisplayType.None : DisplayType.Flex)
            .updateStyle();
        __classPrivateFieldSet(this, _isOpening, !__classPrivateFieldGet(this, _isOpening));
    }
    beforeAttached() {
        const _super = Object.create(null, {
            beforeAttached: { get: () => super.beforeAttached }
        });
        return __awaiter(this, void 0, void 0, function* () {
            this.addView(__classPrivateFieldGet(this, _selection));
            this.prepareDataList();
            this.addView(__classPrivateFieldGet(this, _dataList));
            !this.isFixedOption || __classPrivateFieldGet(this, _dataList).setPosition(ViewPosition.Fixed).updateStyle();
            _super.beforeAttached.call(this);
        });
    }
}
_selection = new WeakMap(), _dataList = new WeakMap(), _isOpening = new WeakMap(), _optionStyle = new WeakMap(), _optionSelectedColor = new WeakMap(), _selectedOption = new WeakMap(), _optionClickEvent = new WeakMap(), _selectionGap = new WeakMap();
