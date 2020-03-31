/*
 * @author kaysaith
 * @date 2020/3/24 14:59
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
var _preDisplayedContent, _contents, _pageContainer, _menu;
import { RelativeLayout } from "../relative_layout";
import { DisplayType, StyleTag } from "../../value/style/style";
import { ViewGroup } from "../../base/view_group";
import { SegmentMenu } from "./segment_menu";
export class SegmentContainer extends ViewGroup {
    constructor(type) {
        super();
        this.type = type;
        this.subviews = [];
        _preDisplayedContent.set(this, void 0);
        _contents.set(this, []);
        _pageContainer.set(this, new RelativeLayout());
        _menu.set(this, void 0);
        __classPrivateFieldSet(this, _menu, new SegmentMenu(type));
        this.style.addRule(StyleTag.Display, DisplayType.Grid);
        __classPrivateFieldGet(this, _pageContainer).setFullParent();
    }
    setItemType(tab) {
        __classPrivateFieldGet(this, _menu).setItemType(tab);
        return this;
    }
    setItemContainerBackgroundColor(color) {
        __classPrivateFieldGet(this, _menu).setBackgroundColor(color);
        return this;
    }
    setItemContainerSize(value) {
        switch (this.type) {
            case TabsType.TopScrollable:
            case TabsType.TopFixed: {
                this.style.addRule(StyleTag.GridTemplateRows, `${value}px auto`);
                __classPrivateFieldGet(this, _menu).setHeight(value);
                break;
            }
            case TabsType.LeftScrollable: {
                __classPrivateFieldGet(this, _menu).setWidth(value);
                this.style.addRule(StyleTag.GridTemplateColumns, `${value}px auto`);
                break;
            }
        }
        return this;
    }
    setData(models, onBind) {
        let page;
        models.forEach((model, index) => {
            if (!index) {
                page = new model.page();
                __classPrivateFieldSet(this, _preDisplayedContent, page);
                page.setFullParent();
                __classPrivateFieldGet(this, _pageContainer).addView(page);
                this.subviews.push(page);
            }
            else {
                page = undefined;
            }
            __classPrivateFieldGet(this, _contents).push({
                page: page,
                willInitial: model.page
            });
        });
        __classPrivateFieldGet(this, _menu).setData(models, ((item, position) => {
            onBind(item, position);
        }));
        return this;
    }
    showPageByPosition(position) {
        var _a;
        if (__classPrivateFieldGet(this, _contents)[position].page === __classPrivateFieldGet(this, _preDisplayedContent))
            return;
        (_a = __classPrivateFieldGet(this, _preDisplayedContent)) === null || _a === void 0 ? void 0 : _a.setDisplay(DisplayType.None).updateStyle();
        let currentContent = __classPrivateFieldGet(this, _contents)[position].page;
        if (!currentContent) {
            currentContent = new (__classPrivateFieldGet(this, _contents)[position].willInitial)()
                .setFullParent();
            __classPrivateFieldGet(this, _contents)[position].page = currentContent;
            __classPrivateFieldGet(this, _pageContainer).addView(currentContent);
            this.subviews.push(currentContent);
        }
        else {
            currentContent.setDisplay(currentContent.displayType).updateStyle();
        }
        __classPrivateFieldSet(this, _preDisplayedContent, currentContent);
    }
    beforeAttached() {
        const _super = Object.create(null, {
            beforeAttached: { get: () => super.beforeAttached }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.beforeAttached.call(this);
            this.addView(__classPrivateFieldGet(this, _menu));
            this.addView(__classPrivateFieldGet(this, _pageContainer));
        });
    }
}
_preDisplayedContent = new WeakMap(), _contents = new WeakMap(), _pageContainer = new WeakMap(), _menu = new WeakMap();
export class SegmentModel {
    constructor(page) {
        this.page = page;
    }
}
export var TabsType;
(function (TabsType) {
    TabsType[TabsType["TopFixed"] = 0] = "TopFixed";
    TabsType[TabsType["TopScrollable"] = 1] = "TopScrollable";
    TabsType[TabsType["LeftScrollable"] = 2] = "LeftScrollable";
})(TabsType || (TabsType = {}));
