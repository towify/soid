/*
 * @author kaysaith
 * @date 2020/3/11 15:56
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
HTMLElement.prototype.addDomFragment = function (domFragment) {
    return __awaiter(this, void 0, void 0, function* () {
        yield domFragment._beforeAttached();
        yield this.appendChild(domFragment.fragment);
    });
};
HTMLElement.prototype.addView = function (view) {
    return __awaiter(this, void 0, void 0, function* () {
        yield view._prepareLifeCycle();
        yield this.appendChild(view._element);
    });
};
