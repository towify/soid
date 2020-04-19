import "./extension/array_extension";
import "./extension/html_element_extension";
import "./extension/number_extension";
import "./extension/string_extension";
import "./extension/object_extension";
import { Fragment } from "./base/fragment/fragment";
export declare abstract class App {
    #private;
    readonly childFragment: ChildFragmentModel[];
    protected constructor();
    protected abstract onCreate(): Promise<void>;
    protected onStart(): Promise<void>;
    protected onResume(): Promise<void>;
    protected onPause(): Promise<void>;
    protected onDestroy(): Promise<void>;
    protected addFragment(model: ChildFragmentModel): Promise<void>;
    replaceFragment(newFragment: Fragment, oldFragment: Fragment): Promise<void>;
    removeFragment(fragment: Fragment): Promise<void>;
    commit(): Promise<void>;
    protected beforeAttachedToBody(): Promise<void>;
    private getTargetChildFragmentPosition;
}
export declare class ChildFragmentModel {
    readonly fragment: Fragment;
    readonly visible: boolean;
    constructor(fragment: Fragment, visible: boolean);
}
export declare const systemInfo: {
    windowWidth: number;
    windowHeight: number;
};
