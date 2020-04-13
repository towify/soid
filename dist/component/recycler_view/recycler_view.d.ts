import { RecyclerViewAdapter } from "./recycler_view_adapter";
import { RelativeLayout } from "../relative_layout";
import { View } from "../../base/view";
import { ViewGroup } from "../../base/view_group";
import { IRecyclerView } from "./recycler_view_interface";
export declare abstract class RecyclerView extends ViewGroup implements IRecyclerView {
    #private;
    readonly contentView: RelativeLayout;
    protected constructor();
    onAttached(): Promise<any>;
    set adapter(adapter: RecyclerViewAdapter | undefined);
    get adapter(): RecyclerViewAdapter | undefined;
    scrollToStart(): void;
    setHeight(value: number): this;
    setWidth(value: number): this;
    addView(view: View): void;
    getSubviewByElement<T extends View>(element: HTMLDivElement): T | undefined;
    private onCreate;
    onReachedEnd(action: () => void): this;
    private didScroll;
    onDetached(): void;
}
