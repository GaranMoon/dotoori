export const MODAL_DELAY = 300;
export const COLLAPSE_MAX = 760;
export const CAPTURE = 'capture';

export enum LayoutMode {
  COLLAPSE = 'collapse',
  NONE = '',
}

export type Color = { [key: string]: string };

export enum Tool {
  BRUSH = 'brush',
  ERASER = 'eraser',
}

export enum ToolStatus {
  PICKED = 'picked',
  USED = 'used',
}

export enum BackgroundColor {
  WHITE = 'bgWhite',
  BLACK = 'bgBlack',
  TRANSPARENT = 'bgTransparent',
}
