/*
 * @author kaysaith
 * @date 2020/3/22 19:27
 */

import { View } from "../../base/view";

export interface ISwiper<Slider extends View> {

  setIntervalTime(timestamp: number): this

  setItemType(slider: { new(): Slider }): this

  setData<M>(models: M[], onBind: (slider: Slider, model: M) => void): void

}