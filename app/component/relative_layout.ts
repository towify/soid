/*
 * @author kaysaith
 * @date 2020/3/12 19:46
 */

import { ViewGroup } from "../base/view_group";
import { ViewPosition } from "../value/style/style";
import { View } from "../base/view";
import { DomFragment } from "../base/dom_fragment";

export class RelativeLayout extends ViewGroup {
  constructor() {
    super();
    this.setPosition(ViewPosition.Relative);
  }

  public addView(view: View) {
    view.setPosition(ViewPosition.Absolute);
    super.addView(view);
  }

  public async addDomFragment(domFragment: DomFragment) {
    await domFragment.hodViews.forEach(view => {
      view.setPosition(ViewPosition.Absolute);
    });
    await domFragment._beforeAttached();
    await this._element.appendChild(domFragment.fragment);
  }
}