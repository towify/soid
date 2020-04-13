import { ButtonInputInterface } from "./button_input_interface";
import { Color } from "../../value/color";
import { BaseInputGroup } from "../../base/base_input_group/base_input_group";
export declare class ButtonInput extends BaseInputGroup implements ButtonInputInterface {
    #private;
    constructor();
    setIconSize(value: number): this;
    setImage(path: string): this;
    setIconBackgroundColor(color: Color): this;
    onClickButton(action: () => void): this;
    setRadius(radius: number): this;
    beforeAttached(): Promise<any>;
}
