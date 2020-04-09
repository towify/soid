/*
 * @author kaysaith
 * @date 2020/3/12 19:46
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
import { ViewGroup } from "../base/view_group";
import { ViewPosition } from "../value/style/style";
export class RelativeLayout extends ViewGroup {
    constructor() {
        super();
        this.setPosition(ViewPosition.Relative);
    }
    addView(view) {
        view.setPosition(ViewPosition.Absolute);
        super.addView(view);
    }
    addDomFragment(domFragment) {
        return __awaiter(this, void 0, void 0, function* () {
            yield domFragment.hodViews.forEach(view => {
                view.setPosition(ViewPosition.Absolute);
            });
            yield domFragment._beforeAttached();
            yield this._element.appendChild(domFragment.fragment);
        });
    }
}
