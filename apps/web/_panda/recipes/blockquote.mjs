import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const blockquoteFn = /* @__PURE__ */ createRecipe('blockquote', {}, [])

const blockquoteVariantMap = {}

const blockquoteVariantKeys = Object.keys(blockquoteVariantMap)

export const blockquote = /* @__PURE__ */ Object.assign(memo(blockquoteFn.recipeFn), {
  __recipe__: true,
  __name__: 'blockquote',
  __getCompoundVariantCss__: blockquoteFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: blockquoteVariantKeys,
  variantMap: blockquoteVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, blockquoteVariantKeys)
  },
  getVariantProps: blockquoteFn.getVariantProps,
})