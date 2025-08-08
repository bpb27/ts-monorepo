import { pxToRem } from './theme.utils';

const base = {
  '12px': {
    fontSize: pxToRem('12px'),
    lineHeight: pxToRem('16px'),
    letterSpacing: '0.0025em',
  },
  '14px': {
    fontSize: pxToRem('14px'),
    lineHeight: pxToRem('20px'),
    letterSpacing: '0em',
  },
  '16px': {
    fontSize: pxToRem('16px'),
    lineHeight: pxToRem('24px'),
    letterSpacing: '0em',
  },
  '20px': {
    fontSize: pxToRem('20px'),
    lineHeight: pxToRem('28px'),
    letterSpacing: '-0.005em',
  },
  '24px': {
    fontSize: pxToRem('24px'),
    lineHeight: pxToRem('30px'),
    letterSpacing: '0.00625em',
  },
  '32px': {
    fontSize: pxToRem('32px'),
    lineHeight: pxToRem('40px'),
    letterSpacing: '-0.01em',
  },
  '40px': {
    fontSize: pxToRem('40px'),
    lineHeight: pxToRem('48px'),
    letterSpacing: '-0.025em',
  },
  '48px': {
    fontSize: pxToRem('48px'),
    lineHeight: pxToRem('56px'),
    letterSpacing: '-0.025em',
  },
  '64px': {
    fontSize: pxToRem('64px'),
    lineHeight: pxToRem('64px'),
    letterSpacing: '-0.025em',
  },
  '96px': {
    fontSize: pxToRem('96px'),
    lineHeight: pxToRem('96px'),
    letterSpacing: '-0.025em',
  },
} as const;

const semantic = () => {
  return {
    'body.xs': base['12px'],
    'body.sm': base['14px'],
    'body.md': base['16px'],
    'body.lg': base['20px'],
    'heading.xs': base['16px'],
    'heading.sm': base['20px'],
    'heading.md': base['24px'],
    'heading.lg': base['32px'],
    'heading.xl': base['40px'],
    'hero.sm': base['48px'],
    'hero.md': base['64px'],
    'hero.lg': base['96px'],
    // interactive?
    label: base['12px'],
    link: base['16px'],
    button: base['16px'],
    input: base['16px'],
  } as const;
};

export const typography = { base, semantic };
