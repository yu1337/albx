//文章数量
$.ajax({
    type: 'get',
    url: '/posts/count',
    success: function (result) {
        $('#post').html('<strong>' + result.postCount + '</strong>篇文章（<strong>' + result.draftCount + '</strong>篇草稿）')
    }
})

//分类
$.ajax({
    type: 'get',
    url: '/categories/count',
    success: function (result) {
        $('#category').html('<strong>' + result.categoryCount + '</strong>个分类')
    }
})

//评论
$.ajax({
    type: 'get',
    url: '/comments/count',
    success: function (result) {
        // （<strong>1</strong>条待审核）
        $('#comment').html('<strong>'+result.commentCount+'</strong>条评论')
    }
})