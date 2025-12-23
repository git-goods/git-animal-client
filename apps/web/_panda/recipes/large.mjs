import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const largeFn = /* @__PURE__ */ createRecipe('large', {}, [])

const largeVariantMap = {}

const largeVariantKeys = Object.keys(largeVariantMap)

export const large = /* @__PURE__ */ Object.assign(memo(largeFn.recipeFn), {
  __recipe__: true,
  __name__: 'large',
  __getCompoundVariantCss__: largeFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: largeVariantKeys,
  variantMap: largeVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, largeVariantKeys)
  },
  getVariantProps: largeFn.getVariantProps,
})