import { DomFragment } from "../base/dom_fragment";
import { View } from "../base/view";
declare global {
    interface HTMLElement {
        addDomFragment(domFragment: DomFragment): void;
        addView(view: View): void;
    }
}
export {};
