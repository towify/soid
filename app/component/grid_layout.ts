/*
 * @author kaysaith
 * @date 2020/3/12 19:58
 */

import { DisplayType, StyleTag } from "../value/style/style";
import { View } from "../base/view";
import { RelativeLayout } from "./relative_layout";

export class GridLayout extends View {
  readonly subviews: RelativeLayout[] = [];
  #columnTemplate: string[] = [];
  #rowTemplate: string[] = [];
  #rowCount = 0;
  #columnCount = 0;

  constructor() {
    super();
    this.setDisplay(DisplayType.Grid);
  }

  public setColumnGap(gap: number) {
    this.style.addRule(StyleTag.ColumnGap, `${gap}px`);
    return this;
  }

  public setRowGap(gap: number) {
    this.style.addRule(StyleTag.RowGap, `${gap}px`);
    return this;
  }

  private updateGridTemplateColumns() {
    this.style.addRule(StyleTag.GridTemplateColumns, this.#columnTemplate.join(" "));
    return this;
  }

  private updateGridTemplateRows() {
    this.style.addRule(StyleTag.GridTemplateRows, this.#rowTemplate.join(" "));
    return this;
  }

  public addColumn(columnWidth: string) {
    this.#columnCount += 1;
    this.#columnTemplate.push(columnWidth);
    this.updateGridTemplateColumns();
    this.addSubview();
    return this;
  }

  public addRow(rowHeight: string) {
    this.#rowCount += 1;
    this.#rowTemplate.push(rowHeight);
    this.updateGridTemplateRows();
    this.addSubview();
    return this;
  }

  addView(view: View, row: number, column: number) {
    if (!this.subviews.length) {
      throw Error("you don't have column or row can add view, Add them before you add view");
    } else if (this.subviews.length === 1) {
      this.subviews[0].addView(view);
    } else {
      if (row >= this.#rowCount || column >= this.#columnCount) {
        throw Error("invalid row number or column number");
      } else {
        let targetIndex = row * this.#columnCount + column;
        this.subviews[targetIndex].addView(view);
      }
    }
  }

  private addSubview() {
    const row = this.#rowCount || 1;
    const column = this.#columnCount || 1;
    const offsetCount = Math.abs(row * column) - this.subviews.length;
    offsetCount.forEach(_ => {
      const subview = new RelativeLayout()
        .setPercentHeight(100)
        .setPercentWidth(100);
      this.subviews.push(subview);
      subview._prepareLifeCycle().then(_ => {
        this._element.appendChild(subview._element);
      });
    });
  }
}