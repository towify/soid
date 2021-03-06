/*
 * @author kaysaith
 * @date 2020/3/11 00:01
 */

import { ListenerType, Platform } from "../value/type";
import {
  Cursor,
  DisplayType,
  JustifyContent,
  Style,
  StyleTag,
  ViewPosition,
  WillChangeType
} from "../value/style/style";
import { Color } from "../value/color";

export abstract class View {
  protected style = new Style();
  public isDisplayNone?: boolean;
  readonly _element: HTMLDivElement;
  protected initialDisplayType?: DisplayType;
  #_isEnable = true;
  #_isClickable = true;
  #_isFocusable = true;
  #_clickEvent?: (event: MouseEvent) => void;
  #_mouseoverEvent?: (event: MouseEvent) => void;
  #_mouseleaveEvent?: (event: MouseEvent) => void;
  #_mousedownEvent?: (event: MouseEvent) => void;
  #_mouseupEvent?: (event: MouseEvent) => void;
  #_onHide?: () => void;
  #_onShow?: () => void;
  #_onAttachedEvent?: () => void;
  #_onInjectedToParent?: () => void;

  protected constructor(private element?: HTMLDivElement) {
    if (this.element) {
      this._element = this.element;
    } else {
      this._element = document.createElement("div");
    }
    // default style without outline
    this.style
      .addRule(StyleTag.Outline, "none")
      .addRule(StyleTag.BoxSizing, "border-box");
  }

  public addStyleRule(tag: StyleTag, value: string) {
    this.style.addRule(tag, value);
    return this;
  }

  // Property Methods
  public setDataset(key: string, value: string) {
    this._element.dataset[key] = value;
    return this;
  }

  public setID(id: string) {
    this._element.id = id;
    return this;
  }

  public get id(): string | undefined {
    return this._element.id;
  }

  public setAttribute(qualifiedName: string, value: string) {
    this._element.setAttribute(qualifiedName, value);
    return this;
  }

  get cssText() {
    return this._element.style.cssText;
  }

  get isClickable() {
    return this.#_isClickable;
  }

  set isClickable(status: boolean) {
    this.setPointerEvent(status ? "auto" : "none");
    this.#_isClickable = status;
  }

  set isEnable(status: boolean) {
    this.#_isEnable = status;
  }

  get isEnable() {
    return this.#_isEnable;
  }

  set isFocusable(status: boolean) {
    this.#_isFocusable = status;
  }

  get isFocusable() {
    return this.#_isFocusable;
  }

  public resetStyle(style: Style) {
    this.style = style;
    return this;
  }

  // Dom Node Methods
  public remove() {
    this.clearEventListenerIfNeed();
    this._element.remove();
    this.onDetached();
  }

  public setOrder(value: number) {
    this.style.addRule(StyleTag.Order, `${value}`);
    return this;
  }

  // Behavior Operation Methods
  public setPointerEvent(value: string) {
    this.style.addRule(StyleTag.PointerEvents, value);
    return this;
  }

  public onMouseover(action: (event: MouseEvent) => void) {
    if (!this.#_mouseoverEvent && this.isEnable && this.isFocusable) {
      this.#_mouseoverEvent = (event) => {
        if (!this.isEnable || !this.isFocusable) return;
        action(event);
        event.stopPropagation();
      };
      this._element.addEventListener(ListenerType.Mouseover, this.#_mouseoverEvent);
    }
    return this;
  }

  public onMouseleave(action: (event: MouseEvent) => void) {
    if (!this.#_mouseleaveEvent && this.isEnable && this.isFocusable) {
      this.#_mouseleaveEvent = (event) => {
        if (!this.isEnable || !this.isFocusable) return;
        action(event);
        event.stopPropagation();
      };
      this._element.addEventListener(ListenerType.Mouseleave, this.#_mouseleaveEvent);
    }
    return this;
  }

  public onMousedown(action: (event: MouseEvent) => void) {
    if (!this.#_mousedownEvent && this.isEnable && this.isFocusable) {
      this.#_mousedownEvent = (event) => {
        if (!this.isEnable || !this.isFocusable) return;
        action(event);
        event.stopPropagation();
      };
      this._element.addEventListener(ListenerType.Mousedown, this.#_mousedownEvent);
    }
    return this;
  }

  public onMouseup(action: (event: MouseEvent) => void) {
    if (!this.#_mouseupEvent && this.isEnable && this.isFocusable) {
      this.#_mouseupEvent = (event) => {
        if (!this.isEnable || !this.isFocusable) return;
        action(event);
        event.stopPropagation();
      };
      this._element.addEventListener(ListenerType.Mouseup, this.#_mouseupEvent);
    }
    return this;
  }

