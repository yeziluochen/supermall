
//定时器节流，
//定时器会在事件栈（要执行函数推入事件栈）其他函数执行完空了的时候执行
export function debounce(func, delay) {
    let timer = null
    return function (...args) {
      if(timer) clearTimeout(timer)//if为空则clearTimeout
      timer = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
  }