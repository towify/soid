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

  public addDomFragment(domFragment: DomFragment) {
    domFragment._beforeAttached(view => {
      view.setPosition(ViewPosition.Absolute);
    }).then(_ => {
      this._element.appendChild(domFragment.fragment);
    });
  }
}