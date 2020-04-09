import { ViewGroup } from "../base/view_group";
import { View } from "../base/view";
import { DomFragment } from "../base/dom_fragment";
export declare class RelativeLayout extends ViewGroup {
    constructor();
    addView(view: View): void;
    addDomFragment(domFragment: DomFragment): Promise<void>;
}