  public onClick(action: (event: MouseEvent) => void) {
    if (!this.#_clickEvent && this.isEnable && this.isClickable) {
      this.#_clickEvent = (event) => {
        if (!this.isEnable || !this.isClickable) return;
        action(event);
        event.stopPropagation();
      };
      this._element.addEventListener(ListenerType.Click, this.#_clickEvent);
    }
    return this;
  }

  // Cross Platform Methods
  public serialize(platform: Platform) {
    // convert the code to target platform version
    return "";
  }

  // Life Cycle
  public async beforeAttached() {}

  public async onAttached() {
    !this.#_onAttachedEvent || this.#_onAttachedEvent();
  }

  public setOnAttachedEvent(action: () => void) {
    this.#_onAttachedEvent = action;
    return this;
  }

  public onShow(action: () => void) {
    this.#_onShow = action;
    return this;
  }

  public onHide(action: () => void) {
    this.#_onHide = action;
    return this;
  }

  public prepareToShow() {
    this.recoveryEventListenerIfNeed();
    !this.#_onShow || this.#_onShow();
  }

  public prepareToHide() {
    this.clearEventListenerIfNeed();
    !this.#_onHide || this.#_onHide();
  }

  private clearEventListenerIfNeed() {
    !this.#_clickEvent || this._element.removeEventListener(ListenerType.Click, this.#_clickEvent);
    !this.#_mouseoverEvent || this._element.removeEventListener(ListenerType.Mouseover, this.#_mouseoverEvent);
    !this.#_mouseleaveEvent || this._element.removeEventListener(ListenerType.Mouseleave, this.#_mouseleaveEvent);
    !this.#_mousedownEvent || this._element.removeEventListener(ListenerType.Mousedown, this.#_mousedownEvent);
    !this.#_mouseupEvent || this._element.removeEventListener(ListenerType.Mouseup, this.#_mouseupEvent);
  }

  private recoveryEventListenerIfNeed() {
    !this.#_clickEvent || this._element.addEventListener(ListenerType.Click, this.#_clickEvent);
    !this.#_mouseoverEvent || this._element.addEventListener(ListenerType.Mouseover, this.#_mouseoverEvent);
    !this.#_mouseleaveEvent || this._element.addEventListener(ListenerType.Mouseleave, this.#_mouseleaveEvent);
    !this.#_mousedownEvent || this._element.addEventListener(ListenerType.Mousedown, this.#_mousedownEvent);
    !this.#_mouseupEvent || this._element.addEventListener(ListenerType.Mouseup, this.#_mouseupEvent);
  }

  public onDetached() {}

  async _prepareLifeCycle() {
    this.style.setStyle(this);
    await this.beforeAttached();
  }

  // Interface Settings Methods
  public updateStyle(): this {
    this.style.setStyle(this);
    return this;
  }

  public cloneCssText(): string {
    return this.style.generateCssText();
  }

  public setCssText(cssText: string) {
    this.style.cssText = cssText;
    return this;
  }

  public setClass(className: string) {
    this._element.classList.add(className);
    return this;
  }

  public setDisplay(type: DisplayType) {
    if (!this.initialDisplayType) {
      this.initialDisplayType = type;
    }
    if (type === DisplayType.None) {
      if (this.isDisplayNone !== undefined) this.prepareToHide();
      this.isDisplayNone = true;
    } else {
      if (this.isDisplayNone) {
        this.prepareToShow();
        this.isDisplayNone = false;
      }
    }
    this.style.addRule(StyleTag.Display, type);
    return this;
  }

  public setWidth(value: number): this {
    this.style.addRule(StyleTag.Width, `${value}px`);
    return this;
  }

  public setHeight(value: number): this {
    this.style.addRule(StyleTag.Height, `${value}px`);
    return this;
  }

  public setPercentWidth(value: number): this {
    this.style.addRule(StyleTag.Width, `${value}%`, false);
    return this;
  }

  public setPercentHeight(value: number): this {
    this.style.addRule(StyleTag.Height, `${value}%`, false);
    return this;
  }

  public setMinWidth(minWidth: number) {
    this.style.addRule(StyleTag.MinWidth, `${minWidth}px`);
    return this;
  }

  public setMaxWidth(maxWidth: number) {
    this.style.addRule(StyleTag.MaxWidth, `${maxWidth}px`);
    return this;
  }

