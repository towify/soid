/*
 * @author kaysaith
 * @date 2020/3/14 12:30
 */

import { TextType, TextView } from "../text_view";
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
import { Rectangle } from "../rectangle";
import { ViewGroup } from "../../base/view_group";

export class Selection extends ViewGroup implements SelectionInterface {
  readonly #selection = new TextView();
  readonly #dataList = new LinearLayout();
  readonly #optionStyle = new Style();
  readonly #arrow = new Rectangle();
  #isClosing = false;
  #optionSelectedColor?: Color;
  #selectedOption?: TextView;
  #optionClickEvent?: (item: TextView) => void;
  #selectionGap = 0;
  #arrowColor = new Color("black");

  constructor(private readonly isFixedOption: boolean = false) {
    super();
    this
      .setDisplay(DisplayType.Grid)
      .addStyleRule(StyleTag.GridTemplateColumns, "auto 15px")
      .setAlignItem(JustifyContent.Center)
      .setPosition(ViewPosition.Relative);

    this.#selection
      .setPercentWidth(100)
      .setPercentHeight(100)
      .setText("Default")
      .setTextType(TextType.Small)
      .onClick(_ => this.switchDatalist());

    this.#arrow
      .setPointerEvent("none")
      .setRight(10)
      .setWidth(0)
      .setHeight(0)
      .setRightBorder("3px solid transparent")
      .setLeftBorder("3px solid transparent");

    this.#optionStyle
      .addRule(StyleTag.AlignItems, JustifyContent.Center)
      .addRule(StyleTag.Display, DisplayType.Flex)
      .addRule(StyleTag.Cursor, Cursor.Pointer);
  }

  public setBackgroundColor(color: Color) {
    this.#dataList.setBackgroundColor(color);
    return super.setBackgroundColor(color);
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

  setArrowColor(color: Color): this {
    this.#arrowColor = color;
    return this;
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
    this.#dataList.setRadius(radius);
    return super.setRadius(radius);
  }

  setGapBetweenSelectionAndOption(value: number) {
    this.#selectionGap = value;
    return this;
  }

  private prepareDataList() {
    let preMouseoverOption: TextView;
    this.#dataList
      .setZIndex(10)
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
      .setDisplay(this.#isClosing ? DisplayType.None : DisplayType.Flex)
      .updateStyle();
    this.#arrow
      .setRotate(this.#isClosing ? 0 : -90)
      .updateStyle();
    this.#isClosing = !this.#isClosing;
  }

  async beforeAttached(): Promise<any> {
    this.addView(this.#selection);
    this.#arrow
      .setTopBorder(`4px solid ${this.#arrowColor.value}`);
    this.addView(this.#arrow);
    this.prepareDataList();
    this.addView(this.#dataList);
    if (this.isFixedOption) {
      this.#dataList
        .setMarginTop((this.height || 0) + this.#selectionGap)
        .setPosition(ViewPosition.Fixed);
    } else {
      this.#dataList
        .setTop((this.height || 0) + this.#selectionGap)
        .setPosition(ViewPosition.Absolute);
    }
    this.#dataList.updateStyle();
    super.beforeAttached();
  }

}