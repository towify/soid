/*
 * @author kaysaith
 * @date 2020/3/11 00:01
 */

import { ViewGroup } from "../view_group";
import { BrowserService, BrowserServiceType } from "../../service/browser_service";
import { IFragment } from "./fragment_interface";

export abstract class Fragment implements IFragment {
  readonly contentView = new ViewGroup();
  readonly #visibilityEvent: (status: boolean) => void;
  readonly #resizeEvent: (event: UIEvent) => void;
  #childFragments: Fragment[] = [];
  #onResizeEvent: (event: UIEvent) => void;
  #afterResizedEvent: (event: UIEvent) => void;

  // For Resizing Event
  #time: number;
  #timeout = false;
  #delta = 300;

  protected async onAttach() {}

  protected async abstract onCreateView(context: ViewGroup): Promise<void>

  protected async onViewCreated() {}

  protected async onStart() {}

  protected async onResume() {}

  protected async onPause() {}

  protected async onDestroy() {}

  protected async onDetached() {}

  constructor() {
    this.#visibilityEvent = status => status ? this.onResume() : this.onPause();
    const resizeEnd = (event: UIEvent) => {
      if (new Date().getTime() - this.#time < this.#delta) {
        window.setTimeout(() => resizeEnd(event), this.#delta);
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
        window.setTimeout(() => resizeEnd(event), this.#delta);
      }
    };
  }

  public onResize(hold: (event: UIEvent) => void) {
    this.#onResizeEvent = hold;
    return this;
  }

  public afterResized(hold: (event: UIEvent) => void) {
    this.#afterResizedEvent = hold;
    return this;
  }

  public async addFragment(fragment: Fragment) {
    await fragment._beforeAttached();
    this.#childFragments.push(fragment);
  }

  public replaceFragment(newFragment: Fragment, oldFragment: Fragment) {
    // ToDo
  }

  public async removeFragment(fragment: Fragment) {
    fragment.listenBrowserEvents(false);
    await fragment._beforeDestroyed();
    const target = this.#childFragments.find(item => item === fragment);
    this.#childFragments.deleteItem(target);
    target.contentView.remove();
  }

  public listenBrowserEvents(needListen: boolean) {
    if (needListen) {
      BrowserService
        .getInstance()
        .register<boolean>(BrowserServiceType.VisibilityChange, this.#visibilityEvent)
        .register<UIEvent>(BrowserServiceType.Resize, this.#resizeEvent);
    } else {
      BrowserService
        .getInstance()
        .unregister<boolean>(BrowserServiceType.VisibilityChange, this.#visibilityEvent)
        .unregister<UIEvent>(BrowserServiceType.Resize, this.#resizeEvent);
    }
  }

  public async _beforeAttached() {
    await this.onAttach();
    await this.onCreateView(this.contentView);
    await this.onViewCreated();
    await this.onStart();
  }

  public async _beforeDestroyed() {
    await this.onDestroy();
    this.#childFragments.forEach(child => {
      child._beforeDestroyed();
    });
    this.#childFragments = undefined;
    await this.onDetached();
  }
}