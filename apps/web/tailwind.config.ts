import { createGitAnimalsConfig } from '@gitanimals/ui-tailwind/config';
import type { Config } from 'tailwindcss';

// PandaCSS 제거 완료(PR final): Tailwind preflight 가 전역 reset 을 단독 담당한다(ADR-002).
const config: Config = createGitAnimalsConfig(['./src/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'], {
  theme: {
    extend: {},
  },
});

export default config;
