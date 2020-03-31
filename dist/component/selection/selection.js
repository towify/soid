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
var _selection, _dataList, _isOpening, _optionStyle, _optionSelectedColor, _selectedOption, _optionClickEvent;
import { TextType, TextView } from "../text_view";
import { RelativeLayout } from "../relative_layout";
import { DomFragment } from "../../base/dom_fragment";
import { LinearLayout } from "../linear_layout";
import { Cursor, DisplayType, Orientation, Style, StyleTag } from "../../value/style/style";
import { Color } from "../../value/color";
export class Selection extends RelativeLayout {
    constructor() {
        super();
        _selection.set(this, new TextView());
        _dataList.set(this, new LinearLayout());
        _isOpening.set(this, false);
        _optionStyle.set(this, new Style());
        _optionSelectedColor.set(this, void 0);
        _selectedOption.set(this, void 0);
        _optionClickEvent.set(this, void 0);
        __classPrivateFieldGet(this, _selection).setMinHeight(30)
            .setText("Default")
            .setTextType(TextType.Small)
            .onClick(_ => this.switchDatalist());
        let preMouseoverOption;
        __classPrivateFieldGet(this, _dataList).setTop(__classPrivateFieldGet(this, _selection).height)
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
        })
            .onClick(event => {
            if (__classPrivateFieldGet(this, _optionClickEvent)) {
                const currentOption = __classPrivateFieldGet(this, _dataList).getSubviewByElement(event.target);
                __classPrivateFieldGet(this, _optionClickEvent).call(this, currentOption === null || currentOption === void 0 ? void 0 : currentOption.textContent);
                __classPrivateFieldGet(this, _selection).setText(currentOption === null || currentOption === void 0 ? void 0 : currentOption.textContent);
                if (__classPrivateFieldGet(this, _selectedOption) !== currentOption) {
                    __classPrivateFieldGet(this, _selectedOption)
                        .setBackgroundColor(Color.white)
                        .updateStyle();
                    __classPrivateFieldSet(this, _selectedOption, currentOption);
                }
                this.switchDatalist();
            }
        });
        __classPrivateFieldGet(this, _optionStyle).addRule(StyleTag.Cursor, Cursor.Pointer)
            .addRule(StyleTag.Display, DisplayType.Flex)
            .addRule(StyleTag.AlignItems, "center");
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
    setSelectionTextType(type) {
        __classPrivateFieldGet(this, _selection).setTextType(type);
        return this;
    }
    setOptionTextType(type) {
        __classPrivateFieldGet(this, _optionStyle).addRule(StyleTag.FontSize, type);
        return this;
    }
    setHorizontalPadding(value) {
        __classPrivateFieldGet(this, _selection).setHorizontalPadding(value);
        __classPrivateFieldGet(this, _optionStyle).addRule(StyleTag.PaddingLeft, `${value}px`);
        __classPrivateFieldGet(this, _optionStyle).addRule(StyleTag.PaddingRight, `${value}px`);
        return super.setHorizontalPadding(value);
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
    setData(data, defaultIndex) {
        let option;
        let domFragment = new DomFragment();
        (() => __awaiter(this, void 0, void 0, function* () {
            data.forEach((item, index) => {
                option = new TextView()
                    .setTextType(TextType.Small)
                    .resetStyle(__classPrivateFieldGet(this, _optionStyle))
                    .setText(item);
                if (index === defaultIndex) {
                    __classPrivateFieldGet(this, _selection).setText(item);
                    __classPrivateFieldSet(this, _selectedOption, option);
                    domFragment._beforeAttached(view => {
                        if (view === option) {
                            view.setBackgroundColor(__classPrivateFieldGet(this, _optionSelectedColor));
                        }
                    });
                }
                domFragment.addView(option);
            });
            __classPrivateFieldGet(this, _dataList).addDomFragment(domFragment);
        }))();
        return this;
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
            this.addView(__classPrivateFieldGet(this, _dataList));
            _super.beforeAttached.call(this);
        });
    }
}
_selection = new WeakMap(), _dataList = new WeakMap(), _isOpening = new WeakMap(), _optionStyle = new WeakMap(), _optionSelectedColor = new WeakMap(), _selectedOption = new WeakMap(), _optionClickEvent = new WeakMap();
