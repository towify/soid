/*
 * @author kaysaith
 * @date 2020/3/16 15:08
 */

import { LinearLayout } from "../component/linear_layout";
import { TextType, TextView, WhiteSpace } from "../component/text_view";
import { DisplayType, ViewPosition } from "../value/style";
import { Color, RGBA } from "../value/color";
import { ViewGroup } from "../base/view_group";

class PrintService extends LinearLayout {
  static _instance: PrintService;
  #dashboards: { [key: string]: TextView }[] = [];
  #hasDisplayed = false;

  constructor() {
    super();
    this
      .setPosition(ViewPosition.Fixed)
      .setMinWidth(300)
      .setTop(0)
      .setLeft(0)
      .setBackDropFilter("blur(20px)")
      .setBackgroundColor(new Color(new RGBA(0, 0, 0, 0.8)))
      .setBorder("2px solid rgba(255,255,255,0.15)")
      .setZIndex(9999)
      .setDisplay(DisplayType.None);
  }

  public static getInstance() {
    if (this._instance) {
      return this._instance;
    } else {
      this._instance = new PrintService();
      return this._instance;
    }
  }

  public register(key: string) {
    const validKey = key.replace(/\s+/g, "");
    const value: { [key: string]: TextView } = {};
    value[validKey] = new TextView()
      .setPercentWidth(100)
      .setPercentHeight(50)
      .setTextType(TextType.Large)
      .setWhiteSpace(WhiteSpace.Pre)
      .setTextWeight("bold")
      .setBorder("2px solid rgba(255,255,255,0.15)")
      .setHorizontalPadding(30)
      .setMinHeight(300)
      .setVerticalPadding(30)
      .setTextColor(Color.white);
    this.#dashboards.push(value);
    this.addView(value[validKey]);
    return this;
  }

  public mount(parent: ViewGroup) {
    parent.addView(this);
  }

  public display(key: string, args: { [key: string]: string | number }) {
    if (!this.#hasDisplayed) {
      this.setDisplay(DisplayType.Flex).updateStyle();
      this.#hasDisplayed = true;
    }
    const validKey = key.replace(/\s+/g, "");
    const target = this.#dashboards.find(item => item[validKey])[validKey];
    if (target) {
      let result = `${key} \n\n`;
      Object.keys(args).forEach(key => {
        result += `${key} : ${args[key]} \n`;
      });
      result += `\n timestamp: ${new Date().getMilliseconds()}`;
      target.setText(result);
    }
  }
}

export const print = PrintService.getInstance();