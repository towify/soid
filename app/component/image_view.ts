/*
 * @author kaysaith
 * @date 2020/3/12 18:39
 */

import { View } from "../base/view";
import { StyleTag } from "../value/style/style";
import { ValueChecker } from "../util/value_checker";

export class ImageView extends View {
  #imagePath?: string;

  constructor() {
    super();
  }

  public setImage(path: string) {
    if (ValueChecker.isImage(path)) {
      this.#imagePath = path;
      this.style.addRule(StyleTag.BackgroundImage, `url(${path})`);
    } else {
      throw Error("invalid image path");
    }
    return this;
  }

  public setMode(type: ImageMode) {
    switch (type) {
      case ImageMode.ScaleToFill: {
        this.style.addRule(StyleTag.BackgroundSize, "100% 100%");
        break;
      }
      case ImageMode.AspectFit: {
        this.style.addRule(StyleTag.BackgroundSize, "contain");
        this.style.addRule(StyleTag.BackgroundRepeat, "no-repeat");
        break;
      }
      case ImageMode.AspectFill: {
        this.getImageSize(this.#imagePath!, (width, height) => {
          if (width < height) {
            const ratio = Math.round(height / width * 10000) / 100;
            this.style.addRule(StyleTag.BackgroundSize, `100% ${ratio}%`);
            this.updateStyle();
          } else {
            const ratio = Math.round(width / height * 10000) / 100;
            this.style.addRule(StyleTag.BackgroundSize, `${ratio}% 100% `);
            this.updateStyle();
          }
        });
        this.style.addRule(StyleTag.BackgroundRepeat, "no-repeat");
        break;
      }
      case ImageMode.WidthFix: {
        this.style.addRule(StyleTag.BackgroundSize, "cover");
        break;
      }
    }
    return this;
  }

  private getImageSize(src: string, hold: (width: number, height: number) => void) {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      hold(image.naturalWidth, image.naturalHeight);
      image.remove();
    };
  }
}

export enum ImageMode {
  ScaleToFill = "scaleToFill",
  AspectFit = "aspectFit",
  AspectFill = "aspectFill",
  WidthFix = "widthFx"
}