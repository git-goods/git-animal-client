import path from 'path';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const metroConfig = require('../../metro.config.js');

const appRoot = path.resolve(__dirname, '../..');

describe('workspace', () => {
  it('Metro 가 계층 탐색을 끄고 앱 node_modules 를 먼저 본다', () => {
    const { disableHierarchicalLookup, nodeModulesPaths } = metroConfig.resolver;
    expect(disableHierarchicalLookup).toBe(true);
    expect(nodeModulesPaths[0]).toBe(path.join(appRoot, 'node_modules'));
  });

  it('react 와 react-query 가 워크스페이스 패키지에서도 앱 사본 하나로 해석된다', () => {
    const { nodeModulesPaths } = metroConfig.resolver;
    for (const name of ['react', '@tanstack/react-query', 'axios', 'zod']) {
      const fromApp = require.resolve(name, { paths: [appRoot] });
      expect(require.resolve(name, { paths: nodeModulesPaths })).toBe(fromApp);
    }
  });
});
