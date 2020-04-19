/*
 * @author kaysaith
 * @date 2020/3/24 15:07
 */

import { InputType } from "./input";
import { Color } from "../../value/color";
import { TextType } from "../text_view";

export interface InputInterface {
  value: string

  removeClearButton(): this

  setValue(value: string): this

  setType(type: InputType): this

  onFocus(action: () => void): this

  onChange(hold: (value: string) => void): this

  onBlur(action: () => void): this

  setTextSize(value: number): this

  setTextColor(color: Color): this

  setTextWeight(value: string): this

  setTextType(type: TextType): this

  setPlaceholder(value: string): this

  setPlaceholderColor(color: Color): this

}