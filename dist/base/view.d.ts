import { Platform } from "../value/type";
import { Cursor, DisplayType, JustifyContent, Style, ViewPosition, WillChangeType } from "../value/style/style";
import { Color } from "../value/color";
export declare abstract class View {
    #private;
    private element?;
    protected style: Style;
    protected isDisplayNone?: boolean;
    readonly _element: HTMLDivElement;
    protected initialDisplayType?: DisplayType;
    protected hasAttached: boolean;
    protected constructor(element?: HTMLDivElement | undefined);
    setAttribute(qualifiedName: string, value: string): this;
    get cssText(): string;
    get isClickable(): boolean;
    set isClickable(status: boolean);
    set isEnable(status: boolean);
    get isEnable(): boolean;
    set isFocusable(status: boolean);
    get isFocusable(): boolean;
    resetStyle(style: Style): this;
    remove(): void;
    setOrder(value: number): this;
    setPointerEvent(value: string): this;
    onMouseover(action: (event: MouseEvent) => void): this;
    onMouseleave(action: (event: MouseEvent) => void): this;
    onClick(action: (event: MouseEvent) => void): this;
    serialize(platform: Platform): string;
    beforeAttached(): Promise<void>;
    onAttached(): Promise<void>;
    onShow(action?: () => void): this;
    onHide(action?: () => void): this;
    private clearEventListenerIfNeed;
    private recoveryEventListenerIfNeed;
    onDetached(): void;
    _prepareLifeCycle(): Promise<void>;
    updateStyle(): this;
    cloneCssText(): string;
    setCssText(cssText: string): this;
    setClass(className: string): this;
    setDisplay(type: DisplayType): this;
    setWidth(value: number): this;
    setHeight(value: number): this;
    setPercentWidth(value: number): this;
    setPercentHeight(value: number): this;
    setMinWidth(minWidth: number): this;
    setMaxWidth(maxWidth: number): this;
    setMinHeight(minHeight: number): this;
    setFullParent(): this;
    setFullScreen(): this;
    setHorizontalPadding(value: number): this;
    setVerticalPadding(value: number): this;
    setTopPadding(value: number): this;
    setBottomPadding(value: number): this;
    setLeftPadding(value: number): this;
    setRightPadding(value: number): this;
    setMargin(value: string): this;
    setMarginTop(value: number): this;
    setMarginTopAuto(): this;
    setMarginLeftAuto(): this;
    setMarginBottom(value: number): this;
    setMarginLeft(value: number): this;
    setMarginRight(value: number): this;
    setPosition(position: ViewPosition): this;
    setZIndex(value: number): this;
    setTop(value: number): this;
    setBottom(value: number): this;
    setRight(value: number): this;
    setLeft(value: number): this;
    setBackgroundColor(color: Color): this;
    setBackground(value: string): this;
    setOpacity(opacity: number): this;
    setWillChange(type: WillChangeType): this;
    setOverflow(value: string): this;
    setOverflowY(value: string): this;
    setOverflowX(value: string): this;
    setBoxSizing(value: string): this;
    setBorder(value: string): this;
    setRightBorder(value: string): this;
    setLeftBorder(value: string): this;
    setBottomBorder(value: string): this;
    setTopBorder(value: string): this;
    setRadius(radius: number): this;
    setShadow(value: string): this;
    setCursor(cursor: Cursor): this;
    setBackDropFilter(value: string): this;
    setRotate(angle: number): this;
    setTranslate(x: number, y: number): this;
    setScale(widthRatio: number, heightRatio: number): this;
    setScaleX(widthRatio: number): this;
    setScaleY(heightRatio: number): this;
    setSkewY(y: number): this;
    setSkewX(x: number): this;
    setSkew(x: number, y: number): this;
    setMatrix(a: number, b: number, c: number, d: number, e: number, f: number): this;
    setFlex(value: string): this;
    setGridArea(value: string): this;
    setJustifyContent(value: JustifyContent): this;
    setJustifyItem(value: JustifyContent): this;
    setAlignItem(value: JustifyContent): this;
    get width(): number | undefined;
    get height(): number | undefined;
    get paddingLeft(): number | undefined;
    get paddingRight(): number | undefined;
    get hasHorizontalPadding(): boolean;
    get displayType(): DisplayType | undefined;
}
