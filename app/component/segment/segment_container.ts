/*
 * @author kaysaith
 * @date 2020/3/24 14:59
 */

import { RelativeLayout } from "../relative_layout";
import { View } from "../../base/view";
import { DisplayType, StyleTag } from "../../value/style/style";
import { ISegment } from "./segment_interface";
import { ViewGroup } from "../../base/view_group";
import { Color } from "../../value/color";
import { Fragment } from "../../base/fragment/fragment";
import { SegmentMenu } from "./segment_menu";

export class SegmentContainer<Item extends View> extends ViewGroup implements ISegment<Item> {
  readonly subviews: View[] = [];
  readonly #contents: { page?: View, willInitial: { new(): View } }[] = [];
  readonly #pageContainer = new RelativeLayout();
  readonly #menu: SegmentMenu<Item>;
  #preDisplayedContent?: View;

  constructor(public readonly type: TabsType) {
    super();
    this.#menu = new SegmentMenu<Item>(type);
    this.style.addRule(StyleTag.Display, DisplayType.Grid);
    this.#pageContainer.setFullParent();
  }

  setItemType(tab: { new(): Item }) {
    this.#menu.setItemType(tab);
    return this;
  }

  setItemContainerBackgroundColor(color: Color) {
    this.#menu.setBackgroundColor(color);
    return this;
  }

  setItemContainerSize(value: number) {
    switch (this.type) {
      case TabsType.TopScrollable:
      case TabsType.TopFixed: {
        this.style.addRule(StyleTag.GridTemplateRows, `${value}px auto`);
        this.#menu.setHeight(value);
        break;
      }
      case TabsType.LeftScrollable: {
        this.#menu.setWidth(value);
        this.style.addRule(StyleTag.GridTemplateColumns, `${value}px auto`);
        break;
      }
    }
    return this;
  }

  setData<M extends SegmentModel>(
    models: M[],
    onBind: (item: Item, position: number) => void
  ) {
    let page: View | Fragment | undefined;
    models.forEach((model, index) => {
      if (!index) {
        page = new model.page();
        this.#preDisplayedContent = page;
        page.setFullParent();
        this.#pageContainer.addView(page);
        this.subviews.push(page);
      } else {
        page = undefined;
      }
      this.#contents.push({
        page: page,
        willInitial: model.page
      });
    });
    this.#menu.setData(models, ((item, position) => {
      onBind(item, position);
    }));
    return this;
  }

  showPageByPosition(position: number) {
    if (this.#contents[position].page === this.#preDisplayedContent) return;
    this.#preDisplayedContent?.setDisplay(DisplayType.None).updateStyle();
    let currentContent = this.#contents[position].page;
    if (!currentContent) {
      currentContent = new this.#contents[position].willInitial()
        .setFullParent();
      this.#contents[position].page = currentContent;
      this.#pageContainer.addView(currentContent);
      this.subviews.push(currentContent);
    } else {
      currentContent.setDisplay(currentContent.displayType!).updateStyle();
    }
    this.#preDisplayedContent = currentContent;
  }

  async beforeAttached(): Promise<any> {
    super.beforeAttached();
    this.addView(this.#menu);
    this.addView(this.#pageContainer);
  }
}

export abstract class SegmentModel {
  protected constructor(public readonly page: { new(): View }) {}
}

export enum TabsType {
  TopFixed,
  TopScrollable,
  LeftScrollable
}