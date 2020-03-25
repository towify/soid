/*
 * @author kaysaith
 * @date 2020/3/24 22:22
 */
import { Style } from "./style";

const STYLE_ID = "soid-global-style";
let isStyleAttached = false;

export class GlobalStyle {
  #styleContent = "";
  private static globalStyle: GlobalStyle;

  addTag(tag: string, hold: (style: Style) => void) {
    const style = new Style();
    hold(style);
    this.#styleContent += `${tag} {${style.generateCssText()}}`;
  }

  public static getInstance() {
    if (!GlobalStyle.globalStyle) {
      GlobalStyle.globalStyle = new GlobalStyle();
    }
    return GlobalStyle.globalStyle;
  }

  attachStyle() {
    if (isStyleAttached || typeof window === "undefined") {
      return;
    }

    const styleEl = document.createElement("style");
    styleEl.id = STYLE_ID;
    styleEl.textContent = this.#styleContent;

    if (document.head) {
      document.head.appendChild(styleEl);
    }

    isStyleAttached = true;
  }

  detachStyle() {
    if (!isStyleAttached || typeof window === "undefined") {
      return;
    }

    const styleEl = document.getElementById(STYLE_ID);

    if (!styleEl || !styleEl.parentNode) {
      return;
    }

    styleEl.parentNode.removeChild(styleEl);

    isStyleAttached = false;
  }
}