/*
 * @author kaysaith
 * @date 2020/3/11 12:44
 */
Array.prototype.isEmpty = function () {
    return !this.length;
};
Array.prototype.lastIndex = function () {
    return this.length - 1;
};
Array.prototype.drop = function (action) {
    const length = this.length;
    const result = [];
    for (let index = 0; index < length; index++) {
        const item = this[index];
        if (!action(item, index)) {
            result.push(item);
        }
    }
    return result;
};
Array.prototype.forEachFromEnd = function (action) {
    const length = this.length;
    for (let index = length - 1; index >= 0; index--) {
        action(this[index]);
    }
};
Array.prototype.firstOf = function (action) {
    const length = this.length;
    for (let index = 0; index < length; index++) {
        const item = this[index];
        if (action(item)) {
            return item;
        }
    }
    throw new Error("there is none matched element");
};
Array.prototype.firstOfOrNull = function (action) {
    const length = this.length;
    for (let index = 0; index < length; index++) {
        const item = this[index];
        if (action(item)) {
            return item;
        }
    }
    return undefined;
};
Array.prototype.lastOfOrNull = function (action) {
    const length = this.length;
    for (let index = length - 1; index >= 0; index--) {
        const item = this[index];
        if (action(item)) {
            return item;
        }
    }
    return undefined;
};
Array.prototype.first = function () {
    if (!this.length) {
        throw new Error("empty array");
    }
    return this[0];
};
Array.prototype.last = function () {
    const length = this.length;
    if (!length) {
        throw new Error("empty array");
    }
    return this[length - 1];
};
Array.prototype.firstOrNull = function () {
    return this.length ? this[0] : undefined;
};
Array.prototype.lastOrNull = function () {
    return this.length ? this[this.length - 1] : undefined;
};
Array.prototype.contains = function (type) {
    const length = this.length;
    for (let index = 0; index < length; index++) {
        if (this[index] instanceof type) {
            return true;
        }
    }
    return false;
};
Array.prototype.count = function (action) {
    let count = 0;
    const length = this.length;
    for (let index = 0; index < length; index++) {
        if (action(this[index])) {
            count += 1;
        }
    }
    return count;
};
Array.prototype.all = function (action) {
    let hasDifferent = false;
    const length = this.length;
    for (let index = 0; index < length; index++) {
        if (!action(this[index])) {
            hasDifferent = true;
        }
    }
    return !hasDifferent;
};
Array.prototype.any = function (action) {
    const length = this.length;
    for (let index = 0; index < length; index++) {
        if (action(this[index])) {
            return true;
        }
    }
    return false;
};
Array.prototype.none = function (action) {
    const length = this.length;
    for (let index = 0; index < length; index++) {
        if (action(this[index])) {
            return false;
        }
    }
    return true;
};
Array.prototype.deleteItem = function (targetItem) {
    const index = this.indexOf(targetItem);
    if (index > -1) {
        this.splice(index, 1);
    }
};
