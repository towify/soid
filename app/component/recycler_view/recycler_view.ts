/*
 * @author kaysaith
 * @date 2020/3/14 22:12
 */

import { RecyclerViewAdapter } from "./recycler_view_adapter";
import { RelativeLayout } from "../relative_layout";
import { View } from "../../base/view";
import Scrollbar from "smooth-scrollbar";
import { ViewGroup } from "../../base/view_group";

export abstract class RecyclerView extends ViewGroup {
  public readonly contentView = new RelativeLayout();
  #lastKnownScrollY = 0;
  #adapter: RecyclerViewAdapter;
  #isScrollingToTop = false;
  // For Debounce or Throttling
  #timeout: number = null;
  #startTime = new Date().getMilliseconds();
  #scrollbar: Scrollbar;
  #scrollContent: ViewGroup;
  #scrollContentHeight: number;

  protected constructor() {
    super();
    this.contentView
      .setFullParent();
    this.#scrollbar = Scrollbar.init(this._element);
    this.#scrollContent = new ViewGroup(this.#scrollbar.contentEl as HTMLDivElement);
    this.#scrollContent
      .setFullParent()
      .updateStyle()
      .addView(this.contentView);
    this.#scrollbar.track.update = () => {
      this.#isScrollingToTop = this.#scrollbar.scrollTop < this.#lastKnownScrollY;
      this.#lastKnownScrollY = this.#scrollbar.scrollTop;
      this.didScroll();
    };
    // Update the content height of the scroll area when scrolling stops
    this.#scrollbar.track.yAxis.hide = () => {
      if (this.#scrollContentHeight) {
        // When updating the height, remember to also update the previous scroll distance
        this.#scrollContent
          .setHeight(this.#scrollContentHeight)
          .setTranslate(0, -this.#scrollbar.scrollTop)
          .updateStyle();
        this.#scrollContentHeight = undefined;
        this.#scrollbar.update();
      }
    };
  }

  set adapter(adapter: RecyclerViewAdapter) {
    this.#adapter = adapter;
    // Because scrolling may trigger page turning and cause the content height
    // to rise, Let the height of the scroll bar correspond to the change of the
    // real-time scroll height of the content in real time
    this.#adapter.getContentSize((pageSize) => {
      this.#scrollbar.track.yAxis.update(this.#lastKnownScrollY, this.height, pageSize);
    });
    // After the content was turned, you need to obtain the new content height to
    // update the height value corresponding to the scroll table and scroll area.
    this.#adapter.afterDatasetChanged((pageSize) => {
      this.#scrollContentHeight = pageSize;
    });
  }

  public addView(view: View) {
    this.contentView.addView(view);
  }

  public onHide(action?: () => void) {
    super.onHide(action);
  }

  public onShow(action?: () => void) {
    super.onShow(action);
  }

  public onDetached() {
    super.onDetached();
  }

  private didScroll() {
    this.#adapter._onVerticalScroll(this.#lastKnownScrollY, this.#isScrollingToTop);
  }

  private debounce(action: () => void, time: number) {
    if (this.#timeout !== null) window.clearTimeout(this.#timeout);
    this.#timeout = window.setTimeout(action, time);
  }

  private throttling(action: () => void, wait: number, maxWait: number) {
    if (this.#timeout !== null) window.clearTimeout(this.#timeout);
    let curTime = new Date().getMilliseconds();
    if (curTime - this.#startTime >= maxWait) {
      action();
      this.#startTime = curTime;
    } else {
      this.#timeout = window.setTimeout(action, wait);
    }
  }
}