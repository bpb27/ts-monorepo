import { sprinkles } from '../../theme/sprinkles.css';
import { clsx } from '../../utils';

type Size = 'sm' | 'md' | 'lg' | 'xl';
type Orientation = 'column' | 'row';
type Variant = `${Orientation}.${Size}`;

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: Variant;
}

export const Box = ({ className, children, variant }: BoxProps) => {
  const orientation = variant.split('.')[0] as Orientation;
  const size = variant.split('.')[1] as Size;

  const style = sprinkles({
    display: 'flex',
    gap: size,
    flexDirection: orientation,
  });

  return <div className={clsx(className, style)}>{children}</div>;
};
