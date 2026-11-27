import { execSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

const appRoot = path.resolve(__dirname, '../..');

const unique = (text: string, pattern: RegExp) => [...new Set(text.match(pattern) ?? [])];

describe('workspace', () => {
  it('Metro 번들에 react 와 @tanstack/react-query 가 사본 하나씩만 들어간다', () => {
    const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'app-export-'));
    execSync(
      `npx expo export --platform ios --no-bytecode --dump-sourcemap --output-dir ${outDir}`,
      { cwd: appRoot, env: { ...process.env, CI: '1' }, stdio: 'pipe' },
    );

    const jsDir = path.join(outDir, '_expo/static/js/ios');
    const mapFile = fs.readdirSync(jsDir).find((file) => file.endsWith('.map'))!;
    const sourceMap = fs.readFileSync(path.join(jsDir, mapFile), 'utf8');

    expect(sourceMap).toContain('packages/lib/react-query/src/index.ts');
    expect(unique(sourceMap, /\.pnpm\/react@[\d.]+/g)).toEqual(['.pnpm/react@19.3.0']);
    expect(unique(sourceMap, /\.pnpm\/@tanstack\+react-query@[^/"]+/g)).toHaveLength(1);

    fs.rmSync(outDir, { recursive: true, force: true });
  }, 180000);
});
