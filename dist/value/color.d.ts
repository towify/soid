export declare class Color {
    private readonly _value;
    static white: Color;
    static black: Color;
    static none: Color;
    private static names;
    constructor(_value: string | RGBA);
    get value(): string;
}
export declare class RGBA {
    private readonly red;
    private readonly green;
    private readonly blue;
    private readonly alpha;
    constructor(red: number, green: number, blue: number, alpha: number);
    get value(): string;
    static hexToRGBA(hex: string, opacity?: number): string;
    static hexToRGB(hex: string): number[];
}
