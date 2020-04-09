/*
 * @author kaysaith
 * @date 2020/3/11 14:07
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
export class DomFragment {
    constructor() {
        this.fragment = document.createDocumentFragment();
        this.hodViews = [];
    }
    addView(view) {
        this.hodViews.push(view);
    }
    ;
    _beforeAttached() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const view of this.hodViews) {
                yield view._prepareLifeCycle();
                this.fragment.appendChild(view._element);
            }
        });
    }
}
