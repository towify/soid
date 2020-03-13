/*
 * @author kaysaith
 * @date 2020/3/11 12:44
 */

declare global {
  // tslint:disable-next-line:interface-name
  interface Array<T> {
    isEmpty(): boolean

    findIndex(action: (item: T) => boolean): number

    none(action: (item: T) => boolean): boolean

    any(action: (item: T) => boolean): boolean

    all(action: (item: T) => boolean): boolean

    count(action: (item: T) => boolean): number

    contains<V>(type: { new(): V }): boolean

    lastOrNull(): T | null

    firstOrNull(): T | null

    first(): T

    last(): T

    firstOf(action: (item: T) => boolean): T

    firstOfOrNull(action: (item: T) => boolean): T | null

    lastOfOrNull(action: (item: T) => boolean): T | null

    forEachFromEnd(action: (item: T) => void): void

    drop(action: (item: T, index: number) => boolean): T[]

    lastIndex(): number

    deleteItem(targetItem: T): void
  }
}

Array.prototype.isEmpty = function (): boolean {
  return !this.length;
};

Array.prototype.lastIndex = function (): number {
  return this.length - 1;
};

Array.prototype.drop = function <T>(action: (item: T, index: number) => boolean): T[] {
  const length = this.length;
  const result: T[] = [];
  for (let index = 0; index < length; index++) {
    const item = this[index];
    if (!action(item, index)) {
      result.push(item);
    }
  }
  return result;
};

Array.prototype.forEachFromEnd = function <T>(action: (item: T) => void): void {
  const length = this.length;
  for (let index = length - 1; index >= 0; index--) {
    action(this[index]);
  }
};

Array.prototype.firstOf = function <T>(action: (item: T) => boolean): T {
  const length = this.length;
  for (let index = 0; index < length; index++) {
    const item = this[index];
    if (action(item)) {
      return item;
    }
  }
  throw new Error("there is none matched element");
};

Array.prototype.firstOfOrNull = function <T>(action: (item: T) => boolean): T | undefined {
  const length = this.length;
  for (let index = 0; index < length; index++) {
    const item = this[index];
    if (action(item)) {
      return item;
    }
  }
  return undefined;
};

Array.prototype.lastOfOrNull = function <T>(action: (item: T) => boolean): T | undefined {
  const length = this.length;
  for (let index = length - 1; index >= 0; index--) {
    const item = this[index];
    if (action(item)) {
      return item;
    }
  }
  return undefined;
};

Array.prototype.first = function <T>(): T | null {
  if (!this.length) {
    throw new Error("empty array");
  }
  return this[0];
};

Array.prototype.last = function <T>(): T | null {
  const length = this.length;
  if (!length) {
    throw new Error("empty array");
  }
  return this[length - 1];
};

Array.prototype.firstOrNull = function <T>(): T | undefined {
  return this.length ? this[0] : undefined;
};

Array.prototype.lastOrNull = function <T>(): T | undefined {
  return this.length ? this[this.length - 1] : undefined;
};

Array.prototype.contains = function <T, V>(type: { new(): V }): boolean {
  const length = this.length;
  for (let index = 0; index < length; index++) {
    if (this[index] instanceof type) {
      return true;
    }
  }
  return false;
};
Array.prototype.count = function <T>(action: (item: T) => boolean): number {
  let count = 0;
  const length = this.length;
  for (let index = 0; index < length; index++) {
    if (action(this[index])) {
      count += 1;
    }
  }
  return count;
};
Array.prototype.all = function <T>(action: (item: T) => boolean): boolean {
  let hasDifferent = false;
  const length = this.length;
  for (let index = 0; index < length; index++) {
    if (!action(this[index])) {
      hasDifferent = true;
    }
  }
  return !hasDifferent;
};
Array.prototype.any = function <T>(action: (item: T) => boolean): boolean {
  const length = this.length;
  for (let index = 0; index < length; index++) {
    if (action(this[index])) {
      return true;
    }
  }
  return false;
};
Array.prototype.none = function <T>(action: (item: T) => boolean): boolean {
  const length = this.length;
  for (let index = 0; index < length; index++) {
    if (action(this[index])) {
      return false;
    }
  }
  return true;
};

Array.prototype.deleteItem = function <T>(targetItem: T): void {
  const index = this.indexOf(targetItem);
  if (index > -1) {
    this.splice(index, 1);
  }
};
export {};