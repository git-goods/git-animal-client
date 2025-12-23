import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const toggleFn = /* @__PURE__ */ createRecipe('toggle', {
  "variant": "default",
  "size": "default"
}, [])

const toggleVariantMap = {
  "variant": [
    "default",
    "outline"
  ],
  "size": [
    "default",
    "sm",
    "lg"
  ]
}

const toggleVariantKeys = Object.keys(toggleVariantMap)

export const toggle = /* @__PURE__ */ Object.assign(memo(toggleFn.recipeFn), {
  __recipe__: true,
  __name__: 'toggle',
  __getCompoundVariantCss__: toggleFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: toggleVariantKeys,
  variantMap: toggleVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, toggleVariantKeys)
  },
  getVariantProps: toggleFn.getVariantProps,
})