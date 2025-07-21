import { useState } from 'react';
import viteLogo from '/vite.svg';
import reactLogo from './assets/react.svg';
import './intro.css';
import { useSayHello } from '@repo/api-client-user-service';
import { Button, css } from '@repo/ui';

export function Intro() {
  const [count, setCount] = useState(0);
  const { data } = useSayHello('ge', { name: 'Brendan' });

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
        <Button>{data?.data?.message}</Button>
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
