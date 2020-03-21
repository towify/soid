/*
 * @author kaysaith
 * @date 2020/3/14 22:12
 */

import { RecyclerViewAdapter } from "./recycler_view_adapter";
import { RelativeLayout } from "../relative_layout";
import { View } from "../../base/view";
import Scrollbar from "smooth-scrollbar";
import { ViewGroup } from "../../base/view_group";
import easingsFunctions from "../../animation/easing_functions";
import { IRecyclerView } from "./recycler_view_interface";
import { Orientation } from "../../value/style";

export abstract class RecyclerView extends ViewGroup implements IRecyclerView {
  public readonly contentView = new RelativeLayout();
  #lastKnownScrollValue = 0;
  #adapter: RecyclerViewAdapter;
  #isScrollingToMore = false;
  #scrollbar: Scrollbar;
  #scrollContent: ViewGroup;
  #scrollContentHeight: number;
  #lastHeight: number;
  #lastWidth: number;
  #_orientation: Orientation = Orientation.Vertical;

  protected constructor() {
    super();
    this.setOverflow("hidden");
    this.contentView.setFullParent();
    this.onCreate();
  }

  set adapter(adapter: RecyclerViewAdapter) {
    this.#adapter = adapter;
    this.#_orientation = this.#adapter.orientation;
    // After the content was turned, you need to obtain the new content height to
    // update the height value corresponding to the scroll table and scroll area.
    this.#adapter.afterDatasetChanged(() => {
      this.#scrollContentHeight = this.#adapter.getContentSize();
    });
  }

  public scrollToStart() {
    this.#scrollbar.scrollTo(0, 0, 200, {
      callback: () => {
        this.#scrollbar = undefined;
        this.#scrollContent = undefined;
        this.#lastKnownScrollValue = 0;
        this.#isScrollingToMore = false;
        this.#scrollContentHeight = undefined;
        this.#adapter.recoveryItemPosition().then(_ => this.onCreate());
        this.onCreate();
      },
      easing: (percent) => easingsFunctions.easeInOutQuad(percent)
    });
  }

  public setHeight(value: number): this {
    if (!this.#lastHeight) {
      this.#lastHeight = value;
      return super.setHeight(value);
    } else if (value !== this.#lastHeight) {
      this.scrollToStart();
      return super.setHeight(value);
    }
    return this;
  }

  public setWidth(value: number) {
    if (!this.#lastWidth) {
      this.#lastWidth = value;
      return super.setWidth(value);
    } else if (value !== this.#lastWidth) {
      this.scrollToStart();
      return super.setWidth(value);
    }
    return this;
  }

  public addView(view: View) {
    this.contentView.addView(view);
  }

  private onCreate() {
    this.#scrollbar = Scrollbar.init(this._element, {
      alwaysShowTracks: false,
      thumbMinSize: 150,
      damping: 0.05
    });
    this.#scrollContent = new ViewGroup(this.#scrollbar.contentEl as HTMLDivElement);
    this.#scrollContent
      .setFullParent()
      .updateStyle()
      .addView(this.contentView);
    this.#scrollbar.track.update = () => {
      if (this.#_orientation === Orientation.Vertical) {
        this.#isScrollingToMore = this.#scrollbar.scrollTop < this.#lastKnownScrollValue;
        this.#lastKnownScrollValue = this.#scrollbar.scrollTop;
      } else {
        this.#isScrollingToMore = this.#scrollbar.scrollLeft < this.#lastKnownScrollValue;
        this.#lastKnownScrollValue = this.#scrollbar.scrollLeft;
      }
      this.didScroll();
    };
  }

  private didScroll() {
    // Because scrolling may trigger page turning and cause the content height
    // to rise, Let the height of the scroll bar correspond to the change of the
    // real-time scroll height of the content in real time
    if (this.#_orientation === Orientation.Vertical) {
      this.#scrollbar.track.yAxis.update(this.#lastKnownScrollValue, this.height, this.#adapter.getContentSize());
    } else {
      this.#scrollbar.track.xAxis.update(this.#lastKnownScrollValue, this.width, this.#adapter.getContentSize());
    }
    this.#adapter._onVerticalScroll(this.#lastKnownScrollValue, this.#isScrollingToMore);
  }
}