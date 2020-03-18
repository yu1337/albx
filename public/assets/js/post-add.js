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
$('form').on('click', '[type="button"]', function () {
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