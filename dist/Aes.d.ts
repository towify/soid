export declare class AES {
    private readonly NK;
    private readonly NR;
    private readonly KEY;
    constructor(key: number[]);
    encrypt(block: number[]): number[];
    decrypt(block: number[]): number[];
    private createState;
    private stateToResult;
    private expandKey;
    private static roundConstant;
    private addRoundKey;
    private mixColumns;
    private shiftRows;
    private subBytes;
}
export declare const AES_NB = 4;
export declare const AES_SBOX: number[];
export declare const AES_INVERSE_SBOX: number[];
export declare const AES_R: number[];
export declare function coefAdd(a: number[], b: number[], d: number[]): void;
export declare function coefMult(a: number[], b: number[], d: number[]): void;
export declare function gmult(a: number, b: number): number;
export declare function rotWord(w: number[]): void;
export declare function subWord(w: number[]): void;
