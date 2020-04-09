/*
 * @author kaysaith
 * @date 2020/4/5 01:14
 */

import { ViewGroup } from "../../base/view_group";
import { ImageMode, ImageView } from "../image_view";
import { TextOverflow, TextView } from "../text_view";
import { Cursor, DisplayType, JustifyContent, StyleTag } from "../../value/style/style";
import { Color } from "../../value/color";
import { View } from "../../base/view";

export class FolderView extends ViewGroup {
  readonly #subItems: FolderItem[] = [];

  constructor() {
    super();
    this
      .setDisplay(DisplayType.Grid)
      .setPercentWidth(100)
      .addStyleRule(StyleTag.RowGap, "10px");
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
  #container = new ViewGroup();
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
      .setTextOverflow(TextOverflow.Ellipsis)
      .setPointerEvent("none")
      .setLeftPadding(5)
      .setFullParent()
      .setTextSize(10)
      .setTextColor(Color.white);

    this.#arrow
      .addStyleRule(StyleTag.GridArea, "arrow")
      .setWidth(0)
      .setHeight(0)
      .setRightBorder("3px solid transparent")
      .setLeftBorder("4px solid transparent")
      .setTopBorder("5px solid #fff")
      .updateStyle()
      .setDisplay(DisplayType.None)
      .onClick(_ => {
        this.fold(this.#_isFolded);
        this.#_isFolded = !this.#_isFolded;
      });

    this.dropArrowStyle(true);

    this.#container
      .setDisplay(DisplayType.Grid)
      .addStyleRule(StyleTag.RowGap, "10px")
      .setFullParent()
      .setLeftPadding(20)
      .setTopPadding(10)
      .setDisplay(DisplayType.None)
      .addStyleRule(StyleTag.GridArea, "container");
  }

  get isFolded() {
    return this.#_isFolded;
  }

  setModel(model: FolderItemModel) {
    this.#icon?.setImage(model.iconPath);
    this.#title?.setText(model.name);
    this.#arrow.setDisplay(model.isParent ? DisplayType.Block : DisplayType.None);
    if (model.isParent) {
      this.#container.setDisplay(DisplayType.Grid);
    }
    return this;
  }

  fold(status: boolean) {
    if (status) {
      if (!this.#container.isDisplayNone) {
        this.dropArrowStyle(false);
        this.#container.setDisplay(DisplayType.None).updateStyle();
        this.#subItems.forEach(item => item.fold(true));
      }
    } else {
      if (this.#container.isDisplayNone) {
        this.dropArrowStyle(true);
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

  private dropArrowStyle(isDropStyle: boolean) {
    if (isDropStyle) {
      this.#arrow
        .setRotate(0)
        .updateStyle()
    } else {
      this.#arrow
        .setRotate(-90)
        .updateStyle();
    }
  }
}

export type FolderItemModel = {
  iconPath: string,
  name: string,
  isParent?: boolean
}
