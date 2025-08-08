import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';
import { theme } from './theme.css';

/*
  This is a css utility function for creating styles on the fly,
  while still adhering to the broader theme constraints.

  It can be used in css.ts files or in regular .tsx files.

  Example: <div className={css({ display: 'flex', flexDirection: ['column', 'row'] })}/>
*/

const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { '@media': 'screen and (min-width: 768px)' },
    desktop: { '@media': 'screen and (min-width: 1024px)' },
  },
  responsiveArray: ['mobile', 'tablet', 'desktop'],
  defaultCondition: 'mobile',
  properties: {
    display: ['none', 'flex', 'block', 'inline'],
    flexDirection: ['row', 'column'],
    justifyContent: [
      'stretch',
      'flex-start',
      'center',
      'flex-end',
      'space-around',
      'space-between',
    ],
    alignItems: ['stretch', 'flex-start', 'center', 'flex-end'],
    margin: theme.spacing,
    marginBottom: theme.spacing,
    marginLeft: theme.spacing,
    marginRight: theme.spacing,
    marginTop: theme.spacing,
    padding: theme.spacing,
    paddingBottom: theme.spacing,
    paddingLeft: theme.spacing,
    paddingRight: theme.spacing,
    paddingTop: theme.spacing,
    gap: theme.spacing,
  },
  // these reference properties above
  shorthands: {
    p: ['padding'],
    pt: ['paddingTop'],
    pr: ['paddingRight'],
    pb: ['paddingBottom'],
    pl: ['paddingLeft'],
    px: ['paddingLeft', 'paddingRight'],
    py: ['paddingTop', 'paddingBottom'],
    m: ['margin'],
    mt: ['marginTop'],
    mr: ['marginRight'],
    mb: ['marginBottom'],
    ml: ['marginLeft'],
    mx: ['marginLeft', 'marginRight'],
    my: ['marginTop', 'marginBottom'],
  },
});

export const sprinkles = createSprinkles(responsiveProperties);

export type Sprinkles = Parameters<typeof sprinkles>[0];
