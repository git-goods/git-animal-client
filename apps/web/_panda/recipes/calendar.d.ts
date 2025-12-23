/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface CalendarVariant {
  
}

type CalendarVariantMap = {
  [key in keyof CalendarVariant]: Array<CalendarVariant[key]>
}

export type CalendarVariantProps = {
  [key in keyof CalendarVariant]?: ConditionalValue<CalendarVariant[key]> | undefined
}

export interface CalendarRecipe {
  __type: CalendarVariantProps
  (props?: CalendarVariantProps): Pretty<Record<"root" | "months" | "month" | "caption" | "caption_label" | "nav" | "nav_button" | "nav_button_previous" | "nav_button_next" | "table" | "head_row" | "head_cell" | "row" | "cell" | "day" | "day_selected" | "day_today" | "day_outside" | "day_disabled" | "day_range_start" | "day_range_middle" | "day_range_end" | "day_hidden", string>>
  raw: (props?: CalendarVariantProps) => CalendarVariantProps
  variantMap: CalendarVariantMap
  variantKeys: Array<keyof CalendarVariant>
  splitVariantProps<Props extends CalendarVariantProps>(props: Props): [CalendarVariantProps, Pretty<DistributiveOmit<Props, keyof CalendarVariantProps>>]
  getVariantProps: (props?: CalendarVariantProps) => CalendarVariantProps
}

/**
 * Styles for the Calendar component


 */
export declare const calendar: CalendarRecipe