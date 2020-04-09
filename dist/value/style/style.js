/*
 * @author kaysaith
 * @date 2020/3/11 15:11
 */
import { Transform } from "../transform";
export class Style {
    constructor() {
        this.style = {};
        this.transform = new Transform();
        this.values = {};
    }
    getValue(tag, isNumber) {
        let result;
        result = this.style[tag];
        if (result && isNumber) {
            result = isNumber ? result.pickNumber() : result;
        }
        return result;
    }
    addRule(tag, value, record = true) {
        if (value.indexOf(";") > 0) {
            throw new Error("value contains invalid \";\" symbol");
        }
        this.style[tag] = value;
        !record || this.recordValue(tag);
        return this;
    }
    setStyle(view) {
        if (this.cssText) {
            view.setAttribute("style", this.cssText);
            this.cssText = undefined;
        }
        else {
            const cssText = this.generateCssText();
            if (cssText.length) {
                view.setAttribute("style", cssText);
            }
        }
        return this;
    }
    generateCssText() {
        let newCssText = "";
        if (this.transform.hasValue()) {
            this.addRule(StyleTag.Transform, this.transform.serialize());
        }
        Object.keys(this.style).forEach(key => !key || (newCssText += `${key}:${this.style[key]};`));
        return newCssText;
    }
    /**
     * @param tag Style Tag
     * get computed style affects all the recalculated values backed up in
     * memory. When used, it will not affect dom performance.
     */
    recordValue(tag) {
        switch (tag) {
            case StyleTag.Height:
            case StyleTag.Width: {
                this.values[tag] = this.getValue(tag, true);
                break;
            }
            case StyleTag.PaddingLeft:
            case StyleTag.PaddingRight: {
                this.values["hasHorizontalPadding"] = this.getValue(tag) !== undefined;
                if (tag === StyleTag.PaddingLeft) {
                    this.values["paddingLeft"] = this.getValue(tag, true);
                }
                else {
                    this.values["paddingRight"] = this.getValue(tag, true);
                }
                break;
            }
            case StyleTag.PaddingTop:
            case StyleTag.PaddingBottom: {
                this.values["hasVerticalPadding"] = this.getValue(tag) !== undefined;
                if (tag === StyleTag.PaddingTop) {
                    this.values["paddingTop"] = this.getValue(tag, true);
                }
                else {
                    this.values["paddingBottom"] = this.getValue(tag, true);
                }
                break;
            }
            case StyleTag.MarginLeft:
            case StyleTag.MarginRight: {
                this.values["hasHorizontalMargin"] = this.getValue(tag) !== undefined;
                if (tag === StyleTag.MarginLeft) {
                    this.values["marginLeft"] = this.getValue(tag, true);
                }
                else {
                    this.values["marginRight"] = this.getValue(tag, true);
                }
                break;
            }
            case StyleTag.MarginTop:
            case StyleTag.MarginBottom: {
                this.values["hasVerticalMargin"] = this.getValue(tag) !== undefined;
                if (tag === StyleTag.MarginTop) {
                    this.values["marginTop"] = this.getValue(tag, true);
                }
                else {
                    this.values["marginBottom"] = this.getValue(tag, true);
                }
                break;
            }
            case StyleTag.Top:
            case StyleTag.Bottom:
            case StyleTag.Left:
            case StyleTag.Right: {
                this.values[tag] = this.getValue(tag, true);
                break;
            }
            case StyleTag.MinHeight: {
                if (!this.values.height)
                    this.values["height"] = this.getValue(tag, true);
                this.values["minHeight"] = this.getValue(tag, true);
                break;
            }
            case StyleTag.MinWidth: {
                if (!this.values.width)
                    this.values["width"] = this.getValue(tag, true);
                this.values["minWidth"] = this.getValue(tag, true);
                break;
            }
        }
    }
}
var StyleTag;
(function (StyleTag) {
    StyleTag["Width"] = "width";
    StyleTag["MaxWidth"] = "max-width";
    StyleTag["MinWidth"] = "min-width";
    StyleTag["Height"] = "height";
    StyleTag["MinHeight"] = "min-height";
    StyleTag["Color"] = "color";
    StyleTag["BackgroundColor"] = "background-color";
    StyleTag["Background"] = "background";
    StyleTag["ClipPath"] = "clip-path";
    StyleTag["BackgroundClip"] = "background-clip";
    StyleTag["BackgroundImage"] = "background-image";
    StyleTag["Opacity"] = "opacity";
    StyleTag["Border"] = "border";
    StyleTag["BorderColor"] = "border-color";
    StyleTag["BorderLeftColor"] = "border-left-color";
    StyleTag["BorderRightColor"] = "border-right-color";
    StyleTag["BorderTopColor"] = "border-top-color";
    StyleTag["BorderBottomColor"] = "border-bottom-color";
    StyleTag["BorderTop"] = "border-top";
    StyleTag["BorderBottom"] = "border-bottom";
    StyleTag["BorderRight"] = "border-right";
    StyleTag["BorderLeft"] = "border-left";
    StyleTag["Outline"] = "outline";
    StyleTag["FontSize"] = "font-size";
    StyleTag["LineHeight"] = "line-height";
    StyleTag["FontStyle"] = "font-style";
    StyleTag["FontFamily"] = "font-family";
    StyleTag["BoxSizing"] = "box-sizing";
    StyleTag["Margin"] = "margin";
    StyleTag["MarginTop"] = "margin-top";
    StyleTag["MarginBottom"] = "margin-bottom";
    StyleTag["MarginLeft"] = "margin-left";
    StyleTag["MarginRight"] = "margin-right";
    StyleTag["PaddingTop"] = "padding-top";
    StyleTag["PaddingBottom"] = "padding-bottom";
    StyleTag["PaddingLeft"] = "padding-left";
    StyleTag["PaddingRight"] = "padding-right";
    StyleTag["WhiteSpace"] = "white-space";
    StyleTag["VerticalAlign"] = "vertical-align";
    StyleTag["BackgroundSize"] = "background-size";
    StyleTag["BackgroundRepeat"] = "background-repeat";
    StyleTag["BackgroundPosition"] = "background-position";
    StyleTag["BackgroundAttachment"] = "background-attachment";
    StyleTag["Filter"] = "filter";
    StyleTag["BackDropFilter"] = "backdrop-filter";
    StyleTag["TextDecoration"] = "text-decoration";
    StyleTag["TextAlign"] = "text-align";
    StyleTag["FontWeight"] = "font-weight";
    StyleTag["Transform"] = "transform";
    StyleTag["TransformOrigin"] = "transform-origin";
    StyleTag["Position"] = "position";
    StyleTag["WillChange"] = "will-change";
    StyleTag["Top"] = "top";
    StyleTag["Left"] = "left";
    StyleTag["Right"] = "right";
    StyleTag["Bottom"] = "bottom";
    StyleTag["BorderRadius"] = "border-radius";
    StyleTag["Display"] = "display";
    StyleTag["Visibility"] = "visibility";
    StyleTag["FlexFlow"] = "flex-flow";
    StyleTag["FlexDirection"] = "flex-direction";
    StyleTag["FlexWrap"] = "flex-wrap";
    StyleTag["Flex"] = "flex";
    StyleTag["Order"] = "order";
    StyleTag["GridTemplateColumns"] = "grid-template-columns";
    StyleTag["GridRowEnd"] = "grid-row-end";
    StyleTag["GridTemplateRows"] = "grid-template-rows";
    StyleTag["GridTemplateAreas"] = "grid-template-areas";
    StyleTag["GridArea"] = "grid-area";
    StyleTag["JustifyItems"] = "justify-items";
    StyleTag["JustifyContent"] = "justify-content";
    StyleTag["AlignItems"] = "align-items";
    StyleTag["AlignSelf"] = "align-self";
    StyleTag["GridColumn"] = "grid-column";
    StyleTag["ColumnGap"] = "column-gap";
    StyleTag["RowGap"] = "row-gap";
    StyleTag["GridAutoRows"] = "grid-auto-rows";
    StyleTag["Cursor"] = "cursor";
    StyleTag["Mask"] = "mask";
    StyleTag["WebkitMaskImage"] = "-webkit-mask-image";
    StyleTag["WebkitMaskSize"] = "-webkit-mask-size";
    StyleTag["WebkitMask"] = "-webkit-mask";
    StyleTag["WebkitMaskPosition"] = "-webkit-mask-position";
    StyleTag["BoxShadow"] = "box-shadow";
    StyleTag["CssFloat"] = "float";
    StyleTag["Overflow"] = "overflow";
    StyleTag["OverflowY"] = "overflow-y";
    StyleTag["OverflowX"] = "overflow-x";
    StyleTag["Transition"] = "transition";
    StyleTag["TextOverflow"] = "text-overflow";
    StyleTag["ZIndex"] = "z-index";
    StyleTag["PointerEvents"] = "pointer-events";
    StyleTag["AnimationDuration"] = "animation-duration";
    StyleTag["TransitionTimingFunction"] = "transition-timing-function";
    StyleTag["AnimationDelay"] = "animation-delay";
    StyleTag["AnimationIterationCount"] = "animation-iteration-count";
    StyleTag["AnimationName"] = "animation-name";
    StyleTag["ScrollBehavior"] = "scroll-behavior";
})(StyleTag || (StyleTag = {}));
var WillChangeType;
(function (WillChangeType) {
    WillChangeType["ScrollPosition"] = "scroll-position";
    WillChangeType["Transform"] = "transform";
    WillChangeType["Opacity"] = "opacity";
    WillChangeType["LeftTop"] = "left, top";
    WillChangeType["Contents"] = "contents";
})(WillChangeType || (WillChangeType = {}));
var ViewPosition;
(function (ViewPosition) {
    ViewPosition["Absolute"] = "absolute";
    ViewPosition["Relative"] = "relative";
    ViewPosition["Fixed"] = "fixed";
})(ViewPosition || (ViewPosition = {}));
var Direction;
(function (Direction) {
    Direction["Top"] = "top";
    Direction["Left"] = "left";
    Direction["Right"] = "right";
    Direction["Bottom"] = "bottom";
    Direction["Center"] = "center";
})(Direction || (Direction = {}));
var Orientation;
(function (Orientation) {
    Orientation["Horizontal"] = "horizontal";
    Orientation["Vertical"] = "vertical";
})(Orientation || (Orientation = {}));
var Cursor;
(function (Cursor) {
    Cursor["Pointer"] = "pointer";
    Cursor["Arrow"] = "arrow";
    Cursor["Grab"] = "grab";
    Cursor["Grabbing"] = "grabbing";
})(Cursor || (Cursor = {}));
var DisplayType;
(function (DisplayType) {
    DisplayType["None"] = "none";
    DisplayType["Block"] = "block";
    DisplayType["Flex"] = "flex";
    DisplayType["InlineBlock"] = "inline-block";
    DisplayType["InlineFlex"] = "inline-flex";
    DisplayType["Table"] = "table";
    DisplayType["TableCell"] = "table-cell";
    DisplayType["Grid"] = "grid";
    DisplayType["InlineGrid"] = "inline-grid";
    DisplayType["TableColumn"] = "table-column";
    DisplayType["Unset"] = "unset";
})(DisplayType || (DisplayType = {}));
var BackgroundRepeat;
(function (BackgroundRepeat) {
    BackgroundRepeat["Repeat"] = "repeat";
    BackgroundRepeat["RepeatX"] = "repeat-x";
    BackgroundRepeat["RepeatY"] = "repeat-y";
    BackgroundRepeat["None"] = "no-repeat";
    BackgroundRepeat["Round"] = "round";
    BackgroundRepeat["Space"] = "space";
})(BackgroundRepeat || (BackgroundRepeat = {}));
var Align;
(function (Align) {
    Align["Center"] = "center";
    Align["Start"] = "start";
    Align["Left"] = "left";
    Align["Right"] = "right";
    Align["BaseLine"] = "baseline";
    Align["End"] = "end";
})(Align || (Align = {}));
var FlexFlowType;
(function (FlexFlowType) {
    FlexFlowType["Column"] = "column";
    FlexFlowType["Row"] = "row";
})(FlexFlowType || (FlexFlowType = {}));
var FlexWrap;
(function (FlexWrap) {
    FlexWrap["NoWrap"] = "nowrap";
    FlexWrap["Wrap"] = "wrap";
    FlexWrap["WrapReverse"] = "wrap-reverse";
    FlexWrap["Initial"] = "initial";
    FlexWrap["Inherit"] = "inherit";
})(FlexWrap || (FlexWrap = {}));
var JustifyContent;
(function (JustifyContent) {
    JustifyContent["SpaceBetween"] = "space-between";
    JustifyContent["SpaceAround"] = "space-around";
    JustifyContent["Center"] = "center";
    JustifyContent["BaseLine"] = "baseline";
    JustifyContent["FlexStart"] = "flex-start";
    JustifyContent["FlexEnd"] = "flex-end";
})(JustifyContent || (JustifyContent = {}));
export { JustifyContent, FlexWrap, FlexFlowType, Align, BackgroundRepeat, WillChangeType, ViewPosition, Direction, Orientation, Cursor, DisplayType, StyleTag };
