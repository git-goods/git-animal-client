import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const cardFooterFn = /* @__PURE__ */ createRecipe('cardFooter', {}, [])

const cardFooterVariantMap = {}

const cardFooterVariantKeys = Object.keys(cardFooterVariantMap)

export const cardFooter = /* @__PURE__ */ Object.assign(memo(cardFooterFn.recipeFn), {
  __recipe__: true,
  __name__: 'cardFooter',
  __getCompoundVariantCss__: cardFooterFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: cardFooterVariantKeys,
  variantMap: cardFooterVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, cardFooterVariantKeys)
  },
  getVariantProps: cardFooterFn.getVariantProps,
})