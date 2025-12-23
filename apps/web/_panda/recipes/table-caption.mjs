import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const tableCaptionFn = /* @__PURE__ */ createRecipe('tableCaption', {}, [])

const tableCaptionVariantMap = {}

const tableCaptionVariantKeys = Object.keys(tableCaptionVariantMap)

export const tableCaption = /* @__PURE__ */ Object.assign(memo(tableCaptionFn.recipeFn), {
  __recipe__: true,
  __name__: 'tableCaption',
  __getCompoundVariantCss__: tableCaptionFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: tableCaptionVariantKeys,
  variantMap: tableCaptionVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, tableCaptionVariantKeys)
  },
  getVariantProps: tableCaptionFn.getVariantProps,
})