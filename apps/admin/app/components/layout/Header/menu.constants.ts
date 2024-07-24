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
    title: '경매장',
    items: [
      {
        title: '경매장 일괄 구매',
        href: '/auction/all-buy',
        description: '시장경제를 위해 경매장에서 일괄 구매할 수 있습니다.',
      },
    ],
  },
  {
    title: '상점',
    items: [
      {
        title: '펫 판매',
        href: '/shop/drop-pet',
        description: '펫을 판매할 수 있습니다.',
      },
    ],
  },
];
