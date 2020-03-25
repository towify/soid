/*
 * @author kaysaith
 * @date 2020/3/24 14:59
 */

import { View } from "../../base/view";

export interface ISegment<Item extends View> {
  setData<M>(models: { item: M, page: { new(): View } }[], onBind: (tab: Item, model: M) => void): this

  setItemType(tab: { new(): Item }): this;

  showContentByPosition(position: number): void
}