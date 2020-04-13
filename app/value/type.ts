/*
 * @author kaysaith
 * @date 2020/3/11 00:43
 */

enum Platform {
  Web, Mobile, MiniProgram,
}

enum ListenerType {
  Click = "click",
  Input = "input",
  Focus = "focus",
  Blur = "blur",
  Scroll = "scroll",
  Wheel = "wheel",
  ContextMenu = "contextmenu",
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
  Resize = "resize",
}

export {
  ListenerType, Platform
};