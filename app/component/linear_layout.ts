/*
 * @author kaysaith
 * @date 2020/3/11 20:21
 */

import { ViewGroup } from "../base/view_group";
import { DisplayType, FlexFlowType, FlexWrap, Orientation, StyleTag } from "../value/style";
import { View } from "../base/view";

export class LinearLayout extends ViewGroup {

  constructor(private readonly orientation?: Orientation) {
    super();
    this
      .setDisplay(DisplayType.Flex)
      .setFlexWrap(FlexWrap.NoWrap)
      .setOrientation(orientation ?? Orientation.Vertical);
  }

  private setFlexDirection(flowType: FlexFlowType) {
    this.style.addRule(StyleTag.FlexDirection, flowType);
    return this;
  }

  private setFlexWrap(value: FlexWrap) {
    this.style.addRule(StyleTag.FlexWrap, value);
    return this;
  }

  public setOrientation(direction: Orientation) {
    if (direction === Orientation.Horizontal) {
      this
        .setOverflowY("hidden")
        .setOverflowX("scroll")
        .setFlexDirection(FlexFlowType.Row);
    } else {
      this
        .setOverflowY("scroll")
        .setOverflowX("hidden")
        .setFlexDirection(FlexFlowType.Column);
    }
    return this;
  }

  addView(view: View) {
    view.setFlex("0 0 auto");
    super.addView(view);
  }

}