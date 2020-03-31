/*
 * @author kaysaith
 * @date 2020/3/29 13:46
 */
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
var _tabType;
import { LinearLayout } from "../linear_layout";
import { JustifyContent, Orientation } from "../../value/style/style";
import { TabsType } from "./segment_container";
export class SegmentMenu extends LinearLayout {
    constructor(type) {
        super();
        this.type = type;
        _tabType.set(this, void 0);
        this.hideScrollbar();
        switch (this.type) {
            case TabsType.LeftScrollable: {
                this
                    .setOrientation(Orientation.Vertical)
                    .setFullParent();
                break;
            }
            case TabsType.TopScrollable:
            case TabsType.TopFixed: {
                this
                    .setOrientation(Orientation.Horizontal)
                    .setFullParent();
                if (this.type === TabsType.TopFixed) {
                    this
                        .setJustifyContent(JustifyContent.SpaceAround);
                }
                break;
            }
        }
    }
    setItemType(tab) {
        __classPrivateFieldSet(this, _tabType, tab);
        return this;
    }
    setData(models, onBind) {
        let item;
        models.forEach((model, index) => {
            item = new (__classPrivateFieldGet(this, _tabType))();
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
            this.addView(item);
        });
        return this;
    }
}
_tabType = new WeakMap();
