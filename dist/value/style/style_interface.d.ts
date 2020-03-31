import { StyleTag } from "./style";
import { View } from "../../base/view";
export interface StyleInterface {
    getValue(tag: StyleTag, isNumber?: boolean): string | number | undefined;
    addRule(tag: StyleTag, value: string): this;
    setStyle(view: View | HTMLElement): this;
    generateCssText(): string;
}
