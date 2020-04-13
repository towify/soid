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
  readonly subItems: FolderItem[] = [];

  constructor() {
    super();
    this
      .setDisplay(DisplayType.Grid)
      .setPercentWidth(100)
      .addStyleRule(StyleTag.RowGap, "10px");
  }

  getItemById(id: string, hold: (item: FolderItem) => void) {
    let result = this.subItems.find(item => item.id === id);
    if (result) {
      hold(result);
    } else {
      for (let item of this.subItems) {
        item.getItemByID(id, child => {
          if (child) {
            result = child;
            hold(result);
          }
        });
        if (result) break;
      }
    }
  }

  addItem(item: FolderItem, parent?: FolderItem) {
    if (parent) {
      parent
        ?.fold(false)
        ?.addItem(item);
    } else {
      this.subItems.push(item);
      this.addView(item);
    }
    return this;
  }

  removeChildItem(item: FolderItem) {
    const targetIndex = this.subItems.indexOf(item);
    if (targetIndex >= 0) {
      this.subItems.splice(targetIndex, 1);
      item.remove();
    }
  }
}

export class FolderItem extends ViewGroup {
  readonly subItems: FolderItem[] = [];
  readonly #arrow = new ImageView();
  readonly #icon = new ImageView();
  readonly #title = new TextView();
  readonly #container = new ViewGroup();
  #_parentItem?: FolderItem;
  #_model?: FolderItemModel;
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

  get model() {
    return this.#_model;
  }

  get parentItem() {
    return this.#_parentItem;
  }

  setParentItem(parentItem: FolderItem) {
    this.#_parentItem = parentItem;
    return this;
  }

  setModel(model: FolderItemModel) {
    this.#_model = model;
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
        this.subItems.forEach(item => item.fold(true));
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
    let item = this.subItems.find(item => item.id === id);
    if (item) {
      hold(item);
    } else {
      for (let subItem of this.subItems) {
        subItem.getItemByID(id, child => {
          if (child.id === id) {
            item = child;
            hold(item);
          }
        });
        if (item) break;
      }
    }
  }

  addView(view: View) {
    throw Error("You can't add view into fold item component but it instanceof fold item type");
  }

  addItem(item: FolderItem) {
    this.#container.addView(item);
    this.subItems.push(item);
    item.setParentItem(this);
  }

  removeChildItem(item: FolderItem) {
    this.removeSubItem(this);
    return this;
  }

  removeSelf() {
    !this.parentItem || this.removeSubItem(this.parentItem);
    return this;
  }

  isEmptyFold() {
    this.#arrow.setDisplay(DisplayType.None).updateStyle();
    this.#container.setDisplay(DisplayType.None).updateStyle();
    return this;
  }

  private removeSubItem(parentItem: FolderItem) {
    const targetIndex = parentItem.subItems.indexOf(this);
    if (targetIndex >= 0) {
      parentItem.subItems.splice(targetIndex, 1);
      this.remove();
      if (parentItem.subItems.length === 0) {
        parentItem.isEmptyFold();
      }
    }
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
        .updateStyle();
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
