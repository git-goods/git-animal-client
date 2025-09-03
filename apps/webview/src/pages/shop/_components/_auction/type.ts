export const TABS = ['products', 'history', 'sell', 'sellList'] as const;
export type TabType = (typeof TABS)[number];
