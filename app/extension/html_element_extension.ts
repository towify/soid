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

HTMLElement.prototype.addDomFragment = function (domFragment) {
  domFragment._beforeAttached().then(_ => {
    this.appendChild(domFragment.fragment);
  });
};
HTMLElement.prototype.addView = function (view) {
  view._prepareLifeCycle().then(_ => {
    this.appendChild(view._element);
  });
};
export {};