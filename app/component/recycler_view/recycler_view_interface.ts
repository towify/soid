/*
 * @author kaysaith
 * @date 2020/3/20 13:25
 */

import { RecyclerViewAdapter } from "./recycler_view_adapter";
import { RecyclerViewHolder } from "./recycler_view_holder";

export interface IRecyclerView {
  adapter: RecyclerViewAdapter | undefined

  scrollToStart(): void

  setHeight(value: number): this

  setWidth(value: number): this

  onReachedEnd(action: () => void): this
}

export interface IRecyclerViewAdapter {
  recoveryItemPosition(): this

  getContentSize(): number

  afterDatasetChanged(action: () => void): void

  notifyDataChanged(): void

  getViewHoldersTypeWithPositions(): void

  onBindViewHolder(
    viewHolder: RecyclerViewHolder,
    type: number,
    dataIndex?: number
  ): void

  getViewByPosition<T extends RecyclerViewHolder>(position: number): T | undefined
}