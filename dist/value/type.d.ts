declare enum Platform {
    WEB = 0,
    Mobile = 1,
    Mini_Program = 2
}
declare enum ListenerType {
    Click = "click",
    Input = "input",
    Focus = "focus",
    Blur = "blur",
    Scroll = "scroll",
    Wheel = "wheel",
    Mousemove = "mousemove",
    Mouseover = "mouseover",
    Mouseleave = "mouseleave",
    Mouseout = "mouseout",
    Mousedown = "mousedown",
    Mouseup = "mouseup",
    DOMNodeRemoved = "DOMNodeRemoved",
    DOMNodeInserted = "DOMNodeInserted",
    Animationend = "animationend",
    AnimationStart = "animationstart",
    VisibilityChange = "visibilitychange",
    BeforeUnload = "beforeunload",
    Resize = "resize"
}
export { ListenerType, Platform };
