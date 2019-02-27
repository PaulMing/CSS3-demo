// $('#swiper').sliderImg({
//     image: ['./images/banner1.jpg', './images/banner2.jpg', './images/banner3.jpg', './images/banner4.jpg', './images/banner1.jpg']
// })
$(".navigation a").click(function () {

    $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top - 20 + "px" }, 500);

    return false;

});
// $(document).ready(function () {
//     $('#myCarousel').carousel({ interval: 1800 });//每隔5秒自动轮播 
// }); 