/*
 * @author kaysaith
 * @date 2020/4/10 18:46
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ViewGroup } from "../view_group";
import { Input } from "../../component/input/input";
import { Color } from "../../value/color";
import { DisplayType, JustifyContent, StyleTag } from "../../value/style/style";
export class BaseInputGroup extends ViewGroup {
    constructor() {
        super();
        this
            .setDisplay(DisplayType.Grid)
            .setJustifyItem(JustifyContent.Center)
            .addStyleRule(StyleTag.GridTemplateColumns, "auto 40px");
        this.input = new Input()
            .setPercentWidth(100)
            .setLeftPadding(10)
            .setRightPadding(5)
            .removeClearButton()
            .setBackgroundColor(Color.none);
    }
    setInputType(type) {
        this.input.setType(type);
        return this;
    }
    setInputBorder(borderWidth, color) {
        this.input.addStyleRule(StyleTag.BoxShadow, `${borderWidth}px 0 0 ${color.value} inset, 0 ${borderWidth}px 0 ${color.value} inset, 0 -${borderWidth}px 0 ${color.value} inset`);
        return this;
    }
    setBackgroundColor(color) {
        this.input.setBackgroundColor(color);
        return this;
    }
    onFocus(action) {
        this.input.onFocus(action);
        return this;
    }
    onChange(hold) {
        this.input.onChange(hold);
        return this;
    }
    onBlur(action) {
        this.input.onBlur(action);
        return this;
    }
    setPlaceholder(value) {
        this.input.setPlaceholder(value);
        return this;
    }
    setPlaceholderColor(color) {
        this.input.setPlaceholderColor(color);
        return this;
    }
    setInputTextSize(value) {
        this.input.setTextSize(value);
        return this;
    }
    setInputTextColor(color) {
        this.input.setTextColor(color);
        return this;
    }
    beforeAttached() {
        const _super = Object.create(null, {
            beforeAttached: { get: () => super.beforeAttached }
        });
        return __awaiter(this, void 0, void 0, function* () {
            this.addView(this.input);
            _super.beforeAttached.call(this);
        });
    }
}
