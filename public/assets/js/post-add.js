//分类
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (result) {
        var html = template('cates', { data: result });
        $('#category').html(html);
    }
})

//上传文件
$('#file').on('change', function () {
    var formData = new FormData();
    // console.log(this.files[0]);
    formData.append('img', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (result) {
            $('.thumbnail').show().prop('src', result[0].img);
            $('#hideFeature').val(result[0].img);
        }
    })
})

//上传文章
$('form').on('click', '#btnAdd', function () {
    let data = $("form").serialize();
    $.ajax({
        type: 'post',
        url: '/posts',
        data: data,
        success: function (result) {
            location.href = 'posts.html';
        }
    })
})


//通过获取id属性来判断是否为编辑功能
var cid = jungle('id');
function jungle(name) {
    var data = location.search.substr(1).split('&');
    for (var i = 0; i < data.length; i++) {
        var str = data[0].split('=');
        if (str[0] == name) {
            console.log(str[1]);
            return str[1];
        }
    }
    return -1;
}

if (cid != -1) {
    $.ajax({
        type: 'get',
        url: '/posts/' + cid,
        success: function (result) {
            console.log(result);
            $('h1').text('编辑文章');
            $('#title').val(result.title);
            $('#content').val(result.content);
            $('#file').siblings('img').show().prop('src', result.thumbnail);
            $('#hideFeature').val(result.thumbnail);
            $('#created').val(result.createAt.substr(0, 16));
            $('#status').val(result.state);
            $('#category').val(result.category._id)
            $('#btnAdd').hide();
            $('#btnEdit').show();
        }
    })
    $('form').on('click', '#btnEdit', function () {
        var data = $('form').serialize();
        $.ajax({
            type: 'put',
            url: '/posts/' + cid,
            data: data,
            success: function (result) {
                // console.log(result);
                location.href = '/admin/posts.html'
            }
        })
    })

}

