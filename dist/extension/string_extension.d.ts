declare global {
    interface String {
        isEmpty(): boolean;
        pickNumber(): number | undefined;
    }
}
export {};
