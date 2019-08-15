import Vue from 'vue'
import moment from 'moment'
import nzh from 'nzh/cn'
import { parse, stringify } from 'qs'
import _ from 'lodash'
import cityList from '../config/config.cityList'
import consts from '../config/config.consts'

/**
 * 检验是否是合格的url链接
 * @param {String} path url
 */
// eslint-disable-next-line
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
export function isUrl (path) {
  return reg.test(path)
}
/**
 * 对数字添零
 * @param {String} value 字符串格式的数字
 * @param {Number} totalLen 字符串格式的总长度，默认为 2
 */
export function fixedZero (value, totalLen = 2) {
  return _.padStart(value, totalLen, '0')
}

/**
 * 数字转中文金额
 * @param {Number} number
 * @param {Boolean} completeBoolean 是否展示角分位，默认不展示
 */
export function digitUppercase (number, completeBoolean = false) {
  return nzh.toMoney(number, { complete: completeBoolean })
}

/**
 * 以Object格式获取全部的router query数据
 */
export function getPageQuery () {
  let urlParam = parse(window.location.href.split('?')[1])
  Object.keys(urlParam).forEach((item) => {
    urlParam[item] = urlParam[item].replace(/<("[^"]*"|'[^']*'|[^'">])*>/ig, '')
  })
  return urlParam
}

/**
 * 拼凑路由连接
 * @param {String} path 路由路径
 * @param {Object} query 路由参数
 */
export function getQueryPath (path = '', query = {}) {
  const search = stringify(query)
  if (search.length) {
    return `${path}?${search}`
  }
  return path
}

/**
 * 获取范围时间数据
 * @param {String} type today, week, month, year
 */
export function getTimeDistance (type) {
  const now = new Date()
  const oneDay = 1000 * 60 * 60 * 24

  if (type === 'today') {
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    return [moment(now), moment(now.getTime() + (oneDay - 1000))]
  }

  if (type === 'week') {
    let day = now.getDay()
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)

    if (day === 0) {
      day = 6
    } else {
      day -= 1
    }

    const beginTime = now.getTime() - day * oneDay

    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))]
  }

  if (type === 'month') {
    const year = now.getFullYear()
    const month = now.getMonth()
    const nextDate = moment(now).add(1, 'months')
    const nextYear = nextDate.year()
    const nextMonth = nextDate.month()

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000)
    ]
  }

  const year = now.getFullYear()
  return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)]
}

/**
 * 倒计时
 * @param {String} endTime 倒计时结束的时间 格式：'YYYY-MM-DD HH:mm:ss'
 */
export function getEndTime (endTime) {
  const startDate = new Date() // 开始时间，当前时间
  const endDate = new Date(endTime) // 结束时间，需传入时间参数
  const t = endDate.getTime() - startDate.getTime() // 时间差的毫秒数
  var d = 0
  let h = 0
  let m = 0
  let s = 0
  if (t >= 0) {
    d = Math.floor(t / 1000 / 3600 / 24)
    h = Math.floor(t / 1000 / 60 / 60 % 24)
    m = Math.floor(t / 1000 / 60 % 60)
    s = Math.floor(t / 1000 % 60)
  }
  return '剩余时间' + d + '天 ' + h + '小时 ' + m + ' 分钟' + s + ' 秒'
}

/**
 * 获取文件后缀名
 * @param {String} fileName 文件名
 * 返回格式： ["png", index: 5, input: "1234.png"]
 */
export function getSuffix (fileName) {
  // eslint-disable-next-line
  var result = /[^\.]+$/.exec(fileName)
  return result
}

/**
 * 设置css动画
 * @param {String} classNameStr 要设置动画的元素类名
 * @param {String} animateClass 要设置的动画类名
 * @param {Number} timeDiff 时间差
 */
export function setCssAnimate (classNameStr, animateClass, timeDiff = 0) {
  const tagList = document.getElementsByClassName(classNameStr)
  // eslint-disable-next-line
  const everyItemTime = timeDiff !== 0 && (1 / lists.length).toFixed(2) || 0
  for (let i = 0; i < tagList.length; i++) {
    ((i) => {
      setTimeout(() => {
        animateClass.forEach((item) => {
          tagList[i].classList.add(item)
        })
        tagList[i].style.animationDelay = `${everyItemTime * i}s`
      }, 1000)
    })(i)
  }
  return true
}

