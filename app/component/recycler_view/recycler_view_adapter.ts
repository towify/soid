/*
 * @author kaysaith
 * @date 2020/3/15 18:10
 */

import { RecyclerView } from "./recycler_view";
import { DisplayType } from "../../value/style";
import {
  RecyclerViewHolder,
  RecyclerViewHolderModel,
  RecyclerViewHolderType,
  SpecialViewHolderPosition
} from "./recycler_view_holder";
import { print } from "../../service/print_service";
import { IRecyclerViewAdapter } from "./recycler_view_interface";

export abstract class RecyclerViewAdapter implements IRecyclerViewAdapter {
  #visibleHeight = 0;
  #itemCount = 0;
  #data: any[] = [];
  #normalHolderHeight = 0;
  #visibleCount = 0;
  #viewHolders: RecyclerViewHolder[] = [];
  #movedCount = 0;
  #invisibleCount: number;
  #viewPosition: number[];
  // how many count disappeared that the move engine will start to work
  #beginPassCount = 2;
  #_afterDatasetChanged: () => void;

  #viewHolder: RecyclerViewHolder;

  #holderTypes: RecyclerViewHolderModel[];
  #normalHolder: new () => RecyclerViewHolder;
  #specialHolderTypes: RecyclerViewHolderModel[] = [];
  #contentHeight = 0;
  #displayedSpecialHoldersHeight = 0;
  #footer: RecyclerViewHolder;

  #currentMovedPosition = 0;
  #position = 0;

  protected constructor(
    private readonly context: RecyclerView,
    protected readonly data: any[]
  ) {
    this.onCreate();
  }

