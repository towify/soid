/*
 * @author kaysaith
 * @date 2020/3/12 18:17
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
import { TextType, TextView } from "../text_view";
import { Align, Cursor } from "../../value/style/style";
export class Button extends TextView {
    constructor() {
        super();
        this
            .setTextType(TextType.Inherit)
            .setCursor(Cursor.Pointer)
            .setOverflow("hidden")
            .setTextAlign(Align.Left)
            .setTextWeight("500")
            .setMinWidth(60);
    }
    beforeAttached() {
        const _super = Object.create(null, {
            beforeAttached: { get: () => super.beforeAttached }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.beforeAttached.call(this);
            this.setMinHeight(30);
        });
    }
    setRadius(radius) {
        if (!this.hasHorizontalPadding) {
            this.setLeftPadding(radius)
                .setRightPadding(radius);
        }
        return super.setRadius(radius);
    }
}
