import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const h4Fn = /* @__PURE__ */ createRecipe('h4', {}, [])

const h4VariantMap = {}

const h4VariantKeys = Object.keys(h4VariantMap)

export const h4 = /* @__PURE__ */ Object.assign(memo(h4Fn.recipeFn), {
  __recipe__: true,
  __name__: 'h4',
  __getCompoundVariantCss__: h4Fn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: h4VariantKeys,
  variantMap: h4VariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, h4VariantKeys)
  },
  getVariantProps: h4Fn.getVariantProps,
})