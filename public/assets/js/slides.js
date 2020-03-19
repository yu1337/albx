var userArr = [];
//渲染模板
$.ajax({
    type: 'get',
    url: '/slides',
    success: function (result) {
        userArr = result;
        render();
    }
})
function render() {
    var html = template('slides', { data: userArr })
    document.querySelector('tbody').innerHTML = html;
}

//图片预览
$('#image').on('change', function () {
    var formData = new FormData();
    formData.append('image', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (result) {
            console.log(result);
            $('.thumbnail').show().attr('src', result[0].image);
            //将图片路径放进隐藏域提交进数据库
            $('#hideImg').val(result[0].image);
        }
    })
})

//slides上传
$('form').on('click', '#btnAdd', function () {
    // $('form').find('#btnEdit').hide();
    var datas = $('form').serialize();
    $.ajax({
        type: 'post',
        url: '/slides',
        data: datas,
        success: function (result) {
            console.log(result); 
            userArr.push(result);
            render();
            $('form').find('img').hide();
            $('form input').val('')
        }
    })
})

//删除
$('tbody').on('click', '.delete', function () {
    if (confirm('是否确定删除')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/slides/' + id,
            data: {
                id: id
            },
            success: function (result) {
                var index = userArr.findIndex(item => item._id == result._id);
                userArr.splice(index, 1);
                render();
            }
        })
    }
})