  public setMinHeight(minHeight: number) {
    this.style.addRule(StyleTag.MinHeight, `${minHeight}px`);
    return this;
  }

  public setFullParent() {
    this.style
      .addRule(StyleTag.Width, "100%")
      .addRule(StyleTag.Height, "100%");
    return this;
  }

  public setFullScreen() {
    this.style
      .addRule(StyleTag.Width, "100vw")
      .addRule(StyleTag.Height, "100vh");
    return this;
  }

  public setHorizontalPadding(value: number) {
    this.style
      .addRule(StyleTag.PaddingLeft, `${value}px`)
      .addRule(StyleTag.PaddingRight, `${value}px`);
    return this;
  }

  public setVerticalPadding(value: number) {
    this.style
      .addRule(StyleTag.PaddingTop, `${value}px`)
      .addRule(StyleTag.PaddingBottom, `${value}px`);
    return this;
  }

  public setTopPadding(value: number) {
    this.style.addRule(StyleTag.PaddingTop, `${value}px`);
    return this;
  }

  public setBottomPadding(value: number) {
    this.style.addRule(StyleTag.PaddingBottom, `${value}px`);
    return this;
  }

  public setLeftPadding(value: number) {
    this.style.addRule(StyleTag.PaddingLeft, `${value}px`);
    return this;
  }

  public setRightPadding(value: number) {
    this.style.addRule(StyleTag.PaddingRight, `${value}px`);
    return this;
  }

  public setMargin(value: string) {
    this.style.addRule(StyleTag.Margin, value);
    return this;
  }

  public setMarginTop(value: number) {
    this.style.addRule(StyleTag.MarginTop, `${value}px`);
    return this;
  }

  public setMarginTopAuto() {
    this.style.addRule(StyleTag.MarginTop, "auto");
    return this;
  }

  public setMarginLeftAuto() {
    this.style.addRule(StyleTag.MarginLeft, "auto");
    return this;
  }

  public setMarginBottom(value: number) {
    this.style.addRule(StyleTag.MarginBottom, `${value}px`);
    return this;
  }

  public setMarginLeft(value: number) {
    this.style.addRule(StyleTag.MarginLeft, `${value}px`);
    return this;
  }

  public setMarginRight(value: number) {
    this.style.addRule(StyleTag.MarginRight, `${value}px`);
    return this;
  }

  public setPosition(position: ViewPosition) {
    this.style.addRule(StyleTag.Position, position);
    return this;
  }

  public setZIndex(value: number) {
    this.style.addRule(StyleTag.ZIndex, `${value}`);
    return this;
  }

  public setTop(value: number): this {
    this.style.addRule(StyleTag.Top, `${value}px`);
    return this;
  }

  public setBottom(value: number): this {
    this.style.addRule(StyleTag.Bottom, `${value}px`);
    return this;
  }

  public setRight(value: number): this {
    this.style.addRule(StyleTag.Right, `${value}px`);
    return this;
  }

  public setLeft(value: number): this {
    this.style.addRule(StyleTag.Left, `${value}px`);
    return this;
  }

  public setBackgroundColor(color: Color): this {
    this.style.addRule(StyleTag.BackgroundColor, `${color.value}`);
    return this;
  }

  public setBackground(value: string): this {
    this.style.addRule(StyleTag.Background, value);
    return this;
  }

  public setOpacity(opacity: number) {
    this.style.addRule(StyleTag.Opacity, `${opacity}`);
    return this;
  }

  public setWillChange(type: WillChangeType) {
    this.style.addRule(StyleTag.WillChange, type);
    return this;
  }

  public setOverflow(value: string) {
    this.style.addRule(StyleTag.Overflow, value);
    return this;
  }

  public setOverflowY(value: string) {
    this.style.addRule(StyleTag.OverflowY, value);
    return this;
  }

  public setOverflowX(value: string) {
    this.style.addRule(StyleTag.OverflowX, value);
    return this;
  }

  public setBoxSizing(value: string) {
    this.style.addRule(StyleTag.BoxSizing, value);
    return this;
  }

  public setBorder(value: string) {
    this.style.addRule(StyleTag.Border, value);
    return this;
  }

  public setBorderColor(color: Color) {
    this.style.addRule(StyleTag.BorderColor, color.value);
    return this;
  }

  public setTopBorderColor(color: Color) {
    this.style.addRule(StyleTag.BorderTopColor, color.value);
    return this;
  }

