import {
  type ChangeEvent,
  createContext,
  type ReactNode,
  useContext,
  useState,
} from 'react';
import { Button, type ButtonProps } from '../../atoms/button/button';
import { Field } from '../../atoms/field/field';
import { Input, type InputProps } from '../../atoms/input/input';
import { theme } from '../../theme/theme.css';
import { formErrorTextStyle } from './form.css';

const FormContext = createContext({
  submitted: false,
});

type FormProps = {
  children: ReactNode;
  onSubmit: () => void;
};

export const Form = ({ children, onSubmit }: FormProps) => {
  const [submitted, setSubmitted] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
        onSubmit();
      }}
    >
      <FormContext.Provider value={{ submitted }}>
        {children}
      </FormContext.Provider>
    </form>
  );
};

interface FormInputProps
  extends Omit<InputProps, 'name' | 'onChange' | 'value'> {
  field: {
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    error?: string;
  };
  label: string;
  helperText?: ReactNode;
}

export const FormInput = ({
  field,
  label,
  helperText,
  onFocus,
  onBlur,
  ...rest
}: FormInputProps) => {
  const { submitted } = useContext(FormContext);
  const [touched, setTouched] = useState(false);
  const [focused, setFocused] = useState(false);
  const showError: boolean =
    !!field.error && (submitted || (touched && !focused));
  const showHelper: boolean = !showError && !!helperText;
  return (
    <Field>
      <Field.Label htmlFor={field.name}>{label}</Field.Label>
      <Input
        aria-invalid={field.value.length > 0 && showError}
        id={field.name}
        name={field.name}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        onChange={field.onChange}
        onFocus={(e) => {
          setFocused(true);
          setTouched(true);
          onFocus?.(e);
        }}
        style={{
          outlineColor: showError ? theme.colors.error : undefined,
        }}
        value={field.value}
        {...rest}
      />
      <Field.ErrorText>{showError ? field.error : ''}</Field.ErrorText>
      {showHelper && <Field.HelperText>{helperText}</Field.HelperText>}
    </Field>
  );
};

const FormError = ({ children }: { children: ReactNode }) => {
  return (
    <span aria-live="polite" className={formErrorTextStyle}>
      {children}
    </span>
  );
};

interface FormSubmitButtonProps extends ButtonProps {
  children: ReactNode;
  isValid?: boolean;
}

const FormSubmitButton = ({
  children,
  isValid = true,
  ...rest
}: FormSubmitButtonProps) => {
  return (
    <Button style={{ opacity: isValid ? 1 : 0.7 }} type="submit" {...rest}>
      {children}
    </Button>
  );
};

Form.Input = FormInput;
Form.Error = FormError;
Form.SubmitButton = FormSubmitButton;
