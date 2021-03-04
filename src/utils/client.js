/* eslint-disable */
import dsbridge from 'dsbridge'
import qs from 'qs'
// 命名空间
const namespace = dsbridge.call('getNameSpace')

// js调客户端
/**
 * ------常用方法名-----
 * 获取用户信息: getUserInfo
 * 客户端跳转: jumpTo
 * 客户端报数: onStatisticEvent
 * 友盟报数: onUmengEvent
 * */
const jsToClient = (methodName, params) => {
  const para = typeof params === 'string' ? params : JSON.stringify(params)
  return new Promise((resolve, reject) => {
    const nativeMethod = namespace + '.' + methodName
    const hasNativeMethod = dsbridge.hasNativeMethod(nativeMethod)
    if (hasNativeMethod) {
      dsbridge.call(nativeMethod, para, res => {
        resolve(res)
      })
    } else {
      console.log('请在客户端调用！', methodName, params)
      // reject(new Error())
    }
  })
}

const appToJs = (params, callback) => {
  dsbridge.register(namespace + params.funName, val => {
    callback && callback(val)
  })
}

// 客户端调js
const clientToJs = (methodName, callback) => {
  dsbridge.register(namespace + '.' + methodName, res => {
    callback && callback(res)
  })
}
/** 模拟掌通用户数据 */
export const DEMO_USER_INFO = `
{
	"isTrillMode": true,
	"allBabyId": ["184ad7147f7a1462921a"],
	"avatar": "",
	"babyNickName": "",
	"babyTrueName": "小乾",
	"className": "二班",
	"class_uid": "wec9D1SbwycpcyIJ2yJ",
	"familyRelation": "YY",
	"industryType": "A",
	"isAdministrators": false,
	"isgraduated": "0",
	"moduleType": "4",
	"nickname": "家长042612",
	"phoneNumber": "18205992152",
	"schoolName": "北一二区",
	"schoolType": "2",
	"userToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZUeXBlIjoiQW5kcm9pZCIsImlzT3BlcmF0aW9uIjpmYWxzZSwiYXBwVHlwZSI6IkFQUF9UWVBFX1BBUkVOVCIsImlzcyI6InN6eSIsImlkIjoiOTE1QTQxQ0YxNEM5NDQyOTk2QkRCREM0QjVGNEQzRUIiLCJ1c2VyVHlwZSI6InBhcmVudCIsInNlc3Npb25JZCI6IkRGRjQ3MzMxNkVEMzQ3RkE5OTUxMEJDOTQ0RDBFNkFEIiwiZXhwIjoxNTc1NTM0NTI4LCJ0b2tlblR5cGUiOjEsInVzZXJJZCI6ImYyYjMyZTE3MDQ4MDM5ZmJiZDBiIiwiaWF0IjoxNTc1NTI3MzI4fQ.cGt4urONI_7wb3hUro1lDD7WmkwDQNvABZ8fRzqENN4",
  "zipcode": "110108",
	"account_type": 1,
	"baby_uid": "184ad7147f7a1462921a",
	"school_id": "TvAaC1V51ywsXM1quqF",
	"ssid": "6832778F0B7B43C1A3D9D0EFC65BEA74",
	"st": {
		"adid": "fc8cfdaf64d9ff53",
		"app_ver": "6.32.1",
		"channel": "tengxun",
		"density": "3.0",
		"device_id": "9813f47d74ab2cc3ef4c2a24fed3f1db",
		"imei": "868049033724756",
		"location": "116.305807,39.977641",
		"mac": "DC:55:83:28:00:55",
		"network": "WiFi",
		"os_ver": "7.1.1",
		"phone_model": "OPPO R11s Plus",
		"platform": "2",
		"reqcodeversion": "5.3",
		"screen": "1080x2016",
		"sp": "46007",
		"vendor": "OPPO",
		"zipcode": "110108"
	},
	"student_uid": "a754e31c344176a8e5f9",
	"token": "",
	"type": 3,
	"uid": "0fe5b47c3b22aqww72223",
	"user_type": "1",
	"memberInfo": {
		"memberName": "黄金会员",
		"memberLevel": 50,
		"memberStatus": 0,
		"effectiveEndTime": 1576675372
	}
}
`
// 获取客户端用户信息
const getUserInfo = (callback) => {
  if (namespace) {
    jsToClient('getUserInfo').then(res => {
      callback && callback(res)
    })
  } else {
    setTimeout(() => {
      callback && callback(process.env.NODE_ENV === 'development' ? DEMO_USER_INFO : '{}')
    }, 100)
  }
}

