import { ViewGroup } from "../base/view_group";
import { Orientation } from "../value/style/style";
import { View } from "../base/view";
export declare class LinearLayout extends ViewGroup {
    readonly orientation?: Orientation | undefined;
    constructor(orientation?: Orientation | undefined);
    setOrientation(direction: Orientation): this;
    hideScrollbar(): this;
    private setFlexDirection;
    private setFlexWrap;
    addView(view: View): void;
}
