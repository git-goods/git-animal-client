import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const h3Fn = /* @__PURE__ */ createRecipe('h3', {}, [])

const h3VariantMap = {}

const h3VariantKeys = Object.keys(h3VariantMap)

export const h3 = /* @__PURE__ */ Object.assign(memo(h3Fn.recipeFn), {
  __recipe__: true,
  __name__: 'h3',
  __getCompoundVariantCss__: h3Fn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: h3VariantKeys,
  variantMap: h3VariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, h3VariantKeys)
  },
  getVariantProps: h3Fn.getVariantProps,
})