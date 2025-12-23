import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const sliderDefaultVariants = {}
const sliderCompoundVariants = []

const sliderSlotNames = [
  [
    "root",
    "slider__root"
  ],
  [
    "track",
    "slider__track"
  ],
  [
    "range",
    "slider__range"
  ],
  [
    "thumb",
    "slider__thumb"
  ]
]
const sliderSlotFns = /* @__PURE__ */ sliderSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, sliderDefaultVariants, getSlotCompoundVariant(sliderCompoundVariants, slotName))])

const sliderFn = memo((props = {}) => {
  return Object.fromEntries(sliderSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const sliderVariantKeys = []
const getVariantProps = (variants) => ({ ...sliderDefaultVariants, ...compact(variants) })

export const slider = /* @__PURE__ */ Object.assign(sliderFn, {
  __recipe__: false,
  __name__: 'slider',
  raw: (props) => props,
  variantKeys: sliderVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, sliderVariantKeys)
  },
  getVariantProps
})