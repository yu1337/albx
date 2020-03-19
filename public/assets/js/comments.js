//获取评论
$.ajax({
    type: 'get',
    url: '/comments',
    success: function (result) {
        console.log(result);
        var html = template('comments', { data: result });
        document.querySelector('tbody').innerHTML = html;
    }
})