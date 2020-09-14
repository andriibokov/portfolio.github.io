// slick 
$(function(){
    $('.agents__slick').slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: false
    });
});
//  Animate Number
$(function(){
    let appartments = $('.container__appartment').length;
    $('.appartments').animateNumber({ number: appartments });
    $('.clients').animateNumber({ number: 3854 });
    $('.employees').animateNumber({ number: 24 });
    $('.awards').animateNumber({ number: 14 });
});


// Scroll Down
$(function(){
    $('.scrollDown__btn').click(function() {
        $('html, body').animate({scrollTop: document.body.scrollHeight},1000);
        return false;
    })
});


// interpretation active
$(function(){
    $('.interpretation__box').click(function(){
        $('.interpretation__box').removeClass('interpretation__active');
        $(this).addClass('interpretation__active');
        return false;
    });
});