/*
 * @author kaysaith
 * @date 2020/3/16 15:08
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
var _dashboards, _hasDisplayed;
import { LinearLayout } from "../component/linear_layout";
import { TextType, TextView, WhiteSpace } from "../component/text_view";
import { DisplayType, ViewPosition } from "../value/style/style";
import { Color, RGBA } from "../value/color";
class PrintService extends LinearLayout {
    constructor() {
        super();
        _dashboards.set(this, []);
        _hasDisplayed.set(this, false);
        this
            .setPosition(ViewPosition.Fixed)
            .setMinWidth(300)
            .setTop(0)
            .setLeft(0)
            .setBackDropFilter("blur(20px)")
            .setBackgroundColor(new Color(new RGBA(0, 0, 0, 0.8)))
            .setBorder("2px solid rgba(255,255,255,0.15)")
            .setZIndex(9999)
            .setDisplay(DisplayType.None);
    }
    static getInstance() {
        if (this._instance) {
            return this._instance;
        }
        else {
            this._instance = new PrintService();
            return this._instance;
        }
    }
    register(key) {
        const validKey = key.replace(/\s+/g, "");
        const value = {};
        value[validKey] = new TextView()
            .setPercentWidth(100)
            .setPercentHeight(50)
            .setTextType(TextType.Large)
            .setWhiteSpace(WhiteSpace.Pre)
            .setTextWeight("bold")
            .setBorder("2px solid rgba(255,255,255,0.15)")
            .setHorizontalPadding(30)
            .setMinHeight(300)
            .setVerticalPadding(30)
            .setTextColor(Color.white);
        __classPrivateFieldGet(this, _dashboards).push(value);
        this.addView(value[validKey]);
        return this;
    }
    mount(parent) {
        parent.addView(this);
    }
    display(key, args) {
        var _a;
        if (!__classPrivateFieldGet(this, _hasDisplayed)) {
            this.setDisplay(DisplayType.Flex).updateStyle();
            __classPrivateFieldSet(this, _hasDisplayed, true);
        }
        const validKey = key.replace(/\s+/g, "");
        const target = ((_a = __classPrivateFieldGet(this, _dashboards)) === null || _a === void 0 ? void 0 : _a.find(item => item[validKey]))[validKey];
        if (target) {
            let result = `${key} \n\n`;
            Object.keys(args).forEach(key => {
                result += `${key} : ${args[key]} \n`;
            });
            result += `\n timestamp: ${new Date().getMilliseconds()}`;
            target.setText(result);
        }
    }
}
_dashboards = new WeakMap(), _hasDisplayed = new WeakMap();
export const print = PrintService.getInstance();
