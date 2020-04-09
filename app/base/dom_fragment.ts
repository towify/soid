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

  public async _beforeAttached() {
    for (const view of this.hodViews) {
      await view._prepareLifeCycle();
      this.fragment.appendChild(view._element);
    }
  }
}