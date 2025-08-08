import type { InputHTMLAttributes } from 'react';
import { inputRecipe } from './input.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ ...props }: InputProps) => {
  const recipe = inputRecipe();
  return <input className={recipe} type="text" {...props} />;
};

Input.displayName = 'Input';
