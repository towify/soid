import { Color } from "../../value/color";
import { TextView } from "../text_view";
import { BaseInputGroup } from "../../base/base_input_group/base_input_group";
import { ISelectionInput } from "./selection_input_interface";
export declare class SelectionInput extends BaseInputGroup implements ISelectionInput {
    #private;
    private readonly isFixedOption;
    constructor(isFixedOption?: boolean);
    setOptionHeight(value: number): this;
    setArrowColor(color: Color): this;
    setSelectionTextColor(color: Color): this;
    setOptionTextColor(color: Color): this;
    setSelectionTextWeight(value: string): this;
    setSelectionFont(value: string): this;
    setSelectionData(data: string[], defaultIndex: number, bindOption?: (option: TextView) => void): Promise<void>;
    setHeight(value: number): this;
    setRadius(radius: number): this;
    setSelectionOptionBoardGap(value: number): this;
    setSelectionBackgroundColor(color: Color): this;
    setOptionSelectedBackgroundColor(color: Color): this;
    beforeAttached(): Promise<any>;
}
