import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const badgeFn = /* @__PURE__ */ createRecipe('badge', {
  "variant": "default"
}, [])

const badgeVariantMap = {
  "variant": [
    "default",
    "secondary",
    "destructive",
    "outline"
  ]
}

const badgeVariantKeys = Object.keys(badgeVariantMap)

export const badge = /* @__PURE__ */ Object.assign(memo(badgeFn.recipeFn), {
  __recipe__: true,
  __name__: 'badge',
  __getCompoundVariantCss__: badgeFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: badgeVariantKeys,
  variantMap: badgeVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, badgeVariantKeys)
  },
  getVariantProps: badgeFn.getVariantProps,
})