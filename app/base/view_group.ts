/*
 * @author kaysaith
 * @date 2020/3/11 00:56
 */

import { View } from "./view";

export class ViewGroup extends View {
  readonly subviews: View[] = [];

  constructor() {
    super();
  }

  // Basic Dom Operation Methods
  addView(view: View) {
    this.subviews.push(view);
    view._prepareLifeCycle().then(_ => {
      this._element.appendChild(view._element);
    });
  }

  public insertBefore(newView: View, oldView: View) {
    this._element.insertBefore(newView._element, oldView._element);
  }

  public replaceView(newView: View, oldView: View) {
    this._element.replaceChild(newView._element, oldView._element);
  }
}