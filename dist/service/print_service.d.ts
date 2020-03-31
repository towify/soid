import { LinearLayout } from "../component/linear_layout";
import { ViewGroup } from "../base/view_group";
declare class PrintService extends LinearLayout {
    #private;
    static _instance: PrintService;
    constructor();
    static getInstance(): PrintService;
    register(key: string): this;
    mount<V extends ViewGroup>(parent: V): void;
    display(key: string, args: {
        [key: string]: string | number;
    }): void;
}
export declare const print: PrintService;
export {};
