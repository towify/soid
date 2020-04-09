import { View } from "./view";
export declare class DomFragment {
    readonly fragment: DocumentFragment;
    hodViews: View[];
    constructor();
    addView<V extends View>(view: V): void;
    _beforeAttached(): Promise<void>;
}
