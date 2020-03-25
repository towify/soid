/*
 * @author kaysaith
 * @date 2020/3/12 18:17
 */

import { TextType, TextView } from "../text_view";
import { Align, Cursor } from "../../value/style/style";

export class Button extends TextView {

  constructor() {
    super();
    this
      .setTextType(TextType.Inherit)
      .setCursor(Cursor.Pointer)
      .setOverflow("hidden")
      .setTextAlign(Align.Left)
      .setTextWeight("500")
      .setMinWidth(60);
  }

  async beforeAttached(): Promise<any> {
    super.beforeAttached();
    this.setMinHeight(30);
  }

  public setRadius(radius: number): this {
    if (!this.hasHorizontalPadding) {
      this.setLeftPadding(radius)
        .setRightPadding(radius);
    }
    return super.setRadius(radius);
  }
}
