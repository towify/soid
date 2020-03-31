import { RecyclerView } from "./recycler_view";
import { Orientation } from "../../value/style/style";
import { RecyclerViewHolder, RecyclerViewHolderModel } from "./recycler_view_holder";
import { IRecyclerViewAdapter } from "./recycler_view_interface";
export declare abstract class RecyclerViewAdapter implements IRecyclerViewAdapter {
    #private;
    private readonly context;
    private readonly initialData;
    readonly orientation: Orientation;
    protected data: any[];
    constructor(context: RecyclerView, initialData: any[], orientation?: Orientation);
    getViewByPosition<T extends RecyclerViewHolder>(position: number): T;
    recoveryItemPosition(): Promise<void>;
    getContentSize(): number;
    afterDatasetChanged(action: () => void): this;
    notifyDataChanged(): void;
    updateData(newData: any[]): this;
    abstract getViewHoldersTypeWithPositions(): RecyclerViewHolderModel[];
    abstract onBindViewHolder(viewHolder: RecyclerViewHolder, type: number, dataIndex?: number): void;
    _onVerticalScroll(offset: number, isScrollingToTop: boolean): void;
    /**
     * @description
     * `moreCount`  is used to mark whether an element that needs additional
     * display has been loaded
     */
    private onCreate;
    private handleMovedItem;
    private handleSpecialHolders;
    private handleFooterHolder;
    private calculateViewPositions;
    private getArea;
}
