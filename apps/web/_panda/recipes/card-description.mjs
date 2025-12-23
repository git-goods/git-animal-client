import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const cardDescriptionFn = /* @__PURE__ */ createRecipe('cardDescription', {}, [])

const cardDescriptionVariantMap = {}

const cardDescriptionVariantKeys = Object.keys(cardDescriptionVariantMap)

export const cardDescription = /* @__PURE__ */ Object.assign(memo(cardDescriptionFn.recipeFn), {
  __recipe__: true,
  __name__: 'cardDescription',
  __getCompoundVariantCss__: cardDescriptionFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: cardDescriptionVariantKeys,
  variantMap: cardDescriptionVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, cardDescriptionVariantKeys)
  },
  getVariantProps: cardDescriptionFn.getVariantProps,
})