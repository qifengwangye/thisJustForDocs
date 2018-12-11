import moment from 'moment'
import nzh from 'nzh/cn'
import { parse, stringify } from 'qs'
import _ from 'lodash'

// eslint-disable-next-line
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/

/**
 * 检验是否是合格的url链接
 * @param {String} path url
 */
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
  return parse(window.location.href.split('?')[1])
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
 * 路由跳转刷新面包屑
 */
let pathNameList = []
export function releaseRouterListDataFn (value) {
  let locationList = []
  if (location.hash.indexOf('?') !== -1) {
    let cutQueryParam = location.hash.split('?')[0]
    locationList = cutQueryParam.split('/').slice(1)
  } else {
    locationList = location.hash.split('/').slice(1)
  }
  const locationListToCompare = []
  locationList.forEach((item) => {
    locationListToCompare.push(`/${item}`)
  })
  const routerData = value.options.routes
  let exportForBreadCrumb = []
  exportForBreadCrumb = mapRouterList(locationListToCompare, routerData)
  const tierDeep = releaseBreadCrumbNumFn(locationListToCompare, routerData)
  return {exportForBreadCrumb, tierDeep}
}

/**
 * 递归路由
 * @param {Array} locationList
 * @param {Array} routerData
 */
function mapRouterList (locationList, routerData) {
  for (let i = 0; i < locationList.length; i++) {
    for (let j = 0; j < routerData.length; j++) {
      if (_.includes(routerData[j].path, locationList[i])) {
        const data = {
          name: routerData[j].name,
          path: routerData[j].path,
          id: `${i}${j}`
        }
        pathNameList.push(data)
        if (routerData[j].children) {
          mapRouterList(locationList.slice(1), routerData[j].children)
        }
      }
    }
  }
  return pathNameList
}

/**
 * 获取当前路由信息list
 * @param {Array} locationList
 * @param {Array} routerData
 */
function releaseBreadCrumbNumFn (locationList, routerData) {
  let tierDeep = 1
  for (let i = 0; i < locationList.length; i++) {
    for (let j = 0; j < routerData.length; j++) {
      if (_.includes(routerData[j].path, locationList[i])) {
        if (routerData[j].children) {
          tierDeep += 1
          releaseBreadCrumbNumFn(locationList.slice(1), routerData[j].children)
        }
      }
    }
  }
  return tierDeep
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
  console.log('tagList', tagList)
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