/**
 * 删除已有的动画
 * @param {String} classNameStr 要设置动画的元素类名
 * @param {String} animateClass 要设置的动画类名
 * @param {Number} timeDiff 时间差
 */
export function deleteCssAnimate (classNameStr, animateClass, timeDiff = 0) {
  const tagList = document.getElementsByClassName(classNameStr)
  for (let i = 0; i < tagList.length; i++) {
    ((i) => {
      setTimeout(() => {
        animateClass.forEach((item) => {
          tagList[i].classList.remove(item)
        })
      }, 1000)
    })(i)
  }
  return true
}

/**
 * 校验数据是否是JSON类型
 * @param {String} value 传入的字符串
 */
export function validateJsonType (value) {
  try {
    let obj = JSON.parse(value)
    const data = typeof (obj) === 'object' && Object.prototype.toString.call(obj).toLowerCase() === '[object object]' && !obj.length
    return data
  } catch (e) {
    return false
  }
}

/**
 * 格式化级联选择城市数据
 */
export function formatCityList () {
  const list = []
  cityList.forEach((item) => {
    if (item.parentId === 0) {
      const data = {
        value: item.label,
        label: item.label,
        children: []
      }
      list.push(data)
    } else {
      const data = {
        value: item.label,
        label: item.label
      }
      list.find((child) => {
        if (child.value === item.provinceName) {
          child.children.push(data)
        }
      })
    }
  })
  return list
}

/**
 * 跳转邮箱
 * @param {Object} value 注册数据
 */
export function goToEmail (value) {
  const emailStr = Vue.prototype.$decryptAES(value.corpEmail)
  if (consts.EMAILLIST[emailStr.split('@')[1]]) {
    const a = document.createElement('a')
    a.href = consts.EMAILLIST[emailStr.split('@')[1]]
    a.target = '_blank'
    a.click()
  } else {
    Vue.prototype.antMessage('无法识别邮箱地址，请自行前往注册邮箱查看!', 'warning')
  }
}

/**
 * defend xss
 * @param {Object} value
 */
export function defendXSS (value) {
  if (typeof (value) === 'string') {
    value = replaceStrFn(value)
  } else if (value instanceof Array === true) {
    let newList = []
    value.forEach((item) => {
      if (typeof (item) !== 'boolean' || typeof (item) !== 'number') {
        // console.log('array item', item)
        let data = defendXSS(item)
        newList.push(data)
      }
    })
    return newList
  } else if (typeof (value) === 'object') {
    Object.keys(value).forEach((item) => {
      if (typeof (value[item]) !== 'boolean' && typeof (value[item]) !== 'number') {
        let replaceStr = value[item] instanceof Array === true
        replaceStr === true && (value[item] = defendXSS(value[item]))
        replaceStr === false && (value[item] = replaceStrFn(value[item]))
      }
    })
  }
  return value
}

/**
 * 替换字符
 * @param {Streing} value
 */