  public recoveryItemPosition(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.#movedCount = 1;
      resolve();
      this.#viewHolders.forEach((holder, index) => {
        holder.setTranslate(0, this.#viewPosition[index]).updateStyle();
        this.onBindViewHolder(holder, RecyclerViewHolderType.Default, index);
      });
    });
  }

  public getContentSize() {
    return this.#viewPosition.last() + this.#normalHolderHeight + (this.#footer?.height || 0);
  }

  public afterDatasetChanged(action: () => void) {
    this.#_afterDatasetChanged = action;
    return this;
  }

  public loadMore() {}

  public notifyDataChanged() {
    this.#data = this.data;
    this.#itemCount = this.#data.length;
    this.calculateViewPositions(this.#itemCount, false);
    // update scrollbar size
    this.#contentHeight = this.getContentSize();
    !this.#_afterDatasetChanged || this.#_afterDatasetChanged();
    this.handleFooterHolder();
  }

  public abstract getViewHoldersTypeWithPositions(): RecyclerViewHolderModel[]

  public abstract onBindViewHolder(
    viewHolder: RecyclerViewHolder,
    type: number,
    dataIndex?: number
  ): void

  /**
   * @param value element scroll top
   * @param isScrollingToTop true means scroll to top
   */
  public _onVerticalScroll(value: number, isScrollingToTop: boolean) {
    const offset = value - this.#displayedSpecialHoldersHeight;
    this.#invisibleCount = Math.floor((offset < 0 ? 0 : offset) / this.#normalHolderHeight);
    // dynamic update scrollbar size
    if (this.#invisibleCount + this.#visibleCount === this.#itemCount - 1) {
      this.loadMore();
    }
    print.display("board1", {
      invisible: this.#invisibleCount,
      move: this.#movedCount,
      visible: this.#visibleCount,
      offset: offset,
      itemCount: this.#itemCount
    });
    if (
      this.#invisibleCount > this.#movedCount &&
      this.#itemCount > this.#visibleCount &&
      !isScrollingToTop
    ) {
      this.#position = this.#invisibleCount + this.#visibleCount - this.#beginPassCount;
      this.handleMovedItem(this.#position);
      this.#movedCount += 1;
    } else {
      if (isScrollingToTop) {
        if (
          this.#invisibleCount < this.#movedCount &&
          (value / this.#normalHolderHeight) > this.#currentMovedPosition &&
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

  /**
   * @description
   * `moreCount`  is used to mark whether an element that needs additional
   * display has been loaded
   */
  private onCreate() {
    this.#holderTypes = this.getViewHoldersTypeWithPositions();
    this.#visibleHeight = this.context.height;
    this.#data = this.#data.concat(this.data);
    this.#itemCount = this.#data.length;
    let isMaxVisibleCount = false;
    let moreCount = 2;
    let displayHeight = 0;
    let temporaryHolder: RecyclerViewHolder;
    let specialHolderHeight: number;
    // Prepare data for Special and Normal Holder
    this.#holderTypes.forEach(type => {
      if (type.position > 0 || SpecialViewHolderPosition.includes(type.position)) {
        this.#specialHolderTypes.push(type);
      } else {
        this.#normalHolder = type.holder;
        if (!this.#normalHolderHeight) {
          this.#normalHolderHeight = new type.holder().height;
        }
      }
    });
    this.handleSpecialHolders();
    // Ready to initialize the first screen of data
    this.#itemCount.forEach(index => {
      if (!isMaxVisibleCount || moreCount) {
        // Not calculated if there is a HeaderView display area
        this.#visibleCount += 1;
        specialHolderHeight = this.#specialHolderTypes
          .firstOfOrNull(special => special.position === index)?.height || 0;
        this.#visibleHeight += specialHolderHeight;
        this.#displayedSpecialHoldersHeight += specialHolderHeight;
        displayHeight += this.#normalHolderHeight;
        temporaryHolder = new this.#normalHolder();
        this.#viewHolders.push(temporaryHolder);
        if (isMaxVisibleCount) {
          moreCount -= 1;
        } else if (
          displayHeight >= this.#visibleHeight &&
          moreCount === this.#beginPassCount
        ) {
          isMaxVisibleCount = true;
        }
      }
    });
    this.calculateViewPositions(this.#visibleCount, true);
    this.handleFooterHolder();
  }

  private handleMovedItem(position: number) {
    this.#viewHolder = this.#viewHolders[position % this.#visibleCount]
      .setDisplay(DisplayType.None)
      .setTranslate(0, this.#viewPosition[position]);
    this.onBindViewHolder(this.#viewHolder, RecyclerViewHolderType.Default, position);
    this.#viewHolder
      .setDisplay(DisplayType.Block)
      .updateStyle();
  }

  private handleSpecialHolders() {
    let specialHolder: RecyclerViewHolder;
    //  Special Holder is loaded directly into the real place without reusing logic,
    //  and is not changed.
    this.#specialHolderTypes
      .sort((left, right) => left.position - right.position)
      .forEach((special, index) => {
        // Handle footer when all holders have been processed
        specialHolder = new special.holder();
        if (special.position === RecyclerViewHolderType.Footer) {
          this.#footer = specialHolder;
          this.#footer.setDisplay(DisplayType.None);
        } else {
          if (special.position === RecyclerViewHolderType.Header) {
            special.y = 0;
          } else {
            const preHolderType = this.#specialHolderTypes[index - 1];
            special.y = preHolderType.y + preHolderType.height +
              (special.position - preHolderType.position - 1) * this.#normalHolderHeight;
          }
          special.height = specialHolder.height;
          specialHolder.setTranslate(0, special.y);
        }
        this.onBindViewHolder(specialHolder, special.position);
        this.context.addView(specialHolder);
      });
  }

  private handleFooterHolder() {
    if (!this.#footer || !this.#viewPosition.length) return;
    this.#footer
      .setTranslate(0, this.#viewPosition.last() + this.#normalHolderHeight)
      .setDisplay(DisplayType.Block)
      .updateStyle();
  }

  private calculateViewPositions(itemCount: number, isInitial: boolean) {
    this.#viewPosition = [];
    const prepareNormalHolderEvent = (index: number) => {
      const targetHolder = this.#viewHolders[index % this.#visibleCount];
      if (isInitial) {
        targetHolder.setTranslate(0, this.#viewPosition[index]);
        this.onBindViewHolder(targetHolder, -1, index);
        this.context.addView(targetHolder);
      }
    };

    let positionY: number;
    let ignorePosition: number;
    // If it is a position-connected Item, you need to recursively calculate their
    // cumulative height and mark the position of this connection. You do not
    // need to add the Ignore Position tag of the Normal Item.
    const recursionConnectedHeight = (special: RecyclerViewHolderModel) => {
      const nextSpecial = this.#specialHolderTypes.firstOfOrNull(item => item.position === (special.position + 1));
      if (nextSpecial) {
        ignorePosition = nextSpecial.position;
        positionY = recursionConnectedHeight(nextSpecial);
        return positionY;
      } else {
        positionY = special.y + special.height;
        return positionY;
      }
    };
    let special: RecyclerViewHolderModel;
    const markSpecialPositionIfNeed = (index: number) => {
      special = this.#specialHolderTypes.firstOfOrNull(item => {
        return (item.position - markedSpecialPositionCount) === index;
      });
      if (special) {
        targetY = recursionConnectedHeight(special);
        this.#viewPosition.push(targetY);
        markedSpecialPositionCount += 1;
      } else {
        this.#viewPosition.push((this.#viewPosition.last() || 0) + this.#normalHolderHeight);
      }
    };

    let targetY: number;
    let markedSpecialPositionCount = 0;
    itemCount.forEach(index => {
      if (index === 0) {
        special = this.#specialHolderTypes.firstOfOrNull(item => item.position === index);
        if (special) {
          markedSpecialPositionCount += 1;
          targetY = recursionConnectedHeight(special);
          this.#viewPosition.push(targetY);
        } else {
          this.#viewPosition.push(0);
        }
      } else {
        if (ignorePosition && ignorePosition >= index) {
          markedSpecialPositionCount += 1;
          markSpecialPositionIfNeed(index);
        } else {
          markSpecialPositionIfNeed(index);
        }
      }
      prepareNormalHolderEvent(index);
    });
  }
}