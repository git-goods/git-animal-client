import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const labelFn = /* @__PURE__ */ createRecipe('label', {}, [])

const labelVariantMap = {}

const labelVariantKeys = Object.keys(labelVariantMap)

export const label = /* @__PURE__ */ Object.assign(memo(labelFn.recipeFn), {
  __recipe__: true,
  __name__: 'label',
  __getCompoundVariantCss__: labelFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: labelVariantKeys,
  variantMap: labelVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, labelVariantKeys)
  },
  getVariantProps: labelFn.getVariantProps,
})