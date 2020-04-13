/*
 * @author kaysaith
 * @date 2020/3/11 00:56
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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _sequenceManager;
import { View } from "./view";
import { DisplayType, StyleTag } from "../value/style/style";
import { SequenceTaskManager } from "../manager/sequence_task_manager";
export class ViewGroup extends View {
    constructor(element) {
        super(element);
        this.children = new Set();
        _sequenceManager.set(this, new SequenceTaskManager());
    }
    // Basic Dom Operation Methods
    addView(view) {
        this.children.add(view);
        __classPrivateFieldGet(this, _sequenceManager).addTask((() => __awaiter(this, void 0, void 0, function* () {
            yield view._prepareLifeCycle();
            this._element.appendChild(view._element);
        }))).run();
    }
    setDisplay(type) {
        if (!this.initialDisplayType) {
            this.initialDisplayType = type;
        }
        if (type === DisplayType.None) {
            if (this.isDisplayNone !== undefined)
                this.onHide();
            this.children.forEach(child => child.onHide());
            this.isDisplayNone = true;
        }
        else {
            if (this.isDisplayNone) {
                this.onShow();
                this.children.forEach(child => child.onShow());
                this.isDisplayNone = false;
            }
        }
        this.style.addRule(StyleTag.Display, type);
        return this;
    }
    getSubviewByElement(element) {
        const childViews = this.children.values();
        for (const view of childViews) {
            if (view._element === element) {
                return view;
            }
        }
        return undefined;
    }
    addDomFragment(domFragment) {
        return __awaiter(this, void 0, void 0, function* () {
            yield domFragment._beforeAttached();
            yield domFragment.hodViews.forEach(view => this.children.add(view));
            yield this._element.appendChild(domFragment.fragment);
        });
    }
    insertBefore(newView, oldView) {
        newView.beforeAttached().then(() => {
            newView._prepareLifeCycle().then(() => {
                this._element.insertBefore(newView._element, oldView._element);
            });
        });
    }
    replaceView(newView, oldView) {
        oldView.onDetached();
        newView.beforeAttached().then(() => {
            newView._prepareLifeCycle().then(() => {
                this._element.replaceChild(newView._element, oldView._element);
            });
        });
    }
    clear() {
        this.children.forEach(child => {
            if (child instanceof ViewGroup) {
                child.clear();
            }
            child.remove();
        });
        this.children.clear();
    }
}
_sequenceManager = new WeakMap();
