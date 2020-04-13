/*
 * @author kaysaith
 * @date 2020/3/11 12:33
 */

import { ListenerType } from "../value/type";
import { debounce } from "../util/performance";
import { systemInfo } from "../app";

export class BrowserService {

  private static service: BrowserService | undefined;
  readonly #events: Map<string, Set<(status?: any) => void>>;
  readonly #visibilityListener: (event: Event) => void;
  readonly #resizeListener: (event: UIEvent) => void;
  readonly #clickListener: (event: MouseEvent) => void;

  public static getInstance(): BrowserService {
    if (!BrowserService.service) {
      BrowserService.service = new BrowserService();
    }
    return BrowserService.service;
  }

  private constructor() {
    this.#events = new Map();
    // browser tab switching event listener
    this.#visibilityListener = (_) => {
      if (document.visibilityState == "visible") {
        this.#events.get(BrowserServiceType.VisibilityChange)?.forEach(value => value(true));
      } else if (document.visibilityState == "hidden") {
        this.#events.get(BrowserServiceType.VisibilityChange)?.forEach(value => value(false));
      }
    };
    this.#resizeListener = (event: UIEvent) => {
      systemInfo.windowHeight = (event.target as Window)?.innerHeight || 0;
      systemInfo.windowWidth = (event.target as Window)?.innerWidth || 0;
      this.#events.get(BrowserServiceType.Resize)?.forEach(item => item(event));
    };

    this.#clickListener = (event: MouseEvent) => {
      this.#events.get(BrowserServiceType.Click)?.forEach(item => item(event));
    };
    document.addEventListener(ListenerType.VisibilityChange, this.#visibilityListener);
    window.addEventListener(ListenerType.Resize, event => debounce(this.#resizeListener, 25)(event));
    window.addEventListener(ListenerType.Click, event => debounce(this.#clickListener, 25)(event));
  }

  register<T>(type: BrowserServiceType, event: (value: T) => void) {
    if (this.#events.has(type)) {
      this.#events.get(type)?.add(event);
    } else {
      const set: Set<(value: T) => void> = new Set();
      set.add(event);
      this.#events.set(type, set);
    }
    return this;
  }

  unregister<T>(type: BrowserServiceType, event: (value: T) => void) {
    this.#events.get(type)?.delete(event);
    return this;
  }

  destroy() {
    document.removeEventListener(ListenerType.VisibilityChange, this.#visibilityListener);
    window.removeEventListener(ListenerType.Resize, this.#visibilityListener);
    window.removeEventListener(ListenerType.Click, this.#clickListener);
  }
}

export enum BrowserServiceType {
  VisibilityChange = "visibilitychange",
  Resize = "resize",
  Click = "click"
}