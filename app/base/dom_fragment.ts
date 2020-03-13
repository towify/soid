/*
 * @author kaysaith
 * @date 2020/3/11 14:07
 */

import { View } from "./view";

export class DomFragment {
  public readonly fragment = document.createDocumentFragment();
  public holdView: View;

  constructor() {
  }

  public addView<V extends View>(view: V) {
    this.holdView = view;
    view._prepareLifeCycle().then(_ => {
      this.fragment.appendChild(view._element);
    });
  };
}