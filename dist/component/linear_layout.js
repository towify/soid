/*
 * @author kaysaith
 * @date 2020/3/11 20:21
 */
import { ViewGroup } from "../base/view_group";
import { DisplayType, FlexFlowType, FlexWrap, Orientation, StyleTag } from "../value/style/style";
import { GlobalStyle } from "../value/style/global_style";
export class LinearLayout extends ViewGroup {
    constructor(orientation) {
        super();
        this.orientation = orientation;
        this
            .setDisplay(DisplayType.Flex)
            .setFlexWrap(FlexWrap.NoWrap)
            .setOrientation(orientation !== null && orientation !== void 0 ? orientation : Orientation.Vertical);
        this.style.addRule(StyleTag.ScrollBehavior, "smooth");
    }
    setOrientation(direction) {
        if (direction === Orientation.Horizontal) {
            this
                .setOverflowY("hidden")
                .setOverflowX("scroll")
                .setFlexDirection(FlexFlowType.Row);
        }
        else {
            this
                .setOverflowY("scroll")
                .setOverflowX("hidden")
                .setFlexDirection(FlexFlowType.Column);
        }
        return this;
    }
    hideScrollbar() {
        const className = `linear-layout-${new Date().getTime()}`;
        this._element.classList.add(className);
        GlobalStyle
            .getInstance()
            .addTag(`.${className}::-webkit-scrollbar`, style => {
            style.addRule(StyleTag.Display, DisplayType.None);
        });
        return this;
    }
    setFlexDirection(flowType) {
        this.style.addRule(StyleTag.FlexDirection, flowType);
        return this;
    }
    setFlexWrap(value) {
        this.style.addRule(StyleTag.FlexWrap, value);
        return this;
    }
    addView(view) {
        view.setFlex("0 0 auto");
        super.addView(view);
    }
}
