import { AnimationType } from "./animation_manager";
export interface AnimationManagerInterface {
    setDuration(duration: number): this;
    setAnimation(startValue: number, endValue: number): this;
    setAnimationType(type: AnimationType): this;
    setIntervalDuration(timestamp: number): this;
    run(callback: () => void, immediately: boolean): this;
}
