// 整个也买你加载完毕后才执行下面的代码
window.addEventListener("load",function() {

var preview_wrap = document.querySelector(".preview_wrap")
var mask = document.querySelector(".mask")
var big = document.querySelector(".big")
var bigImg = document.querySelector(".bigImg") 
//  当鼠标经过图片的盒子,就是显示遮罩,离开就隐藏
preview_wrap.addEventListener("mouseenter",function () {
  mask.style.display = "block"
  big.style.display = "block"

})
preview_wrap.addEventListener("mouseleave",function () {
  mask.style.display = "none"
  big.style.display = "none"
})
// 添加鼠标移动事件
preview_wrap.addEventListener("mousemove",(e) => {
  var x = e.pageX-preview_wrap.offsetLeft
  var y = e.pageY-preview_wrap.offsetTop

  // mask移动的距离
  var maskX =  x - (mask.offsetWidth/2)
  var maskY = y -  (mask.offsetHeight/2)

    // 遮挡层的宽度经行判断
    if (maskX < 0) {
      maskX = 0
    } else if (maskX >= (preview_wrap.offsetWidth-mask.offsetWidth)) {
      maskX = preview_wrap.offsetWidth-mask.offsetWidth //盒子的宽度-遮罩层的宽度
    }
    if (maskY < 0) {
      maskY = 0
    } else if (maskY >= (preview_wrap.offsetHeight-mask.offsetHeight)) {
      maskY = preview_wrap.offsetHeight-mask.offsetHeight //盒子的高度-遮罩层的高度
    }
  mask.style.left =maskX + 'px'
  mask.style.top = maskY + 'px'
  // 大图片的移动距离 = 遮挡层的移动距离*大图片的最大移动距离 / 遮挡层的最大移动距离
  // 因为盒子是正方形 所以求宽高都是一样的 x的移动距离和y的是一样的
  var maskMax = preview_wrap.offsetWidth-mask.offsetWidth //遮挡层的最大移动距离
  var bigMax = bigImg.offsetWidth-big.offsetWidth //大图片的最大移动距离
  // 大图片的移动距离
  var bigX = maskX * bigMax / maskMax
  var bigY = maskY * bigMax / maskMax
  bigImg.style.left = -bigX + 'px'
  bigImg.style.top = -bigY + 'px'
})
 
})
