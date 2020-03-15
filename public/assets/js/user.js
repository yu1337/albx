
var userArr = [];

//渲染模板
$.ajax({
    type: 'get',
    url: '/users',
    success: function (result) {
        // console.log(result);
        userArr = result;
        // console.log(userArr);
        render();
    }
})
function render() {
    var html = template('users', { data: userArr })
    document.querySelector('tbody').innerHTML = html;
}
//图片预览
$('#avatar').on('change', function () {
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (result) {
            $('#viewimg').attr('src', result[0].avatar);
            //将图片路径放进隐藏域提交进数据库
            $('#hiddenAvatar').val(result[0].avatar);
        },
        error: function (result) {
            console.log(result);
        }
    })
})

//提交用户数据到数据库
$('form').on('click', '#btnAdd', function () {
    $('form').find('#btnEdit').hide();
    var datas = $('form').serialize();
    $.ajax({
        type: 'post',
        url: '/users',
        data: datas,
        success: function (result) {
            userArr.unshift(result);
            render();
            $('form').find('img').prop('src', '../assets/img/default.png');
            $('.form-control').val('');
            $('input[type="radio"]').prop('checked', false);
        }
    })
})

//编辑用户
$('tbody').on('click', '#btnEdit', function () {
    $('h2').text('编辑用户')
    $('#btnAdd').hide();
    $('#btnEdit').show();
    //图片
    $('form').find('img').prop('src', $(this).parents('tr').find('img').attr('src'));
    //图片隐藏域
    $('#hiddenAvatar').val($(this).parents('tr').find('img').attr('src'));
    //邮箱
    $('#email').prop('disabled', true).val($(this).parents('tr').children().eq(2).text());
    //昵称
    $('#nickName').prop('disabled', false).val($(this).parents('tr').children().eq(3).text());
    //密码
    $('#pwd').prop('disabled', true).text('');
    //给编辑按钮添加data-id
    $('form').find('#btnEdit').attr('data-id', $(this).attr('data-id'));
    //状态
    if ($(this).parents('tr').children().eq(4).text() == '激活') {
        $('#status1').prop('checked', true);
    } else {
        $('#status0').prop('checked', true);
    }
    //权限
    if ($(this).parents('tr').children().eq(5).text() == '管理员') {
        $('#admin').prop('checked', true);
    } else {
        $('#normal').prop('checked', true);
    }
    //
})

//提交修改信息
$('form').on('click', '#btnEdit', function () {
    var id = $(this).attr('data-id');
    var forData = $('form').serialize();
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: forData,
        success: function (result) {
            let index = userArr.findIndex(item => item._id == result._id);
            userArr[index] = result;
            render();
        }
    })
    $('form').find('img').prop('src', '../assets/img/default.png');
    $('.form-control').val('');
    $('input[type="radio"]').prop('checked', false);
})

//单个删除
$('tbody').on('click', '#btnDelete', function () {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'delete',
        url: '/users/' + id,
        data: {
            id: id
        },
        success: function (result) {
            alert('删除成功');
            // console.log(result);
            var index = userArr.findIndex(item => item._id == result._id);
            userArr.splice(index, 1);
            render();
        }
    })
})