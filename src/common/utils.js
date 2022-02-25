
//定时器节流，
//定时器会在事件栈（要执行函数推入事件栈）其他函数执行完空了的时候执行
export function debounce(func, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)//if为空则clearTimeout
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
// 时间戳的转化
export function formatDate(date, fmt) {
  // 1. 获取年份
  // yyyy-2022
  // y+ -> 1个或者多个
  // y  -> 2
  // y* -> 0个或者多个y
  // y? -> 0个或者1个y
  if (/(y+)/.test(fmt)) {
    // substr(4 - RegExp.$1.length));传入的数值（RegExp.$1）截取数量如若为4即xxxx年，所以不截取
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  // 2. 获取
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

//不足两位的时候进行补位
// 4:4:4 -> 04:04:04
function padLeftZero(str) {
  //00 + 4 -> 004 再通过substr截取str长度(1)后变为两位数04
  return ('00' + str).substr(str.length);
}