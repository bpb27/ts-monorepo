import { type RecipeVariants, recipe } from '@vanilla-extract/recipes';
import { theme } from '../../theme/theme.css';

export type InputVariants = NonNullable<RecipeVariants<typeof inputRecipe>>;

export const inputRecipe = recipe({
  base: {
    ...theme.typography.input,
    alignItems: 'center',
    backgroundColor: theme.colors['background.input'],
    border: 'none',
    borderRadius: theme.borderRadii.small,
    color: theme.colors['text.primary'],
    display: 'inline-flex',
    justifyContent: 'center',
    outline: `1.5px solid ${theme.colors['border.strong']}`,
    outlineOffset: '-1.5px',
    padding: theme.spacing.interactive,
    ':focus-visible': {
      outline: `2px solid ${theme.colors['focusRing.interactive']}`,
      outlineOffset: '0',
    },
    ':disabled': {
      cursor: 'not-allowed',
      opacity: 0.6,
    },
  },
});
