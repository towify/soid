import { View } from "../base/view";
import { RelativeLayout } from "./relative_layout";
export declare class GridLayout extends View {
    #private;
    readonly subviews: RelativeLayout[];
    constructor();
    setColumnGap(gap: number): this;
    setRowGap(gap: number): this;
    private updateGridTemplateColumns;
    private updateGridTemplateRows;
    addColumn(columnWidth: string): this;
    addRow(rowHeight: string): this;
    addView(view: View, row: number, column: number): void;
    private addSubview;
}
