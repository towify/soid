/*
 * @author kaysaith
 * @date 2020/3/12 18:39
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
var _imagePath;
import { View } from "../base/view";
import { StyleTag } from "../value/style/style";
export class ImageView extends View {
    constructor() {
        super();
        _imagePath.set(this, void 0);
    }
    setImage(path) {
        __classPrivateFieldSet(this, _imagePath, path);
        this.style.addRule(StyleTag.BackgroundImage, `url(${path})`);
        return this;
    }
    setMode(type) {
        switch (type) {
            case ImageMode.ScaleToFill: {
                this.style.addRule(StyleTag.BackgroundSize, "100% 100%");
                break;
            }
            case ImageMode.AspectFit: {
                this.style.addRule(StyleTag.BackgroundSize, "contain");
                this.style.addRule(StyleTag.BackgroundRepeat, "no-repeat");
                break;
            }
            case ImageMode.AspectFill: {
                this.getImageSize(__classPrivateFieldGet(this, _imagePath), (width, height) => {
                    if (width < height) {
                        const ratio = Math.round(height / width * 10000) / 100;
                        this.style.addRule(StyleTag.BackgroundSize, `100% ${ratio}%`);
                        this.updateStyle();
                    }
                    else {
                        const ratio = Math.round(width / height * 10000) / 100;
                        this.style.addRule(StyleTag.BackgroundSize, `${ratio}% 100% `);
                        this.updateStyle();
                    }
                });
                this.style.addRule(StyleTag.BackgroundRepeat, "no-repeat");
                break;
            }
            case ImageMode.WidthFix: {
                this.style.addRule(StyleTag.BackgroundSize, "cover");
                break;
            }
        }
        return this;
    }
    getImageSize(src, hold) {
        const image = new Image();
        image.src = src;
        image.onload = () => {
            hold(image.naturalWidth, image.naturalHeight);
            image.remove();
        };
    }
}
_imagePath = new WeakMap();
export var ImageMode;
(function (ImageMode) {
    ImageMode["ScaleToFill"] = "scaleToFill";
    ImageMode["AspectFit"] = "aspectFit";
    ImageMode["AspectFill"] = "aspectFill";
    ImageMode["WidthFix"] = "widthFx";
})(ImageMode || (ImageMode = {}));
