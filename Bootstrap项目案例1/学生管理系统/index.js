
// 修改按钮
// find();//查找子元素
$('.slide-btn').click(function(){
    $(this).find('.glyphicon').toggleClass('glyphicon-triangle-right');
    $(this).find('.glyphicon').toggleClass('glyphicon-triangle-bottom');
})

// 媒体查询下的“头部字体图标”
$('.right-content .header span').click(function(){
    $('.left-menu').toggleClass('show');
    $('.right-content').toggleClass('add-pd');
})

// 点击切换内容区
$('.list-group-item').not('.disabled').click(function(e) {
    $('.list-group-item').removeClass('active');
    $(this).addClass('active');

    var id = $(this).attr('href');
    $('.tab-content-item').removeClass('active');
    $(id).addClass('active');
});