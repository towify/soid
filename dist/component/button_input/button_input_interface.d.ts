import { Color } from "../../value/color";
export interface ButtonInputInterface {
    setImage(path: string): this;
    setIconBackgroundColor(color: Color): this;
    onClickButton(action: () => void): this;
    setRadius(radius: number): this;
    setIconSize(value: number): this;
}
