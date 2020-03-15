/*
 * @author kaysaith
 * @date 2020/3/14 22:12
 */

import { LinearLayout } from "../linear_layout";
import { ListenerType } from "../../value/type";
import { Orientation } from "../../value/style";
import { RecyclerViewAdapter, RecyclerViewAdapterModel, RecyclerViewHolder } from "./recycler_view_adapter";

export abstract class RecyclerView<V extends RecyclerViewHolder<M>, M extends RecyclerViewAdapterModel> extends LinearLayout {
  #lastKnownScrollY = 0;
  #lastKnownScrollX = 0;
  #scheduledAnimationFrame = false;
  #adapter: RecyclerViewAdapter<V, M>;
  readonly #onScrollEvent: (event: Event) => void;

  protected constructor() {
    super();
    this.#onScrollEvent = (event) => {
      if (this.orientation !== Orientation.Vertical) {
        this.#lastKnownScrollY = this._element.scrollTop;
      } else {
        this.#lastKnownScrollX = this._element.scrollLeft;
      }
      // Prevent multiple rAF callbacks.
      if (this.#scheduledAnimationFrame) {
        return;
      }
      this.#scheduledAnimationFrame = true;
      requestAnimationFrame(() => this.didScroll());
    };
    this._element
      .addEventListener(ListenerType.Scroll, this.#onScrollEvent, false);
  }

  set adapter(adapter: RecyclerViewAdapter<V, M>) {
    this.#adapter = adapter;
  }

  public didScroll() {
    this.#adapter._onVerticalScroll(this.#lastKnownScrollY);
    this.#scheduledAnimationFrame = false;
  }

}