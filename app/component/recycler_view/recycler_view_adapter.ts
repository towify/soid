/*
 * @author kaysaith
 * @date 2020/3/15 18:10
 */

import { RecyclerView } from "./recycler_view";
import { DisplayType, Orientation } from "../../value/style/style";
import {
  RecyclerViewHolder,
  RecyclerViewHolderModel,
  RecyclerViewHolderType,
  SpecialViewHolderPosition
} from "./recycler_view_holder";
import { IRecyclerViewAdapter } from "./recycler_view_interface";
import { View } from "../../base/view";

export abstract class RecyclerViewAdapter implements IRecyclerViewAdapter {
  protected data: any[] = [];
  #itemCount = 0;
  #possibleCount = 0;
  #normalHolderArea = 0;
  #viewHolders: RecyclerViewHolder[] = [];
  #movedCount = 1;
  #invisibleCount?: number;
  #viewPosition: number[] = [];
  // how many count disappeared that the move engine will start to work
  #beginPassCount = 2;
  #_afterDatasetChanged?: () => void;

  #viewHolder?: RecyclerViewHolder;
  #holderTypes?: RecyclerViewHolderModel[];
  #normalHolder?: new () => RecyclerViewHolder;
  #specialHolderTypes: RecyclerViewHolderModel[] = [];
  #contentArea = 0;
  #displayedSpecialHoldersArea = 0;
  #firstScreenSpecialHolderCount = 0;
  #footer?: RecyclerViewHolder;
  #normalHolderDisplayType?: DisplayType;
  #headerSpecialHoldersHeight: number = 0;

  #position = 0;
  #specialHolders: { position: number, holder: RecyclerViewHolder }[] = [];

  constructor(
    private readonly context: RecyclerView,
    private readonly initialData: any[],
    public readonly orientation: Orientation = Orientation.Vertical
  ) {
    this.onCreate();
  }

  public reset() {
    this.#footer = undefined;
    this.#headerSpecialHoldersHeight = 0;
    this.#firstScreenSpecialHolderCount = 0;
    this.#displayedSpecialHoldersArea = 0;
    this.#contentArea = 0;
    this.#specialHolderTypes = [];
    this.#viewHolders = [];
    this.#normalHolder = undefined;
    this.#holderTypes = undefined;
    this.#viewPosition = [];
    this.#invisibleCount = undefined;
    this.#specialHolders = [];
    this.data = [];
  }

  public getViewByPosition<T extends RecyclerViewHolder>(position: number): T | undefined {
    let holder: RecyclerViewHolder | undefined;
    if (this.#specialHolders.length) {
      holder = this.#specialHolders?.firstOfOrNull(holder => holder.position === position)?.holder;
      if (!holder) {
        holder = this.#viewHolders[this.#position % this.#invisibleCount!];
      }
    } else {
      holder = this.#viewHolders[this.#position % this.#invisibleCount!];
    }
    return holder as T;
  }

  public recoveryItemPosition() {
    this.#movedCount = 1;
    this.#viewHolders.forEach((holder, index) => {
      if (this.orientation === Orientation.Vertical) {
        holder.setTranslate(0, this.#viewPosition[index]).updateStyle();
      } else {
        holder.setTranslate(this.#viewPosition[index], 0).updateStyle();
      }
      this.onBindViewHolder(holder, RecyclerViewHolderType.Default, index);
    });
    return this;
  }

  public getContentSize() {
    if (this.#itemCount < this.#possibleCount) {
      return this.#viewPosition[this.#viewPosition.length - (this.#possibleCount - this.#itemCount) - 1] + this.#normalHolderArea + this.getArea(this.#footer);
    } else {
      return this.#viewPosition.last() + this.#normalHolderArea + this.getArea(this.#footer);
    }
  }

  public afterDatasetChanged(action: () => void) {
    this.#_afterDatasetChanged = action;
    return this;
  }

