import { style } from '@vanilla-extract/css';
import { theme } from '../../theme/theme.css';

export const navStyle = style({
  height: theme.navHeight,
  backgroundColor: theme.colors['background.primary'],
  outline: `1.5px solid ${theme.colors['border.strong']}`,
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  position: 'sticky',
  top: 0,
  boxShadow: theme.colors['shadow.md'],
  padding: theme.spacing.md,
});
