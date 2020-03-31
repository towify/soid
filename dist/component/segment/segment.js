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
var _tabType, _itemContainer, _contentContainer, _contents, _preDisplayedContent;
import { RelativeLayout } from "../relative_layout";
import { LinearLayout } from "../linear_layout";
import { DisplayType, JustifyContent, Orientation, StyleTag } from "../../value/style/style";
import { ViewGroup } from "../../base/view_group";
export class Segment extends ViewGroup {
    constructor(type) {
        super();
        this.type = type;
        _tabType.set(this, void 0);
        _itemContainer.set(this, new LinearLayout());
        _contentContainer.set(this, new RelativeLayout());
        _contents.set(this, []);
        _preDisplayedContent.set(this, void 0);
        this.style.addRule(StyleTag.Display, DisplayType.Grid);
        __classPrivateFieldGet(this, _itemContainer).hideScrollbar();
        __classPrivateFieldGet(this, _contentContainer).setFullParent();
        this.onCreate();
    }
    setItemType(tab) {
        __classPrivateFieldSet(this, _tabType, tab);
        return this;
    }
    setItemContainerBackgroundColor(color) {
        __classPrivateFieldGet(this, _itemContainer).setBackgroundColor(color);
        return this;
    }
    setItemContainerSize(value) {
        switch (this.type) {
            case TabsType.TopScrollable:
            case TabsType.TopFixed: {
                this.style.addRule(StyleTag.GridTemplateRows, `${value}px auto`);
                __classPrivateFieldGet(this, _itemContainer).setHeight(value);
                break;
            }
            case TabsType.LeftScrollable: {
                __classPrivateFieldGet(this, _itemContainer).setWidth(value);
                this.style.addRule(StyleTag.GridTemplateColumns, `${value}px auto`);
                break;
            }
        }
        return this;
    }
    setData(models, onBind) {
        let item;
        let page;
        models.forEach((model, index) => {
            item = new (__classPrivateFieldGet(this, _tabType))();
            if (!index) {
                page = new model.page();
                __classPrivateFieldSet(this, _preDisplayedContent, page);
                page.setFullParent();
                __classPrivateFieldGet(this, _contentContainer).addView(page);
            }
            else {
                page = undefined;
            }
            __classPrivateFieldGet(this, _contents).push({
                page: page,
                willInitial: model.page
            });
            switch (this.type) {
                case TabsType.TopScrollable:
                case TabsType.TopFixed: {
                    item.setPercentHeight(100);
                    break;
                }
                case TabsType.LeftScrollable: {
                    item.setPercentWidth(100);
                    break;
                }
            }
            onBind(item, index);
            __classPrivateFieldGet(this, _itemContainer).addView(item);
        });
        return this;
    }
    showContentByPosition(position) {
        var _a;
        if (__classPrivateFieldGet(this, _contents)[position].page === __classPrivateFieldGet(this, _preDisplayedContent))
            return;
        (_a = __classPrivateFieldGet(this, _preDisplayedContent)) === null || _a === void 0 ? void 0 : _a.setDisplay(DisplayType.None).updateStyle();
        let currentContent = __classPrivateFieldGet(this, _contents)[position].page;
        if (!currentContent) {
            currentContent = new (__classPrivateFieldGet(this, _contents)[position].willInitial)()
                .setFullParent();
            __classPrivateFieldGet(this, _contents)[position].page = currentContent;
            __classPrivateFieldGet(this, _contentContainer).addView(currentContent);
        }
        else {
            currentContent.setDisplay(currentContent.displayType).updateStyle();
        }
        __classPrivateFieldSet(this, _preDisplayedContent, currentContent);
    }
    onCreate() {
        switch (this.type) {
            case TabsType.LeftScrollable: {
                __classPrivateFieldGet(this, _itemContainer).setOrientation(Orientation.Vertical)
                    .setFullParent();
                break;
            }
            case TabsType.TopScrollable:
            case TabsType.TopFixed: {
                __classPrivateFieldGet(this, _itemContainer).setOrientation(Orientation.Horizontal)
                    .setFullParent();
                if (this.type === TabsType.TopFixed) {
                    __classPrivateFieldGet(this, _itemContainer).setJustifyContent(JustifyContent.SpaceAround);
                }
                break;
            }
        }
    }
    beforeAttached() {
        const _super = Object.create(null, {
            beforeAttached: { get: () => super.beforeAttached }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.beforeAttached.call(this);
            this.addView(__classPrivateFieldGet(this, _itemContainer));
            this.addView(__classPrivateFieldGet(this, _contentContainer));
        });
    }
}
_tabType = new WeakMap(), _itemContainer = new WeakMap(), _contentContainer = new WeakMap(), _contents = new WeakMap(), _preDisplayedContent = new WeakMap();
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
