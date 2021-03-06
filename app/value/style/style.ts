/*
 * @author kaysaith
 * @date 2020/3/11 15:11
 */

import { View } from "../../base/view";
import { Transform } from "../transform";
import { StyleInterface } from "./style_interface";

export class Style implements StyleInterface {
  public readonly style: { [key: string]: string } = {};
  public readonly transform = new Transform();
  public readonly values: { [key: string]: number | string | undefined | boolean } = {};
  public cssText: string | undefined;

  constructor() {}

  getValue(tag: StyleTag, isNumber?: boolean): string | number | undefined {
    let result: string | number | undefined;
    result = this.style[tag];
    if (result && isNumber) {
      result = isNumber ? result.pickNumber() : result;
    }
    return result;
  }

  addRule(tag: StyleTag, value: string, record: boolean = true) {
    if (value.indexOf(";") > 0) {
      throw new Error("value contains invalid \";\" symbol");
    }
    this.style[tag] = value;
    !record || this.recordValue(tag);
    return this;
  }

  public setStyle(view: View | HTMLElement) {
    if (this.cssText) {
      view.setAttribute("style", this.cssText);
      this.cssText = undefined;
    } else {
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
  private recordValue(tag: StyleTag) {
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
        } else {
          this.values["paddingRight"] = this.getValue(tag, true);
        }
        break;
      }
      case StyleTag.PaddingTop:
      case StyleTag.PaddingBottom: {
        this.values["hasVerticalPadding"] = this.getValue(tag) !== undefined;
        if (tag === StyleTag.PaddingTop) {
          this.values["paddingTop"] = this.getValue(tag, true);
        } else {
          this.values["paddingBottom"] = this.getValue(tag, true);
        }
        break;
      }
      case StyleTag.MarginLeft:
      case StyleTag.MarginRight: {
        this.values["hasHorizontalMargin"] = this.getValue(tag) !== undefined;
        if (tag === StyleTag.MarginLeft) {
          this.values["marginLeft"] = this.getValue(tag, true);
        } else {
          this.values["marginRight"] = this.getValue(tag, true);
        }
        break;
      }
      case StyleTag.MarginTop:
      case StyleTag.MarginBottom: {
        this.values["hasVerticalMargin"] = this.getValue(tag) !== undefined;
        if (tag === StyleTag.MarginTop) {
          this.values["marginTop"] = this.getValue(tag, true);
        } else {
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
        if (!this.values.height) this.values["height"] = this.getValue(tag, true);
        this.values["minHeight"] = this.getValue(tag, true);
        break;
      }
      case StyleTag.MinWidth: {
        if (!this.values.width) this.values["width"] = this.getValue(tag, true);
        this.values["minWidth"] = this.getValue(tag, true);
        break;
      }
    }
  }
}

