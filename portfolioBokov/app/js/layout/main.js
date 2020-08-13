//отображение партфолио при клике и закрытие его
portfolic.onclick = function(event){
    let title = event.target;
    if(!title.classList.contains("title__img"))return;
    let btn = portfolic.querySelector('.display__none');
    btn.classList.remove("display__none");
    let carousel = title.closest(".portfolic__list");
    carousel.querySelector(".display__none").classList.remove("display__none");
}
btn.onclick = function(event){
    let button = event.target;
    if(!button.classList.contains("button_close"))return;
    button.closest('.portfolic__btn').classList.add("display__none");
    let carousels = portfolic.querySelectorAll('.portfolic__list-ul');
    for(let carousel of carousels){
        if(carousel.classList.contains("button_close")) continue;
        else{
            carousel.classList.add("display__none");
        };
    };
};
//настройка  slick
$(document).ready(function(){
    $('.portfolic__list-ul').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        pauseOnDotsHover:true,
        autoplaySpeed: 2000,
        speed:600,
        nextArrow:'<svg class="slick-arrow slick-next" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" transform="rotate(-90,20,20)" /><path d="M18,10 l10,10 -10,10" /></svg>',
        prevArrow:'<svg class="slick-arrow slick-prev" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" /><path d="M22,10 l-10,10 10,10" /></svg>',
    });
});

//Плавный склолл для меню
menu.onclick = function(event){
    event.preventDefault();
    let elem = event.target;
    let link = elem.closest(".menu__link");
    let coord,topBox,Box;

    if(link.getAttribute("href") == "#history"){
        Box = document.querySelector("#history");
        scroll(Box);
    };
    if(link.getAttribute("href") == "#portfoliс"){
        Box = document.querySelector("#portfolic");
        scroll(Box);
    };
    if(link.getAttribute("href") == "#footer"){
        Box = document.querySelector("#footer");
        scroll(Box);
    };
};
function scroll(Box){
    coord = Box.getBoundingClientRect();
    topBox =coord.top;
    return window.scrollBy({
        top: topBox,
        behavior: 'smooth'   //плавный скролл
    });
};

// Расчёт возраста
let birth = new Date('02/01/1990');
let check = new Date();
let ageInYears =  Math.floor(((check - birth) / (1000 * 60 * 60 * 24)) / 365 );
document.querySelector(".history__age").innerHTML = `(${ageInYears} лет).`;