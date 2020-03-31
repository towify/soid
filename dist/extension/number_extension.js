/*
 * @author kaysaith
 * @date 2020/3/12 21:23
 */
Number.prototype.forEach = function (hold) {
    for (let index = 0; index < this; index++) {
        hold(index);
    }
};
Number.prototype.reverseForEach = function (hold) {
    for (let index = this; index >= 0; index--) {
        hold(index);
    }
};
Number.prototype.map = function () {
    const result = [];
    for (let index = 0; index <= this; index++) {
        result.push(index);
    }
    return result;
};
