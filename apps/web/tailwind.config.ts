import { createGitAnimalsConfig } from '@gitanimals/ui-tailwind';
import type { Config } from 'tailwindcss';

const config = createGitAnimalsConfig([
  './src/**/*.{js,ts,jsx,tsx,mdx}',
]) as Config;

// PandaCSS와 공존하기 위한 추가 설정
config.corePlugins = {
  // PandaCSS가 처리하는 부분은 비활성화
  preflight: false, // reset은 PandaCSS에서 처리
};
config.important = '.tailwind-scope'; // Tailwind를 특정 스코프에서만 활성화

export default config;