enum StyleTag {
  Width = "width",
  MaxWidth = "max-width",
  MinWidth = "min-width",
  Height = "height",
  MinHeight = "min-height",
  Color = "color",
  BackgroundColor = "background-color",
  Background = "background",
  ClipPath = "clip-path",
  BackgroundClip = "background-clip",
  BackgroundImage = "background-image",
  Opacity = "opacity",
  Border = "border",
  BorderColor = "border-color",
  BorderLeftColor = "border-left-color",
  BorderRightColor = "border-right-color",
  BorderTopColor = "border-top-color",
  BorderBottomColor = "border-bottom-color",
  BorderTop = "border-top",
  BorderBottom = "border-bottom",
  BorderRight = "border-right",
  BorderLeft = "border-left",
  Outline = "outline",
  FontSize = "font-size",
  LineHeight = "line-height",
  FontStyle = "font-style",
  FontFamily = "font-family",
  BoxSizing = "box-sizing",
  Margin = "margin",
  MarginTop = "margin-top",
  MarginBottom = "margin-bottom",
  MarginLeft = "margin-left",
  MarginRight = "margin-right",
  PaddingTop = "padding-top",
  PaddingBottom = "padding-bottom",
  PaddingLeft = "padding-left",
  PaddingRight = "padding-right",
  WhiteSpace = "white-space",
  VerticalAlign = "vertical-align",
  BackgroundSize = "background-size",
  BackgroundRepeat = "background-repeat",
  BackgroundPosition = "background-position",
  BackgroundAttachment = "background-attachment",
  Filter = "filter",
  BackDropFilter = "backdrop-filter",
  TextDecoration = "text-decoration",
  TextAlign = "text-align",
  FontWeight = "font-weight",
  Transform = "transform",
  TransformOrigin = "transform-origin",
  Position = "position",
  WillChange = "will-change",
  Top = "top",
  Left = "left",
  Right = "right",
  Bottom = "bottom",
  BorderRadius = "border-radius",
  Display = "display",
  Visibility = "visibility",
  FlexFlow = "flex-flow",
  FlexDirection = "flex-direction",
  FlexWrap = "flex-wrap",
  Flex = "flex",
  Order = "order",
  GridTemplateColumns = "grid-template-columns",
  GridRowEnd = "grid-row-end",
  GridTemplateRows = "grid-template-rows",
  GridTemplateAreas = "grid-template-areas",
  GridArea = "grid-area",
  JustifyItems = "justify-items",
  JustifyContent = "justify-content",
  AlignItems = "align-items",
  AlignSelf = "align-self",
  GridColumn = "grid-column",
  ColumnGap = "column-gap",
  RowGap = "row-gap",
  GridAutoRows = "grid-auto-rows",
  Cursor = "cursor",
  Mask = "mask",
  WebkitMaskImage = "-webkit-mask-image",
  WebkitMaskSize = "-webkit-mask-size",
  WebkitMask = "-webkit-mask",
  WebkitMaskPosition = "-webkit-mask-position",
  BoxShadow = "box-shadow",
  CssFloat = "float",
  Overflow = "overflow",
  OverflowY = "overflow-y",
  OverflowX = "overflow-x",
  Transition = "transition",
  TextOverflow = "text-overflow",
  ZIndex = "z-index",
  PointerEvents = "pointer-events",
  AnimationDuration = "animation-duration",
  TransitionTimingFunction = "transition-timing-function",
  AnimationDelay = "animation-delay",
  AnimationIterationCount = "animation-iteration-count",
  AnimationName = "animation-name",
  ScrollBehavior = "scroll-behavior"
}

enum WillChangeType {
  ScrollPosition = "scroll-position",
  Transform = "transform",
  Opacity = "opacity",
  LeftTop = "left, top",
  Contents = "contents"
}

enum ViewPosition {
  Absolute = "absolute",
  Relative = "relative",
  Fixed = "fixed"
}

enum Direction {
  Top = "top",
  Left = "left",
  Right = "right",
  Bottom = "bottom",
  Center = "center"
}

enum Orientation {
  Horizontal = "horizontal",
  Vertical = "vertical"
}

enum Cursor {
  Pointer = "pointer",
  Arrow = "arrow",
  Grab = "grab",
  Grabbing = "grabbing"
}

enum DisplayType {
  None = "none",
  Block = "block",
  Flex = "flex",
  InlineBlock = "inline-block",
  InlineFlex = "inline-flex",
  Table = "table",
  TableCell = "table-cell",
  Grid = "grid",
  InlineGrid = "inline-grid",
  TableColumn = "table-column",
  Unset = "unset"
}

enum BackgroundRepeat {
  Repeat = "repeat",
  RepeatX = "repeat-x",
  RepeatY = "repeat-y",
  None = "no-repeat",
  Round = "round",
  Space = "space"
}

enum Align {
  Center = "center",
  Start = "start",
  Left = "left",
  Right = "right",
  BaseLine = "baseline",
  End = "end",
}

enum FlexFlowType {
  Column = "column",
  Row = "row"
}

enum FlexWrap {
  NoWrap = "nowrap",
  Wrap = "wrap",
  WrapReverse = "wrap-reverse",
  Initial = "initial",
  Inherit = "inherit"
}

enum JustifyContent {
  SpaceBetween = "space-between",
  SpaceAround = "space-around",
  Center = "center",
  BaseLine = "baseline",
  FlexStart = "flex-start",
  FlexEnd = "flex-end",
}

export {
  JustifyContent,
  FlexWrap,
  FlexFlowType,
  Align,
  BackgroundRepeat,
  WillChangeType,
  ViewPosition,
  Direction,
  Orientation,
  Cursor,
  DisplayType,
  StyleTag
};