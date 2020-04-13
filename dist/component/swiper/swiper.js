/*
 * @author kaysaith
 * @date 2020/3/22 19:23
 */
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _sliderType, _intervalTime, _easingFunction;
import { RelativeLayout } from "../relative_layout";
import { AnimationManager, AnimationType } from "../../animation/animation_manager";
import { Color } from "../../value/color";
import easingsFunctions from "../../animation/easing_functions";
export class Swiper extends RelativeLayout {
    constructor() {
        super();
        _sliderType.set(this, void 0);
        _intervalTime.set(this, 3000);
        _easingFunction.set(this, void 0);
        this.setOverflow("hidden");
    }
    setItemType(slider) {
        __classPrivateFieldSet(this, _sliderType, slider);
        return this;
    }
    setIntervalTime(timestamp) {
        __classPrivateFieldSet(this, _intervalTime, timestamp);
        return this;
    }
    setEasingFunction(action) {
        __classPrivateFieldSet(this, _easingFunction, action);
        return this;
    }
    setData(models, onBind) {
        let slider;
        let animationManagers = [];
        models.forEach((model, index) => {
            slider = new (__classPrivateFieldGet(this, _sliderType))()
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
    handleSliderAnimation(managers) {
        let index = 0;
        let animation;
        let length = this.children.size;
        let isInitial = true;
        const sequence = () => {
            animation = managers[index]
                .setIntervalDuration(__classPrivateFieldGet(this, _intervalTime))
                .setAnimationType(AnimationType.TranslateX)
                .setEasingFunction(__classPrivateFieldGet(this, _easingFunction) || easingsFunctions.easeOutExpo);
            if (isInitial) {
                isInitial = false;
            }
            else {
                animation.setAnimation(-this.width, 0);
            }
            animation.run(() => {
                animation
                    .setAnimation(0, this.width)
                    .run();
                if (index === length - 1) {
                    index = 0;
                }
                else {
                    index += 1;
                }
                sequence();
            });
        };
        sequence();
    }
}
_sliderType = new WeakMap(), _intervalTime = new WeakMap(), _easingFunction = new WeakMap();
