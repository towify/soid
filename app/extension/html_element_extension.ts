/*
 * @author kaysaith
 * @date 2020/3/11 15:56
 */


import { DomFragment } from "../base/dom_fragment";

declare global {
  interface HTMLElement {
    addDomFragment(domFragment: DomFragment): void
  }
}

HTMLElement.prototype.addDomFragment = function (domFragment) {
  domFragment._beforeAttached().then(_ => {
    this.appendChild(domFragment.fragment);
  });
};

export {};