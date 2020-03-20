/*
 * @author kaysaith
 * @date 2020/3/19 21:25
 */
export function debounce<Params extends any[]>(
  action: (...args: Params) => any,
  timeout: number,
): (...args: Params) => void {
  let timer: number;
  return (...args: Params) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => action(...args), timeout);
  };
}