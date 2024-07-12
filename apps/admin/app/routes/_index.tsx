import { Badge } from '@/components/ui/badge';
import type { MetaFunction } from '@remix-run/node';
import { css } from '_panda/css';

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export default function Index() {
  return (
    <div>
      <p className={css({ textStyle: 'glyph82.bold' })}>Hello !</p>
      <br />
      <div>
        <Badge variant="outline">Badge</Badge>
      </div>
    </div>
  );
}
