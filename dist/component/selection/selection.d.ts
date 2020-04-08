import { TextView } from "../text_view";
import { RelativeLayout } from "../relative_layout";
import { Color } from "../../value/color";
import { SelectionInterface } from "./selection_interface";
export declare class Selection extends RelativeLayout implements SelectionInterface {
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
    setOptionTextColor(color: Color): this;
    setSelectionTextColor(color: Color): this;
    setTextSize(value: number): this;
    setRadius(radius: number): this;
    setGapBetweenSelectionAndOption(value: number): this;
    private prepareDataList;
    private switchDatalist;
    beforeAttached(): Promise<any>;
}
