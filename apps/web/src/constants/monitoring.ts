import { isProd } from '@/utils/common';

export const MONITORING_KEY = {
  GA: isProd(process.env.NODE_ENV) ? 'G-RNEDVMFT5X' : 'G-N45935GS2S',
  GTM: 'GTM-T6DQHP7X',
  JENNIFER: isProd(process.env.NODE_ENV) ? 'e9e023ee' : '000000',
} as const;
