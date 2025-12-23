import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const formControlFn = /* @__PURE__ */ createRecipe('formControl', {}, [])

const formControlVariantMap = {}

const formControlVariantKeys = Object.keys(formControlVariantMap)

export const formControl = /* @__PURE__ */ Object.assign(memo(formControlFn.recipeFn), {
  __recipe__: true,
  __name__: 'formControl',
  __getCompoundVariantCss__: formControlFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: formControlVariantKeys,
  variantMap: formControlVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, formControlVariantKeys)
  },
  getVariantProps: formControlFn.getVariantProps,
})