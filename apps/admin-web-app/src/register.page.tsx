import { Box, Button, css, Form, toggleTheme, useForm } from '@repo/ui';
import { SunMoonIcon } from 'lucide-react';
import { useState } from 'react';
import { Navigate } from 'react-router';
import { z } from 'zod';
import { authClient } from './core/auth';

const RegisterSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  email: z.email({ message: 'Please enter a valid email' }),
  password: z.string().nonempty({ message: 'Password is required' }),
});

export const RegisterPage = () => {
  const form = useForm(RegisterSchema);
  const session = authClient.useSession();
  const [error, setError] = useState<string>();

  const handleSubmit = async () => {
    if (form.isValid) {
      const result = await authClient.signUp.email(form.values);
      if (result.error) {
        setError(result.error.message);
      }
    }
  };

  if (session.data?.user) {
    return <Navigate replace to="/home" />;
  }

  return (
    <div className={css({ p: 'lg' })}>
      <Button
        aria-label="Toggle theme"
        onClick={() => toggleTheme('color')}
        shape="icon"
      >
        <SunMoonIcon />
      </Button>
      <Form onSubmit={handleSubmit}>
        <Box variant="column.sm">
          <Form.Input
            autoComplete="name"
            field={form.fields.name}
            label="Name"
          />
          <Form.Input
            autoComplete="work email"
            field={form.fields.email}
            label="Email"
          />
          <Form.Input
            autoComplete="current-password"
            field={form.fields.password}
            label="Password"
            type="password"
          />
          {error && <Form.Error>{error}</Form.Error>}
          <Form.SubmitButton
            disabled={session.isPending}
            isValid={form.isValid}
          >
            Register
          </Form.SubmitButton>
        </Box>
      </Form>
    </div>
  );
};
