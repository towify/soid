/*
 * @author kaysaith
 * @date 2020/3/20 13:32
 */

import { Fragment } from "./fragment";

export interface IFragment {
  addFragment(fragment: Fragment): void

  replaceFragment(newFragment: Fragment, oldFragment: Fragment): void

  removeFragment(fragment: Fragment): void

  listenBrowserEvents(needListen: boolean): void

  onResize(hold: (event: UIEvent) => void): void

  afterResized(hold: (event: UIEvent) => void): void
}