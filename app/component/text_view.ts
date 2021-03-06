/*
 * @author kaysaith
 * @date 2020/3/12 18:18
 */

import { View } from "../base/view";
import { Align, DisplayType, Style, StyleTag } from "../value/style/style";
import { Color } from "../value/color";

export class TextView extends View {
  readonly #span = document.createElement("span");
  readonly #spanStyle = new Style();
  #_textContent?: string;

  constructor() {
    super();
    this.setDisplay(DisplayType.Flex);
    this.style.addRule(StyleTag.AlignItems, "center");
    this.#spanStyle
      .addRule(StyleTag.PointerEvents, "none")
      .addRule(StyleTag.Display, DisplayType.InlineBlock)
      .addRule(StyleTag.Width, "100%");
  }

  get textContent() {
    return this.#_textContent;
  }

  public setTextSize(value: number) {
    this.#spanStyle.addRule(StyleTag.FontSize, `${value}px`);
    return this;
  }

  public setFont(font: string) {
    this.#spanStyle.addRule(StyleTag.FontFamily, font);
    return this;
  }

  public setTextDecoration(decoration: TextDecoration) {
    this.#spanStyle.addRule(StyleTag.TextDecoration, decoration);
    return this;
  }

  public setTextType(type: TextType) {
    this.#spanStyle.addRule(StyleTag.FontSize, type);
    return this;
  }

  public setTextWeight(weight: string) {
    this.#spanStyle.addRule(StyleTag.FontWeight, weight);
    return this;
  }

  public setTextColor(color: Color) {
    this.#spanStyle.addRule(StyleTag.Color, color.value);
    return this;
  }

  public setTextOverflow(type: TextOverflow) {
    this.#spanStyle.addRule(StyleTag.TextOverflow, type);
    return this;
  }

  public setOverflow(value: string): this {
    this.#spanStyle.addRule(StyleTag.Overflow, value);
    return super.setOverflow(value);
  }

  public setWhiteSpace(type: WhiteSpace) {
    this.#spanStyle.addRule(StyleTag.WhiteSpace, type);
    return this;
  }

  public setTextUnderLine() {
    this.#spanStyle.addRule(StyleTag.TextDecoration, "underline");
    return this;
  }

  public setLineHeight(value: number) {
    this.#spanStyle.addRule(StyleTag.LineHeight, `${value}px`);
    return this;
  }

  public setText(text: string, specificStyle?: { start: number, end: number, hold: (style: Style) => void }) {
    this.#_textContent = text;
    if (specificStyle) {
      const style = new Style();
      style.addRule(StyleTag.Display, DisplayType.InlineBlock);
      specificStyle.hold(style);
      this.#span.innerHTML = this.#_textContent?.substr(0, specificStyle.start) + `<span style=${style.generateCssText()}>${text.substr(specificStyle.start, specificStyle.end)}</span>`;
    } else {
      this.#span.textContent = this.#_textContent;
    }
    return this;
  }

  public setTextAlign(align: Align) {
    this.#spanStyle.addRule(StyleTag.TextAlign, align);
    return this;
  }

  public updateStyle(): this {
    this.#spanStyle.setStyle(this.#span);
    return super.updateStyle();
  }

  async _prepareLifeCycle() {
    this.#spanStyle.setStyle(this.#span);
    this._element.appendChild(this.#span);
    super._prepareLifeCycle();
  }
}

enum TextType {
  Inherit = "inherit",
  Large = "large",
  Larger = "larger",
  Medium = "medium",
  Small = "small",
  XXSmall = "xx-small",
  XXLarge = "xx-large",
  XSmall = "x-small",
  XLarge = "x-large"
}

enum TextDecoration {
  Underline = "underline",
  LineThrough = "line-through",
  Overline = "overline",
}

enum WhiteSpace {
  Nowrap = "nowrap",
  Pre = "pre",
}

enum TextOverflow {
  Ellipsis = "ellipsis",
  Clip = "clip",
}

export {
  TextType, TextDecoration, WhiteSpace, TextOverflow
};