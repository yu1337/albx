
//随机文章
$.ajax({
    type: 'get',
    url: '/posts/random',
    success: function (result) {
        // console.log(result);
        var html = template('random', { data: result });
        document.querySelector('.random').innerHTML = html;
        return
    }
    
})

//随即评论
$.ajax({
    type: 'get',
    url: '/comments/lasted',
    success: function (result) {
        // console.log(result);
        var html = template('chat', { data: result });
        document.querySelector('.discuz').innerHTML = html;
    }
})