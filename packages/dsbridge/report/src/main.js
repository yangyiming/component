import { reportPV, reportEvent } from 'szyreport'
import { jsToClient, namespace } from 'main/utils/client'
// 检测开发环境使用的URL配置还是编译环境配置
const getPrefix = ()=>{
  const currentHost = window.location.hostname
  // 编译环境配置
  let prefix = process.env.VUE_APP_PREFIX
  if (!prefix) {
    // url环境配置
    if (currentHost.indexOf('-') > -1) {
      prefix = currentHost.split('-')[0]
    }
  }
  // 本地开发环境
  var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;re.test(window.location.hostname)
  if (/localhost/.test(currentHost) || re.test(currentHost) || prefix === 'alpha') {
    prefix = 'alpha'
  } else {
    prefix = ''
  }
  // 返回埋点环境
  return prefix
}
const curPrefix = getPrefix()
export default {
  // PV埋点
  pv: (data) => {
    if (data.parm && Object.prototype.toString.call(data.parm) === '[object Object]') {
      data.parm = JSON.stringify(data.parm)
    }
    if (namespace) {
      jsToClient('onStatisticEvent', {
        event: 'sdo_bfn_pv',
        data
      })
    } else {
      reportPV({
        data: data,
        prefix: curPrefix
      })
    }
  },
  // EV埋点
  ev: (data) => {
    if (data.parm && Object.prototype.toString.call(data.parm) === '[object Object]') {
      data.parm = JSON.stringify(data.parm)
    }
    if (namespace) {
      jsToClient('onStatisticEvent', {
        event: 'sdo_bfn_event',
        data: data
      })
    } else {
      reportEvent({
        data: data,
        prefix: curPrefix
      })
    }
  }
}
