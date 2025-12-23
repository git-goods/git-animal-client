import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const toastViewportFn = /* @__PURE__ */ createRecipe('toastViewport', {}, [])

const toastViewportVariantMap = {}

const toastViewportVariantKeys = Object.keys(toastViewportVariantMap)

export const toastViewport = /* @__PURE__ */ Object.assign(memo(toastViewportFn.recipeFn), {
  __recipe__: true,
  __name__: 'toastViewport',
  __getCompoundVariantCss__: toastViewportFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: toastViewportVariantKeys,
  variantMap: toastViewportVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, toastViewportVariantKeys)
  },
  getVariantProps: toastViewportFn.getVariantProps,
})