function replaceStrFn (value) {
  value = value.replace(/[&<">'](?:(amp|lt|quot|gt|#39|nbsp|#\d+);)?/g,
    function (a, b) {
      if (b) {
        return a
      } else {
        return {
          '<': '&lt;',
          '&': '&amp;',
          '"': '&quot;',
          '>': '&gt;',
          "'": '&#39;'
        }[a]
      }
    }
  )
  return value
}

/**
 * 将Array数据转换为echarts能够进行渲染的数据
 * @param {Array} value 要进行处理的数组数据
 * @param {String} nameStr 要转换为'name'的参数名称
 * @param {String} valueStr 要转换为'value'的参数名称
 * @param {String} dataStr 默认饼图为'value', 折线图为'data'
 */
export function releaseEchartsData (value, nameStr, valueStr, dataStr = 'value') {
  const list = []
  value.forEach((item) => {
    const data = {
      ...item,
      [`${dataStr}`]: item[valueStr],
      name: item[nameStr]
    }
    list.push(data)
  })
  return list
}

/**
 * 对Object数据进行保存换行符，缩进符的字符串化
 * @param {Object} value
 */
export function stringifyData (value) {
  let str = ''
  Object.keys(value).forEach((item) => {
    if (value[item] instanceof Array === true) {
      str += getArrayStr(item, value[item], 1)
    } else if (typeof (value[item]) === 'object') {
      str += getObectStr(item, value[item], 1)
    } else {
      str += getSimpleStr(item, value[item], 1)
    }
  })
  return str
}

/**
 * 转换基本类型数据
 * @param {String} key
 * @param {String} value
 * @param {Number} deepNum 参数所在深度
 */
function getSimpleStr (key = '', value, deepNum = 1) {
  let emptyStr = ''
  for (let i = 0; i < deepNum; i++) {
    emptyStr += '  ' // 两个空格
  }
  if (typeof value === 'string') {
    value = `"${value}"`
  }
  const data = key !== '' ? `${emptyStr}"${key}": ${value},\r` : `${emptyStr}${value},\r`
  return data
}

/**
 * 转换数组类型数据
 * @param {String} key
 * @param {String} value
 * @param {Number} deepNum 参数所在深度
 */
function getArrayStr (key = '', value, deepNum = 1) {
  let ArrayStr = ''
  let emptyStrFont = ''
  for (let i = 0; i < deepNum; i++) {
    emptyStrFont += '  ' // 两个空格
  }
  deepNum++
  value.forEach((item) => {
    if (item instanceof Array === true) {
      ArrayStr += getArrayStr('', item, deepNum)
    } else if (typeof item === 'object') {
      ArrayStr += getObectStr('', item, deepNum)
    } else {
      ArrayStr += getSimpleStr('', item, deepNum)
    }
  })
  ArrayStr = key !== '' ? `${emptyStrFont}"${key}": [\r${ArrayStr}${emptyStrFont}],\r` : `${emptyStrFont}[\r${ArrayStr}${emptyStrFont}],\r`
  return ArrayStr
}

/**
 * 转换 object 类型数据
 * @param {String} key
 * @param {String} value
 * @param {Number} deepNum 参数所在深度
 */
function getObectStr (key = '', value, deepNum = 2) {
  let ObectStr = ''
  let emptyStrFont = ''
  for (let i = 0; i < deepNum; i++) {
    emptyStrFont += '  ' // 两个空格
  }
  deepNum++
  // console.log('key', key)
  Object.keys(value).forEach((item) => {
    if (value[item] instanceof Array === true) {
      ObectStr += getArrayStr(item, value[item], deepNum)
    } else if (typeof (value[item]) === 'object') {
      // console.log('key', key)
      ObectStr += getObectStr(item, value[item], deepNum)
    } else {
      ObectStr += getSimpleStr(item, value[item], deepNum)
    }
  })
  // ObectStr = `${emptyStrFont}{\r${ObectStr}${emptyStrFont}},\r`
  ObectStr = key !== '' ? `${emptyStrFont}"${key}": {\r${ObectStr}${emptyStrFont}},\r` : `${emptyStrFont}{\r${ObectStr}${emptyStrFont}},\r`
  return ObectStr
}

/**
 * url的正则表达式：包括IP，域名（domain），ftp，二级域名，域名中的文件，域名加上端口！用户名等等信息
 * @param {*} strUrl
 */
export function IsURL (strUrl) {
  var strRegex =
      '^((https|http|ftp|rtsp|mms)?://)' +
      "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" + // ftp的user@
      '(([0-9]{1,3}.){3}[0-9]{1,3}' + // IP形式的URL- 199.194.52.184
      '|' + // 允许IP和DOMAIN（域名）
      "([0-9a-z_!~*'()-]+.)*" + // 域名- www.
      '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' + // 二级域名
      '[a-z]{2,6})' + // first level domain- .com or .museum
      '(:[0-9]{1,4})?' + // 端口- :80
      '((/?)|' + // a slash isn't required if there is no file name
      "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$"
  var re = new RegExp(strRegex)
  // re.test()
  if (re.test(strUrl)) {
    return true
  } else {
    return false
  }
}

