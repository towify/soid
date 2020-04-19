/*
 * @author kaysaith
 * @date 2020/3/11 20:21
 */

import { ViewGroup } from "../base/view_group";
import { DisplayType, FlexFlowType, FlexWrap, Orientation, StyleTag } from "../value/style/style";
import { View } from "../base/view";
import { GlobalStyle } from "../value/style/global_style";

export class LinearLayout extends ViewGroup {

  constructor(readonly orientation?: Orientation) {
    super();
    this
      .setDisplay(DisplayType.Flex)
      .setFlexWrap(FlexWrap.NoWrap)
      .setOrientation(orientation ?? Orientation.Vertical);
    this.style.addRule(StyleTag.ScrollBehavior, "smooth");
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

  hideScrollbar() {
    const className = `linear-layout-${Math.random().toString(16).substr(2)}`;
    this.setClass(className);
    GlobalStyle
      .getInstance()
      .addTag(`.${className}::-webkit-scrollbar`, style => {
        style.addRule(StyleTag.Display, DisplayType.None);
      });
    return this;
  }

  private setFlexDirection(flowType: FlexFlowType) {
    this.style.addRule(StyleTag.FlexDirection, flowType);
    return this;
  }

  private setFlexWrap(value: FlexWrap) {
    this.style.addRule(StyleTag.FlexWrap, value);
    return this;
  }


  addView(view: View) {
    view.setFlex("0 0 auto");
    super.addView(view);
  }

}