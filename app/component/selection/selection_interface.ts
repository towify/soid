/*
 * @author kaysaith
 * @date 2020/3/24 15:01
 */

import { Color } from "../../value/color";
import { TextType } from "../text_view";

export interface SelectionInterface {
  setBackgroundColor(color: Color): this

  onClickOption(hold: (value: string) => void): this

  setListBackgroundColor(color: Color): this

  setOptionSelectedBackgroundColor(color: Color): this

  setSelectionTextType(type: TextType): this

  setOptionTextType(type: TextType): this

  setHorizontalPadding(value: number): this

  setOptionHeight(value: number): this

  setWidth(value: number): this

  setData(data: string[], defaultIndex?: number): this
}