import { css, Nav } from '@repo/ui';
import { createBrowserRouter, Navigate, Outlet } from 'react-router';
import { HomePage } from '../home.page.tsx';
import { LoginPage } from '../login.page.tsx';
import { RegisterPage } from '../register.page.tsx';
import { authClient } from './auth.ts';

const ProtectedRoute = () => {
  const session = authClient.useSession();
  if (session.isPending) {
    return null;
  }
  if (!session.data?.user) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Nav>User</Nav>
      <div className={css({ p: 'lg' })}>
        <Outlet />
      </div>
    </>
  );
};

export const router = createBrowserRouter([
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/register',
    Component: RegisterPage,
  },
  {
    path: '/',
    Component: ProtectedRoute,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: '/home',
        Component: HomePage,
      },
    ],
  },
]);
