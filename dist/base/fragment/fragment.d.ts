import { ViewGroup } from "../view_group";
import { IFragment } from "./fragment_interface";
export declare abstract class Fragment implements IFragment {
    #private;
    readonly childFragments: Set<Fragment>;
    readonly contentView: ViewGroup;
    protected onAttach(): Promise<void>;
    protected abstract onCreateView(context: ViewGroup): Promise<void>;
    protected onViewCreated(): Promise<void>;
    protected onStart(): Promise<void>;
    protected onResume(): Promise<void>;
    protected onPause(): Promise<void>;
    protected onDestroy(): Promise<void>;
    protected onDetached(): Promise<void>;
    constructor();
    onResize(hold: (event: UIEvent) => void): this;
    afterResized(hold: (event: UIEvent) => void): this;
    addFragment(fragment: Fragment): Promise<void>;
    replaceFragment(newFragment: Fragment, oldFragment: Fragment): Promise<void>;
    removeFragment(fragment: Fragment): Promise<void>;
    listenBrowserEvents(needListen: boolean): void;
    _beforeAttached(): Promise<void>;
    _beforeDestroyed(): Promise<void>;
}
