import { View } from "../base/view";
export declare class ImageView extends View {
    #private;
    constructor();
    setImage(path: string): this;
    setMode(type: ImageMode): this;
    private getImageSize;
}
export declare enum ImageMode {
    ScaleToFill = "scaleToFill",
    AspectFit = "aspectFit",
    AspectFill = "aspectFill",
    WidthFix = "widthFx"
}
