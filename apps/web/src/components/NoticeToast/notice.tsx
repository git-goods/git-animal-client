export const NOTICE_LIST = [
  {
    key: 'visit-shop',
    label: 'visit-shop',
    redirect: {
      url: '/shop',
      label: 'visit',
    },
    isAuth: true,
    closeButton: false,
    visible: false,
  },
  {
    key: 'github-star',
    label: 'github-star',
    redirect: {
      url: 'https://github.com/git-goods/gitanimals',
      isOutLink: true,
      label: 'star-now',
    },
    isAuth: true,
    closeButton: false,
    visible: true,
  },
  {
    key: 'update-shop-renewal',
    label: 'update-shop-renewal',
    redirect: {
      url: '/shop',
      label: 'go',
    },
    isAuth: true,
    closeButton: false,
    visible: true,
  },
  {
    key: 'multi-translation',
    label: 'multi-translation',
    isAuth: false,
    closeButton: true,
    visible: true,
  },
  {
    key: 'update-mypage-renewal',
    label: 'update-mypage-renewal',
    redirect: {
      url: '/mypage',
      label: 'go',
    },
    isAuth: true,
    closeButton: false,
    visible: true,
  },
];
