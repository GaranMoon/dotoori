import { boxOption } from 'data/palette';

export enum LayoutMode {
  NONE = '',
  COLLAPSE = 'collapse',
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

export const MODAL_DELAY = 300;
export const COLLAPSE_MAX = 932;
export const SAVE_MAX_SIZE = 500;
export const DEFAUT_BOX = boxOption[1];
export const DEFAULT_BG = BackgroundColor.WHITE;
