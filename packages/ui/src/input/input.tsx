import { forwardRef, type InputHTMLAttributes } from "react";
import { inputRecipe } from "./input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	return <input className={inputRecipe()} type="text" {...props} ref={ref} />;
});

Input.displayName = "Input";
