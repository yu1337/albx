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