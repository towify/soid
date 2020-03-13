/*
 * @author kaysaith
 * @date 2020/3/11 12:33
 */

import { ListenerType } from "../value/type";

export class BrowserService {
  private static service: BrowserService | undefined;
  #visibilityChangeEvent: { [key: string]: [(status: boolean) => void] } = {};
  #visibilityListener: (event: Event) => void;

  public static getInstance(): BrowserService {
    if (!BrowserService.service) {
      BrowserService.service = new BrowserService();
    }
    return BrowserService.service;
  }

  constructor() {
    // 浏览器tab切换监听事件
    this.#visibilityListener = (event) => {
      if (document.visibilityState == "visible") {
        this.#visibilityChangeEvent[BrowserServiceType.VisibilityChange]
          .forEach(item => item(true));
      } else if (document.visibilityState == "hidden") {
        this.#visibilityChangeEvent[BrowserServiceType.VisibilityChange]
          .forEach(item => item(false));
      }
    };
    document.addEventListener(ListenerType.VisibilityChange, this.#visibilityListener);
  }

  register(type: BrowserServiceType, event: (status: boolean) => void) {
    let target = this.#visibilityChangeEvent[type];
    if (!target) {
      target = [event];
      this.#visibilityChangeEvent[type] = target;
    } else {
      this.#visibilityChangeEvent[type].push(event);
    }
  }

  unregister(type: BrowserServiceType, event: (status: boolean) => void) {
    let targetType = this.#visibilityChangeEvent[type];
    targetType.deleteItem(targetType.find(item => item === event));
  }

  destroy() {
    document.removeEventListener("visibilitychange", this.#visibilityListener);
  }
}

export enum BrowserServiceType {
  VisibilityChange = "visibilitychange"
}