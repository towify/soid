/*
 * @author kaysaith
 * @date 2020/3/12 19:58
 */
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _columnTemplate, _rowTemplate, _rowCount, _columnCount;
import { DisplayType, StyleTag } from "../value/style/style";
import { View } from "../base/view";
import { RelativeLayout } from "./relative_layout";
export class GridLayout extends View {
    constructor() {
        super();
        this.subviews = [];
        _columnTemplate.set(this, []);
        _rowTemplate.set(this, []);
        _rowCount.set(this, 0);
        _columnCount.set(this, 0);
        this.setDisplay(DisplayType.Grid);
    }
    setColumnGap(gap) {
        this.style.addRule(StyleTag.ColumnGap, `${gap}px`);
        return this;
    }
    setRowGap(gap) {
        this.style.addRule(StyleTag.RowGap, `${gap}px`);
        return this;
    }
    updateGridTemplateColumns() {
        this.style.addRule(StyleTag.GridTemplateColumns, __classPrivateFieldGet(this, _columnTemplate).join(" "));
        return this;
    }
    updateGridTemplateRows() {
        this.style.addRule(StyleTag.GridTemplateRows, __classPrivateFieldGet(this, _rowTemplate).join(" "));
        return this;
    }
    addColumn(columnWidth) {
        __classPrivateFieldSet(this, _columnCount, __classPrivateFieldGet(this, _columnCount) + 1);
        __classPrivateFieldGet(this, _columnTemplate).push(columnWidth);
        this.updateGridTemplateColumns();
        this.addSubview();
        return this;
    }
    addRow(rowHeight) {
        __classPrivateFieldSet(this, _rowCount, __classPrivateFieldGet(this, _rowCount) + 1);
        __classPrivateFieldGet(this, _rowTemplate).push(rowHeight);
        this.updateGridTemplateRows();
        this.addSubview();
        return this;
    }
    addView(view, row, column) {
        if (!this.subviews.length) {
            throw Error("you don't have column or row can add view, Add them before you add view");
        }
        else if (this.subviews.length === 1) {
            this.subviews[0].addView(view);
        }
        else {
            if (row >= __classPrivateFieldGet(this, _rowCount) || column >= __classPrivateFieldGet(this, _columnCount)) {
                throw Error("invalid row number or column number");
            }
            else {
                let targetIndex = row * __classPrivateFieldGet(this, _columnCount) + column;
                this.subviews[targetIndex].addView(view);
            }
        }
    }
    addSubview() {
        const row = __classPrivateFieldGet(this, _rowCount) || 1;
        const column = __classPrivateFieldGet(this, _columnCount) || 1;
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
_columnTemplate = new WeakMap(), _rowTemplate = new WeakMap(), _rowCount = new WeakMap(), _columnCount = new WeakMap();
