import type { ButtonHTMLAttributes } from 'react';
import { buttonStyle } from './button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button className={buttonStyle} type="button" {...props}>
      {children}
    </button>
  );
};
