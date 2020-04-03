/*
 * @author kaysaith
 * @date 2020/3/14 22:12
 */

import { RecyclerViewAdapter } from "./recycler_view_adapter";
import { RelativeLayout } from "../relative_layout";
import { View } from "../../base/view";
import Scrollbar, { ScrollbarPlugin } from "smooth-scrollbar";
import { ViewGroup } from "../../base/view_group";
import easingsFunctions from "../../animation/easing_functions";
import { IRecyclerView } from "./recycler_view_interface";
import { Orientation } from "../../value/style/style";
import { throttle } from "../../util/performance";

export abstract class RecyclerView extends ViewGroup implements IRecyclerView {
  public readonly contentView = new RelativeLayout();
  #lastKnownScrollValue = 0;
  #adapter?: RecyclerViewAdapter;
  #isScrollingToPast?: boolean;
  #scrollbar?: Scrollbar;
  #scrollContent?: ViewGroup;
  #lastHeight?: number;
  #lastWidth?: number;
  #_orientation: Orientation = Orientation.Vertical;
  #_onReachedEnd?: () => void;

  protected constructor() {
    super();
    this.setOverflow("hidden");
    this.onCreate();
  }

  async onAttached(): Promise<any> {
    super.onAttached();
    this.contentView.setFullParent().updateStyle();
  }

  set adapter(adapter: RecyclerViewAdapter | undefined) {
    this.#adapter = adapter;
    this.#_orientation = this.#adapter?.orientation || Orientation.Vertical;
    // After the content was turned, you need to obtain the new content height to
    // update the height value corresponding to the scroll table and scroll area.
    this.#adapter?.afterDatasetChanged(() => {
      this.contentView
        ?.setHeight(this.#adapter?.getContentSize() || 0)
        ?.updateStyle();
    });
  }

  get adapter(): RecyclerViewAdapter | undefined {
    return this.#adapter;
  }

  public scrollToStart() {
    this.#scrollbar?.scrollTo(0, 0, 200, {
      callback: () => {
        this.#scrollbar = undefined;
        this.#scrollContent = undefined;
        this.#lastKnownScrollValue = 0;
        this.#isScrollingToPast = false;
        this.#adapter?.recoveryItemPosition();
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

  getSubviewByElement<T extends View>(element: HTMLDivElement): T {
    return this.contentView.subviews.find(view => view._element === element) as T;
  }

  private onCreate() {
    // Control Scroll Speed For Recycler View
    class ScalePlugin extends ScrollbarPlugin {
      static pluginName = "scale";
      static defaultOptions = {
        speed: 1,
      };

      transformDelta(delta: any) {
        return {
          x: delta.x * 0.5,
          y: delta.y * 0.5,
        };
      }
    }

    Scrollbar.use(ScalePlugin);
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

    let preContentArea = 0;
    let currentContentArea = 0;
    const calculateReachedEndValue = (orientation: Orientation) => {
      currentContentArea = (this.#scrollbar?.size?.container[orientation === Orientation.Vertical ? "height" : "width"] || 0) +
        (this.#scrollbar?.offset?.[orientation === Orientation.Vertical ? "y" : "x"] || 0);
      if (preContentArea === currentContentArea) {
        return undefined;
      } else {
        return currentContentArea === this.#scrollbar?.size?.content[orientation === Orientation.Vertical ? "height" : "width"] &&
          this.#isScrollingToPast === false;
      }
    };
    this.#scrollbar!.track.update = () => {
      if (this.#scrollbar?.scrollTop) {
        if (calculateReachedEndValue(this.#_orientation)) {
          preContentArea = this.#scrollbar?.size?.content[this.#_orientation === Orientation.Vertical ? "height" : "width"];
          !this.#_onReachedEnd || this.#_onReachedEnd();
        }
        if (this.#_orientation === Orientation.Vertical) {
          this.#isScrollingToPast = this.#scrollbar?.scrollTop! < this.#lastKnownScrollValue;
          this.#lastKnownScrollValue = this.#scrollbar?.scrollTop!;
        } else {
          this.#isScrollingToPast = this.#scrollbar?.scrollLeft! < this.#lastKnownScrollValue;
          this.#lastKnownScrollValue = this.#scrollbar?.scrollLeft!;
        }
        this.didScroll();
      }
    };
  }

  public onReachedEnd(action: () => void) {
    this.#_onReachedEnd = throttle(() => {
      action();
      this.contentView
        ?.setHeight(this.#scrollbar?.size?.content[this.#_orientation === Orientation.Vertical ? "height" : "width"] || 0)
        ?.updateStyle();
    }, 500);
    return this;
  }

  // Because scrolling may trigger page turning and cause the content height
  // to rise, Let the height of the scroll bar correspond to the change of the
  // real-time scroll height of the content in real time
  private didScroll() {
    if (this.#_orientation === Orientation.Vertical) {
      this.#scrollbar?.track.yAxis.update(this.#lastKnownScrollValue, this.height!, this.#adapter?.getContentSize()!);
    } else {
      this.#scrollbar?.track.xAxis.update(this.#lastKnownScrollValue, this.width!, this.#adapter?.getContentSize()!);
    }
    this.#adapter?.onScroll(this.#lastKnownScrollValue, this.#isScrollingToPast === undefined ? false : this.#isScrollingToPast);
  }

  onDetached() {
    super.onDetached();
    this.contentView.clear();
    this.adapter?.reset();
    this.adapter = undefined;
  }
}