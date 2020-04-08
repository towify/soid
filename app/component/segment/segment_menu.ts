/*
 * @author kaysaith
 * @date 2020/3/29 13:46
 */

import { LinearLayout } from "../linear_layout";
import { Cursor, JustifyContent, Orientation } from "../../value/style/style";
import { TabsType } from "./segment_container";
import { View } from "../../base/view";

export class SegmentMenu<Item extends View> extends LinearLayout {
  #tabType?: { new(): Item };
  #previousSelected?: Item;

  constructor(public readonly type: TabsType) {
    super();
    this.hideScrollbar();
    switch (this.type) {
      case TabsType.LeftScrollable: {
        this
          .setOrientation(Orientation.Vertical)
          .setFullParent();
        break;
      }
      case TabsType.TopScrollable:
      case TabsType.TopFixed: {
        this
          .setOrientation(Orientation.Horizontal)
          .setFullParent();
        if (this.type === TabsType.TopFixed) {
          this
            .setJustifyContent(JustifyContent.SpaceAround);
        }
        break;
      }
    }
  }

  public setItemType(tab: { new(): Item }) {
    this.#tabType = tab;
    return this;
  }

  public setData<T>(
    models: T[],
    onBind: (item: Item, position: number) => void
  ) {
    let item: Item;
    models.forEach((model, index) => {
      item = new this.#tabType!()
        .setCursor(Cursor.Pointer);
      if (!index) {
        this.#previousSelected = item;
      }
      switch (this.type) {
        case TabsType.TopScrollable:
        case TabsType.TopFixed: {
          item.setPercentHeight(100);
          break;
        }
        case TabsType.LeftScrollable: {
          item.setPercentWidth(100);
          break;
        }
      }
      onBind(item, index);
      this.addView(item);
    });
    return this;
  }

  public onSelected(hold: (previous: Item, current: Item) => void) {
    this.onClick(event => {
      const targetView = this.getSubviewByElement<Item>(event.target as HTMLDivElement);
      if (targetView !== this.#previousSelected) {
        hold(this.#previousSelected!, targetView);
        this.#previousSelected = targetView;
      }
    });
    return this;
  }
}