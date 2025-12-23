import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const dialogDefaultVariants = {}
const dialogCompoundVariants = []

const dialogSlotNames = [
  [
    "root",
    "dialog__root"
  ],
  [
    "trigger",
    "dialog__trigger"
  ],
  [
    "portal",
    "dialog__portal"
  ],
  [
    "overlay",
    "dialog__overlay"
  ],
  [
    "close",
    "dialog__close"
  ],
  [
    "content",
    "dialog__content"
  ],
  [
    "header",
    "dialog__header"
  ],
  [
    "footer",
    "dialog__footer"
  ],
  [
    "title",
    "dialog__title"
  ],
  [
    "description",
    "dialog__description"
  ]
]
const dialogSlotFns = /* @__PURE__ */ dialogSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, dialogDefaultVariants, getSlotCompoundVariant(dialogCompoundVariants, slotName))])

const dialogFn = memo((props = {}) => {
  return Object.fromEntries(dialogSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const dialogVariantKeys = []
const getVariantProps = (variants) => ({ ...dialogDefaultVariants, ...compact(variants) })

export const dialog = /* @__PURE__ */ Object.assign(dialogFn, {
  __recipe__: false,
  __name__: 'dialog',
  raw: (props) => props,
  variantKeys: dialogVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, dialogVariantKeys)
  },
  getVariantProps
})