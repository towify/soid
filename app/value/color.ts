/*
 * @author kaysaith
 * @date 2020/3/11 15:46
 */

export class Color {
  public static white = new Color("#FFFFFF");
  public static black = new Color("#000000");
  public static none = new Color("unset");
  private static names: { [key: string]: string } = {
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

  constructor(private readonly _value: string | RGBA) {}

  get value() {
    if (typeof this._value === "string") {
      return Color.names[this._value] ?? this._value;
    } else {
      return this._value.value;
    }
  }
}

export class RGBA {
  constructor(
    private readonly red: number,
    private readonly green: number,
    private readonly blue: number,
    private readonly alpha: number
  ) {

  }

  get value() {
    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
  }

  public static hexToRGBA(hex: string, opacity: number = 1) {
    const rgb = RGBA.hexToRGB(hex);
    rgb.push(opacity);
    return `rgba(rgb.join(","))`;
  }

  public static hexToRGB(hex: string): number[] {
    let color: any;
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