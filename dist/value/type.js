/*
 * @author kaysaith
 * @date 2020/3/11 00:43
 */
var Platform;
(function (Platform) {
    Platform[Platform["WEB"] = 0] = "WEB";
    Platform[Platform["Mobile"] = 1] = "Mobile";
    Platform[Platform["Mini_Program"] = 2] = "Mini_Program";
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
