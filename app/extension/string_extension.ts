/*
 * @author kaysaith
 * @date 2020/3/13 11:16
 */

declare global {
  // tslint:disable-next-line:interface-name
  interface String {
    isEmpty(): boolean;

    pickNumber(): number | undefined
  }
}

String.prototype.isEmpty = function () {
  return this.length === 0;
};

String.prototype.pickNumber = function () {
  const result = this.replace(/[^0-9]/ig, "");
  return result ? parseInt(result) : undefined;
};

export {};