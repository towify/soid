/*
 * @author kaysaith
 * @date 2020/3/19 21:25
 */
export function debounce<T extends any[]>(
  action: (...args: T) => any,
  timeout: number,
): (...args: T) => void {
  let timer: number;
  return (...args: T) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => action(...args), timeout);
  };
}

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  threshhold: number = 20,
  scope?: any
): T {
  if (threshhold < 0) {
    throw new TypeError("invalid thresh hold value.");
  }

  let timer: number = 0;
  let rtn: any;

  return <T>function (this: any, ...args: any[]): any {
    if (!timer) {
      const ctx = typeof scope === "undefined" ? this : scope;
      timer = setTimeout(() => {
        timer = 0;
        rtn = func.apply(ctx, args);
      }, threshhold);
    }
    return rtn;
  };
}