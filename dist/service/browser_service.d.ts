export declare class BrowserService {
    #private;
    private static service;
    static getInstance(): BrowserService;
    private constructor();
    register<T>(type: BrowserServiceType, event: (value: T) => void): this;
    unregister<T>(type: BrowserServiceType, event: (value: T) => void): this;
    destroy(): void;
}
export declare enum BrowserServiceType {
    VisibilityChange = "visibilitychange",
    Resize = "resize",
    Click = "click"
}
