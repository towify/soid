/*
 * @author kaysaith
 * @date 2020/3/14 12:30
 */

import { TextType, TextView } from "../text_view";
import { RelativeLayout } from "../relative_layout";
import { DomFragment } from "../../base/dom_fragment";
import { LinearLayout } from "../linear_layout";
import {
  Cursor,
  DisplayType,
  JustifyContent,
  Orientation,
  Style,
  StyleTag,
  ViewPosition
} from "../../value/style/style";
import { Color } from "../../value/color";
import { SelectionInterface } from "./selection_interface";

export class Selection extends RelativeLayout implements SelectionInterface {
  #selection = new TextView();
  #dataList = new LinearLayout();
  #isOpening = false;
  #optionStyle = new Style();
  #optionSelectedColor?: Color;
  #selectedOption?: TextView;
  #optionClickEvent?: (item: TextView) => void;
  #selectionGap = 0;

  constructor(private readonly isFixedOption: boolean = false) {
    super();
    this.#selection
      .setPercentHeight(100)
      .setText("Default")
      .setTextType(TextType.Small)
      .onClick(_ => this.switchDatalist());

    this.#optionStyle
      .addRule(StyleTag.AlignItems, JustifyContent.Center)
      .addRule(StyleTag.Display, DisplayType.Flex)
      .addRule(StyleTag.Cursor, Cursor.Pointer);
  }

  public setBackgroundColor(color: Color) {
    this.#selection.setBackgroundColor(color);
    this.#dataList.setBackgroundColor(color);
    return this;
  }

  public onClickOption(hold: (item: TextView) => void) {
    this.#optionClickEvent = hold;
    return this;
  }

  public setListBackgroundColor(color: Color) {
    this.#dataList.setBackgroundColor(color);
    return this;
  }

  public setOptionSelectedBackgroundColor(color: Color) {
    this.#optionSelectedColor = color;
    return this;
  }

  public setHorizontalPadding(value: number) {
    this.#selection.setHorizontalPadding(value);
    this.#optionStyle.addRule(StyleTag.PaddingLeft, `${value}px`);
    this.#optionStyle.addRule(StyleTag.PaddingRight, `${value}px`);
    return this;
  }

  public setOptionHeight(value: number) {
    this.#optionStyle.addRule(StyleTag.Height, `${value}px`);
    return this;
  }

  public setWidth(value: number) {
    this.#selection.setWidth(value);
    this.#dataList.setWidth(value);
    return super.setWidth(value);
  }

  public async setData(
    data: string[],
    defaultIndex: number,
    bindOption?: (option: TextView) => void
  ): Promise<void> {
    let option: TextView;
    let domFragment = new DomFragment();
    await data.forEach((item, index) => {
      option = new TextView()
        .resetStyle(this.#optionStyle)
        .setText(item);
      if (index === defaultIndex) {
        this.#selection.setText(item);
        this.#selectedOption = option;
      }
      !bindOption || bindOption(option);
      domFragment.addView(option);
    });
    await this.#dataList.addDomFragment(domFragment);
    !this.#optionSelectedColor || this.#selectedOption?.setBackgroundColor(this.#optionSelectedColor).updateStyle();
    this.#dataList.onClick(event => {
      const currentOption = this.#dataList.getSubviewByElement(event.target as HTMLDivElement);
      if (currentOption instanceof TextView) {
        !this.#optionClickEvent || this.#optionClickEvent(currentOption);
        this.#selection.setText(currentOption.textContent || "");
        if (this.#selectedOption && this.#selectedOption !== currentOption) {
          this.#selectedOption
            .setBackgroundColor(Color.none)
            .updateStyle();
          this.#selectedOption = currentOption;
        }
        this.switchDatalist();
      }
    });
  }

  setOptionTextColor(color: Color): this {
    this.#optionStyle.addRule(StyleTag.Color, color.value);
    return this;
  }

  setSelectionTextColor(color: Color): this {
    this.#selection.setTextColor(color);
    return this;
  }

  setTextSize(value: number): this {
    this.#optionStyle.addRule(StyleTag.FontSize, `${value}px`);
    this.#selection.setTextSize(value);
    return this;
  }

  setRadius(radius: number): this {
    this.#selection.setRadius(radius);
    this.#dataList.setRadius(radius);
    return this;
  }

  setGapBetweenSelectionAndOption(value: number) {
    this.#selectionGap = value;
    return this;
  }

  private prepareDataList() {
    let preMouseoverOption: TextView;
    this.#dataList
      .setZIndex(10)
      .setMarginTop((this.height || 0) + this.#selectionGap)
      .setDisplay(DisplayType.None)
      .setOrientation(Orientation.Vertical)
      .onMouseover(event => {
        if (preMouseoverOption && preMouseoverOption !== this.#selectedOption) {
          preMouseoverOption
            .setBackgroundColor(Color.none)
            .updateStyle();
        }
        const currentOption
          = <TextView>this.#dataList.getSubviewByElement(event.target as HTMLDivElement);
        if (this.#optionSelectedColor) {
          currentOption
            .setBackgroundColor(this.#optionSelectedColor)
            .updateStyle();
        }
        preMouseoverOption = currentOption;
      })
      .onMouseleave(_ => {
        if (preMouseoverOption && preMouseoverOption !== this.#selectedOption) {
          preMouseoverOption
            .setBackgroundColor(Color.none)
            .updateStyle();
        }
      });
    this.#optionStyle
      .addRule(StyleTag.Cursor, Cursor.Pointer)
      .addRule(StyleTag.Display, DisplayType.Flex)
      .addRule(StyleTag.AlignItems, "center");
  }

  private switchDatalist() {
    this.#dataList
      .setDisplay(this.#isOpening ? DisplayType.None : DisplayType.Flex)
      .updateStyle();
    this.#isOpening = !this.#isOpening;
  }

  async beforeAttached(): Promise<any> {
    this.addView(this.#selection);
    this.prepareDataList();
    this.addView(this.#dataList);
    !this.isFixedOption || this.#dataList.setPosition(ViewPosition.Fixed).updateStyle();
    super.beforeAttached();
  }

}