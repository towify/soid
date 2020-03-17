/*
 * @author kaysaith
 * @date 2020/3/15 18:10
 */

import { RecyclerView } from "./recycler_view";
import { ViewGroup } from "../../base/view_group";
import { DisplayType, WillChangeType } from "../../value/style";

export abstract class RecyclerViewAdapter {
  #visibleHeight = 0;
  #itemCount = 0;
  #data: any[] = [];
  #holderHeight = 0;
  #visibleCount = 0;
  #viewHolders: RecyclerViewHolder[] = [];
  #movedCount = 1;
  #viewHolder: RecyclerViewHolder;
  #invisibleCount: number;
  #viewPosition: number[] = [0];
  // how many count disappeared that the move engine will start to work
  #beginPassCount = 2;
  #_getContentSize: (size: number) => void;
  #_afterDatasetChanged: (pageSize: number) => void;

  protected constructor(
    private readonly context: RecyclerView,
    protected readonly data: any[]
  ) {
    this.onCreate();
  }

  /**
   * @description
   * `moreCount`  is used to mark whether an element that needs additional
   * display has been loaded
   */
  private onCreate() {
    this.#visibleHeight = this.context.height;
    this.#data = this.#data.concat(this.data);
    this.#itemCount = this.#data.length;
    let isVisibleCount = false;
    let moreCount = 2;
    let displayHeight = 0;
    let holder: RecyclerViewHolder;
    this.#itemCount.forEach(index => {
      if (!isVisibleCount || moreCount) {
        this.#visibleCount += 1;
        holder = this.onCreateViewHolder(index);
        this.#holderHeight = holder.height;
        displayHeight += this.#holderHeight;
        this.onBindViewHolder(holder, index);
        this.#viewHolders.push(holder);
        holder.setTranslate(0, this.#holderHeight * index);
        this.context.addView(holder);
        if (isVisibleCount) {
          moreCount -= 1;
        }
        if (
          displayHeight > this.#visibleHeight &&
          moreCount === this.#beginPassCount
        ) {
          isVisibleCount = true;
        }
      }
      this.#viewPosition.push((index + 1) * holder.height);
    });
  }

  public getContentSize(hold: (size: number) => void) {
    hold(this.#holderHeight * this.#itemCount);
    this.#_getContentSize = hold;
    return this;
  }

  public afterDatasetChanged(action: (pageSize: number) => void) {
    this.#_afterDatasetChanged = action;
    return this;
  }

  public loadMore() {}

  public notifyDataChanged() {
    this.#data = this.data;
    this.#itemCount = this.#data.length;
    this.#viewPosition = [0];
    this.#itemCount.forEach(index => {
      this.#viewPosition.push((index + 1) * this.#holderHeight);
    });
    // update scrollbar size
    const pageSize = this.#holderHeight * this.#itemCount;
    !this.#_getContentSize || this.#_getContentSize(pageSize);
    !this.#_afterDatasetChanged || this.#_afterDatasetChanged(pageSize);
  }

  public abstract onCreateViewHolder(index: number): RecyclerViewHolder

  public abstract onBindViewHolder(viewHolder: RecyclerViewHolder, position: number): void

  /**
   * @param value element scroll top
   * @param isScrollingToTop true means scroll to top
   */
  #currentMovedPosition = 0;
  #position = 0;

  public _onVerticalScroll(value: number, isScrollingToTop: boolean) {
    this.#invisibleCount = Math.floor(value / this.#holderHeight);
    // dynamic update scrollbar size
    this.#_getContentSize(this.#holderHeight * this.#itemCount);
    if (this.#invisibleCount + this.#visibleCount === this.#itemCount) {
      this.loadMore();
    }
    if (
      this.#invisibleCount > this.#movedCount &&
      this.#itemCount > this.#visibleCount &&
      this.#invisibleCount <= this.#itemCount - this.#visibleCount &&
      !isScrollingToTop
    ) {
      this.#position = this.#invisibleCount + this.#visibleCount - this.#beginPassCount;
      this.handleMovedItem(this.#position);
      this.#movedCount += 1;
    } else {
      if (isScrollingToTop) {
        if (
          this.#invisibleCount < this.#movedCount &&
          (value / this.#holderHeight) > this.#currentMovedPosition &&
          this.#invisibleCount > 0
        ) {
          this.#position = this.#invisibleCount - 1;
          this.handleMovedItem(this.#position);
          this.#movedCount -= 1;
          this.#currentMovedPosition = this.#position;
        }
      }
    }
  }

  private handleMovedItem(position: number) {
    this.#viewHolder = this.#viewHolders[position % this.#visibleCount]
      .setDisplay(DisplayType.None)
      .setTranslate(0, this.#viewPosition[position]);
    this.onBindViewHolder(this.#viewHolder, position);
    this.#viewHolder
      .setDisplay(DisplayType.Block)
      .updateStyle();
  }
}

export abstract class RecyclerViewHolder extends ViewGroup {

  protected constructor() {
    super();
    this
      .setHeight(this.getHeight())
      .setBoxSizing("border-box")
      .setWillChange(WillChangeType.Transform);
  }

  public abstract getHeight(): number;

}