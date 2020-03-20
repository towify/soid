/*
 * @author kaysaith
 * @date 2020/3/14 22:12
 */

import { RecyclerViewAdapter } from "./recycler_view_adapter";
import { RelativeLayout } from "../relative_layout";
import { View } from "../../base/view";
import Scrollbar from "smooth-scrollbar";
import { ViewGroup } from "../../base/view_group";
import { BrowserService, BrowserServiceType } from "../../service/browser_service";

export abstract class RecyclerView extends ViewGroup {
  public readonly contentView = new RelativeLayout();
  #lastKnownScrollY = 0;
  #adapter: RecyclerViewAdapter;
  #isScrollingToTop = false;
  #scrollbar: Scrollbar;
  #scrollContent: ViewGroup;
  #scrollContentHeight: number;
  readonly #resizeEvent: (event: UIEvent) => void;
  #onResizeEvent: (event: UIEvent) => void;
  #afterResizedEvent: (event: UIEvent) => void;

  #time: number;
  #timeout = false;
  #delta = 200;

  protected constructor() {
    super();
    this.contentView.setFullParent();
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

    const resizeEnd = (event: UIEvent) => {
      if (new Date().getTime() - this.#time < this.#delta) {
        window.setTimeout(resizeEnd, this.#delta);
      } else {
        this.#timeout = false;
        !this.#afterResizedEvent || this.#afterResizedEvent(event);
      }
    };
    this.#resizeEvent = event => {
      !this.#onResizeEvent || this.#onResizeEvent(event);
      this.#time = new Date().getTime();
      if (this.#timeout === false) {
        this.#timeout = true;
        window.setTimeout(resizeEnd, this.#delta);
      }
    };
  }

  set adapter(adapter: RecyclerViewAdapter) {
    this.#adapter = adapter;
    // After the content was turned, you need to obtain the new content height to
    // update the height value corresponding to the scroll table and scroll area.
    this.#adapter.afterDatasetChanged(() => {
      this.#scrollContentHeight = this.#adapter.getContentSize();
    });
  }

  public onResize(action: (event: UIEvent) => void) {
    this.#onResizeEvent = action;
    return this;
  }

  public afterResized(action: (event: UIEvent) => void) {
    this.#afterResizedEvent = action;
    return this;
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
    BrowserService
      .getInstance()
      .register<UIEvent>(BrowserServiceType.Resize, this.#resizeEvent);
  }

  async onAttached(): Promise<any> {
    super.onAttached();
    BrowserService
      .getInstance()
      .register<UIEvent>(BrowserServiceType.Resize, this.#resizeEvent);
  }

  private didScroll() {
    // Because scrolling may trigger page turning and cause the content height
    // to rise, Let the height of the scroll bar correspond to the change of the
    // real-time scroll height of the content in real time
    this.#scrollbar.track.yAxis.update(this.#lastKnownScrollY, this.height, this.#adapter.getContentSize());
    this.#adapter._onVerticalScroll(this.#lastKnownScrollY, this.#isScrollingToTop);
  }
}