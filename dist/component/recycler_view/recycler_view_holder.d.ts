import { ViewGroup } from "../../base/view_group";
export declare abstract class RecyclerViewHolder extends ViewGroup {
    protected constructor();
    get className(): string;
    abstract getSize(): {
        width?: number;
        height?: number;
    };
}
export declare class RecyclerViewHolderModel {
    holder: new () => RecyclerViewHolder;
    position: RecyclerViewHolderType | number;
    height: number;
    width: number;
    y: number;
    x: number;
    constructor(holder: new () => RecyclerViewHolder, position?: RecyclerViewHolderType | number, height?: number, width?: number, y?: number, x?: number);
}
export declare enum RecyclerViewHolderType {
    Header = 0,
    Default = -1,
    Footer = -2
}
export declare const SpecialViewHolderPosition: number[];
