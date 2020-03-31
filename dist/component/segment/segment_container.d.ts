import { View } from "../../base/view";
import { ISegment } from "./segment_interface";
import { ViewGroup } from "../../base/view_group";
import { Color } from "../../value/color";
export declare class SegmentContainer<Item extends View> extends ViewGroup implements ISegment<Item> {
    #private;
    readonly type: TabsType;
    readonly subviews: View[];
    constructor(type: TabsType);
    setItemType(tab: {
        new (): Item;
    }): this;
    setItemContainerBackgroundColor(color: Color): this;
    setItemContainerSize(value: number): this;
    setData<M extends SegmentModel>(models: M[], onBind: (item: Item, position: number) => void): this;
    showPageByPosition(position: number): void;
    beforeAttached(): Promise<any>;
}
export declare abstract class SegmentModel {
    readonly page: {
        new (): View;
    };
    protected constructor(page: {
        new (): View;
    });
}
export declare enum TabsType {
    TopFixed = 0,
    TopScrollable = 1,
    LeftScrollable = 2
}
