/*
 * @author kaysaith
 * @date 2020/3/11 15:46
 */
export class Color {
    constructor(_value) {
        this._value = _value;
    }
    get value() {
        var _a;
        if (typeof this._value === "string") {
            return (_a = Color.names[this._value]) !== null && _a !== void 0 ? _a : this._value;
        }
        else {
            return this._value.value;
        }
    }
}
Color.white = new Color("#FFFFFF");
Color.black = new Color("#000000");
Color.none = new Color("unset");
Color.names = {
    black: "#000000",
    white: "#FFFFFF",
    red: "#FF0000",
    lime: "#00FF00",
    blue: "#0000FF",
    yellow: "#FFFF00",
    cyan: "#00FFFF",
    magenta: "#FF00FF",
    silver: "#C0C0C0",
    gray: "#808080",
    maroon: "#800000",
    olive: "#808000",
    green: "#008000",
    purple: "#800080",
    teal: "#008080",
    navy: "#000080"
};
export class RGBA {
    constructor(red, green, blue, alpha) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }
    get value() {
        return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
    }
    static hexToRGBA(hex, opacity = 1) {
        const rgb = RGBA.hexToRGB(hex);
        rgb.push(opacity);
        return `rgba(rgb.join(","))`;
    }
    static hexToRGB(hex) {
        let color;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            color = hex.substring(1).split("");
            if (color.length === 3) {
                color = [color[0], color[0], color[1], color[1], color[2], color[2]];
            }
            color = "0x" + color.join("");
            return [(color >> 16) & 255, (color >> 8) & 255, color & 255];
        }
        throw new Error("Bad Hex");
    }
}
