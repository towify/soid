import { Button } from "./button";
export declare class IconButton extends Button {
    #private;
    constructor();
    setHeight(value: number): this;
    setMinHeight(minHeight: number): this;
    setGap(value: number): this;
    setIconSize(value: number): this;
    isRightIcon(): this;
    setImage(path: string): this;
    _prepareLifeCycle(): Promise<void>;
}
