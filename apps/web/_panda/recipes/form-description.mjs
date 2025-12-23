import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const formDescriptionFn = /* @__PURE__ */ createRecipe('formDescription', {}, [])

const formDescriptionVariantMap = {}

const formDescriptionVariantKeys = Object.keys(formDescriptionVariantMap)

export const formDescription = /* @__PURE__ */ Object.assign(memo(formDescriptionFn.recipeFn), {
  __recipe__: true,
  __name__: 'formDescription',
  __getCompoundVariantCss__: formDescriptionFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: formDescriptionVariantKeys,
  variantMap: formDescriptionVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, formDescriptionVariantKeys)
  },
  getVariantProps: formDescriptionFn.getVariantProps,
})