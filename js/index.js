window.addEventListener("load", () => {
  // 查找轮播图的左右箭头
  var larrow = document.querySelector(".focus .larrow")
  var rarrow = document.querySelector(".focus .rarrow")
  var focus = document.querySelector(".focus")
  var barrow = document.querySelector(".focus .barrow")
  var focusItem = document.querySelector(".focus .focus-item")
  console.log(focusItem.children.length);
  //1. 鼠标进入轮播区域，箭头显示，离开隐藏
  focus.addEventListener("mouseenter", () => {
    larrow.style.display = "block"
    rarrow.style.display = "block"
    clearInterval(timer)
    timer = null; //清除计时器
  })
  focus.addEventListener("mouseleave", () => {
    larrow.style.display = "none"
    rarrow.style.display = "none"
    // 再次启动计时器
    timer = setInterval(() => {
      // 手动调用rarrow上的点击事件
      rarrow.click()
    }, 3000)

  })
  //2. 根据图片的数量动态生成下面的小圆圈，利用文档片段的方法，优化内存，减少重排重绘
  var flag = document.createDocumentFragment()
  for (var i = 0; i < focusItem.children.length; i++) {
    var li = document.createElement("li")
    li.setAttribute("data-i", i)
    flag.appendChild(li)
  }
  barrow.appendChild(flag)
  // 3.当点击某个小圆圈，变色，利用事件委托
  // 页面加载第一个图片是选中状态的
  barrow.children[0].className = 'selected'
  // 图片的宽度就是foucus的宽度
  var focusWidth = focus.offsetWidth
  barrow.addEventListener("click", (e) => {
    if (e.target.nodeName == "LI") {
      // 排他思想，处理点击的小圆圈，其他都不变化
      for (var item of barrow.children) {
        item.className = ''
      }
      e.target.className = 'selected'
      // ul移动
      // ul的移动距离就是，小圆圈的索引号*图片的宽度 ,值要是负数

      var i = e.target.dataset.i
      arrNum = e.target.dataset.i  //如果点击了这个，就将自定义的值给全局变量arrNum
      circle = e.target.dataset.i
      console.log(i);
      console.log(focusWidth);
      animate(focusItem, -focusWidth * i)
    }
  })
  // 4.深度克隆focus-item里面的第一个孩子
  // 这样写的好处，自动化，小圆圈也不会增多
  var lastLi = focusItem.children[0].cloneNode(true)

  // 追加
  focusItem.appendChild(lastLi)
  // 5.点击左右侧按钮，滚动图片
  // 无缝滚动原理，复制第一张图片放到末尾，当点击到最后一张图片的时候，将ul的left设为0，回到了起点，这个过程很快肉眼是看不见的
  var arrNum = arrNum || 0; //控制图片
  var circle = circle || 0; //控制小圆圈的变化
  var throttle = true;  //节流阀，防止连续点击箭头，图片轮播过快,只有调用完此次动画才打开节流阀
  rarrow.addEventListener("click", () => {
    if (throttle) {
      throttle = !throttle //关闭节流阀
      // 减去1是因为从0开始计算，第一张图片不需要移动位置
      if (arrNum == focusItem.children.length - 1) {
        focusItem.style.left = 0
        arrNum = 0
      }
      arrNum++;
      animate(focusItem, -focusWidth * arrNum, function () {
        throttle = !throttle //打开节流阀
      })
      // 小圆圈的选中
      circle++;
      // 如果circle的值等于了图片的长度，说明走到了克隆的最后一个图片，让其变成0即可
      /* if(circle == focusItem.children.length-1) {
        circle = 0
      } */
      circle = circle == focusItem.children.length - 1 ? circle = 0 : circle
      circleChange()
    }
  })
  larrow.addEventListener("click", () => {
    if (throttle) {
      throttle = !throttle;
      // 减去1是因为从0开始计算，第一张图片不需要移动位置
      if (arrNum == 0) {
        arrNum = focusItem.children.length - 1
        focusItem.style.left = -arrNum * focusWidth + 'px'
      }
      arrNum--;
      animate(focusItem, -focusWidth * arrNum, () => {
        throttle = !throttle
      })
      // 小圆圈的选中
      circle--;
      // 如果circle的值小于0，则小圆圈的选中要选中第四个
      /* if(circle < 0) {
        circle = focusItem.children.length-2
      } */
      circle = circle < 0 ? circle = focusItem.children.length - 2 : circle
      // 调用函数
      circleChange()
    }
  })

  function circleChange() {
    // 清除其他小圆圈的类名
    for (var item of barrow.children) {
      item.className = ''
    }
    // 让当前的小圆圈添加类名
    barrow.children[circle].className = 'selected'
  }

  // 自动播放图片
  var timer = setInterval(() => {
    // 手动调用rarrow上的点击事件
    rarrow.click()
  }, 3000)


  // 此模块是返回顶部的按钮
  var sliderBar = document.querySelector(".slider-bar")
  var goBack = document.querySelector(".goback")
  var newflash = document.querySelector(".newflash")
  // Yed 的距离就是轮播图距离顶部的距离，加上newflas一半的距离，刚好就是sliderbar距离顶部的距离
  newflashHeight = newflash.offsetHeight/2
  focusHeight = focus.offsetTop
  Yed = newflashHeight+focusHeight
  document.addEventListener("scroll",() => {
    // 获取页面被卷去的距离和slider距离顶部的距离
    var scrollY = window.pageYOffset  
    if (scrollY >= Yed) {
      sliderBar.style.position = "fixed"
      sliderBar.style.top = 0
      sliderBar.style.right = '184px'
    }else {
      sliderBar.style.position = "absolute"
      sliderBar.style.top = '50%'
      sliderBar.style.right = '-61px'
    }
  })
  // 添加返回顶部事件
  goBack.addEventListener('click',function(){
    animate1(window,0)
  })
  // 动画函数
  function animate1(domElem, target, callback) {
    clearInterval(domElem.timer)
    domElem.timer = setInterval(() => {
      // 步长要是整数,因为除法会有小数，移动的距离会有误差，要向上取整
      // 如果是负数 要向下取整，因为如果距离是-8.1 那么肯定不能让他写成-8，会后退一点
      // 判断一下step的正负
      var step = ((target - window.pageYOffset) / 20)
      if (step > 0) {
        step = Math.ceil(step)
      } else {
        step = Math.floor(step)
      }
      // 判断到哪里结束，left的距离
      if (window.pageYOffset == target) {
        clearInterval(domElem.timer)
        // 判断是否有回调函数
        callback && callback()
        return;
      }
      window.scroll(0,window.pageYOffset+step)
    }, 15)
  }
})