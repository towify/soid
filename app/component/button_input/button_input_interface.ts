/*
 * @author kaysaith
 * @date 2020/4/10 18:40
 */

import { Color } from "../../value/color";

export interface ButtonInputInterface {
  setImage(path: string): this

  setIconBackgroundColor(color: Color): this

  onClickButton(action: () => void): this

  setRadius(radius: number): this

  setIconSize(value: number): this
}