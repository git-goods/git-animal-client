import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const alertDialogDefaultVariants = {}
const alertDialogCompoundVariants = []

const alertDialogSlotNames = [
  [
    "root",
    "alertDialog__root"
  ],
  [
    "trigger",
    "alertDialog__trigger"
  ],
  [
    "portal",
    "alertDialog__portal"
  ],
  [
    "overlay",
    "alertDialog__overlay"
  ],
  [
    "content",
    "alertDialog__content"
  ],
  [
    "header",
    "alertDialog__header"
  ],
  [
    "footer",
    "alertDialog__footer"
  ],
  [
    "title",
    "alertDialog__title"
  ],
  [
    "description",
    "alertDialog__description"
  ],
  [
    "action",
    "alertDialog__action"
  ],
  [
    "cancel",
    "alertDialog__cancel"
  ]
]
const alertDialogSlotFns = /* @__PURE__ */ alertDialogSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, alertDialogDefaultVariants, getSlotCompoundVariant(alertDialogCompoundVariants, slotName))])

const alertDialogFn = memo((props = {}) => {
  return Object.fromEntries(alertDialogSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const alertDialogVariantKeys = []
const getVariantProps = (variants) => ({ ...alertDialogDefaultVariants, ...compact(variants) })

export const alertDialog = /* @__PURE__ */ Object.assign(alertDialogFn, {
  __recipe__: false,
  __name__: 'alertDialog',
  raw: (props) => props,
  variantKeys: alertDialogVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, alertDialogVariantKeys)
  },
  getVariantProps
})