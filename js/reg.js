(function () {
  // 手机号的正则
  var telReg = /^1[3-9]\d{9}$/
  var tel = document.querySelector('#sjh')
  regTest(tel, telReg, '手机号格式不正确，请重新输入', '验证通过')
  // qq号的正则
  // {4,} 表示大于等于4
  var qqReg = /^[1-9]\d{4,}$/
  var qq = document.querySelector('#qq')
  regTest(qq, qqReg, '您输入的QQ号码不正确', '恭喜您')
  // 验证码
  var msgReg = /^[1-9]\d{4,}$/
  var msg = document.querySelector('#yzm')
  regTest(msg, msgReg)
  // 登录密码
  var pwdReg = /^[a-zA-Z0-9-_]{6,12}$/
  var pwd = document.querySelector('#dlmm')
  regTest(pwd, pwdReg, '6~12位的数字或字母或_-', '验证通过')
  // 确认密码
  var surePwd = document.querySelector('#qrmm')
  surePwd.oninput = function () {
    if (pwd.value == surePwd.value) {
      this.nextElementSibling.innerHTML = `<i class="success_icon"></i>正确`
      this.nextElementSibling.className = 'success'
    } else {
      this.nextElementSibling.innerHTML = `<i class="error_icon"></i>两次输入的密码不一样`
      this.nextElementSibling.className = 'error'
    }
    this.nextElementSibling.style.display = 'inline-block'
  }
  // 验证规则函数
  function regTest(elem, reg, errStr, sucStr) {
    elem.addEventListener('input', content)
    elem.addEventListener('blur', content)
    function content() {
      // 判断
      var isTrue = reg.test(this.value);
      if (isTrue) {
        this.nextElementSibling.innerHTML = `<i class="success_icon"></i>${sucStr ? sucStr : '正确'}`
        this.nextElementSibling.className = 'success'
      } else {
        this.nextElementSibling.innerHTML = `<i class="error_icon"></i> ${errStr ? errStr : '非法输入'}`
        this.nextElementSibling.className = 'error'
      }
      this.nextElementSibling.style.display = 'inline-block'
    }
  }
})();