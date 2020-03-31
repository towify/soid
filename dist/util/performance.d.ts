export declare function debounce<T extends any[]>(action: (...args: T) => any, timeout: number): (...args: T) => void;
export declare function delay(ms: number): Promise<unknown>;
export declare function throttle<T extends (...args: any[]) => any>(func: T, threshhold?: number, scope?: any): T;
