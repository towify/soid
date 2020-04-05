import { ViewGroup } from "../../base/view_group";
import { View } from "../../base/view";
export declare class FolderView extends ViewGroup {
    #private;
    constructor();
    addItem(item: FolderItem, parentID?: string): this;
}
export declare class FolderItem extends ViewGroup {
    #private;
    constructor();
    get isFolded(): boolean;
    setModel(model: FolderItemModel): this;
    fold(status: boolean): this;
    getItemByID(id: string, hold: (item: FolderItem) => void): void;
    addView(view: View): void;
    beforeAttached(): Promise<any>;
}
export declare type FolderItemModel = {
    iconPath: string;
    title: string;
    isParent?: boolean;
};
