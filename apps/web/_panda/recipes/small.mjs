import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const smallFn = /* @__PURE__ */ createRecipe('small', {}, [])

const smallVariantMap = {}

const smallVariantKeys = Object.keys(smallVariantMap)

export const small = /* @__PURE__ */ Object.assign(memo(smallFn.recipeFn), {
  __recipe__: true,
  __name__: 'small',
  __getCompoundVariantCss__: smallFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: smallVariantKeys,
  variantMap: smallVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, smallVariantKeys)
  },
  getVariantProps: smallFn.getVariantProps,
})