declare global {
    interface Number {
        forEach(hold: (index: number) => void): void;
        reverseForEach(hold: (index: number) => void): void;
        map(): number[];
    }
}
export {};
