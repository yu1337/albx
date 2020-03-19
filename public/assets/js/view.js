//轮播图
$.ajax({
    type: 'get',
    url: '/slides',
    success: function (result) {
        // console.log(result);
        var html = template('swiper', { data: result });
        document.querySelector('.swipe-wrapper').innerHTML = html;
        //轮播图
        var swiper = Swipe(document.querySelector('.swipe'), {
            auto: 3000,
            transitionEnd: function (index) {
                // index++;
                $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
            }
        });
        // 上/下一张
        $('.swipe .arrow').on('click', function () {
            var _this = $(this);
            if (_this.is('.prev')) {
                swiper.prev();
            } else if (_this.is('.next')) {
                swiper.next();
            }
        })
    }
})

//热门文章  /posts/recommend
$.ajax({
    type: 'get',
    url: '/posts/recommend',
    success: function (result) {
        // console.log(result);
        var html = template('hot', { data: result });
        document.querySelector('.hots').innerHTML = html;

    }
})

//最新发布   /posts/lasted
$.ajax({
    type: 'get',
    url: '/posts/lasted',
    success: function (result) {
        // console.log(result);
        var html = template('news', { data: result });
        document.querySelector('.new').innerHTML = html;

    }
})
