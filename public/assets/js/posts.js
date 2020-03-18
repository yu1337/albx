//获取筛选条件
var cateId = $('#categories').val();
var state = $('#state').val();

//获取当前页码
var currentPage = 1;

//分类
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (result) {
        var html = template('category', { data: result });
        document.querySelector('#categories').innerHTML = html;
    }
})

//自定义函数
function render(state, category, page = 1) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            state: state,
            category: category,
            page: page,
        },
        success: function (result) {
            var html = template('posts', { data: result.records });
            document.querySelector('tbody').innerHTML = html;
            var pagehtml = template('page', { data: result });
            document.querySelector('.pagination').innerHTML = pagehtml;
        }
    })
}

//渲染所有文章
render(state, cateId)

//分页功能
function page(index) {
    currentPage = index;
    render(state, cateId, index);
}

//筛选
$('form').on('click', '#sizer', function () {
    // console.log(cateId, state);
    cateId = $('#categories').val();
    state = $('#state').val();
    // console.log(cateId, state);
    // return
    render(state, cateId);
})

//删除
$('tbody').on('click', '#delete', function () {
    let id = $(this).attr('data-id');
    $.ajax({
        type: 'delete',
        url: '/posts/' + id,
        success: function (result) {
            var index = $('tbody tr').length;
            if (index == 1) {
                if (currentPage == 1) {
                    render(state, cateId, currentPage);
                } else {
                    render(state, cateId, currentPage - 1);
                    currentPage = currentPage - 1;
                }
            } else if (index == 2) {
                render(state, cateId, currentPage);
            }
        }
    })
})