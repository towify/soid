/*
 * @author kaysaith
 * @date 2020/3/12 19:46
 */

import { ViewGroup } from "../base/view_group";
import { ViewPosition } from "../value/style";
import { View } from "../base/view";

export class RelativeLayout extends ViewGroup {
  constructor() {
    super();
    this.setPosition(ViewPosition.Relative);
  }

  addView(view: View) {
    view.setPosition(ViewPosition.Absolute);
    super.addView(view);
  }
}