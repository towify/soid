import { Style } from "./style";
export declare class GlobalStyle {
    #private;
    private static globalStyle;
    addTag(tag: string, hold: (style: Style) => void): void;
    static getInstance(): GlobalStyle;
    attachStyle(): void;
    detachStyle(): void;
}
