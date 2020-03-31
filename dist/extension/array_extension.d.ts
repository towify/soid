declare global {
    interface Array<T> {
        isEmpty(): boolean;
        findIndex(action: (item: T) => boolean): number;
        none(action: (item: T) => boolean): boolean;
        any(action: (item: T) => boolean): boolean;
        all(action: (item: T) => boolean): boolean;
        count(action: (item: T) => boolean): number;
        contains<V>(type: {
            new (): V;
        }): boolean;
        lastOrNull(): T | null;
        firstOrNull(): T | null;
        first(): T;
        last(): T;
        firstOf(action: (item: T) => boolean): T;
        firstOfOrNull(action: (item: T) => boolean): T | null;
        lastOfOrNull(action: (item: T) => boolean): T | null;
        forEachFromEnd(action: (item: T) => void): void;
        drop(action: (item: T, index: number) => boolean): T[];
        lastIndex(): number;
        deleteItem(targetItem: T): void;
    }
}
export {};
