//图片预览
$('#logo').on('change', function () {
    var formData = new FormData();
    formData.append('logo', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (result) {
            console.log(result);
            $('form img').attr('src', result[0].logo);
            //将图片路径放进隐藏域提交进数据库
            $('#site_logo').val(result[0].logo);
        }
    })
})

//setting
$('form').on('click', '#setting', function () {
    // $('form').find('#btnEdit').hide();
    $('#comment').val($('#comment_status').prop('checked'));
    $('#review').val($('#comment_reviewed').prop('checked'));
    // console.log($('#comment').val(), $('#review').val());
    // return
    var datas = $('form').serialize();
    $.ajax({
        type: 'post',
        url: '/settings',
        data: datas,
        success: function (result) {
            $('form').find('img').attr('src', '../assets/img/logo.png');
            $('form input').val('');
            $('#site_description').val('');
            $('form [type="checkbox"]').prop('checked', true);
        }
    })
})

//获取设置属性
$.ajax({
    type: 'get',
    url: '/settings',
    success: function (result) {
        console.log(result);
        $('form img').attr('src', result.logo);
        $('#site_name').val(result.title);
        $('#site_description').val(result.description);
        $('#site_keywords').val(result.keywords);
        $('#comment_status').prop('checked', result.comment);
        $('#comment_reviewed').prop('checked', result.review);
    }
})