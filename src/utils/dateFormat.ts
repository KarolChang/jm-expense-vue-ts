import { dayjs } from '@/utils/dayjs'

export const formatDate = (date: Date) => {
  return dayjs(date).format('YYYY-MM-DD')
}

export const getDay = (date: Date) => {
  return dayjs(date).locale('zh-tw').format('dddd')
}
