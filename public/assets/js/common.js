$('#out').on('click', function () {
  var istrue = confirm('确定退出吗');
  if (istrue) {
    $.ajax({
      type: 'post',
      url: '/logout',
      success: function () {
        location.href = 'login.html'
      },
      error: function () {
        alert('退出失败');
      }
    })
  }
})

//修改密码
$('form').on('click', '#edit', function () {
  let userPass = $('[name="userPass"]').val().trim();
  let newPass = $('[name="newPass"]').val().trim();
  let confirmPass = $('[name="confirmPass"]').val().trim();
  if (userPass.length == 0) return alert("请输入旧密码");
  if (newPass.length == 0) return alert("请输入新密码");
  if (confirmPass.length == 0) return alert("请输入确认密码");
  if (newPass !== confirmPass) return alert("输入的两次密码不一样");
  $.ajax({
    type: 'put',
    url: '/users/password',
    data: {
      userPass: userPass,
      newPass: newPass,
      confirmPass: confirmPass
    },
    success: function (res) {
      location.href = 'login.html'
    }
  })
})

// console.log(userId);

//登录用户显示
$.ajax({
  type: 'get',
  url: '/users/' + userId,
  success: function (result) {
    console.log(result);
    $('.profile .avatar').attr('src', result.avatar);
    $('.profile .name').text(result.nickName);
  }
})