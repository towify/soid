/*
 * @author kaysaith
 * @date 2020/3/23 00:25
 */

import { View } from "../base/view";
import easingsFunctions from "./easing_functions";
import { delay } from "../util/performance";
import { AnimationManagerInterface } from "./animation_manager_interface";

export class AnimationManager implements AnimationManagerInterface {
  #duration = 3000;
  #intervalDuration = 3000;
  #startValue: number;
  #endValue: number;
  #type: AnimationType;
  #easingFunction: (percent: number) => number = easingsFunctions.easeInOutCubic;

  constructor(public readonly holst: View) {}

  public setDuration(duration: number) {
    this.#duration = duration;
    return this;
  }

  public setAnimationType(type: AnimationType) {
    this.#type = type;
    return this;
  }

  public setAnimation(startValue: number, endValue: number) {
    this.#startValue = startValue;
    this.#endValue = endValue;
    return this;
  }

  public setIntervalDuration(timestamp: number) {
    this.#intervalDuration = timestamp;
    return this;
  }

  public setEasingFunction(action: (percent: number) => number) {
    this.#easingFunction = action;
    return this;
  }

  public run(callback?: () => void, immediately: boolean = true) {
    if (this.#type === undefined) {
      throw new Error("you have to set animation type first");
    }
    let stop = false;
    let start: number = null;
    let end: number = null;
    let animationFrame: number;
    let percent: number;
    let modulus: number;
    let moveValue: number;
    (async () => {
      const startAnim = (timeStamp: number) => {
        start = timeStamp;
        end = start + this.#duration;
        draw(timeStamp);
      };

      const draw = (now: number) => {
        if (stop) {
          !callback || callback();
          window.cancelAnimationFrame(animationFrame);
          return;
        }
        if (now - start >= this.#duration) stop = true;
        percent = (now - start) / this.#duration;
        modulus = this.#easingFunction(percent);
        moveValue = this.#startValue + (this.#endValue - this.#startValue) * modulus;
        switch (this.#type) {
          case AnimationType.TranslateX: {
            this.holst.setTranslate(moveValue, 0).updateStyle();
            break;
          }
          case AnimationType.TranslateY: {
            this.holst.setTranslate(0, moveValue).updateStyle();
            break;
          }
          case AnimationType.Opacity: {
            break;
          }
        }
        animationFrame = window.requestAnimationFrame(draw);
      };
      if (!immediately) {
        await delay(this.#intervalDuration);
      }
      window.requestAnimationFrame(startAnim);
      immediately = false;
    })();
    return this;
  }
}

export enum AnimationType {
  TranslateX,
  TranslateY,
  Opacity,
}