/*
 * @author kaysaith
 * @date 2020/3/11 15:56
 */


import { DomFragment } from "../base/dom_fragment";
import { View } from "../base/view";

declare global {
  interface HTMLElement {
    addDomFragment(domFragment: DomFragment): void

    addView(view: View): void
  }
}

HTMLElement.prototype.addDomFragment = async function (domFragment) {
  await domFragment._beforeAttached();
  await this.appendChild(domFragment.fragment);
};
HTMLElement.prototype.addView = async function (view) {
  await view._prepareLifeCycle();
  await this.appendChild(view._element);
};
export {};