import { View } from "./view";
import { DomFragment } from "./dom_fragment";
import { DisplayType } from "../value/style/style";
export declare class ViewGroup extends View {
    #private;
    readonly subviews: View[];
    constructor(element?: HTMLDivElement);
    addView(view: View): void;
    setDisplay(type: DisplayType): this;
    getSubviewByElement(element: HTMLDivElement): View | undefined;
    addDomFragment(domFragment: DomFragment): void;
    insertBefore(newView: View, oldView: View): void;
    replaceView(newView: View, oldView: View): void;
    clear(): Promise<void>;
}
