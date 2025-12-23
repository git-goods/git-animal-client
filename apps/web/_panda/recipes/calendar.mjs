import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const calendarDefaultVariants = {}
const calendarCompoundVariants = []

const calendarSlotNames = [
  [
    "root",
    "calendar__root"
  ],
  [
    "months",
    "calendar__months"
  ],
  [
    "month",
    "calendar__month"
  ],
  [
    "caption",
    "calendar__caption"
  ],
  [
    "caption_label",
    "calendar__caption_label"
  ],
  [
    "nav",
    "calendar__nav"
  ],
  [
    "nav_button",
    "calendar__nav_button"
  ],
  [
    "nav_button_previous",
    "calendar__nav_button_previous"
  ],
  [
    "nav_button_next",
    "calendar__nav_button_next"
  ],
  [
    "table",
    "calendar__table"
  ],
  [
    "head_row",
    "calendar__head_row"
  ],
  [
    "head_cell",
    "calendar__head_cell"
  ],
  [
    "row",
    "calendar__row"
  ],
  [
    "cell",
    "calendar__cell"
  ],
  [
    "day",
    "calendar__day"
  ],
  [
    "day_selected",
    "calendar__day_selected"
  ],
  [
    "day_today",
    "calendar__day_today"
  ],
  [
    "day_outside",
    "calendar__day_outside"
  ],
  [
    "day_disabled",
    "calendar__day_disabled"
  ],
  [
    "day_range_start",
    "calendar__day_range_start"
  ],
  [
    "day_range_middle",
    "calendar__day_range_middle"
  ],
  [
    "day_range_end",
    "calendar__day_range_end"
  ],
  [
    "day_hidden",
    "calendar__day_hidden"
  ]
]
const calendarSlotFns = /* @__PURE__ */ calendarSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, calendarDefaultVariants, getSlotCompoundVariant(calendarCompoundVariants, slotName))])

const calendarFn = memo((props = {}) => {
  return Object.fromEntries(calendarSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const calendarVariantKeys = []
const getVariantProps = (variants) => ({ ...calendarDefaultVariants, ...compact(variants) })

export const calendar = /* @__PURE__ */ Object.assign(calendarFn, {
  __recipe__: false,
  __name__: 'calendar',
  raw: (props) => props,
  variantKeys: calendarVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, calendarVariantKeys)
  },
  getVariantProps
})