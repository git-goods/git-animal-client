import { createGitAnimalsConfig } from '@gitanimals/ui-tailwind';
import type { Config } from 'tailwindcss';

const config = createGitAnimalsConfig([
  './src/**/*.{js,ts,jsx,tsx,mdx}',
], {
  // PandaCSS와 공존하기 위한 설정
  corePlugins: {
    preflight: false, // reset은 PandaCSS에서 처리
  },
  // CSS 우선순위 조정
  important: false, // 전역적으로 important 사용 안함
}) as Config;

export default config;