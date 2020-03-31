/*
 * @author kaysaith
 * @date 2020/3/23 00:25
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
var _duration, _intervalDuration, _startValue, _endValue, _type, _easingFunction;
import easingsFunctions from "./easing_functions";
import { delay } from "../util/performance";
export class AnimationManager {
    constructor(holst) {
        this.holst = holst;
        _duration.set(this, 3000);
        _intervalDuration.set(this, 3000);
        _startValue.set(this, void 0);
        _endValue.set(this, void 0);
        _type.set(this, void 0);
        _easingFunction.set(this, easingsFunctions.easeInOutCubic);
    }
    setDuration(duration) {
        __classPrivateFieldSet(this, _duration, duration);
        return this;
    }
    setAnimationType(type) {
        __classPrivateFieldSet(this, _type, type);
        return this;
    }
    setAnimation(startValue, endValue) {
        __classPrivateFieldSet(this, _startValue, startValue);
        __classPrivateFieldSet(this, _endValue, endValue);
        return this;
    }
    setIntervalDuration(timestamp) {
        __classPrivateFieldSet(this, _intervalDuration, timestamp);
        return this;
    }
    setEasingFunction(action) {
        __classPrivateFieldSet(this, _easingFunction, action);
        return this;
    }
    run(callback, immediately = true) {
        if (__classPrivateFieldGet(this, _type) === undefined) {
            throw new Error("you have to set animation type first");
        }
        let stop = false;
        let start = null;
        let end = null;
        let animationFrame;
        let percent;
        let modulus;
        let moveValue;
        (() => __awaiter(this, void 0, void 0, function* () {
            const startAnim = (timeStamp) => {
                start = timeStamp;
                end = start + __classPrivateFieldGet(this, _duration);
                draw(timeStamp);
            };
            const draw = (now) => {
                if (stop) {
                    !callback || callback();
                    window.cancelAnimationFrame(animationFrame);
                    return;
                }
                if (now - start >= __classPrivateFieldGet(this, _duration))
                    stop = true;
                percent = (now - start) / __classPrivateFieldGet(this, _duration);
                modulus = __classPrivateFieldGet(this, _easingFunction).call(this, percent);
                moveValue = __classPrivateFieldGet(this, _startValue) + (__classPrivateFieldGet(this, _endValue) - __classPrivateFieldGet(this, _startValue)) * modulus;
                switch (__classPrivateFieldGet(this, _type)) {
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
                yield delay(__classPrivateFieldGet(this, _intervalDuration));
            }
            window.requestAnimationFrame(startAnim);
            immediately = false;
        }))();
        return this;
    }
}
_duration = new WeakMap(), _intervalDuration = new WeakMap(), _startValue = new WeakMap(), _endValue = new WeakMap(), _type = new WeakMap(), _easingFunction = new WeakMap();
export var AnimationType;
(function (AnimationType) {
    AnimationType[AnimationType["TranslateX"] = 0] = "TranslateX";
    AnimationType[AnimationType["TranslateY"] = 1] = "TranslateY";
    AnimationType[AnimationType["Opacity"] = 2] = "Opacity";
})(AnimationType || (AnimationType = {}));
