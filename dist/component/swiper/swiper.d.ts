import { RelativeLayout } from "../relative_layout";
import { View } from "../../base/view";
import { ISwiper } from "./swiper_interface";
export declare class Swiper<Slider extends View> extends RelativeLayout implements ISwiper<Slider> {
    #private;
    constructor();
    setItemType(slider: {
        new (): Slider;
    }): this;
    setIntervalTime(timestamp: number): this;
    setEasingFunction(action: (percent: number) => number): this;
    setData<M>(models: M[], onBind: (slider: Slider, model: M) => void): this;
    private handleSliderAnimation;
}
