/*
 * @author kaysaith
 * @date 2020/3/22 19:23
 */

import { RelativeLayout } from "../relative_layout";
import { View } from "../../base/view";
import { ISwiper } from "./swiper_interface";
import { AnimationManager, AnimationType } from "../../animation/animation_manager";
import { Color } from "../../value/color";

export class Swiper<Slider extends View> extends RelativeLayout implements ISwiper<Slider> {

  #sliderType: { new(): Slider };
  #intervalTime = 3000;

  constructor() {
    super();
    this.setOverflow("hidden");
  }

  public setItemType(slider: { new(): Slider }) {
    this.#sliderType = slider;
    return this;
  }

  public setIntervalTime(timestamp: number) {
    this.#intervalTime = timestamp;
    return this;
  }

  public setData<M>(models: M[], onBind: (slider: Slider, model: M) => void) {
    let slider: Slider;
    let animationManagers: AnimationManager[] = [];
    models.forEach((model, index) => {
      slider = new this.#sliderType()
        .setFullParent()
        .setTranslate(index === 0 ? 0 : -this.width, 0)
        .setBackgroundColor(new Color("olive"));
      onBind(slider, model);
      this.addView(slider);
      animationManagers.push(new AnimationManager(slider));
    });
    this.handleSliderAnimation(animationManagers);
    return this;
  }

  private handleSliderAnimation(managers: AnimationManager[]) {
    let index = 0;
    let animation: AnimationManager;
    let length = this.subviews.length;
    let isInitial = true;
    const sequence = () => {
      animation = managers[index]
        .setIntervalDuration(this.#intervalTime)
        .setAnimationType(AnimationType.TranslateX);
      if (isInitial) {
        isInitial = false;
      } else {
        animation.setAnimation(-this.width, 0);
      }
      animation.run(() => {
        animation
          .setAnimation(0, this.width)
          .run();
        if (index === length - 1) {
          index = 0;
        } else {
          index += 1;
        }
        sequence();
      });
    };
    sequence();
  }
}