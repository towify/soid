/*
 * @author kaysaith
 * @date 2020/3/11 00:56
 */

import { View } from "./view";
import { DomFragment } from "./dom_fragment";
import { DisplayType, StyleTag } from "../value/style/style";
import { SequenceTaskManager } from "../manager/sequence_task_manager";

export class ViewGroup extends View {
  public subviews: View[] = [];
  #sequenceManager = new SequenceTaskManager();

  constructor(element?: HTMLDivElement) {
    super(element);
  }

  // Basic Dom Operation Methods
  public addView(view: View) {
    this.subviews.push(view);
    this.#sequenceManager.addTask((async () => {
      await view._prepareLifeCycle();
      this._element.appendChild(view._element);
    })).run();
  }

  public setDisplay(type: DisplayType): this {
    if (!this.initialDisplayType) {
      this.initialDisplayType = type;
    }
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

  public getSubviewByElement<T extends View>(element: HTMLDivElement) {
    return this.subviews.find(view => view._element === element) as T;
  }

  public addDomFragment(domFragment: DomFragment) {
    domFragment._beforeAttached().then(_ => {
      domFragment.hodViews.forEach(view => this.subviews.push(view));
      this._element.appendChild(domFragment.fragment);
    });
  }

  public insertBefore(newView: View, oldView: View) {
    newView.beforeAttached().then(() => {
      newView._prepareLifeCycle().then(() => {
        this._element.insertBefore(newView._element, oldView._element);
      });
    });
  }

  public replaceView(newView: View, oldView: View) {
    oldView.onDetached();
    newView.beforeAttached().then(() => {
      newView._prepareLifeCycle().then(() => {
        this._element.replaceChild(newView._element, oldView._element);
      });
    });
  }

  public clear(): void {
    this.subviews.forEach(child => {
      if (child instanceof ViewGroup) {
        child.clear();
      }
      child.remove();
    });
    this.subviews = [];
  }
}