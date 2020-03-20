/*
 * @author kaysaith
 * @date 2020/3/11 00:56
 */

import { View } from "./view";
import { DomFragment } from "./dom_fragment";
import { DisplayType, StyleTag } from "../value/style";

export class ViewGroup extends View {
  readonly subviews: View[] = [];

  constructor(element?: HTMLDivElement) {
    super(element);
  }

  // Basic Dom Operation Methods
  public addView(view: View) {
    this.subviews.push(view);
    view._prepareLifeCycle().then(_ => {
      this._element.appendChild(view._element);
    });
  }

  public setDisplay(type: DisplayType): this {
    if (type === DisplayType.None) {
      if (this.isDisplayNone !== undefined) this.onHide();
      this.subviews.forEach(view => view.onHide());
      this.isDisplayNone = true;
    } else {
      if (this.isDisplayNone) {
        this.onShow();
        this.subviews.forEach(view => view.onShow());
        this.isDisplayNone = false;
      }
    }
    this.style.addRule(StyleTag.Display, type);
    return this;
  }

  public getSubviewByElement(element: HTMLDivElement) {
    return this.subviews.find(view => view._element === element);
  }

  public addDomFragment(domFragment: DomFragment) {
    domFragment._beforeAttached().then(_ => {
      domFragment.hodViews.forEach(view => this.subviews.push(view));
      this._element.appendChild(domFragment.fragment);
    });
  }

  public insertBefore(newView: View, oldView: View) {
    this._element.insertBefore(newView._element, oldView._element);
  }

  public replaceView(newView: View, oldView: View) {
    this._element.replaceChild(newView._element, oldView._element);
  }

  public clear(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.subviews.forEach(child => {
        child.remove();
      });
      resolve();
    });
  }
}