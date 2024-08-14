import { ReactNode } from 'react';

import styles from './Button.module.scss';

export interface ButtonProps {
  title: string | ReactNode;
  size?: 'sm' | 'md';
  disabled?: boolean;
  onClick: () => void;
}

function Button({ title, size = 'md', disabled, onClick }: ButtonProps) {
  const containerStyle = `${styles.container} ${styles[size]} ${styles[disabled ? 'disabled' : '']}`;

  return (
    <div className={containerStyle} onClick={onClick}>
      {title}
    </div>
  );
}

export default Button;
