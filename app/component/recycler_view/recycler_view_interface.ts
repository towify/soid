/*
 * @author kaysaith
 * @date 2020/3/20 13:25
 */

import { RecyclerViewAdapter } from "./recycler_view_adapter";
import { RecyclerViewHolder } from "./recycler_view_holder";

export interface IRecyclerView {
  adapter: RecyclerViewAdapter

  scrollToTop(): void
}

export interface IRecyclerViewAdapter {
  recoveryItemPosition(): Promise<void>

  getContentSize(): number

  afterDatasetChanged(action: () => void): void

  loadMore(): void

  notifyDataChanged(): void

  getViewHoldersTypeWithPositions(): void

  onBindViewHolder(
    viewHolder: RecyclerViewHolder,
    type: number,
    dataIndex?: number
  ): void
}