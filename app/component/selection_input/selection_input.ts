/*
 * @author kaysaith
 * @date 2020/4/10 12:25
 */

import { Align, DisplayType, StyleTag } from "../../value/style/style";
import { Selection } from "../selection/selection";
import { Color } from "../../value/color";
import { TextView } from "../text_view";
import { BaseInputGroup } from "../../base/base_input_group/base_input_group";
import { ISelectionInput } from "./selection_input_interface";

export class SelectionInput extends BaseInputGroup implements ISelectionInput {
  readonly #selection: Selection;

  constructor(private readonly isFixedOption: boolean = false) {
    super();
    this
      .setDisplay(DisplayType.Grid)
      .addStyleRule(StyleTag.GridTemplateColumns, "auto 40px");

    this.#selection = new Selection(isFixedOption)
      .setContentTextAlign(Align.Center)
      .setHorizontalPadding(5)
      .setWidth(40)
      .setOptionHeight(20)
      .setTextSize(9)
      .setListBackgroundColor(Color.white);
  }

  setOptionHeight(value: number): this {
    this.#selection.setOptionHeight(value);
    return this;
  }

  setArrowColor(color: Color): this {
    this.#selection.setArrowColor(color);
    return this;
  }

  setSelectionTextColor(color: Color): this {
    this.#selection.setSelectionTextColor(color);
    return this;
  }

  setOptionTextColor(color: Color): this {
    this.#selection.setOptionTextColor(color);
    return this;
  }

  setSelectionTextWeight(value: string): this {
    this.#selection.setTextWeight(value);
    return this;
  }

  setSelectionFont(value: string): this {
    this.#selection.setFont(value);
    return this;
  }

  setSelectionData(data: string[], defaultIndex: number, bindOption?: (option: TextView) => void) {
    return this.#selection.setData(data, defaultIndex, bindOption);
  }

  setHeight(value: number): this {
    this.#selection.setHeight(value);
    return super.setHeight(value);
  }

  setRadius(radius: number): this {
    this.#selection.setOptionBoardRadius(radius);
    this.#selection.addStyleRule(StyleTag.BorderRadius, `0 ${radius}px ${radius}px 0`);
    this.input.addStyleRule(StyleTag.BorderRadius, `${radius}px 0 0 ${radius}px`);
    return super.setRadius(radius);
  }

  setSelectionOptionBoardGap(value: number) {
    this.#selection.setGapBetweenSelectionAndOption(value);
    return this;
  }

  setSelectionBackgroundColor(color: Color) {
    this.#selection.setBackgroundColor(color);
    return this;
  }

  setOptionSelectedBackgroundColor(color: Color) {
    this.#selection.setOptionSelectedBackgroundColor(color);
    return this;
  }

  async beforeAttached(): Promise<any> {
    super.beforeAttached();
    this.addView(this.#selection);
  }

}