/*
 * @author kaysaith
 * @date 2020/3/17 21:48
 */

import { ViewGroup } from "../../base/view_group";
import { WillChangeType } from "../../value/style";

export abstract class RecyclerViewHolder extends ViewGroup {

  protected constructor() {
    super();
    this
      .setHeight(this.getHeight())
      .setWillChange(WillChangeType.Transform);
  }

  get className() {
    return this.constructor.name;
  }

  public abstract getHeight(): number;
}


export class RecyclerViewHolderType {
  constructor(
    public holder: new () => RecyclerViewHolder,
    public position: RecyclerViewHolderPosition | number = RecyclerViewHolderPosition.Default,
    public height: number = 0,
    public y: number = 0
  ) {

  }
}

export enum RecyclerViewHolderPosition {
  Header = 0,
  Default = -1,
  Footer = -2
}

export const SpecialViewHolderPosition = [0, -2];