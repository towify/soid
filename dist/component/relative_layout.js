/*
 * @author kaysaith
 * @date 2020/3/12 19:46
 */
import { ViewGroup } from "../base/view_group";
import { ViewPosition } from "../value/style/style";
export class RelativeLayout extends ViewGroup {
    constructor() {
        super();
        this.setPosition(ViewPosition.Relative);
    }
    addView(view) {
        view.setPosition(ViewPosition.Absolute);
        super.addView(view);
    }
    addDomFragment(domFragment) {
        domFragment._beforeAttached(view => {
            view.setPosition(ViewPosition.Absolute);
        }).then(_ => {
            this._element.appendChild(domFragment.fragment);
        });
    }
}
