import { View } from "../../base/view";
import { Transform } from "../transform";
import { StyleInterface } from "./style_interface";
export declare class Style implements StyleInterface {
    readonly style: {
        [key: string]: string;
    };
    readonly transform: Transform;
    readonly values: {
        [key: string]: any;
    };
    cssText: string | undefined;
    constructor();
    getValue(tag: StyleTag, isNumber?: boolean): string | number | undefined;
    addRule(tag: StyleTag, value: string, record?: boolean): this;
    setStyle(view: View | HTMLElement): this;
    generateCssText(): string;
    /**
     * @param tag Style Tag
     * get computed style affects all the recalculated values backed up in
     * memory. When used, it will not affect dom performance.
     */
    private recordValue;
}
declare enum StyleTag {
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
declare enum WillChangeType {
    ScrollPosition = "scroll-position",
    Transform = "transform",
    Opacity = "opacity",
    LeftTop = "left, top",
    Contents = "contents"
}
declare enum ViewPosition {
    Absolute = "absolute",
    Relative = "relative",
    Fixed = "fixed"
}
declare enum Direction {
    Top = "top",
    Left = "left",
    Right = "right",
    Bottom = "bottom",
    Center = "center"
}
declare enum Orientation {
    Horizontal = "horizontal",
    Vertical = "vertical"
}
declare enum Cursor {
    Pointer = "pointer",
    Arrow = "arrow",
    Grab = "grab",
    Grabbing = "grabbing"
}
declare enum DisplayType {
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
declare enum BackgroundRepeat {
    Repeat = "repeat",
    RepeatX = "repeat-x",
    RepeatY = "repeat-y",
    None = "no-repeat",
    Round = "round",
    Space = "space"
}
declare enum Align {
    Center = "center",
    Start = "start",
    Left = "left",
    Right = "right",
    BaseLine = "baseline",
    End = "end"
}
declare enum FlexFlowType {
    Column = "column",
    Row = "row"
}
declare enum FlexWrap {
    NoWrap = "nowrap",
    Wrap = "wrap",
    WrapReverse = "wrap-reverse",
    Initial = "initial",
    Inherit = "inherit"
}
declare enum JustifyContent {
    SpaceBetween = "space-between",
    SpaceAround = "space-around",
    Center = "center",
    BaseLine = "baseline",
    FlexStart = "flex-start",
    FlexEnd = "flex-end"
}
export { JustifyContent, FlexWrap, FlexFlowType, Align, BackgroundRepeat, WillChangeType, ViewPosition, Direction, Orientation, Cursor, DisplayType, StyleTag };
