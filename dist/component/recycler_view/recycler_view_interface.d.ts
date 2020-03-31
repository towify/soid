import { RecyclerViewAdapter } from "./recycler_view_adapter";
import { RecyclerViewHolder } from "./recycler_view_holder";
export interface IRecyclerView {
    adapter: RecyclerViewAdapter;
    scrollToStart(): void;
    setHeight(value: number): this;
    setWidth(value: number): this;
    onReachedEnd(action: () => void): this;
}
export interface IRecyclerViewAdapter {
    recoveryItemPosition(): Promise<void>;
    getContentSize(): number;
    afterDatasetChanged(action: () => void): void;
    notifyDataChanged(): void;
    getViewHoldersTypeWithPositions(): void;
    onBindViewHolder(viewHolder: RecyclerViewHolder, type: number, dataIndex?: number): void;
    getViewByPosition<T extends RecyclerViewHolder>(position: number): T;
}
