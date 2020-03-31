import { View } from "../../base/view";
export interface ISwiper<Slider extends View> {
    setIntervalTime(timestamp: number): this;
    setItemType(slider: {
        new (): Slider;
    }): this;
    setEasingFunction(action: (percent: number) => number): this;
    setData<M>(models: M[], onBind: (slider: Slider, model: M) => void): void;
}
