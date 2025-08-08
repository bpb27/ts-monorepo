import { pxToRem } from './theme.utils';

const base = {
  '2px': pxToRem('2px'),
  '4px': pxToRem('4px'),
  '8px': pxToRem('8px'),
  '12px': pxToRem('12px'),
  '16px': pxToRem('16px'),
  '24px': pxToRem('24px'),
  '32px': pxToRem('32px'),
  '40px': pxToRem('40px'),
  '48px': pxToRem('48px'),
};

const semantic = () => {
  return {
    xxs: base['2px'],
    xs: base['4px'],
    sm: base['8px'],
    /** approx 12px */
    md: base['12px'],
    lg: base['16px'],
    xl: base['24px'],
    xxl: base['32px'],
    interactive: `${base['8px']} ${base['16px']}`,
  };
};

export const spacing = { base, semantic };
