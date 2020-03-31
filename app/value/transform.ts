/*
 * @author kaysaith
 * @date 2020/3/15 12:20
 */

export class Transform {
  #properties: { [key: string]: string } = {};

  constructor() {
  }

  public hasValue() {
    return Object.keys(this.#properties).length;
  }

  public addTranslate(x: number, y: number) {
    this.#properties.translate = `translate(${x}px, ${y}px)`;
    return this;
  }

  public addRotate(angle: number) {
    this.#properties.rotate = `rotate(${angle}deg)`;
    return this;
  }

  public addScale(widthRatio: number, heightRatio: number) {
    this.#properties.scale = `scale(${widthRatio}, ${heightRatio})`;
    return this;
  }

  public addScaleX(widthRatio: number) {
    this.#properties.scaleX = `scaleX(${widthRatio})`;
    return this;
  }

  public addScaleY(heightRatio: number) {
    this.#properties.scaleY = `scaleY(${heightRatio})`;
    return this;
  }

  public addSkewX(angle: number) {
    this.#properties.skewX = `skewX(${angle}deg)`;
    return this;
  }

  public addSkewY(angle: number) {
    this.#properties.skewY = `skewY(${angle}deg)`;
    return this;
  }

  public addSkew(x: number, y: number) {
    this.#properties.skew = `skew(${x}deg, ${y}deg)`;
    return this;
  }

  // https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix
  // https://www.jianshu.com/p/956d54376338
  public addMatrix(a: number, b: number, c: number, d: number, e: number, f: number) {
    this.#properties.matrix = `matrix(${a}, ${b}, ${c}, ${d}, ${e}, ${f})`;
    return this;
  }

  serialize() {
    return Object.keys(this.#properties).map(item => this.#properties[item]).join(" ");
  }
}