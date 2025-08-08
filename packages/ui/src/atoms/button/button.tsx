import type { ButtonHTMLAttributes } from 'react';
import { clsx } from '../../utils';
import { type ButtonVariants, buttonRecipe } from './button.css';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {}

export const Button = ({
  children,
  className,
  importance = 'primary',
  shape = 'regular',
  type = 'button',
  ...rest
}: ButtonProps) => {
  const recipe = buttonRecipe({ importance, shape });
  return (
    <button className={clsx(recipe, className)} type={type} {...rest}>
      {children}
    </button>
  );
};

Button.displayName = 'Button';
