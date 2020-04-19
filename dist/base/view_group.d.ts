import { View } from "./view";
import { DomFragment } from "./dom_fragment";
import { DisplayType } from "../value/style/style";
export declare class ViewGroup extends View {
    #private;
    readonly children: Set<View>;
    constructor(element?: HTMLDivElement);
    addView(view: View): void;
    setDisplay(type: DisplayType): this;
    getSubviewByElement<T extends View>(element: HTMLDivElement | EventTarget): T | undefined;
    addDomFragment(domFragment: DomFragment): Promise<void>;
    insertBefore(newView: View, oldView: View): void;
    replaceView(newView: View, oldView: View): void;
    clear(): void;
}
