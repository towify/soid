/*
 * @author kaysaith
 * @date 2020/4/5 01:14
 */

import { LinearLayout } from "../linear_layout";
import { ViewGroup } from "../../base/view_group";
import { ImageMode, ImageView } from "../image_view";
import { TextView } from "../text_view";
import { Cursor, DisplayType, JustifyContent, StyleTag } from "../../value/style/style";
import { Color } from "../../value/color";
import { View } from "../../base/view";

export class FolderView extends ViewGroup {
  #subItems: FolderItem[] = [];

  constructor() {
    super();
  }

  addItem(item: FolderItem, parentID?: string) {
    if (parentID) {
      let parent = this.#subItems.find(item => item.id === parentID);
      if (parent) {
        parent
          ?.fold(false)
          ?.addView(item);
      } else {
        let length = this.#subItems.length;
        let needBreak = false;
        for (let index = 0; index < length; index++) {
          this.#subItems[index].getItemByID(parentID, parent => {
            if (parent) {
              parent
                ?.fold(false)
                ?.addView(item);
              needBreak = true;
            }
          });
          if (needBreak) break;
        }
      }
    } else {
      this.#subItems.push(item);
      this.addView(item);
    }
    return this;
  }
}

export class FolderItem extends ViewGroup {
  #arrow = new ImageView();
  #icon = new ImageView();
  #title = new TextView();
  #container = new LinearLayout();
  #subItems: FolderItem[] = [];
  #_isFolded = true;

  constructor() {
    super();

    this
      .setCursor(Cursor.Pointer)
      .setDisplay(DisplayType.Grid)
      .addStyleRule(StyleTag.GridTemplateColumns, "20px 20px auto")
      .addStyleRule(StyleTag.GridTemplateAreas, `"arrow icon title" "container container container"`)
      .setJustifyItem(JustifyContent.Center)
      .setAlignItem(JustifyContent.Center);

    this.#icon
      .addStyleRule(StyleTag.GridArea, "icon")
      .setPointerEvent("none")
      .setWidth(14)
      .setHeight(14)
      .setMode(ImageMode.AspectFit);

    this.#title
      .addStyleRule(StyleTag.GridArea, "title")
      .setPointerEvent("none")
      .setLeftPadding(5)
      .setFullParent()
      .setTextSize(12)
      .setTextColor(Color.white);

    this.#arrow
      .setRotate(-90).updateStyle()
      .addStyleRule(StyleTag.GridArea, "arrow")
      .setPointerEvent("none")
      .setImage("./resource/image/drop_arrow_icon.svg")
      .setMode(ImageMode.AspectFit)
      .setWidth(18)
      .setHeight(18)
      .setDisplay(DisplayType.None);

    this.#container
      .setFullParent()
      .setLeftPadding(20)
      .setDisplay(DisplayType.None)
      .addStyleRule(StyleTag.GridArea, "container");
  }

  get isFolded() {
    return this.#_isFolded;
  }

  setModel(model: FolderItemModel) {
    this.#icon?.setImage(model.iconPath);
    this.#title?.setText(model.title);
    this.#arrow.setDisplay(model.isParent ? DisplayType.Block : DisplayType.None);
    return this;
  }

  fold(status: boolean) {
    this.#_isFolded = status;
    if (status) {
      if (this.#container.displayType !== DisplayType.None) {
        this.#arrow.setRotate(-90).updateStyle();
        this.#container.setDisplay(DisplayType.None).updateStyle();
        this.#subItems.forEach(item => item.fold(true));
      }
    } else {
      if (this.#container.displayType !== DisplayType.Grid) {
        this.#arrow.setRotate(0).updateStyle();
        this.#container.setDisplay(DisplayType.Grid).updateStyle();
      }
    }
    return this;
  }

  getItemByID(id: string, hold: (item: FolderItem) => void) {
    const item = this.#subItems.find(item => item.id === id);
    if (item) {
      hold(item);
    } else {
      for (let index = 0; index < this.#subItems.length; index++) {
        this.#subItems[index].getItemByID(id, hold);
      }
    }
  }

  addView(view: View) {
    this.#container.addView(view);
    this.#subItems.push(view as FolderItem);
  }

  async beforeAttached(): Promise<any> {
    super.beforeAttached();
    super.addView(this.#arrow);
    super.addView(this.#icon);
    super.addView(this.#title);
    super.addView(this.#container);
  }
}

export type FolderItemModel = {
  iconPath: string,
  title: string,
  isParent?: boolean
}
