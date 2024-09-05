export const NOTICE_LIST = [
  {
    key: 'visit-shop',
    label: `New! Visit the GitAnimals Shop page`,
    redirect: {
      url: '/shop',
      label: 'Visit!',
    },
    isAuth: true,
    closeButton: false,
    visible: false,
  },
  {
    key: 'github-star',
    label: 'Enjoying GitAnimals?\nGive us a GitHub Star! ⭐',
    redirect: {
      url: 'https://github.com/git-goods/gitanimals',
      isOutLink: true,
      label: 'Star Now!',
    },
    isAuth: true,
    closeButton: false,
    visible: true,
  },
  {
    key: 'visit-shop',
    label: 'Update: Try our new shop sorting options',
    redirect: {
      url: '/shop',
      label: 'Go!',
    },
    isAuth: true,
    closeButton: false,
    visible: true,
  },
];
