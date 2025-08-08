import { useSayHelloUser } from '@repo/api-client-user';
import { Button } from '@repo/ui';
import { authClient } from './core/auth';

export const HomePage = () => {
  const { data: greeting } = useSayHelloUser('en');
  return (
    <div>
      {greeting && <p>{greeting.message}</p>}
      <Button onClick={() => authClient.signOut()}>Sign out</Button>
    </div>
  );
};
