import { ViewGroup } from "../../base/view_group";
import { View } from "../../base/view";
export declare class FolderView extends ViewGroup {
    readonly subItems: FolderItem[];
    constructor();
    getItemById(id: string, hold: (item: FolderItem) => void): void;
    addItem(item: FolderItem, parent?: FolderItem): this;
    removeChildItem(item: FolderItem): void;
}
export declare class FolderItem extends ViewGroup {
    #private;
    readonly subItems: FolderItem[];
    constructor();
    get isFolded(): boolean;
    get model(): FolderItemModel | undefined;
    get parentItem(): FolderItem | undefined;
    setParentItem(parentItem: FolderItem): this;
    setModel(model: FolderItemModel): this;
    fold(status: boolean): this;
    getItemByID(id: string, hold: (item: FolderItem) => void): void;
    addView(view: View): void;
    addItem(item: FolderItem): void;
    removeChildItem(item: FolderItem): this;
    removeSelf(): this;
    isEmptyFold(): this;
    private removeSubItem;
    beforeAttached(): Promise<any>;
    private dropArrowStyle;
}
export declare type FolderItemModel = {
    iconPath: string;
    name: string;
    isParent?: boolean;
};
