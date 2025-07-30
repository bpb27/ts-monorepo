import { type ButtonHTMLAttributes, forwardRef } from "react";
import { type ButtonVariants, buttonRecipe } from "./button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariants {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, importance = "primary", shape = "regular", ...props }, ref) => {
		const className = buttonRecipe({ importance, shape });
		return (
			<button className={className} type="button" {...props} ref={ref}>
				{children}
			</button>
		);
	}
);

Button.displayName = "Button";