  public notifyDataChanged() {
    this.#itemCount = this.data.length;
    this.calculateViewPositions(this.#itemCount, false);
    const willUpdateCount = this.#possibleCount;
    willUpdateCount.forEach(value => {
      this.handleMovedItem(this.#invisibleCount! + value);
    });
    this.#movedCount = this.#invisibleCount!;
    // update scrollbar size
    this.#contentArea = this.getContentSize();
    !this.#_afterDatasetChanged || this.#_afterDatasetChanged();
    this.handleFooterHolder();
  }

  public updateItemCountIfNeed() {
    const newPossible = Math.ceil(this.getArea(this.context) / this.#normalHolderArea) + this.#beginPassCount;
    const newCount = newPossible - this.#possibleCount;
    if (newCount > 0) {
      let temporary: RecyclerViewHolder;
      let position: number;
      newCount.forEach(index => {
        position = this.#viewPosition[this.#possibleCount + index];
        temporary = new this.#normalHolder!();
        if (position) {
          if (this.orientation === Orientation.Vertical) {
            temporary.setTranslate(0, position);
          } else {
            temporary.setTranslate(position, 0);
          }
        } else {
          temporary.setDisplay(DisplayType.None);
        }
        this.#viewHolders.push(temporary);
        this.context.addView(temporary);
      });
      this.#possibleCount = newPossible;
    }
  }

  public updateData(newData: any[]) {
    this.data = this.data.concat(newData);
    return this;
  }

  public abstract getViewHoldersTypeWithPositions(): RecyclerViewHolderModel[]

  public abstract onBindViewHolder(
    viewHolder: RecyclerViewHolder,
    type: number,
    dataIndex?: number
  ): void

  /**
   * @param offset element scroll top
   * @param isScrollingToMore true means scroll to top
   */
  #flipPageCount = 0;
  #fixedOffset = 0;

  public onScroll(offset: number, isScrollingToPast: boolean) {
    this.#fixedOffset = offset - this.#displayedSpecialHoldersArea;
    this.#invisibleCount = Math.floor((this.#fixedOffset < 0 ? 0 : this.#fixedOffset) / this.#normalHolderArea);
    this.#flipPageCount = this.#invisibleCount + (this.#possibleCount - this.#firstScreenSpecialHolderCount);
    if (
      this.#invisibleCount > this.#movedCount &&
      this.#itemCount > this.#possibleCount &&
      !isScrollingToPast
    ) {
      this.#position = this.#invisibleCount + this.#possibleCount - this.#beginPassCount;
      if (this.#position < this.#itemCount) {
        this.handleMovedItem(this.#position);
        this.#movedCount = this.#invisibleCount;
      }
    } else {
      if (isScrollingToPast) {
        if (
          this.#invisibleCount < this.#movedCount &&
          this.#invisibleCount > 0
        ) {
          this.#position = this.#invisibleCount;
          this.handleMovedItem(this.#position);
          this.#movedCount = this.#position;
        }
        if (offset < this.#normalHolderArea + this.#headerSpecialHoldersHeight) {
          this.handleMovedItem(0);
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
    this.data = this.data.concat(this.initialData);
    this.#itemCount = this.data.length;
    let temporaryHolder: RecyclerViewHolder;
    let specialHolderArea: number;
    // Prepare data for Special and Normal Holder
    this.#holderTypes.forEach(type => {
      if (type.position > 0 || SpecialViewHolderPosition.indexOf(type.position) >= 0) {
        this.#specialHolderTypes.push(type);
      } else {
        this.#normalHolder = type.holder;
        if (!this.#normalHolderArea) {
          let temporary: View | null = new this.#normalHolder();
          this.#normalHolderArea = this.getArea(temporary);
          this.#normalHolderDisplayType = temporary?.displayType;
          temporary = null;
        }
      }
    });
    this.handleSpecialHolders();
    // The number of multiplexed cells is the maximum number of normal cells
    // that can be displayed in the display area, and an additional 2 are added.
    this.#possibleCount = Math.ceil(this.getArea(this.context) / this.#normalHolderArea) + this.#beginPassCount;
    // Ready to initialize the first screen of data
    this.#possibleCount.forEach(index => {
      specialHolderArea =
        this.getArea(this.#specialHolderTypes?.firstOfOrNull(special => special.position === index)!);
      if (specialHolderArea) {
        if (index <= 1) {
          this.#headerSpecialHoldersHeight += specialHolderArea;
        }
        this.#firstScreenSpecialHolderCount += 1;
        this.#displayedSpecialHoldersArea += specialHolderArea;
      }
      temporaryHolder = new this.#normalHolder!();
      // If the number of cells on the first page is not realistic enough, then the
      // created cells will be temporarily hidden and displayed when new data is
      // updated.
      if (index >= this.#itemCount) {
        temporaryHolder.setDisplay(DisplayType.None);
      }
      this.#viewHolders.push(temporaryHolder);
    });
    this.calculateViewPositions(this.#possibleCount, true);
    this.handleFooterHolder();
  }

  private handleMovedItem(position: number) {
    this.#viewHolder = this.#viewHolders[position % this.#possibleCount];
    this.#viewHolder
      .setDisplay(DisplayType.None)
      .updateStyle();
    if (this.orientation === Orientation.Vertical) {
      this.#viewHolder.setTranslate(0, this.#viewPosition[position]);
    } else {
      this.#viewHolder.setTranslate(this.#viewPosition[position], 0);
    }
    this.onBindViewHolder(this.#viewHolder, RecyclerViewHolderType.Default, position);
    this.#viewHolder
      .setDisplay(this.#normalHolderDisplayType || DisplayType.Block)
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
        // Store it for getting holder by position method
        this.#specialHolders.push({position: special.position, holder: specialHolder});
        if (special.position === RecyclerViewHolderType.Footer) {
          this.#footer = specialHolder;
          this.#footer.setDisplay(DisplayType.None);
        } else {
          if (special.position === RecyclerViewHolderType.Header) {
            special.y = 0;
            special.x = 0;
          } else {
            const preHolderType = this.#specialHolderTypes[index - 1];
            if (this.orientation === Orientation.Vertical) {
              special.y = preHolderType.y + preHolderType.height +
                (special.position - preHolderType.position - 1) * this.#normalHolderArea;
            } else {
              special.x = preHolderType.x + preHolderType.width +
                (special.position - preHolderType.position - 1) * this.#normalHolderArea;
            }
          }
          special.height = specialHolder.height!;
          special.width = specialHolder.width!;
          if (this.orientation === Orientation.Vertical) {
            specialHolder.setTranslate(0, special.y);
          } else {
            specialHolder.setTranslate(special.x, 0);
          }
        }
        this.onBindViewHolder(specialHolder, special.position);
        this.context.addView(specialHolder);
      });
  }

  private handleFooterHolder() {
    if (!this.#footer || !this.#viewPosition.length) return;
    // The footer is based on the last cell that has been displayed to determine
    // the display position.
    let footerPosition: number;
    if (this.#itemCount < this.#possibleCount) {
      footerPosition = this.#viewPosition[this.#viewPosition.length - (this.#possibleCount - this.#itemCount) - 1];
    } else {
      footerPosition = this.#viewPosition.last();
    }
    if (this.orientation === Orientation.Vertical) {
      this.#footer.setTranslate(0, footerPosition + this.#normalHolderArea);
    } else {
      this.#footer.setTranslate(footerPosition + this.#normalHolderArea, 0);
    }
    this.#footer.setDisplay(DisplayType.Block).updateStyle();
  }

  private calculateViewPositions(itemCount: number, isInitial: boolean) {
    this.#viewPosition = [];
    const prepareNormalHolderEvent = (index: number) => {
      const targetHolder = this.#viewHolders[index % this.#possibleCount];
      if (this.orientation === Orientation.Vertical) {
        targetHolder.setTranslate(0, this.#viewPosition[index]);
      } else {
        targetHolder.setTranslate(this.#viewPosition[index], 0);
      }
      this.onBindViewHolder(targetHolder, -1, index);
      this.context.addView(targetHolder);
    };

    let positionArea: number;
    let ignorePosition: number | undefined;
    // If it is a position-connected Item, you need to recursively calculate their
    // cumulative height and mark the position of this connection. You do not
    // need to add the Ignore Position tag of the Normal Item.
    const recursionConnectedArea = (special: RecyclerViewHolderModel) => {
      const nextSpecial = this.#specialHolderTypes.firstOfOrNull(item => item.position === (special.position + 1));
      if (nextSpecial) {
        ignorePosition = nextSpecial.position;
        positionArea = recursionConnectedArea(nextSpecial);
        return positionArea;
      } else {
        positionArea = this.orientation === Orientation.Vertical ?
          special.y + special.height :
          special.x + special.width;
        return positionArea;
      }
    };
    let special: RecyclerViewHolderModel;
    const markSpecialPositionIfNeed = (index: number) => {
      special = this.#specialHolderTypes?.firstOfOrNull(item => {
        return (item.position - markedSpecialPositionCount) === index;
      })!;
      if (special) {
        targetArea = recursionConnectedArea(special);
        this.#viewPosition.push(targetArea);
        markedSpecialPositionCount += 1;
      } else {
        this.#viewPosition.push((this.#viewPosition.last() || 0) + this.#normalHolderArea);
      }
    };

    let targetArea: number;
    let markedSpecialPositionCount = 0;
    itemCount.forEach(index => {
      if (index === 0) {
        special = this.#specialHolderTypes?.firstOfOrNull(item => item.position === index)!;
        if (special) {
          markedSpecialPositionCount += 1;
          targetArea = recursionConnectedArea(special);
          this.#viewPosition.push(targetArea);
        } else {
          this.#viewPosition.push(0);
        }
      } else {
        if (ignorePosition && ignorePosition >= index) {
          markedSpecialPositionCount += 1;
          markSpecialPositionIfNeed(index);
          ignorePosition = undefined;
        } else {
          markSpecialPositionIfNeed(index);
        }
      }
      if (isInitial) {
        prepareNormalHolderEvent(index);
      }
    });
  }

  private getArea(target?: View | RecyclerViewHolderModel) {
    if (this.orientation === Orientation.Vertical) {
      return target?.height || 0;
    } else {
      return target?.width || 0;
    }
  }
}