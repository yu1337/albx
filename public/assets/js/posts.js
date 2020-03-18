//获取筛选条件
var id = $('#categories').val();
var state = $('#state').val();

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
            page: page,
            state: state,
            category: category,
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
render(state, id)

//分页功能
function page(index) {
    render(state, id, index)
}

//筛选
$('form').on('click', '#sizer', function () {
    // console.log(id, state);
    id = $('#categories').val();
    state = $('#state').val();
    // console.log(id, state);
    // return
    render(state,id);
})

