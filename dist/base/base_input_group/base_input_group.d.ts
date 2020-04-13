import { ViewGroup } from "../view_group";
import { Input, InputType } from "../../component/input/input";
import { Color } from "../../value/color";
import { IBaseBaseInputGroup } from "./base_input_group_interface";
export declare abstract class BaseInputGroup extends ViewGroup implements IBaseBaseInputGroup {
    protected readonly input: Input;
    protected constructor();
    setInputType(type: InputType): this;
    setInputBorder(borderWidth: number, color: Color): this;
    setBackgroundColor(color: Color): this;
    onFocus(action: () => void): this;
    onChange(hold: (value: string) => void): this;
    onBlur(action: (event: FocusEvent) => void): this;
    setPlaceholder(value: string): this;
    setPlaceholderColor(color: Color): this;
    setInputTextSize(value: number): this;
    setInputTextColor(color: Color): this;
    beforeAttached(): Promise<any>;
}
