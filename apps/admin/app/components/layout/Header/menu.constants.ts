interface MenuItem {
  title: string;
  href: string;
  description: string;
}

export const MENU: {
  title: string;
  items: MenuItem[];
}[] = [
  {
    title: 'Shop',
    items: [
      {
        title: '경매장 일괄 구매',
        href: '/shop/auction/all-buy',
        description: '시장경제를 위해 경매장에서 일괄 구매할 수 있습니다.',
      },
    ],
  },
];
