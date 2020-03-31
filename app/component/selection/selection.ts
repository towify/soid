/*
 * @author kaysaith
 * @date 2020/3/14 12:30
 */

import { TextType, TextView } from "../text_view";
import { RelativeLayout } from "../relative_layout";
import { DomFragment } from "../../base/dom_fragment";
import { LinearLayout } from "../linear_layout";
import { Cursor, DisplayType, Orientation, Style, StyleTag } from "../../value/style/style";
import { Color } from "../../value/color";
import { SelectionInterface } from "./selection_interface";

export class Selection extends RelativeLayout implements SelectionInterface {
  #selection = new TextView();
  #dataList = new LinearLayout();
  #isOpening = false;
  #optionStyle = new Style();
  #optionSelectedColor?: Color;
  #selectedOption?: TextView;
  #optionClickEvent?: (value: string) => void;

  constructor() {
    super();
    this.#selection
      .setMinHeight(30)
      .setText("Default")
      .setTextType(TextType.Small)
      .onClick(_ => this.switchDatalist());
    let preMouseoverOption: TextView;
    this.#dataList
      .setTop(this.#selection.height!)
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
      })
      .onClick(event => {
        if (this.#optionClickEvent) {
          const currentOption
            = <TextView>this.#dataList.getSubviewByElement(event.target as HTMLDivElement);
          this.#optionClickEvent(currentOption?.textContent!);
          this.#selection.setText(currentOption?.textContent!);
          if (this.#selectedOption !== currentOption) {
            this.#selectedOption!
              .setBackgroundColor(Color.white)
              .updateStyle();
            this.#selectedOption = currentOption;
          }
          this.switchDatalist();
        }
      });
    this.#optionStyle
      .addRule(StyleTag.Cursor, Cursor.Pointer)
      .addRule(StyleTag.Display, DisplayType.Flex)
      .addRule(StyleTag.AlignItems, "center");
  }

  public setBackgroundColor(color: Color) {
    this.#selection.setBackgroundColor(color);
    this.#dataList.setBackgroundColor(color);
    return this;
  }

  public onClickOption(hold: (value: string) => void) {
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

  public setSelectionTextType(type: TextType) {
    this.#selection.setTextType(type);
    return this;
  }

  public setOptionTextType(type: TextType) {
    this.#optionStyle.addRule(StyleTag.FontSize, type);
    return this;
  }

  public setHorizontalPadding(value: number) {
    this.#selection.setHorizontalPadding(value);
    this.#optionStyle.addRule(StyleTag.PaddingLeft, `${value}px`);
    this.#optionStyle.addRule(StyleTag.PaddingRight, `${value}px`);
    return super.setHorizontalPadding(value);
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

  public setData(data: string[], defaultIndex?: number) {
    let option: TextView;
    let domFragment = new DomFragment();
    (async () => {
      data.forEach((item, index) => {
        option = new TextView()
          .setTextType(TextType.Small)
          .resetStyle(this.#optionStyle)
          .setText(item);
        if (index === defaultIndex) {
          this.#selection.setText(item);
          this.#selectedOption = option;
          domFragment._beforeAttached(view => {
            if (view === option) {
              view.setBackgroundColor(this.#optionSelectedColor!);
            }
          });
        }
        domFragment.addView(option);
      });
      this.#dataList.addDomFragment(domFragment);
    })();
    return this;
  }

  private switchDatalist() {
    this.#dataList
      .setDisplay(this.#isOpening ? DisplayType.None : DisplayType.Flex)
      .updateStyle();
    this.#isOpening = !this.#isOpening;
  }

  async beforeAttached(): Promise<any> {
    this.addView(this.#selection);
    this.addView(this.#dataList);
    super.beforeAttached();
  }
}