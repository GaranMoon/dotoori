export const MODAL_DELAY = 300;
export const COLLAPSE_MAX = 932;
export const CAPTURE = 'capture';

export enum LayoutMode {
  COLLAPSE = 'collapse',
  NONE = '',
}

export type Color = { [key: string]: string };

export type Direction = 'up' | 'down' | 'left' | 'right' | 'center';

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
