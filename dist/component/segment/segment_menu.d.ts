import { LinearLayout } from "../linear_layout";
import { TabsType } from "./segment_container";
import { View } from "../../base/view";
export declare class SegmentMenu<Item extends View> extends LinearLayout {
    #private;
    readonly type: TabsType;
    constructor(type: TabsType);
    setItemType(tab: {
        new (): Item;
    }): this;
    setData<T>(models: T[], onBind: (item: Item, position: number) => void): this;
}