// 标记返回需要刷新
const autoRefresh = () => {
  if (namespace) {
    let jumpObj = {
      action: 'autoRefresh',
      data: {
        needRefresh: true
      }
    }
    jsToClient('jumpTo', jumpObj)
  }
}

const getUrl = (url, params) => {
  if (url && Object.keys(params).length) {
    const ix = url.indexOf('?')
    url += (ix > -1 ? '&' : '?') +
      (typeof params === 'string' ? params : qs.stringify(params))
  }
  return url
}

// url参数转化成对象
const param2Obj = (url)=>{
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  let searchUrl = qs.parse(search)
  return searchUrl
}
// 客户端链接跳转
const gotoURL = (uri='', parame, callback, title = '') => {
  let url = parame?getUrl(uri, parame):uri
  const obj = param2Obj(window.location.href)
  const urlObj = param2Obj(url)
  // 判断url 是否存在entrance
  if (!urlObj.entrance && obj.entrance) {
    // 判断url 是否有参数
    if(JSON.stringify(urlObj) == '{}'){
      url = `${url}?entrance=${obj.entrance}`
    }else{
      url = `${url}&entrance=${obj.entrance}`
    }
  }
  let baseUrl = process.env.BASE_URL
  // 完整项目域名路径
  const domain = window.location.origin + baseUrl
  if (url.indexOf('http') !== 0) {
    if(url.indexOf('/') == 0){
      url = url.replace(/(.*)\//, '$1')
    }
    url = domain + url
  }
  if (namespace) {
    autoRefresh()
    // 客户端跳转
    jsToClient('jumpTo', {
      action: 'html',
      data: {
        title: title,
        url: url,
        // needRefrush: true,
        needResult: true
      }
    })
    .then((res)=>{
      callback && callback(res)
    })
  } else {
    window.location.href = url
  }
}


// 关闭当前页面（返回上一层）
const closePage = () => {
  if (namespace) {
    jsToClient('jumpTo', {
      action: 'finish',
      data: {
        needRefrush: true,
        param: ''
      }
    })
  } else {
    window.history.back()
  }
}

/** 微信支付 */
const wxPay = params => {
  return new Promise((resolve, reject) => {
    if (namespace) {
      jsToClient('jumpTo', {
        action: 'wxPay',
        data: params
      }).then(result => {
        resolve(result)
      })
    } else {
      reject('请在客户端内支付')
    }
  })
}

/** 支付宝支付 */
const aliPay = params => {
  return new Promise((resolve, reject) => {
    if (namespace) {
      jsToClient('jumpTo', {
        action: 'aliPay',
        data: params
      }).then(result => {
        resolve(result)
      })
    } else {
      reject('请在客户端内支付')
    }
  })
}

/** 苹果支付（IAP） */
const ApplePay = params => {
  return new Promise((resolve, reject) => {
    if (namespace) {
      jsToClient('inAppPurchase', params).then(result => {
        resolve(result)
      })
    } else {
      reject('请在苹果设备上支付')
    }
  })
}

/* 阿里百川SDK打开商品详情页 */
const setGoodInfo = (params, callback) => {
  try {
    dsbridge.call(namespace + '.setGoodInfo', params, val => {
      callback && callback(val)
    })
  } catch (e) {}
}

/* 分享 */
const share = (params, callback) => {
  try {
    dsbridge.call(namespace + '.share', params, val => {
      callback && callback(val)
    })
  } catch (e) {
    console.log('请在客户端调用！')
  }
}
/* eslint-disable */
export {
  namespace,
  jsToClient,
  clientToJs,
  getUserInfo,
  autoRefresh,
  gotoURL,
  closePage,
  wxPay,
  aliPay,
  ApplePay,
  setGoodInfo,
  share,
  appToJs
}

// 全局注入vue中的方法
export default {
  jsToClient,
  clientToJs,
  gotoURL
}
