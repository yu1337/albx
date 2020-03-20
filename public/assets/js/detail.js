// 获取网站设置是否需要人工批准
var review;

//通过分类ID查找出相关文章  cid
render(cid);
function render(id) {
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function (result) {
            // console.log(result);
            var html = template('posthtml', result);
            document.querySelector('.article').innerHTML = html
        }
    })
}

// 热门文章
$.ajax({
    type: 'get',
    url: '/posts/recommend',
    success: function (result) {
        // console.log(result);
        var html = template('hot', { data: result });
        document.querySelector('.hots').innerHTML = html;
    }
})

//点赞
$('.article').on('click', '#like', function () {
    $.ajax({
        type: 'post',
        url: '/posts/fabulous/' + cid,
        success: function () {
        }
    })
})

//获取网站设置
$.ajax({
    type: 'get',
    url: '/settings',
    success: function (result) {
        // console.log(result);
        review = result.review;
        if (result.comment) {
            var html = template('commentTpl');
            $('#comment').html(html);
        }
    }
})

//获取文章相关评论
comment(cid)
function comment(id) {
    $.ajax({
        type: 'get',
        url: '/comments/about',
        data: {
            id: id,
        },
        success: function (result) {
            console.log(result);
            var html = template('chat', { data: result });
            document.querySelector('#currentChat').innerHTML = html;
        }
    })
}
//评论上传及评论数据的刷新
$('#comment').on('submit', 'form', function () {
    var content = $(this).find('textarea').val();
    var state;
    if (review) {
        state = 0;
    } else {
        state = 1;
    }
    $.ajax({
        type: 'post',
        url: '/comments',
        data: {
            state,
            content,
            post: cid
        },
        success: function () {
        }
    })

    //获取文章相关评论
    comment(cid)

    //最新评论刷新
    //随即评论
    random();
    
    $(this).find('textarea').val('');
    return false
})