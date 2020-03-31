/*
 * @author kaysaith
 * @date 2020/3/17 21:48
 */
import { ViewGroup } from "../../base/view_group";
import { WillChangeType } from "../../value/style/style";
export class RecyclerViewHolder extends ViewGroup {
    constructor() {
        super();
        const size = this.getSize();
        if (!size.width) {
            this.setPercentWidth(100);
        }
        else {
            this.setWidth(size.width);
        }
        if (!size.height) {
            this.setPercentHeight(100);
        }
        else {
            this.setHeight(size.height);
        }
        this.setWillChange(WillChangeType.Transform);
    }
    get className() {
        return this.constructor.name;
    }
}
export class RecyclerViewHolderModel {
    constructor(holder, position = RecyclerViewHolderType.Default, height = 0, width = 0, y = 0, x = 0) {
        this.holder = holder;
        this.position = position;
        this.height = height;
        this.width = width;
        this.y = y;
        this.x = x;
    }
}
export var RecyclerViewHolderType;
(function (RecyclerViewHolderType) {
    RecyclerViewHolderType[RecyclerViewHolderType["Header"] = 0] = "Header";
    RecyclerViewHolderType[RecyclerViewHolderType["Default"] = -1] = "Default";
    RecyclerViewHolderType[RecyclerViewHolderType["Footer"] = -2] = "Footer";
})(RecyclerViewHolderType || (RecyclerViewHolderType = {}));
export const SpecialViewHolderPosition = [0, -2];
