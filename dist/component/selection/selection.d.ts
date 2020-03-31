import { TextType } from "../text_view";
import { RelativeLayout } from "../relative_layout";
import { Color } from "../../value/color";
import { SelectionInterface } from "./selection_interface";
export declare class Selection extends RelativeLayout implements SelectionInterface {
    #private;
    constructor();
    setBackgroundColor(color: Color): this;
    onClickOption(hold: (value: string) => void): this;
    setListBackgroundColor(color: Color): this;
    setOptionSelectedBackgroundColor(color: Color): this;
    setSelectionTextType(type: TextType): this;
    setOptionTextType(type: TextType): this;
    setHorizontalPadding(value: number): this;
    setOptionHeight(value: number): this;
    setWidth(value: number): this;
    setData(data: string[], defaultIndex?: number): this;
    private switchDatalist;
    beforeAttached(): Promise<any>;
}
