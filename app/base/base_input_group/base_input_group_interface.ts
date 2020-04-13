/*
 * @author kaysaith
 * @date 2020/4/10 18:48
 */

import { Color } from "../../value/color";
import { InputType } from "../../component/input/input";

export interface IBaseBaseInputGroup {
  onChange(hold: (value: string) => void): this

  onBlur(action: () => void): this

  onFocus(action: () => void): this

  setInputTextColor(color: Color): this

  setInputBorder(borderWidth: number, color: Color): this

  setPlaceholder(value: string): this

  setInputType(type: InputType): this

  setBackgroundColor(color: Color): this

  setPlaceholder(value: string): this

  setInputTextSize(value: number): this
}