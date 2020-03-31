/*
 * @author kaysaith
 * @date 2020/3/11 12:33
 */

import { ListenerType } from "../value/type";
import { debounce } from "../util/performance";
import { systemInfo } from "../app";

export class BrowserService {
  private static service: BrowserService | undefined;
  readonly #events: { [key: string]: [(status?: any) => void] } = {};
  readonly #visibilityListener: (event: Event) => void;
  readonly #resizeListener: (event: UIEvent) => void;

  public static getInstance(): BrowserService {
    if (!BrowserService.service) {
      BrowserService.service = new BrowserService();
    }
    return BrowserService.service;
  }

  constructor() {
    // browser tab switching event listener
    this.#visibilityListener = (_) => {
      if (document.visibilityState == "visible") {
        this.#events[BrowserServiceType.VisibilityChange]
          .forEach(item => item(true));
      } else if (document.visibilityState == "hidden") {
        this.#events[BrowserServiceType.VisibilityChange]
          .forEach(item => item(false));
      }
    };
    this.#resizeListener = (event: UIEvent) => {
      systemInfo.windowHeight = (event.target as Window)?.innerHeight || 0;
      systemInfo.windowWidth = (event.target as Window)?.innerWidth || 0;
      this.#events[BrowserServiceType.Resize]
        .forEach(item => item(event));
    };
    document.addEventListener(ListenerType.VisibilityChange, this.#visibilityListener);
    window.addEventListener(ListenerType.Resize, event => debounce(this.#resizeListener, 25)(event));
  }

  register<T>(type: BrowserServiceType, event: (value: T) => void) {
    let target = this.#events[type];
    if (!target) {
      target = [event];
      this.#events[type] = target;
    } else {
      this.#events[type].push(event);
    }
    return this;
  }

  unregister<T>(type: BrowserServiceType, event: (value: T) => void) {
    let targetType = this.#events[type];
    const targetEvent = targetType.find(item => item === event);
    !targetEvent || targetType.deleteItem(targetEvent);
    return this;
  }

  destroy() {
    document.removeEventListener(ListenerType.VisibilityChange, this.#visibilityListener);
    document.removeEventListener(ListenerType.Resize, this.#visibilityListener);
  }
}

export enum BrowserServiceType {
  VisibilityChange = "visibilitychange",
  Resize = "resize"
}