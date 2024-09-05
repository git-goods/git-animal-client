import { defineUtility } from '@pandacss/dev';

export const noSelect = defineUtility({
  className: 'no-select',
  values: {
    true: 'true',
    false: 'false',
  },
  transform(value) {
    if (value === 'true') {
      return {
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        WebkitUserDrag: 'none',
        MozUserDrag: 'none',
        userDrag: 'none',
      };
    }
    return {};
  },
});
