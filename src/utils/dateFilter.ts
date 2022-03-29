import { dayjs } from '@/utils/dayjs'
import { DateFilterData } from '@/definition/interface'
import { Record } from '@/models/Record'

export const dateFilter = (filterData: DateFilterData, data: any[]) => {
  const { searchMode, filter } = filterData
  if (searchMode === '月份') {
    return data.filter((item: Record) => dayjs(item.date).isSame(`${filter.year}-${filter.month}`, 'month'))
  } else {
    if (!filter.startDate && !filter.finishDate) return []
    if (filter.startDate && !filter.finishDate) {
      return data.filter((item: Record) => dayjs(item.date).isSameOrAfter(filter.startDate))
    } else if (!filter.startDate && filter.finishDate) {
      return data.filter((item: Record) => dayjs(item.date).isSameOrBefore(filter.finishDate))
    } else {
      return data.filter(
        (item: Record) =>
          dayjs(item.date).isBetween(filter.startDate, filter.finishDate) ||
          dayjs(item.date).isSame(dayjs(filter.startDate)) ||
          dayjs(item.date).isSame(dayjs(filter.finishDate))
      )
    }
  }
}
