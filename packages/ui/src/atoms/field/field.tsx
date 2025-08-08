import type { ReactNode } from 'react';
import { sprinkles } from '../../theme/sprinkles.css';
import {
  fieldErrorTextStyle,
  fieldHelperTextStyle,
  fieldLabelStyle,
} from './field.css';

type FieldProps = {
  children: ReactNode;
};

export const Field = ({ children }: FieldProps) => {
  return (
    <div
      className={sprinkles({
        display: 'flex',
        flexDirection: 'column',
        gap: 'xs',
      })}
    >
      {children}
    </div>
  );
};

type FieldLabel = {
  children: ReactNode;
  htmlFor: string;
};

const FieldLabel = ({ children, htmlFor }: FieldLabel) => {
  return (
    <label className={fieldLabelStyle} htmlFor={htmlFor}>
      {children}
    </label>
  );
};

type FieldHelperText = {
  children: ReactNode;
};

const FieldHelperText = ({ children }: FieldHelperText) => {
  return <span className={fieldHelperTextStyle}>{children}</span>;
};

type FieldErrorText = {
  children: ReactNode;
};

const FieldErrorText = ({ children }: FieldErrorText) => {
  if (!children) {
    return (
      <span
        aria-hidden={true}
        className={fieldErrorTextStyle}
        style={{ opacity: 0 }}
      >
        hidden
      </span>
    );
  }
  return (
    <span aria-live="polite" className={fieldErrorTextStyle}>
      {children}
    </span>
  );
};

Field.Label = FieldLabel;
Field.HelperText = FieldHelperText;
Field.ErrorText = FieldErrorText;
