/*
 * @author kaysaith
 * @date 2020/3/13 12:16
 */

import { Button } from "./button";
import { ImageMode, ImageView } from "../image_view";
import { Align, DisplayType, StyleTag } from "../../value/style";

export class IconButton extends Button {
  #icon = new ImageView();
  #isLeft = true;
  #iconSize: number;

  constructor() {
    super();
    this.#icon
      .setPointerEvent("none")
      .setFullParent();
    this.setDisplay(DisplayType.Grid);
    this.style.addRule(StyleTag.AlignItems, Align.Center);
    this.style.addRule(StyleTag.JustifyItems, Align.Center);
  }

  public setHeight(value: number): this {
    this.#iconSize = value;
    return super.setHeight(value);
  }

  public setMinHeight(minHeight: number): this {
    this.#iconSize = minHeight;
    return super.setMinHeight(minHeight);
  }

  public setGap(value: number) {
    this.style.addRule(StyleTag.ColumnGap, `${value}px`);
    return this;
  }

  public setIconSize(value: number) {
    this.#iconSize = value;
    this.#icon.setWidth(value).setHeight(value);
    return this;
  }

  public isRightIcon() {
    this.#icon.setOrder(1);
    this.#isLeft = false;
    return this;
  }

  public setImage(path: string) {
    this.#icon
      .setImage(path)
      .setMode(ImageMode.AspectFit);
    return this;
  }

  async _prepareLifeCycle(): Promise<void> {
    const templateValue = this.#isLeft ? `${this.#iconSize}px auto` : `auto ${this.#iconSize}px`;
    this.style.addRule(StyleTag.GridTemplateColumns, templateValue);
    await this.#icon._prepareLifeCycle();
    this._element.appendChild(this.#icon._element);
    super._prepareLifeCycle();
  }

}