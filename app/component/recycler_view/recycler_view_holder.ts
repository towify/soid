/*
 * @author kaysaith
 * @date 2020/3/17 21:48
 */

import { ViewGroup } from "../../base/view_group";
import { WillChangeType } from "../../value/style/style";

export abstract class RecyclerViewHolder extends ViewGroup {

  protected constructor() {
    super();
    const size = this.getSize();
    if (!size.width) {
      this.setPercentWidth(100);
    } else {
      this.setWidth(size.width);
    }
    if (!size.height) {
      this.setPercentHeight(100);
    } else {
      this.setHeight(size.height);
    }
    this.setWillChange(WillChangeType.Transform);
  }

  get className() {
    return this.constructor.name;
  }

  public abstract getSize(): { width?: number, height?: number };
}


export class RecyclerViewHolderModel {
  constructor(
    public readonly holder: new () => RecyclerViewHolder,
    public readonly position: RecyclerViewHolderType | number = RecyclerViewHolderType.Default,
    public height: number = 0,
    public width: number = 0,
    public y: number = 0,
    public x: number = 0
  ) {

  }
}

export enum RecyclerViewHolderType {
  Header = 0,
  Default = -1,
  Footer = -2
}

export const SpecialViewHolderPosition = [0, -2];