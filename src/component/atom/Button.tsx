import { ReactNode } from 'react';

import { getClass } from 'util/common';

import styles from './Button.module.scss';

export interface ButtonProps {
  title: string | ReactNode;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
}

function Button({ title, size = 'lg', disabled, onClick }: ButtonProps) {
  return (
    <div
      className={getClass(['container', size, disabled ? 'disabled' : ''], styles)}
      onClick={!disabled ? onClick : undefined}
    >
      {title}
    </div>
  );
}

export default Button;
