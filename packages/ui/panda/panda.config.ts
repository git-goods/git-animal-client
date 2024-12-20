import { defineConfig } from '@pandacss/dev';
import { tokens, semanticTokens, textStyles, media } from './src/theme';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens,
      semanticTokens,
      textStyles,
      recipes: {
        tableRow: {
          // 기존 tableRow 레시피를 오버라이드
          className: 'tableRow',
          description: 'A table row style',
          base: {
            // 기본 스타일 정의
            display: 'table-row',
            // 원하는 스타일 추가
            backgroundColor: 'white',
          },
          variants: {
            // 변형 스타일 정의
          },
        },
      },
    },
  },
  conditions: {
    extend: {
      mobile: media.mobile,
      desktop: media.desktop,
    },
  },

  // utilities: {
  //   extend: utilities,
  // },
  outExtension: 'js',
  jsxFramework: 'react',

  // The output directory for your css system
  outdir: 'styled-system',

  // delete default presets
  presets: ['@shadow-panda/preset'],
});
