/* 用export把方法暴露出来 */
/* 设置cookie */
export function setCookie (cname, value, expire) {
  var date = new Date()
  date.setSeconds(date.getSeconds() + expire)
  document.cookie = cname + '=' + escape(value) + '; expires=' + date.toGMTString()
}

/* 获取cookie */
export function getCookie (cname) {
  if (document.cookie.length > 0) {
    let cStart = document.cookie.indexOf(cname + '=')
    if (cStart !== -1) {
      cStart = cStart + cname.length + 1
      let cEnd = document.cookie.indexOf(';', cStart)
      if (cEnd === -1) {
        cEnd = document.cookie.length
      }
      return unescape(document.cookie.substring(cStart, cEnd))
    }
  }
  return ''
}

/* 删除cookie */
export function delCookie (cname) {
  setCookie(cname, '', -1)
}
