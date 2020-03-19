//分类
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (result) {
        let tpl = `
                {{each data}}
                    <li><a href="list.html?id={{@$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
                {{/each}}
        `;
        let html = template.render(tpl, { data: result });
        $('.nav-category').html(html);
    }
})


//搜索
$('.search form').on('submit', function () {
    var keys = $(this).find('.keys').val();
    // console.log(keys);
    location.href=`/search.html?key=${keys}`;
    return false
})



