/*
 * @author kaysaith
 * @date 2020/3/29 21:53
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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _tasks, _isRunning;
export class SequenceTaskManager {
    constructor() {
        _tasks.set(this, []);
        _isRunning.set(this, false);
    }
    addTask(task) {
        __classPrivateFieldGet(this, _tasks).push(task);
        return this;
    }
    run() {
        if (__classPrivateFieldGet(this, _isRunning))
            return;
        __classPrivateFieldSet(this, _isRunning, true);
        this._run();
    }
    _run() {
        (() => __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _tasks).length) {
                __classPrivateFieldSet(this, _isRunning, false);
                return;
            }
            yield __classPrivateFieldGet(this, _tasks)[0]();
            __classPrivateFieldGet(this, _tasks).splice(0, 1);
            this._run();
        }))();
    }
}
_tasks = new WeakMap(), _isRunning = new WeakMap();
