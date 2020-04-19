import { RelativeLayout } from "../relative_layout";
import { TextType } from "../text_view";
import { Color } from "../../value/color";
import { ImageView } from "../image_view";
import { InputInterface } from "./input_interface";
export declare class Input extends RelativeLayout implements InputInterface {
    #private;
    constructor();
    get value(): string;
    removeClearButton(): this;
    setValue(value: string): this;
    setType(type: InputType): this;
    prepareToShow(): this;
    prepareToHide(): this;
    onFocus(action: () => void): this;
    onChange(hold: (value: string) => void): this;
    onBlur(action: (event: FocusEvent) => void): this;
    setTextSize(value: number): this;
    setTextColor(color: Color): this;
    setTextWeight(value: string): this;
    setTextType(type: TextType): this;
    setPlaceholder(value: string): this;
    setPlaceholderColor(color: Color): this;
    getClearButton(hold: (button: ImageView) => void): this;
    onDetached(): void;
    _prepareLifeCycle(): Promise<void>;
    private showClearButton;
}
export declare enum InputType {
    Password = "password",
    NewPassword = "new-password",
    Email = "email",
    File = "file",
    Number = "number",
    Search = "search",
    Tel = "tel",
    Text = "text",
    URL = "url"
}
