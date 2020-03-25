/*
 * @author kaysaith
 * @date 2020/3/24 14:59
 */

import { RelativeLayout } from "../relative_layout";
import { View } from "../../base/view";
import { LinearLayout } from "../linear_layout";
import { DisplayType, JustifyContent, Orientation } from "../../value/style/style";
import { ISegment } from "./segment_interface";
import { Color } from "../../value/color";

export class Segment<Item extends View> extends RelativeLayout implements ISegment<Item> {
  #tabType: { new(): Item };
  #itemContainer = new LinearLayout();
  #contentContainer = new RelativeLayout();
  #contents: { page: View, willInitial: { new(): View } }[] = [];
  #preDisplayedContent: View;

  constructor(public readonly type: TabsType) {
    super();
    this.#itemContainer.hideScrollbar();
  }

  setItemType(tab: { new(): Item }) {
    this.#tabType = tab;
    return this;
  }

  setItemContainerSize(value: number) {
    switch (this.type) {
      case TabsType.TopScrollable:
      case TabsType.TopFixed: {
        this.#itemContainer.setHeight(value);
        break;
      }
      case TabsType.LeftScrollable: {
        this.#itemContainer.setWidth(value);
        break;
      }
    }
    return this;
  }

  setData<M>(
    models: { item: M, page: { new(): View } }[],
    onBind: (item: Item, model: M, position: number) => void
  ) {
    let item: Item;
    let page: View;
    const length = models.length;
    models.forEach((model, index) => {
      item = new this.#tabType();
      if (!index) {
        page = new model.page();
        page.setFullParent().setBackgroundColor(Color.black);
        this.#preDisplayedContent = page;
        this.#contentContainer.addView(page);
      } else {
        page = undefined;
      }
      this.#contents.push({
        page: page,
        willInitial: model.page
      });
      switch (this.type) {
        case TabsType.TopScrollable:
        case TabsType.TopFixed: {
          item.setPercentHeight(100);
          if (this.type === TabsType.TopFixed) {
            item.setPercentWidth(Math.floor(100 / length * 1000) / 1000);
          }
          break;
        }
        case TabsType.LeftScrollable: {
          item.setPercentWidth(100);
          break;
        }
      }
      onBind(item, model.item, index);
      this.#itemContainer.addView(item);
    });
    return this;
  }

  showContentByPosition(position: number) {
    this.#preDisplayedContent.setDisplay(DisplayType.None).updateStyle();
    let currentContent = this.#contents[position].page;
    if (!currentContent) {
      currentContent = new this.#contents[position].willInitial();
      this.#contents[position].page = currentContent;
      this.#contentContainer.addView(currentContent);
    } else {
      console.log(currentContent.displayType, "display");
      currentContent.setDisplay(currentContent.displayType).updateStyle();
    }
    this.#preDisplayedContent = currentContent;
  }

  private onCreate() {
    switch (this.type) {
      case TabsType.LeftScrollable: {
        this.#itemContainer
          .setOrientation(Orientation.Vertical)
          .setPercentHeight(100)
          .setLeft(0);
        this.#contentContainer
          .setPercentHeight(100)
          .setWidth(this.width - this.#itemContainer.width)
          .setLeft(this.#itemContainer.width);
        break;
      }
      case TabsType.TopScrollable:
      case TabsType.TopFixed: {
        this.#itemContainer
          .setOrientation(Orientation.Horizontal)
          .setPercentWidth(100)
          .setTop(0);
        if (this.type === TabsType.TopFixed) {
          this.#itemContainer
            .setJustifyContent(JustifyContent.SpaceBetween);
        }
        this.#contentContainer
          .setPercentWidth(100)
          .setHeight(this.height - this.#itemContainer.height)
          .setTop(this.#itemContainer.height);
        break;
      }
    }
  }

  async beforeAttached(): Promise<any> {
    super.beforeAttached();
    this.onCreate();
    this.addView(this.#itemContainer);
    this.addView(this.#contentContainer);
  }
}

export enum TabsType {
  TopFixed,
  TopScrollable,
  LeftScrollable
}