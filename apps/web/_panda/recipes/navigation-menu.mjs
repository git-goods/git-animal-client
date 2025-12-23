import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const navigationMenuDefaultVariants = {}
const navigationMenuCompoundVariants = []

const navigationMenuSlotNames = [
  [
    "root",
    "navigationMenu__root"
  ],
  [
    "list",
    "navigationMenu__list"
  ],
  [
    "item",
    "navigationMenu__item"
  ],
  [
    "trigger",
    "navigationMenu__trigger"
  ],
  [
    "content",
    "navigationMenu__content"
  ],
  [
    "link",
    "navigationMenu__link"
  ],
  [
    "viewportWrapper",
    "navigationMenu__viewportWrapper"
  ],
  [
    "viewport",
    "navigationMenu__viewport"
  ],
  [
    "indicator",
    "navigationMenu__indicator"
  ]
]
const navigationMenuSlotFns = /* @__PURE__ */ navigationMenuSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, navigationMenuDefaultVariants, getSlotCompoundVariant(navigationMenuCompoundVariants, slotName))])

const navigationMenuFn = memo((props = {}) => {
  return Object.fromEntries(navigationMenuSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const navigationMenuVariantKeys = []
const getVariantProps = (variants) => ({ ...navigationMenuDefaultVariants, ...compact(variants) })

export const navigationMenu = /* @__PURE__ */ Object.assign(navigationMenuFn, {
  __recipe__: false,
  __name__: 'navigationMenu',
  raw: (props) => props,
  variantKeys: navigationMenuVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, navigationMenuVariantKeys)
  },
  getVariantProps
})