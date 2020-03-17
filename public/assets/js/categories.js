
var cateArr = [];

function render() {
    var html = template('categories', { data: cateArr })
    document.querySelector('tbody').innerHTML = html
}
//获取数据库的数据渲染在页面
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (result) {
        cateArr = result;
        render();
    }
})
$('form #btnEdit').hide();
$('form #btnAdd').show();
//添加分类
$('form').on('click', '#btnAdd', function () {
    var formData = $('form').serialize();
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function (result) {
            cateArr.unshift(result)
            render();
        }
    })
    $('form input').val('');
})

//编辑
var id;
$('tbody').on('click', '#btnEdit', function () {
    id = $(this).attr('data-id')
    $('h2').text('编辑分类');
    $('form #btnAdd').hide();
    $('form #btnEdit').show();
    var title = $(this).parents('tr').children().eq(1).text()
    $('#title').val(title);
    var data = cateArr.find(item => item.title == title);
    $('#className').val(data.className);
})

$('form #btnEdit').on('click', function () {
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: {
            title: $('form #title').val(),
            className: $('form #className').val()
        },
        success: function (result) {
            console.log(result);
            var index = cateArr.findIndex(item => item._id == result._id);
            cateArr[index] = result;
            console.log(cateArr);
            render();
            $('form input').val('');
        }
    })
})

$('#deleteMany').hide();
//删除
$('tbody').on('click', '#btnDelete', function () {
    id = $(this).attr('data-id');
    $.ajax({
        type: 'delete',
        url: '/categories/' + id,
        success: function (result) {
            var index = cateArr.findIndex(item => item._id == id);
            cateArr.splice(index, 1);
            render();
        }
    })
})

//全选
$('thead [type="checkbox"]').on('change', function () {
    $('tbody [type="checkbox"]').prop('checked', $(this).prop('checked'));
})

//复选框
$('tbody').on('change', '[type="checkbox"]', function () {
    var all = $('tbody [type="checkbox"]').length;
    var check = $('tbody :checked').length;
    $('thead [type="checkbox"]').prop('checked', all === check);
    if (check > 0) {
        $('#deleteMany').show();
    }
})

//批量删除按钮
$('#deleteMany').on('click', function () {
    var arr = [];
    $('#check:checked').each(function (index, item) {
        arr.push($(item).parents('tr').find('#btnEdit').attr('data-id'));
    })
    if (confirm('确定要删除吗')) {
        $.ajax({
            type: 'delete',
            url: '/categories/' + arr.join('-'),
            success: function (result) {
                if (result.constructor === Object) {
                    var index = cateArr.findIndex(item => item._id == result._id);
                    cateArr.splice(index, 1);
                } else {
                    result.forEach(element => {
                        var index = cateArr.findIndex(item => item._id == element._id);
                        cateArr.splice(index, 1);
                    });
                }
                render();
            }
        })
        $('#deleteMany').hide();
    }
})