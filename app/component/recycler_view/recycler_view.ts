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

export abstract class RecyclerView extends ViewGroup implements IRecyclerView {
  public readonly contentView = new RelativeLayout();
  #lastKnownScrollY = 0;
  #adapter: RecyclerViewAdapter;
  #isScrollingToTop = false;
  #scrollbar: Scrollbar;
  #scrollContent: ViewGroup;
  #scrollContentHeight: number;
  #lastHeight: number;

  protected constructor() {
    super();
    this.setOverflow("hidden");
    this.contentView.setFullParent();
    this.onCreate();
  }

  set adapter(adapter: RecyclerViewAdapter) {
    this.#adapter = adapter;
    // After the content was turned, you need to obtain the new content height to
    // update the height value corresponding to the scroll table and scroll area.
    this.#adapter.afterDatasetChanged(() => {
      this.#scrollContentHeight = this.#adapter.getContentSize();
    });
  }

  public scrollToTop() {
    this.#scrollbar.scrollTo(0, 0, 200, {
      callback: () => {
        this.#scrollbar = undefined;
        this.#scrollContent = undefined;
        this.#lastKnownScrollY = 0;
        this.#isScrollingToTop = false;
        this.#scrollContentHeight = undefined;
        this.#adapter.recoveryItemPosition().then(_ => this.onCreate());
        this.onCreate();
      },
      easing: (percent) => easingsFunctions.easeInOutQuad(percent)
    });
  }

  public setHeight(value: number): this {
    if (this.#lastHeight && value !== this.#lastHeight) {
      this.scrollToTop();
    }
    this.#lastHeight = value;
    return super.setHeight(value);
  }

  public addView(view: View) {
    this.contentView.addView(view);
  }

  private onCreate() {
    this.#scrollbar = Scrollbar.init(this._element, {
      alwaysShowTracks: false,
      thumbMinSize: 150
    });
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

  private didScroll() {
    // Because scrolling may trigger page turning and cause the content height
    // to rise, Let the height of the scroll bar correspond to the change of the
    // real-time scroll height of the content in real time
    this.#scrollbar.track.yAxis.update(this.#lastKnownScrollY, this.height, this.#adapter.getContentSize());
    this.#adapter._onVerticalScroll(this.#lastKnownScrollY, this.#isScrollingToTop);
  }
}