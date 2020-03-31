import { Nullable } from "../util/value_checker";
declare class SharedPreference {
    static sharedPreference: SharedPreference | undefined;
    static getInstance(): SharedPreference;
    private redis;
    constructor();
    delete(key: string): Promise<unknown>;
    get(key: string): Nullable<string>;
    save(key: string, value: string): Promise<unknown>;
}
export declare const Shared: SharedPreference;
export {};
