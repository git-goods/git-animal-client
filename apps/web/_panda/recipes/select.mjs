import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const selectDefaultVariants = {}
const selectCompoundVariants = []

const selectSlotNames = [
  [
    "root",
    "select__root"
  ],
  [
    "group",
    "select__group"
  ],
  [
    "value",
    "select__value"
  ],
  [
    "trigger",
    "select__trigger"
  ],
  [
    "viewport",
    "select__viewport"
  ],
  [
    "content",
    "select__content"
  ],
  [
    "label",
    "select__label"
  ],
  [
    "item",
    "select__item"
  ],
  [
    "itemIndicator",
    "select__itemIndicator"
  ],
  [
    "separator",
    "select__separator"
  ]
]
const selectSlotFns = /* @__PURE__ */ selectSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, selectDefaultVariants, getSlotCompoundVariant(selectCompoundVariants, slotName))])

const selectFn = memo((props = {}) => {
  return Object.fromEntries(selectSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const selectVariantKeys = []
const getVariantProps = (variants) => ({ ...selectDefaultVariants, ...compact(variants) })

export const select = /* @__PURE__ */ Object.assign(selectFn, {
  __recipe__: false,
  __name__: 'select',
  raw: (props) => props,
  variantKeys: selectVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, selectVariantKeys)
  },
  getVariantProps
})