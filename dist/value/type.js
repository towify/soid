/*
 * @author kaysaith
 * @date 2020/3/11 00:43
 */
var Platform;
(function (Platform) {
    Platform[Platform["Web"] = 0] = "Web";
    Platform[Platform["Mobile"] = 1] = "Mobile";
    Platform[Platform["MiniProgram"] = 2] = "MiniProgram";
})(Platform || (Platform = {}));
var ListenerType;
(function (ListenerType) {
    ListenerType["Click"] = "click";
    ListenerType["Input"] = "input";
    ListenerType["Focus"] = "focus";
    ListenerType["Blur"] = "blur";
    ListenerType["Scroll"] = "scroll";
    ListenerType["Wheel"] = "wheel";
    ListenerType["Mousemove"] = "mousemove";
    ListenerType["Mouseover"] = "mouseover";
    ListenerType["Mouseleave"] = "mouseleave";
    ListenerType["Mouseout"] = "mouseout";
    ListenerType["Mousedown"] = "mousedown";
    ListenerType["Mouseup"] = "mouseup";
    ListenerType["DOMNodeRemoved"] = "DOMNodeRemoved";
    ListenerType["DOMNodeInserted"] = "DOMNodeInserted";
    ListenerType["Animationend"] = "animationend";
    ListenerType["AnimationStart"] = "animationstart";
    ListenerType["VisibilityChange"] = "visibilitychange";
    ListenerType["BeforeUnload"] = "beforeunload";
    ListenerType["Resize"] = "resize";
})(ListenerType || (ListenerType = {}));
export { ListenerType, Platform };
