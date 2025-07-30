import { globalStyle } from "@vanilla-extract/css";
import { theme } from "./theme.css";

// Reset some browser defaults
globalStyle("body", {
	margin: 0,
	fontFamily:
		'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
	backgroundColor: theme.colors["background.primary"],
	color: theme.colors["text.primary"],
});

globalStyle("*, *::before, *::after", {
	boxSizing: "border-box",
});
