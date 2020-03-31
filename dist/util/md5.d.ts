export declare class Md5 {
    static hashStr(str: string, raw?: boolean): string | Int32Array | undefined;
    static hashAsciiStr(str: string, raw?: boolean): string | Int32Array | undefined;
    private static stateIdentity;
    private static buffer32Identity;
    private static hexChars;
    private static hexOut;
    private static onePassHasher;
    private static _hex;
    private static _md5cycle;
    private _dataLength;
    private _bufferLength;
    private _state;
    private _buffer;
    private readonly _buffer8;
    private readonly _buffer32;
    constructor();
    start(): this;
    appendStr(str: string): this;
    appendAsciiStr(str: string): this;
    appendByteArray(input: Uint8Array): this;
    getState(): {
        buffer: any;
        buflen: number;
        length: number;
        state: number[];
    };
    setState(state: any): void;
    end(raw?: boolean): string | Int32Array | undefined;
}
