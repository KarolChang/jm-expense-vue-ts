import { apiHelperLine, LineInput } from './helper'

export default {
  push(data: LineInput) {
    return apiHelperLine.post('/push', data)
  }
}
