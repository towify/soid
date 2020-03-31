export declare class Transform {
    #private;
    constructor();
    hasValue(): number;
    addTranslate(x: number, y: number): this;
    addRotate(angle: number): this;
    addScale(widthRatio: number, heightRatio: number): this;
    addScaleX(widthRatio: number): this;
    addScaleY(heightRatio: number): this;
    addSkewX(angle: number): this;
    addSkewY(angle: number): this;
    addSkew(x: number, y: number): this;
    addMatrix(a: number, b: number, c: number, d: number, e: number, f: number): this;
    serialize(): string;
}
