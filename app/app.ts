/*
 * @author kaysaith
 * @date 2020/3/12 15:59
 */

import "./extension/array_extension";
import "./extension/html_element_extension";
import "./extension/number_extension";
import "./extension/string_extension";
import { DomFragment } from "./base/dom_fragment";
import { BrowserService, BrowserServiceType } from "./service/browser_service";
import { Fragment } from "./base/fragment";
import { ListenerType } from "./value/type";

export abstract class App {
  #childFragment: ChildFragmentModel[] = [];
  #domFragment = new DomFragment();
  #visibilityEvent = async (status: boolean) =>
    status ? await this.onResume() : await this.onPause();

  protected constructor() {
    window.addEventListener(ListenerType.BeforeUnload, async () => {
      await this.onDestroy();
    });
  }

  protected abstract async onCreate(): Promise<void>

  protected async onStart() {
    // mount browser visibility status into visible fragment
    this.#childFragment.forEach(model => {
      model.fragment.listenBrowserVisibility(model.visible);
    });
  }

  protected async onResume() {}

  protected async onPause() {}

  protected async onDestroy() {}

  protected async addFragment(model: ChildFragmentModel) {
    await model.fragment._beforeAttached();
    this.#childFragment.push(model);
    this.#domFragment.addView(model.fragment.contentView);
  }

  public async removeFragment(fragment: Fragment) {
    await fragment._beforeDestroyed();
    this.getTargetChildFragmentBy(fragment).then(index => {
      this.#childFragment.splice(index, 1);
    });
  }

  public async commit() {
    await this.beforeAttachedToBody();
    document.body.addDomFragment(this.#domFragment);
  }

  private async beforeAttachedToBody() {
    await this.onCreate();
    await this.onStart();
    BrowserService
      .getInstance()
      .register(BrowserServiceType.VisibilityChange, this.#visibilityEvent);
  }

  private getTargetChildFragmentBy(fragment: Fragment): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      const result = this.#childFragment
        .find((model, index) => {
          if (model.fragment === fragment) resolve(index);
        });
      if (!result) reject();
    });
  }
}

export class ChildFragmentModel {
  constructor(
    public readonly fragment: Fragment,
    public readonly visible: boolean
  ) {}
}