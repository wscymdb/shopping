  // 参数：移动的元素  移动的距离
  // 因为传入的domElem 是一个对象，为了给不同的对象添加不同的定时器，也为了不重复声明变量
  // 所以直接将定时器通过强行赋值的方式个domElem这个对象
  // 如果有点击事件的话，没点击一次，就会触发一次定时器，容易出现bug
  // 所以在触发定时器前要先清除一下当前的定时器，确保只有一个定时器在运作
  // 缓动动画的核心算法 （目标值-现在位置）/10  就是当前移动的步长
  // 随着计时器的运作每次的步长也会变小，就形成了每次的距离慢慢变小
  // 第三个参数，是回调函数
  function animate(domElem, target, callback) {
    clearInterval(domElem.timer)
    domElem.timer = setInterval(() => {
      // 步长要是整数,因为除法会有小数，移动的距离会有误差，要向上取整
      // 如果是负数 要向下取整，因为如果距离是-8.1 那么肯定不能让他写成-8，会后退一点
      // 判断一下step的正负
      var step = ((target - domElem.offsetLeft) / 20)
      if (step > 0) {
        step = Math.ceil(step)
      } else {
        step = Math.floor(step)
      }
      // 判断到哪里结束，left的距离
      if (domElem.offsetLeft == target) {
        clearInterval(domElem.timer)
        // 判断是否有回调函数
        /* if (callback) {
          callback()
        } */
        // 利用逻辑短路
        callback && callback()
        return;
      }
      domElem.style.left = domElem.offsetLeft + step + 'px'
    }, 15)
  }
 

