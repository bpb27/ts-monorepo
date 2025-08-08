import { globalStyle } from '@vanilla-extract/css';
import { theme } from './theme.css';

globalStyle('body', {
  margin: 0,
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  backgroundColor: theme.colors['background.primary'],
  color: theme.colors['text.primary'],
  fontSynthesis: 'none',
  textRendering: 'optimizeLegibility',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
});

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
});
