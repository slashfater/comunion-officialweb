export const REVISION = '0'

export const States = {
  HOME: 'home',

  SLIDER: 'slider',

  PROJECTS: 'projects',

  PARTNERS: 'partners',

  CONTACTS: 'contacts',

  LEAF: 'leaf'
}

export const Actions = {
  APP_READY: 'appReady',

  OPEN_MENU: 'openMenu',

  CLOSE_MENU: 'closeMenu',

  UPDATE_USER: 'updateUser'
}

export const Events = {
  TICK: 'tick',

  WHEEL: 'wheel',

  DRAG: 'drag',

  DROP: 'drop',

  RESIZE: 'resize',

  LOCALE: 'locale',

  LOADED: 'loaded',

  PROGRESS: 'progress',

  UISTATE: 'uistateupdate',

  TRANSFORM: 'transform',

  LEAF_READY: 'leafready',

  LEAF_LEAVE: 'leafleave',

  TOUCH_START: 'touchstart',

  TOUCH_MOVE: 'touchmove',

  TOUCH_END: 'touchend',

  MOUSE_MOVE: 'mousemove',

  MOUSE_DOWN: 'mousedown',

  MOUSE_UP: 'mouseup'
}

export const Sizes = {
  TABLET_LAND: 1024,

  TABLET_PORT: 768,

  SMARTHPHONE: 375,

  CUSTOM: 980
}
