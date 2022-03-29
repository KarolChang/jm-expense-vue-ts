import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import updateLocale from 'dayjs/plugin/updateLocale'
import 'dayjs/locale/zh-tw'

dayjs.extend(isBetween)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(updateLocale)

dayjs.updateLocale('zh-tw', {
  weekdays: ['(日)', '(一)', '(二)', '(三)', '(四)', '(五)', '(六)']
})

export { dayjs }
