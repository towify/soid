/*
 * @author kaysaith
 * @date 2020/3/11 00:01
 */

import { ListenerType, Platform } from "../value/type";
import { Cursor, DisplayType, Style, StyleTag, ViewPosition, WillChangeType } from "../value/style";
import { Color } from "../value/color";

export abstract class View {
  protected style = new Style();
  protected isDisplayNone: boolean;
  readonly _element: HTMLDivElement;
  #_isEnable = true;
  #_isClickable = true;
  #_isFocusable = true;
  #_clickEvent: (event: MouseEvent) => void;
  #_mouseoverEvent: (event: MouseEvent) => void;
  #_mouseleaveEvent: (event: MouseEvent) => void;

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

  // Property Methods
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

  public async onAttached() {}

  public onShow(action?: () => void) {
    this.recoveryEventListenerIfNeed();
    !action || action();
  }

  public onHide(action?: () => void) {
    this.clearEventListenerIfNeed();
    !action || action();
  }

  private clearEventListenerIfNeed() {
    !this.#_clickEvent || this._element.removeEventListener(ListenerType.Click, this.#_clickEvent);
    !this.#_mouseoverEvent || this._element.removeEventListener(ListenerType.Mouseover, this.#_mouseoverEvent);
    !this.#_mouseleaveEvent || this._element.removeEventListener(ListenerType.Mouseleave, this.#_mouseleaveEvent);
  }

  private recoveryEventListenerIfNeed() {
    !this.#_clickEvent || this._element.addEventListener(ListenerType.Click, this.#_clickEvent);
    !this.#_mouseoverEvent || this._element.addEventListener(ListenerType.Mouseover, this.#_mouseoverEvent);
    !this.#_mouseleaveEvent || this._element.addEventListener(ListenerType.Mouseleave, this.#_mouseleaveEvent);
  }

  public onDetached() {}

  async _prepareLifeCycle() {
    this.style.setStyle(this);
    await this.beforeAttached();
    await this.onAttached();
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

  public setDisplay(type: DisplayType) {
    if (type === DisplayType.None) {
      if (this.isDisplayNone !== undefined) this.onHide();
      this.isDisplayNone = true;
    } else {
      if (this.isDisplayNone) {
        this.onShow();
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
    this.style.addRule(StyleTag.Width, `${value}%`);
    return this;
  }

  public setPercentHeight(value: number): this {
    this.style.addRule(StyleTag.Height, `${value}%`);
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

  public setMarginBottom(value: number) {
    this.style.addRule(StyleTag.MarginBottom, `${value}px`);
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

  public setOpacity(opacity: number) {
    if (opacity === 0) {
      this.onHide();
    }
    if (opacity === 1) {
      this.onShow();
    }
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
  public setRotate(angle: number) {
    this.style.transform.addRotate(angle);
    return this;
  }

  public setTranslate(x: number, y: number) {
    this.style.transform.addTranslate(x, y);
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

  // Interface Getting Methods
  public get width(): number | undefined {
    return <number | undefined>this.style.values.width;
  }

  public get height(): number | undefined {
    return <number | undefined>this.style.values.height;
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
}