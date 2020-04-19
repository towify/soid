/*
 * @author kaysaith
 * @date 2020/3/15 12:20
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
var _properties;
export class Transform {
    constructor() {
        _properties.set(this, {});
    }
    clear() {
        __classPrivateFieldSet(this, _properties, {});
    }
    hasValue() {
        return Object.keys(__classPrivateFieldGet(this, _properties)).length;
    }
    addTranslate(x, y) {
        __classPrivateFieldGet(this, _properties).translate = `translate(${x}px, ${y}px)`;
        return this;
    }
    addTranslateValue(x, y) {
        __classPrivateFieldGet(this, _properties).translate = `translate(${x}, ${y})`;
        return this;
    }
    addRotate(angle) {
        __classPrivateFieldGet(this, _properties).rotate = `rotate(${angle}deg)`;
        return this;
    }
    addScale(widthRatio, heightRatio) {
        __classPrivateFieldGet(this, _properties).scale = `scale(${widthRatio}, ${heightRatio})`;
        return this;
    }
    addScaleX(widthRatio) {
        __classPrivateFieldGet(this, _properties).scaleX = `scaleX(${widthRatio})`;
        return this;
    }
    addScaleY(heightRatio) {
        __classPrivateFieldGet(this, _properties).scaleY = `scaleY(${heightRatio})`;
        return this;
    }
    addSkewX(angle) {
        __classPrivateFieldGet(this, _properties).skewX = `skewX(${angle}deg)`;
        return this;
    }
    addSkewY(angle) {
        __classPrivateFieldGet(this, _properties).skewY = `skewY(${angle}deg)`;
        return this;
    }
    addSkew(x, y) {
        __classPrivateFieldGet(this, _properties).skew = `skew(${x}deg, ${y}deg)`;
        return this;
    }
    // https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix
    // https://www.jianshu.com/p/956d54376338
    addMatrix(a, b, c, d, e, f) {
        __classPrivateFieldGet(this, _properties).matrix = `matrix(${a}, ${b}, ${c}, ${d}, ${e}, ${f})`;
        return this;
    }
    serialize() {
        return Object.keys(__classPrivateFieldGet(this, _properties)).map(item => __classPrivateFieldGet(this, _properties)[item]).join(" ");
    }
}
_properties = new WeakMap();
