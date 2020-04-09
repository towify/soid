import { TextView } from "../text_view";
import { Color } from "../../value/color";
import { SelectionInterface } from "./selection_interface";
import { ViewGroup } from "../../base/view_group";
export declare class Selection extends ViewGroup implements SelectionInterface {
    #private;
    private readonly isFixedOption;
    constructor(isFixedOption?: boolean);
    setBackgroundColor(color: Color): this;
    onClickOption(hold: (item: TextView) => void): this;
    setListBackgroundColor(color: Color): this;
    setOptionSelectedBackgroundColor(color: Color): this;
    setHorizontalPadding(value: number): this;
    setOptionHeight(value: number): this;
    setWidth(value: number): this;
    setData(data: string[], defaultIndex: number, bindOption?: (option: TextView) => void): Promise<void>;
    setArrowColor(color: Color): this;
    setOptionTextColor(color: Color): this;
    setSelectionTextColor(color: Color): this;
    setTextSize(value: number): this;
    setRadius(radius: number): this;
    setGapBetweenSelectionAndOption(value: number): this;
    private prepareDataList;
    private switchDatalist;
    beforeAttached(): Promise<any>;
}