  public setBottomBorderColor(color: Color) {
    this.style.addRule(StyleTag.BorderBottomColor, color.value);
    return this;
  }

  public setLeftBorderColor(color: Color) {
    this.style.addRule(StyleTag.BorderLeftColor, color.value);
    return this;
  }

  public setRightBorderColor(color: Color) {
    this.style.addRule(StyleTag.BorderRightColor, color.value);
    return this;
  }

  public setRightBorder(value: string) {
    this.style.addRule(StyleTag.BorderRight, value);
    return this;
  }

  public setLeftBorder(value: string) {
    this.style.addRule(StyleTag.BorderLeft, value);
    return this;
  }

  public setBottomBorder(value: string) {
    this.style.addRule(StyleTag.BorderBottom, value);
    return this;
  }

  public setTopBorder(value: string) {
    this.style.addRule(StyleTag.BorderTop, value);
    return this;
  }

  public setRadius(radius: number) {
    this.style.addRule(StyleTag.BorderRadius, `${radius}px`);
    return this;
  }

  public setShadow(value: string) {
    this.style.addRule(StyleTag.BoxShadow, value);
    return this;
  }

  public setCursor(cursor: Cursor) {
    this.style.addRule(StyleTag.Cursor, cursor);
    return this;
  }

  // Filter Style

  public setBackDropFilter(value: string) {
    this.style.addRule(StyleTag.BackDropFilter, value);
    return this;
  }

  // Transform Styles
  public clearTransformStyle() {
    this.style.transform.clear();
    this.style.addRule(StyleTag.Transform, "none");
    return this;
  }

  public setRotate(angle: number) {
    this.style.transform.addRotate(angle);
    return this;
  }

  public setTranslate(x: number, y: number) {
    this.style.transform.addTranslate(x, y);
    return this;
  }

  public setTranslateStyleRule(x: string, y: string) {
    this.style.transform.addTranslateValue(x, y);
    return this;
  }

  public setScale(widthRatio: number, heightRatio: number) {
    this.style.transform.addScale(widthRatio, heightRatio);
    return this;
  }

  public setScaleX(widthRatio: number) {
    this.style.transform.addScaleX(widthRatio);
    return this;
  }

  public setScaleY(heightRatio: number) {
    this.style.transform.addScaleY(heightRatio);
    return this;
  }

  public setSkewY(y: number) {
    this.style.transform.addSkewY(y);
    return this;
  }

  public setSkewX(x: number) {
    this.style.transform.addSkewX(x);
    return this;
  }

  public setSkew(x: number, y: number) {
    this.style.transform.addSkew(x, y);
    return this;
  }

  public setMatrix(a: number, b: number, c: number, d: number, e: number, f: number) {
    this.style.transform.addMatrix(a, b, c, d, e, f);
    return this;
  }

  // Layout Settings Methods
  public setFlex(value: string): this {
    // value 1 flex-grow 2 flex-shrink 3 flex-basis
    this.style.addRule(StyleTag.Flex, value);
    return this;
  }

  public setGridArea(value: string) {
    this.style.addRule(StyleTag.GridArea, value);
    return this;
  }

  public setJustifyContent(value: JustifyContent) {
    this.style.addRule(StyleTag.JustifyContent, value);
    return this;
  }

  public setJustifyItem(value: JustifyContent) {
    this.style.addRule(StyleTag.JustifyItems, value);
    return this;
  }

  public setAlignItem(value: JustifyContent) {
    this.style.addRule(StyleTag.AlignItems, value);
    return this;
  }

  // Interface Getting Methods
  public get width(): number | undefined {
    return <number | undefined>this.style.values.width;
  }

  public get height(): number | undefined {
    return <number | undefined>this.style.values.height;
  }

  public get left(): number | undefined {
    return <number | undefined>this.style.values.left;
  }

  public get right(): number | undefined {
    return <number | undefined>this.style.values.right;
  }

  public get top(): number | undefined {
    return <number | undefined>this.style.values.top;
  }

  public get bottom(): number | undefined {
    return <number | undefined>this.style.values.bottom;
  }

  public get paddingLeft(): number | undefined {
    return <number | undefined>this.style.values.paddingLeft;
  }

  public get paddingRight(): number | undefined {
    return <number | undefined>this.style.values.paddingRight;
  }

  public get hasHorizontalPadding(): boolean {
    return <boolean>this.style.values.hasHorizontalPadding;
  }

  public get displayType(): DisplayType | undefined {
    return this.initialDisplayType;
  }
}