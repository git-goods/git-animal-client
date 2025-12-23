import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const cardContentFn = /* @__PURE__ */ createRecipe('cardContent', {}, [])

const cardContentVariantMap = {}

const cardContentVariantKeys = Object.keys(cardContentVariantMap)

export const cardContent = /* @__PURE__ */ Object.assign(memo(cardContentFn.recipeFn), {
  __recipe__: true,
  __name__: 'cardContent',
  __getCompoundVariantCss__: cardContentFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: cardContentVariantKeys,
  variantMap: cardContentVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, cardContentVariantKeys)
  },
  getVariantProps: cardContentFn.getVariantProps,
})