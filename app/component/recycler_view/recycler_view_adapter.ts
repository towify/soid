/*
 * @author kaysaith
 * @date 2020/3/15 18:10
 */

import { RecyclerView } from "./recycler_view";
import { ViewGroup } from "../../base/view_group";

export abstract class RecyclerViewAdapter<V extends RecyclerViewHolder<M>, M extends RecyclerViewAdapterModel> {
  #visibleHeight = 0;
  #itemCount = 0;
  #data: any[] = [];
  #holderHeight = 0;
  #visibleCount = 0;
  #invisibleCount = 0;
  #viewHolders: V[] = [];
  #movedCount = 0;
  #viewIndex: number;
  #viewHolder: V;

  protected constructor(
    private readonly context: RecyclerView<V, M>,
    protected readonly data: any[]
  ) {
    this.onCreate();
  }

  private onCreate() {
    this.#visibleHeight = this.context.height;
    this.#data = this.#data.concat(this.data);
    this.#itemCount = this.#data.length;
    let displayHeight = 0;
    for (let index = 0; index < this.#itemCount; index++) {
      this.#visibleCount += 1;
      const holder = this.generateViewHolder();
      this.#holderHeight = holder.height;
      displayHeight += this.#holderHeight;
      this.onBindViewHolder(holder, index);
      this.#viewHolders.push(holder);
      this.context.addView(holder);
      if (displayHeight > this.#visibleHeight + this.#holderHeight) {
        break;
      }
    }
  }

  public abstract onBindViewHolder(viewHolder: V, position: number): void

  public abstract generateViewHolder(): V

  public _onVerticalScroll(value: number) {
    this.#invisibleCount = Math.floor(value / this.#holderHeight);
    if (
      this.#invisibleCount > this.#movedCount &&
      this.#itemCount > this.#visibleCount &&
      this.#invisibleCount <= this.#itemCount - this.#visibleCount
    ) {
      this.#viewIndex = (this.#invisibleCount - 1) % this.#visibleCount;
      this.#viewHolder = this.#viewHolders[this.#viewIndex];
      this.#viewHolder
        .setTranslate(0, this.#holderHeight * (Math.ceil(this.#invisibleCount / this.#visibleCount) * this.#visibleCount))
        .updateStyle();
      this.onBindViewHolder(this.#viewHolder, this.#visibleCount + this.#invisibleCount - 1);
      this.#movedCount += 1;
    } else {
      if (this.#invisibleCount < this.#movedCount) {
        this.#viewIndex = this.#invisibleCount % this.#visibleCount;
        this.#viewHolder = this.#viewHolders[this.#viewIndex];
        this.#viewHolder
          .setTranslate(0, (Math.floor(this.#invisibleCount / this.#visibleCount) * this.#holderHeight * this.#visibleCount))
          .updateStyle();
        this.onBindViewHolder(this.#viewHolder, this.#invisibleCount);
        this.#movedCount -= 1;
      }
    }
  }
}

export abstract class RecyclerViewAdapterModel {
  protected constructor() {}
}

export abstract class RecyclerViewHolder<M extends RecyclerViewAdapterModel> extends ViewGroup {
  #_model: M;

  protected constructor() {
    super();
    this.setHeight(this.getHeight());
  }

  public abstract getHeight(): number;

  protected abstract onDidSetModel(model: M): void

  set model(model: M) {
    this.#_model = model;
    this.onDidSetModel(this.#_model);
  }
}