import { View } from "../base/view";
import { AnimationManagerInterface } from "./animation_manager_interface";
export declare class AnimationManager implements AnimationManagerInterface {
    #private;
    readonly holst: View;
    constructor(holst: View);
    setDuration(duration: number): this;
    setAnimationType(type: AnimationType): this;
    setAnimation(startValue: number, endValue: number): this;
    setIntervalDuration(timestamp: number): this;
    setEasingFunction(action: (percent: number) => number): this;
    run(callback?: () => void, immediately?: boolean): this;
}
export declare enum AnimationType {
    TranslateX = 0,
    TranslateY = 1,
    Opacity = 2
}
