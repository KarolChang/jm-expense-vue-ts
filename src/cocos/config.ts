/** 外部帶進來的param */
const URLscheme: any = []
export const onLoad = async function () {
  const url = window.location.search
  if (url.indexOf('?') !== -1) {
    const str: string = url.substr(1)
    const strs: any[] = str.split('&')
    for (let i = 0; i < strs.length; i++) {
      URLscheme[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
    }
  }
  // CallParent('_alert', '我愛豬涵')
}

export const CallParent = async function (method: string, ...param: any[]) {
  const target: string = URLscheme['host']
  if (target) {
    window.parent.postMessage(
      {
        method: method,
        value: param
      },
      target
    )
  }
}
