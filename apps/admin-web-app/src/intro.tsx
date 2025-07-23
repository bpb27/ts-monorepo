import { useState } from 'react';
import viteLogo from '/vite.svg';
import reactLogo from './assets/react.svg';
import './intro.css';
import { useSayHello } from '@repo/api-client-user-service';
import { Button, css } from '@repo/ui';
import { authClient } from './auth';

export function Intro() {
  const [count, setCount] = useState(0);
  const { data: session } = authClient.useSession();

  const { data } = useSayHello(
    'ge',
    { name: session?.user?.name || '' },
    {
      query: { enabled: !!session },
    }
  );

  return (
    <>
      <div>
        <a href="https://vite.dev" rel="noopener" target="_blank">
          <img alt="Vite logo" className="logo" src={viteLogo} />
        </a>
        <a href="https://react.dev" rel="noopener" target="_blank">
          <img alt="React logo" className="logo react" src={reactLogo} />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div
        className={css({
          padding: 'large',
          display: 'flex',
          flexDirection: 'column',
        })}
      >
        <button onClick={() => setCount((prev) => prev + 1)} type="button">
          count is {count}
        </button>
        {!!data?.data?.message && <Button>{data?.data?.message}</Button>}
        {!!session && (
          <button
            onClick={() => {
              authClient.signOut();
            }}
            type="button"
          >
            Sign out
          </button>
        )}
        {!session && (
          <div>
            <div
              className={css({ margin: 'large', padding: 'large' })}
              style={{ border: '2px solid gray' }}
            >
              <form
                className={css({
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'medium',
                })}
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  authClient.signIn.email({
                    email: formData.get('email') as string,
                    password: formData.get('password') as string,
                  });
                }}
              >
                <input name="email" type="text" />
                <input name="password" type="password" />
                <button type="submit">Sign in</button>
              </form>
            </div>
            <div
              className={css({ margin: 'large', padding: 'large' })}
              style={{ border: '2px solid gray' }}
            >
              <form
                className={css({
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'medium',
                })}
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  authClient.signUp.email({
                    email: formData.get('email') as string,
                    password: formData.get('password') as string,
                    name: formData.get('name') as string,
                  });
                }}
              >
                <input name="name" type="text" />
                <input name="email" type="text" />
                <input name="password" type="password" />
                <button type="submit">Sign up</button>
              </form>
            </div>
          </div>
        )}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}
