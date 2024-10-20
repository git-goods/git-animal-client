import { isProd } from './env';

export const MONITORING_KEY = {
  GA: isProd ? 'G-RNEDVMFT5X' : 'G-N45935GS2S',
  GTM: 'GTM-T6DQHP7X',
  MIXPANEL: isProd ? '3e01e631ae4efb8019bbcdf2fb401209' : '',
  JENNIFER: isProd ? 'e9e023ee' : '000000',
};
