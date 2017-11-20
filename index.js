(function (window, document) {
  // 拉取 document 元素
  var docEl = document.documentElement;
  // 判断当前 window dpr 比例，若无直接降级使用 1
  var dpr = window.devicePixelRatio || 1

  // 设置 body 字体大小
  function setBodyFontSize () {
    if (document.body) {
      document.body.style.fontSize = (12 * dpr) + 'px'
    }
    else {
      // TODO: 这种情况可能发生在标签置于 head 标签中，待测试。
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  
  // 立即自执行
  setBodyFontSize();

  // 设置 1 rem 等于 视区除以10。
  // 若设计稿是750px，那么1rem等于75px。
  function setRemUnit () {
    var rem = docEl.clientWidth / 10
    docEl.style.fontSize = rem + 'px'
  }

  setRemUnit()

  // reset rem unit on page resize
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit()
    }
  })

  // 检查发现支持0.5px
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
}(window, document))
