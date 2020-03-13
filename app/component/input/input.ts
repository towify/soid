/*
 * @author kaysaith
 * @date 2020/3/13 16:06
 */

import { Align, Cursor, DisplayType, Style, StyleTag, ViewPosition } from "../../value/style";
import { RelativeLayout } from "../relative_layout";
import { TextOverflow, TextType, TextView, WhiteSpace } from "../text_view";
import { Color } from "../../value/color";
import { ListenerType } from "../../value/type";
import { ImageMode, ImageView } from "../image_view";

export class Input extends RelativeLayout {
  #placeHolder = new TextView();
  #input = document.createElement("input");
  #clearButton = new ImageView();
  #inputStyle = new Style();
  #focusEvent: (event: FocusEvent) => void;
  #blurEvent: (event: FocusEvent) => void;
  #changeEvent: (event: FocusEvent) => void;
  #_hasClearButton = true;
  #_hasDisplayedClearButton = false;
  #clearButtonSize = 12;

  constructor() {
    super();
    this
      .setDisplay(DisplayType.Flex)
      .setMinHeight(30)
      .setOverflow("hidden")
      .setBoxSizing("border-box")
      .setHorizontalPadding(15)
      .setBackgroundColor(Color.white);
    this.#clearButton
      .setWidth(this.#clearButtonSize)
      .setHeight(this.#clearButtonSize)
      .setRightPadding(10)
      .setRight(0)
      .setDisplay(DisplayType.None)
      .setImage("resource/image/close_icon.svg")
      .setMode(ImageMode.AspectFit)
      .setCursor(Cursor.Pointer)
      .onClick(event => {
        this.setValue("");
        this.#_hasDisplayedClearButton = false;
        this.#placeHolder.setOpacity(1).updateStyle();
        this.#clearButton.setDisplay(DisplayType.None).updateStyle();
      });
    const contentWidth = `calc(100% - ${(this.paddingLeft || 0) + (this.paddingRight || 0)}px - ${this.#clearButtonSize}px)`;
    this.style.addRule(StyleTag.AlignItems, Align.Center);
    this.#inputStyle
      .addRule(StyleTag.Width, contentWidth)
      .addRule(StyleTag.Height, "100%")
      .addRule(StyleTag.Outline, "none")
      .addRule(StyleTag.Border, "none")
      .addRule(StyleTag.BoxSizing, "border-box")
      .addRule(StyleTag.Position, ViewPosition.Absolute)
      .addRule(StyleTag.Background, "none");
    this.#placeHolder
      .setPointerEvent("none")
      .setLeftPadding(3)
      .setWhiteSpace(WhiteSpace.Nowrap)
      .setPercentWidth(80)
      .setOverflow("hidden")
      .setTextOverflow(TextOverflow.Ellipsis);
  }

  public get value() {
    return this.#input.value;
  }

  public removeClearButton() {
    this.#_hasClearButton = false;
    this.#clearButton.remove();
    this.#inputStyle.addRule(StyleTag.Width, "100%");
    this.#placeHolder.setPercentWidth(100);
    return this;
  }

  public setValue(value: string) {
    this.#input.value = value;
    if (value.length) {
      this.#placeHolder.setOpacity(0).updateStyle();
    }
    return this;
  }

  public setType(type: InputType) {
    switch (type) {
      case InputType.Tel: {
        this.#input.autocomplete = "tel";
        break;
      }
      case InputType.NewPassword: {
        this.#input.autocomplete = "new-password";
        break;
      }
    }
    this.#input.type = type;
    return this;
  }

  public onShow() {
    super.onShow();
    !this.#focusEvent || this.#input.addEventListener(ListenerType.Focus, this.#focusEvent);
    !this.#blurEvent || this.#input.addEventListener(ListenerType.Blur, this.#blurEvent);
    !this.#changeEvent || this.#input.addEventListener(ListenerType.Input, this.#changeEvent);
  }

  public onHide() {
    super.onHide();
    !this.#focusEvent || this.#input.removeEventListener(ListenerType.Focus, this.#focusEvent);
    !this.#blurEvent || this.#input.removeEventListener(ListenerType.Blur, this.#blurEvent);
    !this.#changeEvent || this.#input.removeEventListener(ListenerType.Input, this.#changeEvent);
  }

  public onFocus(action: () => void) {
    if (!this.#focusEvent && this.isEnable && this.isFocusable) {
      this.#focusEvent = (event) => {
        if (!this.isEnable || !this.isFocusable) return;
        action();
        if (!this.value.length) this.#placeHolder.setOpacity(0).updateStyle();
        event.stopPropagation();
      };
      this.#input.addEventListener(ListenerType.Focus, this.#focusEvent);
    }
    return this;
  }

  public onChange(hold: (value: string) => void) {
    if (!this.#changeEvent && this.isEnable && this.isFocusable) {
      this.#changeEvent = (event) => {
        if (!this.isEnable || !this.isFocusable) return;
        if (this.value.length && !this.#_hasDisplayedClearButton) {
          this.showClearButton(true);
          this.#_hasDisplayedClearButton = true;
        } else {
          if (!this.value.length) {
            this.showClearButton(false);
            this.#_hasDisplayedClearButton = false;
          }
        }
        hold(this.value);
        event.stopPropagation();
      };
      this.#input.addEventListener(ListenerType.Input, this.#changeEvent);
    }
    return this;
  }

  public onBlur(action: () => void) {
    if (!this.#blurEvent && this.isEnable && this.isFocusable) {
      this.#blurEvent = (event) => {
        if (!this.isEnable || !this.isFocusable) return;
        action();
        if (!this.value.length) this.#placeHolder.setOpacity(1).updateStyle();
        event.stopPropagation();
      };
      this.#input.addEventListener(ListenerType.Blur, this.#blurEvent);
    }
    return this;
  }

  public setTextSize(value: number) {
    this.#inputStyle.addRule(StyleTag.FontSize, `${value}px`);
    this.#placeHolder.setTextSize(value);
    return this;
  }

  public setTextColor(color: Color) {
    this.#inputStyle.addRule(StyleTag.Color, `${color.value}`);
    return this;
  }

  public setTextWeight(value: string) {
    this.#inputStyle.addRule(StyleTag.FontWeight, value);
  }

  public setTextType(type: TextType) {
    this.#inputStyle.addRule(StyleTag.FontSize, type);
    this.#placeHolder.setTextType(type);
    return this;
  }

  public setPlaceholder(value: string) {
    this.#placeHolder.setText(value);
    return this;
  }

  public setPlaceholderColor(color: Color) {
    this.#placeHolder.setTextColor(color);
    return this;
  }

  public onDetached() {
    this.#input.removeEventListener(ListenerType.Focus, this.#focusEvent);
    this.#input.removeEventListener(ListenerType.Blur, this.#focusEvent);
    super.onDetached();
  }

  async _prepareLifeCycle(): Promise<void> {
    this.#inputStyle.setStyle(this.#input);
    this._element.appendChild(this.#input);
    this.addView(this.#clearButton);
    this.addView(this.#placeHolder);
    super._prepareLifeCycle();
  }

  private showClearButton(status: boolean) {
    if (status && this.#_hasClearButton) {
      this.#clearButton.setDisplay(DisplayType.Block).updateStyle();
    } else {
      this.#clearButton.setDisplay(DisplayType.None).updateStyle();
    }
    return this;
  }

}

export enum InputType {
  Password = "password",
  NewPassword = "new-password",
  Email = "email",
  File = "file",
  Number = "number",
  Search = "search",
  Tel = "tel",
  Text = "text",
  URL = "url"
}