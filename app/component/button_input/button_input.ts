/*
 * @author kaysaith
 * @date 2020/4/10 18:39
 */

import { ButtonInputInterface } from "./button_input_interface";
import { Color } from "../../value/color";
import { ImageMode, ImageView } from "../image_view";
import { BaseInputGroup } from "../../base/base_input_group/base_input_group";
import { ViewGroup } from "../../base/view_group";
import { Cursor, DisplayType, JustifyContent, StyleTag } from "../../value/style/style";

export class ButtonInput extends BaseInputGroup implements ButtonInputInterface {
  readonly #iconButton: ImageView;
  readonly #imageContainer: ViewGroup;
  #clickEvent?: () => void;

  constructor() {
    super();

    this.#imageContainer = new ViewGroup()
      .setDisplay(DisplayType.Flex)
      .setJustifyContent(JustifyContent.Center)
      .setAlignItem(JustifyContent.Center)
      .setFullParent()
      .onClick(_ => !this.#clickEvent || this.#clickEvent());

    this.#iconButton = new ImageView()
      .setPointerEvent("none")
      .setWidth(14)
      .setHeight(14)
      .setMode(ImageMode.AspectFit);
  }

  setIconSize(value: number): this {
    this.#iconButton
      .setWidth(value)
      .setHeight(value);
    return this;
  }

  setImage(path: string): this {
    this.#iconButton.setImage(path);
    return this;
  }

  setIconBackgroundColor(color: Color) {
    this.#imageContainer.setBackgroundColor(color);
    return this;
  }

  onClickButton(action: () => void): this {
    this.#imageContainer.setCursor(Cursor.Pointer);
    this.#clickEvent = action;
    return this;
  }

  setRadius(radius: number): this {
    this.#imageContainer.addStyleRule(StyleTag.BorderRadius, `0 ${radius}px ${radius}px 0`);
    this.input.addStyleRule(StyleTag.BorderRadius, `${radius}px 0 0 ${radius}px`);
    return super.setRadius(radius);
  }

  async beforeAttached(): Promise<any> {
    super.beforeAttached();
    this.#imageContainer.addView(this.#iconButton);
    this.addView(this.#imageContainer);
  }
}