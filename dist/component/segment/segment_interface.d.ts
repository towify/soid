import { View } from "../../base/view";
import { SegmentModel } from "./segment_container";
export interface ISegment<Item extends View> {
    setData<M extends SegmentModel>(models: M[], onBind: (tab: Item, position: number) => void): this;
    setItemType(tab: {
        new (): Item;
    }): this;
    showPageByPosition(position: number): void;
}
