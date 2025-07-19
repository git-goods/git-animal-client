import { center } from '_panda/patterns';

import { LoginButton } from './AuthButton';

export default function TestPage() {
  return (
    <div className={center({ minH: '100vh' })}>
      <LoginButton label="Login" />
    </div>
  );
}
