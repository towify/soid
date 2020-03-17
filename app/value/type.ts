/*
 * @author kaysaith
 * @date 2020/3/11 00:43
 */

enum Platform {
  WEB, Mobile, Mini_Program,
}

enum ListenerType {
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
  DOMNodeRemoved = "DOMNodeRemoved",
  DOMNodeInserted = "DOMNodeInserted",
  Animationend = "animationend",
  AnimationStart = "animationstart",
  VisibilityChange = "visibilitychange",
  BeforeUnload = "beforeunload"
}

export {
  ListenerType, Platform
};