import { Fragment } from "./fragment";
export interface IFragment {
    addFragment(fragment: Fragment): void;
    replaceFragment(newFragment: Fragment, oldFragment: Fragment): void;
    removeFragment(fragment: Fragment): void;
    listenBrowserEvents(needListen: boolean): void;
    onResize(hold: (event: UIEvent) => void): void;
    afterResized(hold: (event: UIEvent) => void): void;
}
