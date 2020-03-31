import { View } from "../base/view";
import { Align, Style } from "../value/style/style";
import { Color } from "../value/color";
export declare class TextView extends View {
    #private;
    constructor();
    get textContent(): string | undefined;
    setTextSize(value: number): this;
    setFont(font: string): this;
    setTextDecoration(decoration: TextDecoration): this;
    setTextType(type: TextType): this;
    setTextWeight(weight: string): this;
    setTextColor(color: Color): this;
    setTextOverflow(type: TextOverflow): this;
    setOverflow(value: string): this;
    setWhiteSpace(type: WhiteSpace): this;
    setTextUnderLine(): this;
    setLineHeight(value: number): this;
    setText(text: string, specificStyle?: {
        start: number;
        end: number;
        hold: (style: Style) => void;
    }): this;
    setTextAlign(align: Align): this;
    updateStyle(): this;
    _prepareLifeCycle(): Promise<void>;
}
declare enum TextType {
    Inherit = "inherit",
    Large = "large",
    Larger = "larger",
    Medium = "medium",
    Small = "small",
    XXSmall = "xx-small",
    XXLarge = "xx-large",
    XSmall = "x-small",
    XLarge = "x-large"
}
declare enum TextDecoration {
    Underline = "underline",
    LineThrough = "line-through",
    Overline = "overline"
}
declare enum WhiteSpace {
    Nowrap = "nowrap",
    Pre = "pre"
}
declare enum TextOverflow {
    Ellipsis = "ellipsis",
    Clip = "clip"
}
export { TextType, TextDecoration, WhiteSpace, TextOverflow };
