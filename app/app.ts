/*
 * @author kaysaith
 * @date 2020/3/12 15:59
 */

import "./extension/array_extension";
import "./extension/html_element_extension";
import "./extension/number_extension";
import "./extension/string_extension";
import "./extension/object_extension";
import { DomFragment } from "./base/dom_fragment";
import { BrowserService, BrowserServiceType } from "./service/browser_service";
import { Fragment } from "./base/fragment/fragment";
import { ListenerType } from "./value/type";
import { GlobalStyle } from "./value/style/global_style";

export abstract class App {
  readonly childFragment: ChildFragmentModel[] = [];
  readonly #domFragment = new DomFragment();
  readonly #visibilityEvent = async (status: boolean) =>
    status ? await this.onResume() : await this.onPause();
  #hasCommitted = false;

  protected constructor() {
    window.addEventListener(ListenerType.BeforeUnload, async () => {
      await this.onDestroy();
    });
  }

  protected abstract async onCreate(): Promise<void>

  protected async onStart() {
    // mount browser visibility status into visible fragment
    this.childFragment.forEach(model => {
      model.fragment.listenBrowserEvents(model.visible);
    });
  }

  protected async onResume() {}

  protected async onPause() {}

  protected async onDestroy() {}

  protected async addFragment(model: ChildFragmentModel) {
    await model.fragment._beforeAttached();
    this.childFragment.push(model);
    if (this.#hasCommitted) {
      await document.body.addView(model.fragment.contentView);
    } else {
      await this.#domFragment.addView(model.fragment.contentView);
    }
  }

  public async replaceFragment(newFragment: Fragment, oldFragment: Fragment) {
    const targetPosition = this.getTargetChildFragmentPosition(oldFragment);
    if (targetPosition) {
      const target = this.childFragment[targetPosition];
      this.childFragment[targetPosition] = new ChildFragmentModel(newFragment, target.visible);
    }
    const children = document.body.children;
    const length = document.body.children.length;
    for (let index = 0; index < length; index++) {
      if (children.item(index) === oldFragment.contentView._element) {
        oldFragment.listenBrowserEvents(false);
        await oldFragment._beforeDestroyed();
        await newFragment._beforeAttached();
        await newFragment.contentView._prepareLifeCycle();
        document.body.replaceChild(newFragment.contentView._element, oldFragment.contentView._element);
        oldFragment.contentView.remove();
      }
    }
  }

  public async removeFragment(fragment: Fragment) {
    // Remove all of this fragment's listener events in browser service
    await fragment._beforeDestroyed();
    fragment.listenBrowserEvents(false);
    const targetPosition = this.getTargetChildFragmentPosition(fragment);
    if (targetPosition) {
      this.childFragment.splice(targetPosition, 1);
    }
  }

  public commit() {
    this.#hasCommitted = true;
    this.beforeAttachedToBody().then(_ => {
      systemInfo.windowWidth = window.innerWidth;
      systemInfo.windowHeight = window.innerHeight;
      document.body.addDomFragment(this.#domFragment);
    });
  }

  private async beforeAttachedToBody() {
    await this.onCreate();
    await this.onStart();
    BrowserService
      .getInstance()
      .register<boolean>(BrowserServiceType.VisibilityChange, this.#visibilityEvent);
    GlobalStyle
      .getInstance()
      .attachStyle();
  }

  private getTargetChildFragmentPosition(fragment: Fragment): number | undefined {
    let position: number | undefined;
    this.childFragment
      .find((model, index) => {
        if (model.fragment === fragment) {
          position = index;
          return true;
        }
      });
    return position;
  }
}

export class ChildFragmentModel {
  constructor(
    public readonly fragment: Fragment,
    public readonly visible: boolean
  ) {}
}

export const systemInfo = {
  windowWidth: 0,
  windowHeight: 0
};