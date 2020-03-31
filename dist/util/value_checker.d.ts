export declare class ValueChecker {
    static isHexColor(value: string): boolean;
    static isRGBAColor(value: string): boolean;
    static isEmail(value: string): boolean;
    static isPhoneNumber(phone: string): boolean;
    static isValidPassword(password: string): boolean;
    static isIdentification(id: string): boolean;
    static isURL(url: string): boolean;
    static isImage(src: string): boolean;
    static isValidSMSCode(smsCode: string): boolean;
    static isNotNull<T>(item: T | undefined | null, hold: (it: T) => void): Nullable<T>;
}
export declare class Nullable<T> {
    readonly status: boolean;
    readonly value?: T | undefined;
    constructor(status: boolean, value?: T | undefined);
    orElse(action: () => void): void;
    isNotNull(hold: (result: T) => void): this;
}
