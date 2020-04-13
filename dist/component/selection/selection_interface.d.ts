import { Color } from "../../value/color";
import { TextView } from "../text_view";
import { Align } from "../../value/style/style";
export interface SelectionInterface {
    setBackgroundColor(color: Color): this;
    onClickOption(hold: (item: TextView) => void): this;
    setListBackgroundColor(color: Color): this;
    setOptionSelectedBackgroundColor(color: Color): this;
    setTextSize(value: number): this;
    setSelectionTextColor(color: Color): this;
    setOptionTextColor(color: Color): this;
    setGapBetweenSelectionAndOption(value: number): this;
    setHorizontalPadding(value: number): this;
    setOptionHeight(value: number): this;
    setWidth(value: number): this;
    setArrowColor(color: Color): this;
    setContentTextAlign(align: Align): this;
    setOptionBoardRadius(radius: number): this;
    setData(data: string[], defaultIndex: number, bindOption: (option: TextView) => void): Promise<void>;
}
