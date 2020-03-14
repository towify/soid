/*
 * @author kaysaith
 * @date 2020/3/11 14:07
 */

import { View } from "./view";

export class DomFragment {
  public readonly fragment = document.createDocumentFragment();
  public hodViews: View[] = [];

  constructor() {
  }

  public addView<V extends View>(view: V) {
    this.hodViews.push(view);
  };

  public async _beforeAttached(hold?: (view: View) => void) {
    for (const view of this.hodViews) {
      if (typeof hold === "function") hold(view);
      await view._prepareLifeCycle();
      this.fragment.appendChild(view._element);
    }
  }
}