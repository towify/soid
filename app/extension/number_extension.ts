/*
 * @author kaysaith
 * @date 2020/3/12 21:23
 */

declare global {
  interface Number {
    forEach(hold: (index: number) => void): void;
  }
}

Number.prototype.forEach = function (hold: (index: number) => void) {
  for (let index = 0; index < this; index++) {
    hold(index);
  }
};

export {};