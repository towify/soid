/*
 * @author kaysaith
 * @date 2020/4/5 01:14
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
var _arrow, _icon, _title, _container, __parentItem, __model, __isFolded;
import { ViewGroup } from "../../base/view_group";
import { ImageMode, ImageView } from "../image_view";
import { TextOverflow, TextView } from "../text_view";
import { DisplayType, JustifyContent, StyleTag } from "../../value/style/style";
import { Color } from "../../value/color";
export class FolderView extends ViewGroup {
    constructor() {
        super();
        this.subItems = [];
        this
            .setDisplay(DisplayType.Grid)
            .setPercentWidth(100)
            .addStyleRule(StyleTag.RowGap, "10px");
    }
    getItemById(id, hold) {
        let result = this.subItems.find(item => item.id === id);
        if (result) {
            hold(result);
        }
        else {
            for (let item of this.subItems) {
                item.getItemByID(id, child => {
                    if (child) {
                        result = child;
                        hold(result);
                    }
                });
                if (result)
                    break;
            }
        }
    }
    addItem(item, parent) {
        var _a;
        if (parent) {
            (_a = parent === null || parent === void 0 ? void 0 : parent.fold(false)) === null || _a === void 0 ? void 0 : _a.addItem(item);
        }
        else {
            this.subItems.push(item);
            this.addView(item);
        }
        return this;
    }
    removeChildItem(item) {
        const targetIndex = this.subItems.indexOf(item);
        if (targetIndex >= 0) {
            this.subItems.splice(targetIndex, 1);
            item.remove();
        }
    }
}
export class FolderItem extends ViewGroup {
    constructor() {
        super();
        this.subItems = [];
        _arrow.set(this, new ImageView());
        _icon.set(this, new ImageView());
        _title.set(this, new TextView());
        _container.set(this, new ViewGroup());
        __parentItem.set(this, void 0);
        __model.set(this, void 0);
        __isFolded.set(this, true);
        this
            .setDisplay(DisplayType.Grid)
            .addStyleRule(StyleTag.GridTemplateColumns, "20px 20px auto")
            .addStyleRule(StyleTag.GridTemplateAreas, `"arrow icon title" "container container container"`)
            .setJustifyItem(JustifyContent.Center)
            .setAlignItem(JustifyContent.Center);
        __classPrivateFieldGet(this, _icon).addStyleRule(StyleTag.GridArea, "icon")
            .setPointerEvent("none")
            .setWidth(14)
            .setHeight(14)
            .setMode(ImageMode.AspectFit);
        __classPrivateFieldGet(this, _title).addStyleRule(StyleTag.GridArea, "title")
            .setTextOverflow(TextOverflow.Ellipsis)
            .setPointerEvent("none")
            .setLeftPadding(5)
            .setFullParent()
            .setTextSize(10)
            .setTextColor(Color.white);
        __classPrivateFieldGet(this, _arrow).addStyleRule(StyleTag.GridArea, "arrow")
            .setWidth(0)
            .setHeight(0)
            .setRightBorder("3px solid transparent")
            .setLeftBorder("4px solid transparent")
            .setTopBorder("5px solid #fff")
            .updateStyle()
            .setDisplay(DisplayType.None)
            .onClick(_ => {
            this.fold(__classPrivateFieldGet(this, __isFolded));
            __classPrivateFieldSet(this, __isFolded, !__classPrivateFieldGet(this, __isFolded));
        });
        this.dropArrowStyle(true);
        __classPrivateFieldGet(this, _container).setDisplay(DisplayType.Grid)
            .addStyleRule(StyleTag.RowGap, "10px")
            .setFullParent()
            .setLeftPadding(20)
            .setTopPadding(10)
            .setDisplay(DisplayType.None)
            .addStyleRule(StyleTag.GridArea, "container");
    }
    get isFolded() {
        return __classPrivateFieldGet(this, __isFolded);
    }
    get model() {
        return __classPrivateFieldGet(this, __model);
    }
    get parentItem() {
        return __classPrivateFieldGet(this, __parentItem);
    }
    setParentItem(parentItem) {
        __classPrivateFieldSet(this, __parentItem, parentItem);
        return this;
    }
    setModel(model) {
        var _a, _b;
        __classPrivateFieldSet(this, __model, model);
        (_a = __classPrivateFieldGet(this, _icon)) === null || _a === void 0 ? void 0 : _a.setImage(model.iconPath);
        (_b = __classPrivateFieldGet(this, _title)) === null || _b === void 0 ? void 0 : _b.setText(model.name);
        __classPrivateFieldGet(this, _arrow).setDisplay(model.isParent ? DisplayType.Block : DisplayType.None);
        if (model.isParent) {
            __classPrivateFieldGet(this, _container).setDisplay(DisplayType.Grid);
        }
        return this;
    }
    fold(status) {
        if (status) {
            if (!__classPrivateFieldGet(this, _container).isDisplayNone) {
                this.dropArrowStyle(false);
                __classPrivateFieldGet(this, _container).setDisplay(DisplayType.None).updateStyle();
                this.subItems.forEach(item => item.fold(true));
            }
        }
        else {
            if (__classPrivateFieldGet(this, _container).isDisplayNone) {
                this.dropArrowStyle(true);
                __classPrivateFieldGet(this, _container).setDisplay(DisplayType.Grid).updateStyle();
            }
        }
        return this;
    }
    getItemByID(id, hold) {
        let item = this.subItems.find(item => item.id === id);
        if (item) {
            hold(item);
        }
        else {
            for (let subItem of this.subItems) {
                subItem.getItemByID(id, child => {
                    if (child.id === id) {
                        item = child;
                        hold(item);
                    }
                });
                if (item)
                    break;
            }
        }
    }
    addView(view) {
        throw Error("You can't add view into fold item component but it instanceof fold item type");
    }
    addItem(item) {
        __classPrivateFieldGet(this, _container).addView(item);
        this.subItems.push(item);
        item.setParentItem(this);
    }
    removeChildItem(item) {
        this.removeSubItem(this);
        return this;
    }
    removeSelf() {
        !this.parentItem || this.removeSubItem(this.parentItem);
        return this;
    }
    isEmptyFold() {
        __classPrivateFieldGet(this, _arrow).setDisplay(DisplayType.None).updateStyle();
        __classPrivateFieldGet(this, _container).setDisplay(DisplayType.None).updateStyle();
        return this;
    }
    removeSubItem(parentItem) {
        const targetIndex = parentItem.subItems.indexOf(this);
        if (targetIndex >= 0) {
            parentItem.subItems.splice(targetIndex, 1);
            this.remove();
            if (parentItem.subItems.length === 0) {
                parentItem.isEmptyFold();
            }
        }
    }
    beforeAttached() {
        const _super = Object.create(null, {
            beforeAttached: { get: () => super.beforeAttached },
            addView: { get: () => super.addView }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.beforeAttached.call(this);
            _super.addView.call(this, __classPrivateFieldGet(this, _arrow));
            _super.addView.call(this, __classPrivateFieldGet(this, _icon));
            _super.addView.call(this, __classPrivateFieldGet(this, _title));
            _super.addView.call(this, __classPrivateFieldGet(this, _container));
        });
    }
    dropArrowStyle(isDropStyle) {
        if (isDropStyle) {
            __classPrivateFieldGet(this, _arrow).setRotate(0)
                .updateStyle();
        }
        else {
            __classPrivateFieldGet(this, _arrow).setRotate(-90)
                .updateStyle();
        }
    }
}
_arrow = new WeakMap(), _icon = new WeakMap(), _title = new WeakMap(), _container = new WeakMap(), __parentItem = new WeakMap(), __model = new WeakMap(), __isFolded = new WeakMap();
