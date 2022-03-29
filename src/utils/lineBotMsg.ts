import lineBotAPI from '@/apis/lineBot'

export const pushMsgToBoth = async (text: string) => {
  try {
    const input = {
      to: [import.meta.env.VITE_KAROL_USERID, import.meta.env.VITE_JIANMIAU_USERID],
      messages: {
        type: 'text',
        text
      }
    }
    await lineBotAPI.push(input)
  } catch (error) {
    console.error('error', error)
  }
}
