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


export class RecyclerViewHolderModel {
  constructor(
    public holder: new () => RecyclerViewHolder,
    public position: RecyclerViewHolderType | number = RecyclerViewHolderType.Default,
    public height: number = 0,
    public y: number = 0
  ) {

  }
}

export enum RecyclerViewHolderType {
  Header = 0,
  Default = -1,
  Footer = -2
}

export const SpecialViewHolderPosition = [0, -2];