import { type RecipeVariants, recipe } from '@vanilla-extract/recipes';
import { theme } from '../../theme/theme.css';

export type ButtonVariants = NonNullable<RecipeVariants<typeof buttonRecipe>>;

export const buttonRecipe = recipe({
  base: {
    ...theme.typography.button,
    alignItems: 'center',
    border: 'none',
    borderRadius: theme.borderRadii.small,
    cursor: 'pointer',
    display: 'inline-flex',
    fontWeight: theme.fontWeight.semibold,
    gap: theme.spacing.sm,
    justifyContent: 'center',
    ':focus-visible': {
      outline: `2px solid ${theme.colors['focusRing.interactive']}`,
      outlineOffset: '2px',
    },
    ':disabled': {
      cursor: 'not-allowed',
      opacity: 0.6,
    },
  },
  variants: {
    importance: {
      primary: {
        color: theme.colors['text.interactive'],
        backgroundColor: theme.colors['background.interactive'],
        ':hover': {
          backgroundColor: theme.colors['background.interactive.hover'],
        },
      },
      secondary: {
        color: theme.colors['text.interactive.inverse'],
        backgroundColor: theme.colors['background.interactive.inverse'],
        outline: `1.5px solid ${theme.colors['text.interactive.inverse']}`,
        outlineOffset: '1.5px',
        ':hover': {
          backgroundColor: theme.colors['background.interactive.inverse.hover'],
        },
      },
    },
    shape: {
      regular: {
        padding: theme.spacing.interactive,
      },
      icon: {
        padding: theme.spacing.sm,
      },
    },
  },
  defaultVariants: {
    importance: 'primary',
    shape: 'regular',
  },
});
