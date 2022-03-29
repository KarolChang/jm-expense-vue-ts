import type { SearchMode } from './type'

export interface DateFilterData {
  searchMode: SearchMode
  filter: {
    year: number
    month: number
    startDate: string
    finishDate: string
  }
}
