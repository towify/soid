/*
 * @author kaysaith
 * @date 2020/4/10 18:46
 */

import { ViewGroup } from "../view_group";
import { Input, InputType } from "../../component/input/input";
import { Color } from "../../value/color";
import { DisplayType, JustifyContent, StyleTag } from "../../value/style/style";
import { IBaseBaseInputGroup } from "./base_input_group_interface";

export abstract class BaseInputGroup extends ViewGroup implements IBaseBaseInputGroup {
  protected readonly input: Input;

  protected constructor() {
    super();
    this
      .setDisplay(DisplayType.Grid)
      .setJustifyItem(JustifyContent.Center)
      .addStyleRule(StyleTag.GridTemplateColumns, "auto 40px");

    this.input = new Input()
      .setPercentWidth(100)
      .setLeftPadding(10)
      .setRightPadding(5)
      .removeClearButton()
      .setBackgroundColor(Color.none);
  }

  setInputType(type: InputType): this {
    this.input.setType(type);
    return this;
  }

  setInputBorder(borderWidth: number, color: Color) {
    this.input.addStyleRule(StyleTag.BoxShadow, `${borderWidth}px 0 0 ${color.value} inset, 0 ${borderWidth}px 0 ${color.value} inset, 0 -${borderWidth}px 0 ${color.value} inset`);
    return this;
  }

  setBackgroundColor(color: Color): this {
    this.input.setBackgroundColor(color);
    return this;
  }

  onFocus(action: () => void): this {
    this.input.onFocus(action);
    return this;
  }

  onChange(hold: (value: string) => void): this {
    this.input.onChange(hold);
    return this;
  }

  onBlur(action: (event: FocusEvent) => void): this {
    this.input.onBlur(action);
    return this;
  }

  setPlaceholder(value: string): this {
    this.input.setPlaceholder(value);
    return this;
  }

  setPlaceholderColor(color: Color): this {
    this.input.setPlaceholderColor(color);
    return this;
  }

  setInputTextSize(value: number): this {
    this.input.setTextSize(value);
    return this;
  }

  setInputTextColor(color: Color): this {
    this.input.setTextColor(color);
    return this;
  }

  async beforeAttached(): Promise<any> {
    this.addView(this.input);
    super.beforeAttached();
  }
}