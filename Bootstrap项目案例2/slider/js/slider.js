(function ($) {
    function Swiper(options) {
        var options = options || {};
        var opts = $.extend({}, options);
        this.wrap = opts.father;
        this.img = opts.image;
        this.init();
    };
    Swiper.prototype.init = function () {
        this.nowIndex = 0;
        this.len = this.img.length - 1;
        this.itemWidth = parseInt(this.wrap.css('width'));
        this.itemHeight = parseInt(this.wrap.css('height'))
        this.timer = undefined;
        this.flag = true;
        this.createDom();
        this.bindEvent();
        this.sliderAuto();
    };
    Swiper.prototype.createDom = function () {
        var len = this.len;
        var str;
        var order = $('<div class="order"></div>');
        var imgBox = $('<ul class="img-box"></ul>');
        var btn = $('<div class="btn">\
                <a class="prevBtn" href="javascript:;"><span></span></a>\
                <a class="nextBtn" href="javascript:;"><span></span></a>\
            </div>');
        var list = $('<ul></ul>');
        var liStr ='';
        for (var i = 0; i < this.len; i++) {
            str += '<li><a href="javascript:;"><img src="' + this.img[i] + '" alt=""></a></li>';
            liStr += '<li></li>';
        }
        str += '<li><a href="javascript:;"><img src="' + this.img[0] + '" alt=""></a></li>';
        
        $(liStr).appendTo(list);
        this.wrap.append(imgBox.html(str))
            .append(btn)
            .append(order.append(list));
        $('.order li').eq(0).addClass('active');
        $('.img-box li').css({
            width:this.itemWidth + 'px',
            height:this.itemHeight  + 'px',
        });
        $('.img-box').css({
            width:this.itemWidth * (this.len + 1)  + 'px',
            height:this.itemHeight  + 'px',
        })
        console.log($('.imgBox li'),this.itemHeight,this.itemWidth)
    };

    Swiper.prototype.bindEvent = function () {
        var self = this;
        $('.order li').add('.prevBtn').add('.nextBtn').on('click', function () {
            if ($(this).attr('class') == 'prevBtn') {
                self.move('prev');
            } else if ($(this).attr('class') == 'nextBtn') {
                self.move('next');
            } else {
                var index = $(this).index();
                self.move(index);
            }
            self.changeStyle();
        })
        self.wrap
            .on('mouseenter', function () {
                self.wrap.find('.btn').show();
                clearTimeout(self.timer);
            })
            .on('mouseleave', function () {
                self.wrap.find('.btn').hide();
                self.sliderAuto();
            })
    };

    Swiper.prototype.sliderAuto = function () {
        clearTimeout(this.timer);
        var self = this;
        this.timer = setTimeout(function () {
            self.move('next');
            self.changeStyle();
        }, 2000);
    };
    Swiper.prototype.move = function (direction) {
        var self = this;
        var nowIndex = self.nowIndex;
        var itemWidth = this.itemWidth;
        var len = this.len;
        if (this.flag) {
            this.flag = false;
            // var a = 1;
            if (direction == 'prev' || direction == 'next') {
                if (direction == 'prev') {
                    if (self.nowIndex == 0) {
                        $('.img-box').css({ left: -(len * itemWidth) });
                        self.nowIndex = len - 1;
                    } else {
                        self.nowIndex = self.nowIndex - 1;
                    }
                } else {
                    if (self.nowIndex == len - 1) {
                        // a = 0;
                        $('.img-box').animate({ left: -(itemWidth * len) }, function () {
                            $(this).css({ left: 0 });
                            self.sliderAuto();
                            self.flag = true;
                        })
                        self.nowIndex = 0;
                    } else {
                        self.nowIndex = self.nowIndex + 1;
                    }
                }
            } else {
                self.nowIndex = direction;
            }
            // a = 1;

            // if (a) {
            this.slider();
            // }
        }

    }
    Swiper.prototype.slider = function () {
        var self = this;
        $('.img-box').animate({ left: -(this.itemWidth * this.nowIndex) }, function () {
            self.sliderAuto();
            self.flag = true;
        });
    }
    Swiper.prototype.changeStyle = function () {
        $('.active').removeClass('active');
        $('.order li').eq(this.nowIndex).addClass('active');
    }

    $.fn.extend({
        sliderImg: function (options) {
            options.father = this || $('body');
            console.log(options)
            new Swiper(options);
        }
    })
})(jQuery)