/*
 * @author kaysaith
 * @date 2020/3/11 00:01
 */

import { ViewGroup } from "./view_group";
import { BrowserService, BrowserServiceType } from "../service/browser_service";

export abstract class Fragment {
  readonly contentView = new ViewGroup();
  #childFragments: Fragment[] = [];
  #visibilityEvent: (status: boolean) => void;

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
  }

  public async addFragment(fragment: Fragment) {
    await fragment._beforeAttached();
    this.#childFragments.push(fragment);
  }

  public replaceFragment(newFragment: Fragment, oldFragment: Fragment) {
    // ToDo
  }

  public async removeFragment(fragment: Fragment) {
    await fragment._beforeDestroyed();
    const target = this.#childFragments.find(item => item === fragment);
    this.#childFragments.deleteItem(target);
    target.contentView.remove();
  }

  public async _beforeAttached() {
    await this.onAttach();
    await this.onCreateView(this.contentView);
    await this.onViewCreated();
    await this.onStart();
  }

  public listenBrowserVisibility(needListen: boolean) {
    if (needListen) {
      BrowserService
        .getInstance()
        .register(BrowserServiceType.VisibilityChange, this.#visibilityEvent);
    } else {
      BrowserService
        .getInstance()
        .unregister(BrowserServiceType.VisibilityChange, this.#visibilityEvent);
    }
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

