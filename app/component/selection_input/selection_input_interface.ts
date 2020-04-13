/*
 * @author kaysaith
 * @date 2020/4/10 13:02
 */

import { Color } from "../../value/color";
import { TextView } from "../text_view";

export interface ISelectionInput {
  setSelectionOptionBoardGap(value: number): this

  setSelectionBackgroundColor(color: Color): this

  setOptionSelectedBackgroundColor(color: Color): this

  setPlaceholderColor(color: Color): this

  setSelectionData(data: string[], defaultIndex: number, bindOption: (option: TextView) => void): Promise<void>

  setSelectionFont(value: string): this

  setSelectionTextWeight(value: string): this

  setOptionTextColor(color: Color): this

  setSelectionTextColor(color: Color): this

  setArrowColor(color: Color): this

  setOptionHeight(value: number): this
}